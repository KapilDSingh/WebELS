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
    public class lmpTblsController : ControllerBase
    {
        private readonly Func<ISODBContext> _context;

        public lmpTblsController(Func<ISODBContext> context)
        {
            _context = context;
        }

        // GET: api/lmpTbls
        [HttpGet]
        public IEnumerable<lmpTbl> GetlmpTbl()
        {
            return _context().lmpTbl;
        }

        // GET: api/lmpTbls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetlmpTbl([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var lmpTbl = await _context().lmpTbl.FindAsync(id);

            if (lmpTbl == null)
            {
                return NotFound();
            }

            return Ok(lmpTbl);
        }

        // PUT: api/lmpTbls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutlmpTbl([FromRoute] string id, [FromBody] lmpTbl lmpTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lmpTbl.node_id)
            {
                return BadRequest();
            }

            _context().Entry(lmpTbl).State = EntityState.Modified;

            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!lmpTblExists(id))
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

        // POST: api/lmpTbls
        [HttpPost]
        public async Task<IActionResult> PostlmpTbl([FromBody] lmpTbl lmpTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context().lmpTbl.Add(lmpTbl);
            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (lmpTblExists(lmpTbl.node_id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetlmpTbl", new { id = lmpTbl.node_id }, lmpTbl);
        }

        // DELETE: api/lmpTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletelmpTbl([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var lmpTbl = await _context().lmpTbl.FindAsync(id);
            if (lmpTbl == null)
            {
                return NotFound();
            }

            _context().lmpTbl.Remove(lmpTbl);
            await _context().SaveChangesAsync();

            return Ok(lmpTbl);
        }

        private bool lmpTblExists(string id)
        {
            return _context().lmpTbl.Any(e => e.node_id == id);
        }
    }
}