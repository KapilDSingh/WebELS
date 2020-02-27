using Microsoft.AspNetCore.SignalR;
using WebELS.Repository;
using System.Threading.Tasks;
using WebELS.Models;
using System.Collections.Generic;

namespace WebELS.Hubs
{
    public class ISODataHub : Hub
    {
        private  ILMPRepository _LMPrepository;
        private ILoadRepository _Loadrepository;
        private IFuelTypeRepository _FuelTyperepository;

        public ISODataHub(ILMPRepository LMPRepository, ILoadRepository LoadRepository, IFuelTypeRepository FuelTyperepository)
        {
            _LMPrepository = LMPRepository;
            _Loadrepository = LoadRepository;
            _FuelTyperepository = FuelTyperepository;
         
        }

        public async Task SendLMP(int n)
        {
           List<lmpTbl> data = _LMPrepository.GetLMP(n);
            await this.Clients.All.SendAsync("ReceiveLMP",data);
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
    }
}
