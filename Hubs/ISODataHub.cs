using Microsoft.AspNetCore.SignalR;
using WebELS.Repository;
using System.Threading.Tasks;
using WebELS.Models;
using System.Collections.Generic;

namespace WebELS.Hubs
{
    public class ISODataHub : Hub
    {
        private ILMPRepository _LMPrepository;
        private ILoadRepository _Loadrepository;
        private IFuelTypeRepository _FuelTyperepository;
        private IMeterRepository _MeterRepository;

        public ISODataHub(ILMPRepository LMPRepository, ILoadRepository LoadRepository, IFuelTypeRepository FuelTyperepository, IMeterRepository MeterRepository)
        {
            _LMPrepository = LMPRepository;
            _Loadrepository = LoadRepository;
            _FuelTyperepository = FuelTyperepository;
             _MeterRepository = MeterRepository;
        }
    }
}