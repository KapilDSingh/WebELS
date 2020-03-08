using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QuickType;
using WebELS.Hubs;
using WebELS.Models;

namespace WebELS.Repository
{
    public class MeterDataService : IHostedService, IDisposable
    {
        private readonly IHubContext<ISODataHub> _hubContext;
        private readonly ILogger<MeterDataService> _logger;

        private readonly IElectricUseRepository _ElectricUseRepository;

        private int executionCount;

        private Timer _timer;

        public List<MeterData> _ElectricData { get; private set; }

        public MeterDataService(IHubContext<ISODataHub> hubContext, ILogger<MeterDataService> logger, IElectricUseRepository ElectricUseRepository)
        {
            _hubContext = hubContext;
            _logger = logger;
            _ElectricUseRepository = ElectricUseRepository;
        }
        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            GetMeterCache();

            _timer = new Timer(ReadMeter, null, TimeSpan.FromSeconds(60),
                TimeSpan.FromSeconds(60));

            return Task.CompletedTask;
        }
        private async void GetMeterCache()
        {
            await _ElectricUseRepository.FetchElectricUse(1024);

        }

        private async void ReadMeter(object state)
        {
            var count = Interlocked.Increment(ref executionCount);

            _ElectricData = await _ElectricUseRepository.FetchElectricUse(1);



            _logger.LogInformation(
                "Timed Hosted Service is working. Count: {Count}", count);

            _ = _hubContext.Clients.All.SendAsync("ReceiveMeterData", _ElectricData);
        }
        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}



