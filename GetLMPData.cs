using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Linq;

namespace WebELS.Models
{
    public class ISOData
    {
        private readonly ISODBContext _ISOcontext;

        public ISOData(ISODBContext ISOcontext)
        {
            _ISOcontext = ISOcontext;
        }

        public void GetLMP()
        {
            using (var context = _ISOcontext)
            {
                lmpTbl lmp =  context.lmpTbl.FirstOrDefault();
            }
        }

    }
}
