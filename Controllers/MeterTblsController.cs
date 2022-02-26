using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebELS.Models;
//testing new branch
namespace WebELS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeterTblsController : ControllerBase
    {
        private readonly Func<ISODBContext>  _context;

        public MeterTblsController(Func<ISODBContext> context )
        {
            _context = context;
        }

        // GET: api/MeterTbls
        [HttpGet]
        public IEnumerable<MeterTbl> GetMeterTbl()
        {
            List<MeterTbl> MeterData;
            using (var context = _context.Invoke())
            {
                MeterData = (from x in context.MeterTbl orderby x.timestamp ascending select new MeterTbl { timestamp = x.timestamp, MeterId = x.MeterId, RMS_Watts_Tot = x.RMS_Watts_Tot }).Take(100000).ToList();
                return MeterData;
            }
        }

        // GET: api/MeterTbls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeterTbl([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var meterTbl = await _context().MeterTbl.FindAsync(id);

            if (meterTbl == null)
            {
                return NotFound();
            }

            return Ok(meterTbl);
        }

        // PUT: api/MeterTbls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeterTbl([FromRoute] string id, [FromBody] MeterTbl meterTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != meterTbl.MeterId)
            {
                return BadRequest();
            }

            _context().Entry(meterTbl).State = EntityState.Modified;

            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeterTblExists(id))
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

        // POST: api/MeterTbls
        [HttpPost]
        public async Task<IActionResult> PostMeterTbl([FromBody] MeterTbl meterTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context().MeterTbl.Add(meterTbl);
            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MeterTblExists(meterTbl.MeterId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMeterTbl", new { id = meterTbl.MeterId }, meterTbl);
        }

        // DELETE: api/MeterTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeterTbl([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var meterTbl = await _context().MeterTbl.FindAsync(id);
            if (meterTbl == null)
            {
                return NotFound();
            }

            _context().MeterTbl.Remove(meterTbl);
            await _context().SaveChangesAsync();

            return Ok(meterTbl);
        }

        private bool MeterTblExists(string id)
        {
            return _context().MeterTbl.Any(e => e.MeterId == id);
        }
    }
}
