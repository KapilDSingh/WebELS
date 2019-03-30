using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WebELS.Models;

namespace WebELS.EF
{
    public partial class ISODBContext : DbContext
    {
        public ISODBContext()
        {
        }

        public ISODBContext(DbContextOptions<ISODBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<lmpTbl> lmpTbl { get; set; }
        public virtual DbSet<loadTbl> loadTbl { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Data Source=tcp:100.25.120.167\EC2AMAZ-I2S81GT,1433;Initial Catalog=ISODB;User ID=KapilSingh;Password=Acfjo12#;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<lmpTbl>(entity =>
            {
                entity.HasKey(e => new { e.node_id, e.timestamp });
            });

            modelBuilder.Entity<loadTbl>(entity =>
            {
                entity.HasKey(e => new { e.Area, e.timestamp });
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
 
}
