using Microsoft.EntityFrameworkCore;
using MiniUberAPI.Models;

namespace MiniUberAPI.Services
{
    public class CustomerService
    {
        private readonly MiniUberContext _context;

        public CustomerService(MiniUberContext context)
        {
            _context = context;
        }

        public async Task<Customer?> GetByUserId(Guid userId)
        {
            try
            {
                return await _context.Customers
                    .Where(x => x.UserId == userId)
                    .FirstOrDefaultAsync();
            }
            catch
            {
                throw;
            }
        }


        public async Task<Customer> Add(Customer u)
        {
            try
            {
                _context.Customers.Add(u);
                await _context.SaveChangesAsync();
                return u;
            }
            catch
            {
                throw;

            }
        }

        public async Task<Customer> Update(Customer u)
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
        public async Task<Customer?> Get(Guid id)
        {
            try
            {
                return await _context.Customers.FindAsync(id);
            }
            catch
            {
                throw;
            }
        }

        public async Task<Customer?> Delete(Guid id)
        {
            try
            {
                Customer? u = await _context.Customers.FindAsync(id);
                if (u != null)
                {
                    _context.Customers.Remove(u);
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
