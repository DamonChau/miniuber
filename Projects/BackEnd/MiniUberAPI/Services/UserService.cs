using MiniUberAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MiniUberAPI.Services
{
    public class UserService
    {
        private readonly MiniUberContext _context;

        public UserService(MiniUberContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            try
            {
                return await _context.Users.ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<User?> GetUserByPhoneNo(string phoneNo)
        {
            try
            {
#pragma warning disable CS8600 // Converting null literal or possible null value to non-nullable type.
                User? u = await _context.Users.Where(u => u.PhoneNo == phoneNo).FirstOrDefaultAsync();
#pragma warning restore CS8600 // Converting null literal or possible null value to non-nullable type.
                return u;
            }
            catch
            {
                throw;

            }
        }

        public async Task<User> AddUser(User u)
        {
            try
            {
                u.CreatedDate = DateTime.Now;
                _context.Users.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;

            }
        }

        public async Task<User> UpdateUser(User u)
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

        public async Task<User?> Login(User u)
        {
            try
            {
                if (u != null)
                {
                    using (var context = _context)
                    {
                        User? r = await _context.Users.SingleOrDefaultAsync(user => user.UserName == u.UserName);
                        if (r != null && r.Status == 1 && BCrypt.Net.BCrypt.Verify(u.Password, r.Password))
                        {
                            r.LoginDate = DateTime.Now;
                            r.RefreshToken = u.RefreshToken;
                            await context.SaveChangesAsync();
                            return r;
                        }
                        return null;
                    }
                }
                return null;
            }
            catch
            {
                throw;
            }
        }

        public async Task<User?> GetUserData(Guid id)
        {
            try
            {
                return await _context.Users.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<User?> DeleteUser(Guid id)
        {
            try
            {
                User? u = await _context.Users.FindAsync(id);
                if (u != null)
                {
                    _context.Users.Remove(u);
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
