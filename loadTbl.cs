using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Models
{
    public partial class loadTbl
    {
        [StringLength(50)]
        public string Area { get; set; }
        [Column("Instantaneous Load")]
        public long Instantaneous_Load { get; set; }
        public DateTime timestamp { get; set; }
        [Column("Load")]
        public long load { get; set; }
    }
}
