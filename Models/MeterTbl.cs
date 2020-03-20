using System;
using System.Collections.Generic;

namespace WebELS.Models
{
    public partial class MeterTbl
    {
        public string MeterId { get; set; }
        public DateTime Timestamp { get; set; }
        public double KWhTot { get; set; }
        public double RevKWhTot { get; set; }
        public double RmsVoltsLn1 { get; set; }
        public double RmsVoltsLn2 { get; set; }
        public double RmsVoltsLn3 { get; set; }
        public double RmsWattsLn1 { get; set; }
        public double RmsWattsLn2 { get; set; }
        public double RmsWattsLn3 { get; set; }
        public double PowerFactorLn1 { get; set; }
        public double PowerFactorLn2 { get; set; }
        public double PowerFactorLn3 { get; set; }
    }
}
