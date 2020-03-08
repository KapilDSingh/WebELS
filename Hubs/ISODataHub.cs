using Microsoft.AspNetCore.SignalR;
using WebELS.Repository;
using System.Threading.Tasks;
using WebELS.Models;
using System.Collections.Generic;
using QuickType;

namespace WebELS.Hubs
{
    public class ISODataHub : Hub
    {
        private ILMPRepository _LMPrepository;
        private ILoadRepository _Loadrepository;
        private IFuelTypeRepository _FuelTyperepository;
        private IElectricUseRepository _ElectricUseRepository;

        public ISODataHub(ILMPRepository LMPRepository, ILoadRepository LoadRepository, IFuelTypeRepository FuelTyperepository, IElectricUseRepository ElectricUseRepository)
        {
            _LMPrepository = LMPRepository;
            _Loadrepository = LoadRepository;
            _FuelTyperepository = FuelTyperepository;
            _ElectricUseRepository = ElectricUseRepository;
        }

        public async Task SendLMP(int n)
        {
            List<lmpTbl> data = _LMPrepository.GetLMP(n);
            await this.Clients.All.SendAsync("ReceiveLMP", data);
        }
        public async Task SendLoad(int n)
        {
            List<loadTbl> data = _Loadrepository.GetLoad(n);
            await this.Clients.All.SendAsync("ReceiveLoad", data);
        }
        public async Task SendGenmix(int n)
        {
            List<fuelTypeData> data = _FuelTyperepository.GetFuelType(n);
            await this.Clients.All.SendAsync("ReceiveGenmix", data);
        }

        public async Task SendMeterData(int n)
        {
            List<MeterData> data = _ElectricUseRepository.GetElectricUse(n);
            await this.Clients.All.SendAsync("ReceiveMeterData", data);
        }
    }
}