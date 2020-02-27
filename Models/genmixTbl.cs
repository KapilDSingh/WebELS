using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Models
{
    [Table("genmixTbl")]
    public partial class GenmixTbl
    {
        [StringLength(50)]
        public string Freq { get; set; }
        [StringLength(50)]
        public string Fuel { get; set; }
        [Column("Generation_MW")]
        public double? GenerationMw { get; set; }
        [Column("ISO")]
        [StringLength(50)]
        public string Iso { get; set; }
        [StringLength(50)]
        public string Market { get; set; }
        [Column("timestamp", TypeName = "datetime")]
        public DateTime timestamp { get; set; }
    }
}
