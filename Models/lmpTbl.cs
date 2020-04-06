using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Models
{
    [Table("lmpTbl")]
    public  class lmpTbl
    {
        [JsonProperty("Type")]
        [Required]
        [StringLength(50)]
        public string Type { get; set; }
        [JsonProperty("fiveMinuteAvgLMP")]
        [Column("5 Minute Weighted Avg. LMP")]
        public double _5_Minute_Weighted_Avg__LMP { get; set; }

        [JsonProperty("hourlyIntegratedLMP")]
        [Column("Hourly Integrated LMP")]
        public double Hourly_Integrated_LMP { get; set; }

        [JsonProperty("node_id")]
        [StringLength(50)]
        public string node_id { get; set; }

        [JsonProperty("timestamp")]
        public DateTime timestamp { get; set; }
    }
   
    public class lmpDataRow
    {
        [JsonProperty("timestamp")]
        [Column("timestamp", TypeName = "datetime")]
        public DateTime timestamp { get; set; }

        [JsonProperty("fiveMinuteAvgLMP")]
        [Column("5 Minute Weighted Avg. LMP")]
        public double Interval5MinLMP { get; set; }

        
    }
}

