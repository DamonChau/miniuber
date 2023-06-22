using MiniUberAPI.Models;

namespace MiniUberAPI.Hub
{
    public interface IMessageHubClient
    {
        Task SendBookingsToDrivers(IEnumerable<Trip> trips);
        Task RegisterAllTrips();
        Task NotifyNewBookings();
    }
}
