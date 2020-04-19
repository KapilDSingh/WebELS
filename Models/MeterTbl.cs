using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace WebELS.Models
{
    public partial class MeterTbl
    {
        [JsonProperty("meterId")]
        [Required]
        [StringLength(50)]
        public string MeterId { get; set; }
        [JsonProperty("timestamp")]
        [Column("timestamp", TypeName = "datetime")]
        public DateTime timestamp { get; set; }

        [JsonProperty("rms_Watts_Tot")]
        [Column("RMS_Watts_Tot")]
        public double RMS_Watts_Tot { get; set; }
        //public double RevKWhTot { get; set; }
        //public double RmsVoltsLn1 { get; set; }
        //public double RmsVoltsLn2 { get; set; }
        //public double RmsVoltsLn3 { get; set; }
        //public double RmsWattsLn1 { get; set; }
        //public double RmsWattsLn2 { get; set; }
        //public double RmsWattsLn3 { get; set; }
    //    public double PowerFactorLn1 { get; set; }
    //    public double PowerFactorLn2 { get; set; }
    //    public double PowerFactorLn3 { get; set; }
  }
}
