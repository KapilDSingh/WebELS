using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Models
{
    [Table("genFuelTbl")]
    public partial class GenFuelTbl
    {
        [Column("timestamp", TypeName = "datetime")]
        public DateTime Timestamp { get; set; }
        [Column("Fuel Type")]
        [StringLength(50)]
        public string FuelType { get; set; }
        [Column("MW")]
        public double Mw { get; set; }
        [Column("Percentage of Total")]
        public double PercentageOfTotal { get; set; }
        [Required]
        [StringLength(50)]
        public string Renewable { get; set; }
    }
    
    public class fuelTypeData
    {
        [Column("timestamp", TypeName = "datetime")] 
        public DateTime Timestamp { get; set; }
        [Column("Gas")]
        public double Gas { get; set; }
        [Column("Nuclear")]
        public double Nuclear { get; set; }
        [Column("Coal")]
        public double Coal { get; set; }
        [Column("Hydro")]
        public double Hydro { get; set; }
        [Column("Wind")]
        public double Wind { get; set; }
        [Column("Solar")]
        public double Solar { get; set; }
        [Column("Multiple Fuels")]
        public double MultipleFuels { get; set; }
        [Column("Other Renewables")]
        public double OtherRenewables { get; set; }
        [Column("Oil")]
        public double Oil { get; set; }
        [Column("Other")]
        public double Other { get; set; }
        [Column("Storage")]
        public double Storage { get; set; }
    }
}
