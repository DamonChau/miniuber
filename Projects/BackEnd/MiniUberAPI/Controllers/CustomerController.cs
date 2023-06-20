using Castle.Core.Resource;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniUberAPI.Models;
using MiniUberAPI.Services;

namespace MiniUberAPI.Controllers
{
    public class CustomerController : Controller
    {
        private readonly CustomerService _objectCustomer;

        public CustomerController(MiniUberContext context)
        {
            _objectCustomer = new CustomerService(context);
        }

        [Authorize]
        [HttpGet]
        [Route("api/Customers/GetByUserId/{userid}")]
        public async Task<ActionResult<Customer>> GetByUserId(Guid userid)
        {
            try
            {
                return Ok(await _objectCustomer.GetByUserId(userid));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }


        [Authorize]
        [HttpPost]
        [Route("api/Customers/Create")]
        public async Task<ActionResult<Trip>> Create([FromBody] Customer u)
        {
            try
            {
                return Ok(await _objectCustomer.Add(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet]
        [Route("api/Customers/Details/{id}")]
        public async Task<ActionResult<Customer>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectCustomer.Get(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/Customers/Update")]
        public async Task<ActionResult<Customer>> Update([FromBody] Customer u)
        {
            try
            {
                return Ok(await _objectCustomer.Update(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("api/Customers/Delete/{id}")]
        public async Task<ActionResult<Customer>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectCustomer.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
