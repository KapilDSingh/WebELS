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

        public ISODataHub(ILMPRepository repository)
        {
            _LMPrepository = repository;
        }

        public async Task SendLMP(int n)
        {
           List<lmpTbl> data = _LMPrepository.GetLMP(n);
            await this.Clients.All.SendAsync("ReceiveLMP",data);
        }
    }
}
