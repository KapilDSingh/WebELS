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
    public class loadTblsController : ControllerBase
    {
        private readonly Func<ISODBContext> _context;

        public loadTblsController(Func<ISODBContext> context)
        {
            _context = context;
        }

        // GET: api/loadTbls
        [HttpGet]
        public IEnumerable<loadTblRow> GetloadTbl()
        {
            List<loadTblRow> LoadData;
            using (var context = _context.Invoke())
            {
                LoadData = (from x in context.loadTbl where x.Area == "PJM RTO" orderby x.timestamp ascending select new loadTblRow { timestamp = x.timestamp, Instantaneous_Load = x.Instantaneous_Load }).Take(100000).ToList();
            }
            return LoadData;
        }
        
        // GET: api/loadTbls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetloadTbl([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var loadTbl = await _context().loadTbl.FindAsync(id);

            if (loadTbl == null)
            {
                return NotFound();
            }

            return Ok(loadTbl);
        }

        // PUT: api/loadTbls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutloadTbl([FromRoute] string id, [FromBody] loadTbl loadTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != loadTbl.Area)
            {
                return BadRequest();
            }

            _context().Entry(loadTbl).State = EntityState.Modified;

            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!loadTblExists(id))
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

        // POST: api/loadTbls
        [HttpPost]
        public async Task<IActionResult> PostloadTbl([FromBody] loadTbl loadTbl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context().loadTbl.Add(loadTbl);
            try
            {
                await _context().SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (loadTblExists(loadTbl.Area))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetloadTbl", new { id = loadTbl.Area }, loadTbl);
        }

        // DELETE: api/loadTbls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteloadTbl([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var loadTbl = await _context().loadTbl.FindAsync(id);
            if (loadTbl == null)
            {
                return NotFound();
            }

            _context().loadTbl.Remove(loadTbl);
            await _context().SaveChangesAsync();

            return Ok(loadTbl);
        }

        private bool loadTblExists(string id)
        {
            return _context().loadTbl.Any(e => e.Area == id);
        }
    }
}