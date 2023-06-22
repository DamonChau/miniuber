using MiniUberAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MiniUberAPI.Services
{
    public class TripService
    {
        private readonly MiniUberContext _context;

        public TripService(MiniUberContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Trip>> GetAllTrips()
        {
            try
            {
                return await _context.Trips
                    .Include(t => t.Customer).ThenInclude(t => t.User)
                    .Include(t => t.Driver).ThenInclude(t => t.User)
                    .OrderByDescending(t => t.CreatedDate)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Trip>> GetAllTripsByStatus(int status)
        {
            try
            {
                return await _context.Trips
                    .Where(t => t.Status == status)
                    .Include(t => t.Customer).ThenInclude(t => t.User)
                    .Include(t => t.Driver).ThenInclude(t => t.User)
                    .OrderByDescending(t => t.CreatedDate)
                    .ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<Trip> Add(Trip u)
        {
            try
            {
                u.CreatedDate = DateTime.Now;
                _context.Trips.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;

            }
        }

        public async Task<Trip> Update(Trip u)
        {
            try
            {
                _context.Entry(u).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;
            }
        }
        public async Task<Trip?> Get(Guid id)
        {
            try
            {
                return await _context.Trips.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<Trip?> Delete(Guid id)
        {
            try
            {
                Trip? u = await _context.Trips.FindAsync(id);
                if (u != null)
                {
                    _context.Trips.Remove(u);
                    await _context.SaveChangesAsync();
                }
                return null;
            }
            catch
            {
                throw;
            }
        }
    }
}
