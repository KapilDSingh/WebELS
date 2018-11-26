using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebELS.Model
{
    public partial class loadTbl
    {
        [StringLength(50)]
        public string Area { get; set; }
        [Column("Instantaneous Load")]
        public int Instantaneous_Load { get; set; }
        public DateTime timestamp { get; set; }
        public int load { get; set; }
    }
}
