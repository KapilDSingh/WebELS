using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebELS.Models
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

        public virtual DbSet<GenFuelTbl> GenFuelTbl { get; set; }
       
        public virtual DbSet<lmpTbl> lmpTbl { get; set; }
        public virtual DbSet<loadTbl> loadTbl { get; set; }
        public virtual DbSet<TradeTbl> tradeTbl { get; set; }

        public virtual DbSet<fuelTypeData> fuelTypeData { get; set; }
        public virtual DbSet<MeterTbl> MeterTbl { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Data Source=tcp: kapilsingh.synology.me\\SQLEXPRESS,1433;Initial Catalog=ISODB;Integrated Security = False;User ID=Kapil;Password=Acfjo12#;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GenFuelTbl>(entity =>
            {
                entity.HasKey(e => new { e.Timestamp, e.FuelType });

                entity.Property(e => e.FuelType).IsUnicode(false);

                entity.Property(e => e.Renewable).IsUnicode(false);
            });
            modelBuilder.Entity<fuelTypeData>(entity =>
            {

                entity.HasKey(e => new { e.Timestamp });

                entity.Property(e => e.Gas).IsUnicode(false);
         

                entity.Property(e => e.Coal).IsUnicode(false);
                entity.Property(e => e.Hydro).IsUnicode(false);
                entity.Property(e => e.Wind).IsUnicode(false);
                entity.Property(e => e.Solar).IsUnicode(false);
                entity.Property(e => e.MultipleFuels).IsUnicode(false);
                entity.Property(e => e.OtherRenewables).IsUnicode(false);
                entity.Property(e => e.Oil).IsUnicode(false);
                entity.Property(e => e.Other).IsUnicode(false);
                entity.Property(e => e.Storage).IsUnicode(false);
              
            });


            modelBuilder.Entity<lmpTbl>(entity =>
            {
                entity.HasKey(e => new { e.node_id, e.timestamp });

                entity.HasIndex(e => e._5_Minute_Weighted_Avg__LMP)
                    .HasName("IX_lmpTbl");

                entity.Property(e => e.Type).IsUnicode(false);
            });

            modelBuilder.Entity<loadTbl>(entity =>
            {
                entity.HasKey(e => new { e.Area, e.timestamp });

                entity.Property(e => e.Area).IsUnicode(false);
            });

            modelBuilder.Entity<TradeTbl>(entity =>
            {
                entity.Property(e => e.Freq).IsUnicode(false);

                entity.Property(e => e.Iso).IsUnicode(false);

                entity.Property(e => e.Market).IsUnicode(false);
            });
            modelBuilder.Entity<MeterTbl>(entity =>
            {
                entity.HasKey(e => new { e.MeterId, e.Timestamp });

                entity.ToTable("meterTbl");

                entity.Property(e => e.MeterId)
                    .HasColumnName("MeterID")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Timestamp)
                    .HasColumnName("timestamp")
                    .HasColumnType("datetime");

                entity.Property(e => e.KWhTot).HasColumnName("kWh_Tot");

                entity.Property(e => e.PowerFactorLn1).HasColumnName("Power_Factor_Ln_1");

                entity.Property(e => e.PowerFactorLn2).HasColumnName("Power_Factor_Ln_2");

                entity.Property(e => e.PowerFactorLn3).HasColumnName("Power_Factor_Ln_3");

                entity.Property(e => e.RevKWhTot).HasColumnName("Rev_kWh_Tot");

                entity.Property(e => e.RmsVoltsLn1).HasColumnName("RMS_Volts_Ln_1");

                entity.Property(e => e.RmsVoltsLn2).HasColumnName("RMS_Volts_Ln_2");

                entity.Property(e => e.RmsVoltsLn3).HasColumnName("RMS_Volts_Ln_3");

                entity.Property(e => e.RmsWattsLn1).HasColumnName("RMS_Watts_Ln_1");

                entity.Property(e => e.RmsWattsLn2).HasColumnName("RMS_Watts_Ln_2");

                entity.Property(e => e.RmsWattsLn3).HasColumnName("RMS_Watts_Ln_3");
            });
        }
    }
}
