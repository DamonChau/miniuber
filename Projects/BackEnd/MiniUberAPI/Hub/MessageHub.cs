using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MiniUberAPI.Models;
using MiniUberAPI.Services;
using System.Collections.Generic;
using System.Data;

namespace MiniUberAPI.Hub
{
    public class MessageHub : Hub<IMessageHubClient>
    {

        public MessageHub()
        {
            
        }

        public async Task SendBookingsToDrivers(IEnumerable<Trip> trips)
        {
            await Clients.All.SendBookingsToDrivers(trips);
        }

        public async Task NotifyNewBookings()
        {
            await Clients.All.NotifyNewBookings();
        }

    }
}
