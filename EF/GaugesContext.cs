using Microsoft.EntityFrameworkCore;
using WebELS.Models;

namespace WebELS.EF
{
    public class GaugeContext : DbContext
    {
        public GaugeContext(DbContextOptions<GaugeContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Gauge> Gauges { get; set; }
    }
}
