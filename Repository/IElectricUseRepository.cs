using QuickType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebELS.Repository
{
    public interface IElectricUseRepository
    {
        List<MeterData> ElectricData { get; set; }
        Task<List<MeterData>> FetchElectricUse(int numReads);
        List<MeterData> GetElectricUse(int numReads);
    }
}
