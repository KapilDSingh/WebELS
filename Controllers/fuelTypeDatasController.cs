using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebELS.Models;

namespace WebELS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class fuelTypeDatasController : ControllerBase
    {
        private readonly Func<ISODBContext> _context;

        public fuelTypeDatasController(Func<ISODBContext> context)
        {
            _context = context;
        }

        // GET: api/fuelTypeDatas
        [HttpGet]
        public IEnumerable<fuelTypeData> GetfuelTypeData()
        {
            return _context().fuelTypeData;
        }

        // GET: api/fuelTypeDatas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetfuelTypeData([FromRoute] DateTime id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fuelTypeData = await _context().fuelTypeData.FindAsync(id);

            if (fuelTypeData == null)
            {
                return NotFound();
            }

            return Ok(fuelTypeData);
        }

        // PUT: api/fuelTypeDatas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutfuelTypeData([FromRoute] DateTime id, [FromBody] fuelTypeData fuelTypeData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fuelTypeData.Timestamp)
            {
                return BadRequest();
            }

            _context().Entry(fuelTypeData).State = EntityState.Modified;

            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!fuelTypeDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/fuelTypeDatas
        [HttpPost]
        public async Task<IActionResult> PostfuelTypeData([FromBody] fuelTypeData fuelTypeData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context().fuelTypeData.Add(fuelTypeData);
            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (fuelTypeDataExists(fuelTypeData.Timestamp))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetfuelTypeData", new { id = fuelTypeData.Timestamp }, fuelTypeData);
        }

        // DELETE: api/fuelTypeDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletefuelTypeData([FromRoute] DateTime id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var fuelTypeData = await _context().fuelTypeData.FindAsync(id);
            if (fuelTypeData == null)
            {
                return NotFound();
            }

            _context().fuelTypeData.Remove(fuelTypeData);
            await _context().SaveChangesAsync();

            return Ok(fuelTypeData);
        }

        private bool fuelTypeDataExists(DateTime id)
        {
            return _context().fuelTypeData.Any(e => e.Timestamp == id);
        }
    }
}