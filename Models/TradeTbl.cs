using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Models
{
    [Table("tradeTbl")]
    public partial class TradeTbl
    {
        public string Freq { get; set; }
        [Column("ISO")]
        public string Iso { get; set; }
        public string Market { get; set; }
        [Column("Net_Exports_MW")]
        public long? NetExportsMw { get; set; }
        [Key]
        [Column("timestamp", TypeName = "datetime")]
        public DateTime timestamp { get; set; }
    }
}
