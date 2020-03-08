using QuickType;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Net.Http;
using System.Threading;


using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using WebELS.Hubs;
using WebELS.Models;

namespace WebELS.Repository
{
    public class ElectricUseRepository : IElectricUseRepository
    {
        private List<MeterData> _ElectricData = new List<MeterData>();
      
        public List<MeterData> ElectricData
        {
            get
            {
                return this._ElectricData;
            }
            set => this._ElectricData = value;
        }
        public ElectricUseRepository()
        {
          
        }
        public async Task<List<MeterData>> FetchElectricUse(int numReads)
        {
            var client = new HttpClient();

            var response = await client.GetAsync("https://io.ekmpush.com/readMeter?key=NjUyMzc0MjQ6Z3NaVmhEd20&meters=550001081&ver=v4&fmt=json&cnt=" + numReads + "&tz=America~New_York&fields=kWh_Tot~RMS_Volts_Ln_1~RMS_Volts_Ln_2~RMS_Volts_Ln_3~Amps_Ln_1~Amps_Ln_2~Amps_Ln_3");
            Console.WriteLine(response.StatusCode);
            response.EnsureSuccessStatusCode();

            string content = await response.Content.ReadAsStringAsync();
            MeterRead meterRead = MeterRead.FromJson(content);
            ElectricData.AddRange(meterRead.ReadMeter.ReadSet[0].ReadData.ToList<MeterData>());


            return ElectricData;

        }
        public List<MeterData> GetElectricUse(int numReads)
        {
            List<MeterData> meterReads = ElectricData.GetRange(ElectricData.Count - numReads, numReads);
            return meterReads;
        }

    }

 
}

