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
                //private const string ConnectionString = @"Data Source=tcp:KAPILDELLSSD\SQLEXPRESS,1433;Initial Catalog=ISODB;Integrated Security = False;User ID=Kapil;Password=Acfjo12#;";

                optionsBuilder.UseSqlServer(@"Data Source = tcp:KAPILDELLSSD\SQLEXPRESS;Initial Catalog = ISODB; Integrated Security = False; User ID = Kapil; Password=Acfjo12#;");
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
