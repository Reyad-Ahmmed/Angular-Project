using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mobile_Brand.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace Mobile_Brand.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MobilesController : ControllerBase
    {
        private readonly MobileDbContext _context;
        private readonly IWebHostEnvironment environment;

        public MobilesController(MobileDbContext context, IWebHostEnvironment environment)
        {
            this._context = context;
            this.environment = environment;
        }

        // GET: api/Mobiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mobile>>> GetMobiles()
        {
            return await _context.Mobiles.ToListAsync();
        }

        // GET: api/Mobiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mobile>> GetMobile(int id)
        {
            var mobile = await _context.Mobiles.FindAsync(id);

            if (mobile == null)
            {
                return NotFound();
            }

            return mobile;
        }

        // PUT: api/Mobiles/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMobile(int id, Mobile mobile)
        {
            if (id != mobile.MobileId)
            {
                return BadRequest();
            }

            _context.Entry(mobile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MobileExists(id))
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

        // POST: api/Mobiles
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Mobile>> PostMobile(Mobile mobile)
        {
            _context.Mobiles.Add(mobile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMobile", new { id = mobile.MobileId }, mobile);
        }

        // custom post method

        [HttpPost("Uploads/{id}")]
        public async Task<ActionResult<ImageFilePath>> PostImage(int id, IFormFile file)
        {
            var mobile = await _context.Mobiles.FindAsync(id);
            if (mobile == null)
            {
                return NotFound();
            }
            try
            {
                string ext = Path.GetExtension(file.FileName);
                string f = Guid.NewGuid() + ext;
                if (!Directory.Exists(environment.WebRootPath + "\\Uploads\\"))
                {
                    Directory.CreateDirectory(environment.WebRootPath + "\\Uploads\\");
                }
                using FileStream filestream = System.IO.File.Create(environment.WebRootPath + "\\Uploads\\" + f);

                file.CopyTo(filestream);
                filestream.Flush();
                mobile.Picture = f;
                filestream.Close();
                await _context.SaveChangesAsync();
                return new ImageFilePath { ImagePath = f };

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // DELETE: api/Mobiles/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Mobile>> DeleteMobile(int id)
        {
            var mobile = await _context.Mobiles.FindAsync(id);
            if (mobile == null)
            {
                return NotFound();
            }

            _context.Mobiles.Remove(mobile);
            await _context.SaveChangesAsync();

            return mobile;
        }

        private bool MobileExists(int id)
        {
            return _context.Mobiles.Any(e => e.MobileId == id);
        }
    }
}
