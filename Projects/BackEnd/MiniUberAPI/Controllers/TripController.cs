using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniUberAPI.Common;
using MiniUberAPI.Models;
using MiniUberAPI.Services;
using System.Security.Claims;

namespace MiniUberAPI.Controllers
{
    public class TripController : Controller
    {
        private readonly TripService _objectTrip;
        
        public TripController(MiniUberContext context)
        {
            _objectTrip = new TripService(context);
        }

        [Authorize]
        [HttpGet]
        [Route("api/Trips/GetAllTrips")]
        public async Task<ActionResult<IEnumerable<Trip>>> GetAllTrips()
        {
            try
            {
                return Ok(await _objectTrip.GetAllTrips());
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [HttpGet]
        [Route("api/Trips/GetAllBookingTrips")]
        public async Task<ActionResult<IEnumerable<Trip>>> GetAllBookingTrips()
        {
            try
            {
                return Ok(await _objectTrip.GetAllTripsByStatus(0));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }


        [Authorize]
        [HttpPost]
        [Route("api/Trips/Create")]
        public async Task<ActionResult<Trip>> Create([FromBody] Trip u)
        {
            try
            {
                return Ok(await _objectTrip.Add(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        [Authorize]
        [HttpGet]
        [Route("api/Trips/Details/{id}")]
        public async Task<ActionResult<Trip>> Details(Guid id)
        {
            try
            {
                return Ok(await _objectTrip.Get(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpPut]
        [Route("api/Trips/Update")]
        public async Task<ActionResult<Trip>> Update([FromBody] Trip u)
        {
            try
            {
                return Ok(await _objectTrip.Update(u));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }

        [Authorize]
        [HttpDelete]
        [Route("api/Trips/Delete/{id}")]
        public async Task<ActionResult<Trip>> Delete(Guid id)
        {
            try
            {
                return Ok(await _objectTrip.Delete(id));
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }

        }
    }
}
