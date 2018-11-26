using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Model
{
    public partial class lmpTbl
    {
        [Required]
        [StringLength(50)]
        public string Type { get; set; }
        [Column("5 Minute Weighted Avg. LMP")]
        public double _5_Minute_Weighted_Avg__LMP { get; set; }
        [Column("Hourly Integrated LMP")]
        public double Hourly_Integrated_LMP { get; set; }
        [StringLength(50)]
        public string node_id { get; set; }
        public DateTime timestamp { get; set; }
    }
}
