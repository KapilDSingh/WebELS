using System.Collections.Generic;
using WebELS.Models;

namespace WebELS.Repository
{
    public interface ILMPRepository
    {
        List<lmpTbl> LMPdata { get; set; }
    }
}