using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using MiniUberAPI.Hub;
using MiniUberAPI.Models;
using MiniUberAPI.Services;
using System.Data;
using System.Threading.Tasks;

namespace MiniUberAPI.Controllers
{

    [ApiController]
    public class TripsBookingController : Controller
    {

        private readonly TripService _objectTrip;
        private IHubContext<MessageHub, IMessageHubClient> _messageHub;
        private readonly string? _connectionString;
        private SqlDependency? _dependency;
        public TripsBookingController(IConfiguration configuration, MiniUberContext context, IHubContext<MessageHub, IMessageHubClient> messageHub)
        {
            _objectTrip = new TripService(context);
            _messageHub = messageHub;
            _connectionString = configuration.GetConnectionString("MiniUberDatabase");
        }


        [HttpGet]
        [Route("api/registerAllTrips")]
        public async Task<IActionResult> RegisterAllTrips()
        {
            SqlDependency.Start(_connectionString);
            SqlConnection connection = new SqlConnection(_connectionString);
            connection.Open();

            SqlCommand command = new SqlCommand();
            command.CommandText = "SELECT [Status], [AddFrom], [AddTo], [CreatedDate], [DriverId] FROM dbo.Trips";
            command.Connection = connection;
            command.CommandType = CommandType.Text;

            _dependency = new SqlDependency(command);
            _dependency.OnChange += new OnChangeEventHandler(OnChanged);

            await command.ExecuteNonQueryAsync();

            return Ok(new { message = "Ok" });
        }

        private async void OnChanged(object s, SqlNotificationEventArgs e)
        {
            if (e.Type == SqlNotificationType.Change)
            {
                //option 1 send all new bookings to client
                //await _messageHub.Clients.All.SendBookingsToDrivers(FetchTrips());
                //await RegisterAllTrips();

                //option 2 send notify only
                await _messageHub.Clients.All.NotifyNewBookings();
                if (_dependency != null)
                    _dependency.OnChange -= OnChanged;
                await RegisterAllTrips();
            }
        }

        private IEnumerable<Trip> FetchTrips()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                string commandText = @"
                        SELECT t.Id, t.DriverId, t.CustomerId, t.Status, t.CreatedDate, t.FinishedDate, t.AddFrom, t.AddTo,
                            c.Id AS Customer_Id, c.UserId AS Customer_UserId, c.Address AS Customer_Address,
                            uc.Id AS Customer_User_Id, uc.UserName AS Customer_User_Name, uc.PhoneNo AS Customer_PhoneNo,
                            d.Id AS Driver_Id, d.UserId AS Driver_UserId,
                            ud.Id AS Driver_User_Id, ud.UserName AS Driver_User_Name, ud.PhoneNo AS Driver_PhoneNo
                        FROM Trips AS t
                            INNER JOIN Customers AS c ON t.CustomerId = c.Id
                            INNER JOIN Users AS uc ON c.UserId = uc.Id
                            LEFT JOIN Drivers AS d ON t.DriverId = d.Id
                            LEFT JOIN Users AS ud ON d.UserId = ud.Id
                        WHERE t.Status=0
                        ORDER BY t.CreatedDate DESC;";
                // Query the Trips table to fetch the data
                var command = connection.CreateCommand();
                command.CommandText = commandText;
                command.CommandType = CommandType.Text;

                var trips = new List<Trip>();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var trip = new Trip
                        {
                            Id = reader.GetGuid(reader.GetOrdinal("Id")),
                            DriverId = reader.IsDBNull(reader.GetOrdinal("DriverId")) ? null : reader.GetGuid(reader.GetOrdinal("DriverId")),
                            CustomerId = reader.GetGuid(reader.GetOrdinal("CustomerId")),
                            Status = reader.GetInt32(reader.GetOrdinal("Status")),
                            CreatedDate = reader.IsDBNull(reader.GetOrdinal("CreatedDate")) ? null : reader.GetDateTime(reader.GetOrdinal("CreatedDate")),
                            FinishedDate = reader.IsDBNull(reader.GetOrdinal("FinishedDate")) ? null : reader.GetDateTime(reader.GetOrdinal("FinishedDate")),
                            AddFrom = reader.IsDBNull(reader.GetOrdinal("AddFrom")) ? null : reader.GetString(reader.GetOrdinal("AddFrom")),
                            AddTo = reader.IsDBNull(reader.GetOrdinal("AddTo")) ? null : reader.GetString(reader.GetOrdinal("AddTo")),
                            Customer = new Customer
                            {
                                Id = reader.GetGuid(reader.GetOrdinal("Customer_Id")),
                                UserId = reader.GetGuid(reader.GetOrdinal("Customer_UserId")),
                                Address = reader.IsDBNull(reader.GetOrdinal("Customer_Address")) ? null : reader.GetString(reader.GetOrdinal("Customer_Address")),
                                User = new User
                                {
                                    Id = reader.GetGuid(reader.GetOrdinal("Customer_User_Id")),
                                    UserName = reader.IsDBNull(reader.GetOrdinal("Customer_User_Name")) ? null : reader.GetString(reader.GetOrdinal("Customer_User_Name")),
                                    PhoneNo = reader.IsDBNull(reader.GetOrdinal("Customer_PhoneNo")) ? null : reader.GetString(reader.GetOrdinal("Customer_PhoneNo")),
                                }
                            },
                            Driver = reader.IsDBNull(reader.GetOrdinal("Driver_Id")) ? null : new Driver
                            {
                                Id = reader.GetGuid(reader.GetOrdinal("Driver_Id")),
                                UserId = reader.GetGuid(reader.GetOrdinal("Driver_UserId")),
                                User = new User
                                {
                                    Id = reader.GetGuid(reader.GetOrdinal("Driver_User_Id")),
                                    UserName = reader.IsDBNull(reader.GetOrdinal("Driver_User_Name")) ? null : reader.GetString(reader.GetOrdinal("Driver_User_Name"))
                                }
                            }
                        };

                        trips.Add(trip);
                    }
                }

                return trips;
            }
        }

        [HttpGet]
        [Route("api/unregisterAllTrips")]
        public void StopListening()
        {
            if (_dependency != null)
            {
                _dependency.OnChange -= OnChanged;
                SqlDependency.Stop(_connectionString);
                _dependency = null;
            }
        }

        [HttpPost]
        [Route("getAllBookingTrips")]
        public async Task<IEnumerable<Trip>> GetAllBookingTrips()
        {
            //status=0 booking
            var trips = await _objectTrip.GetAllTripsByStatus(0);
            await _messageHub.Clients.All.SendBookingsToDrivers(trips);
            return trips;
        }
    }

}
