using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Models
{
    [Table("loadTbl")]
    public partial class loadTbl
    {
        [StringLength(50)]
        public string Area { get; set; }
        [Column("Instantaneous Load")]
        public long Instantaneous_Load { get; set; }
        [Column("timestamp", TypeName = "datetime")]
        public DateTime timestamp { get; set; }
    }
    public partial class loadTblRow
    {
        [JsonProperty("timestamp")]
        [Column("timestamp", TypeName = "datetime")]
        public DateTime timestamp { get; set; }

        [JsonProperty("instantaneous_Load")]
        [Column("Instantaneous Load")]
        public long Instantaneous_Load { get; set; }
    }
}
