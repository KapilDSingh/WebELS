using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebELS.Models;

namespace WebELS.Repository
{
    public class LMPRepository : ILMPRepository
    {
        private readonly Func<ISODBContext> _contextFactory;

        public List<lmpTbl> _LMPdata;

        public List<lmpTbl> LMPdata
        {
            get
            {
                return this._LMPdata;
            }
            set => this._LMPdata = value;
        }
        public LMPRepository(Func<ISODBContext> context)
        {
            _contextFactory = context;


        }
    }
}
