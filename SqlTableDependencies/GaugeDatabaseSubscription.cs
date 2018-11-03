

#region Assembly TableDependency.SqlClient, Version=8.5.1.0, Culture=neutral, PublicKeyToken=null
// C:\Users\Kapil\.nuget\packages\sqltabledependency\8.5.1\lib\netcoreapp2.1\TableDependency.SqlClient.dll
#endregion

using Microsoft.AspNetCore.SignalR;
using WebELS.Hubs;
using WebELS.Models;
using WebELS.Repository;
using System;

using TableDependency.SqlClient;
using TableDependency.SqlClient.Base.EventArgs;
using TableDependency.SqlClient.Base.Enums;


namespace WebELS.SqlTableDependencies
{
    public class GaugeDatabaseSubscription : IDatabaseSubscription
    {
        private bool _disposedValue;
        private readonly IGaugeRepository _repository;
        private readonly IHubContext<GaugeHub> _hubContext;
        private SqlTableDependency<lmpTbl> _tableDependency;

        public GaugeDatabaseSubscription(IGaugeRepository repository, IHubContext<GaugeHub> hubContext)
        {
            _repository = repository;
            _hubContext = hubContext;
        }
        
        public void Configure(string connectionString)
        {
            
            _tableDependency = new SqlTableDependency<lmpTbl>(connectionString);
            _tableDependency.OnChanged += Changed;
            _tableDependency.OnError += TableDependency_OnError;
            _tableDependency.Start();

            Console.WriteLine("Waiting for receiving notifications...");
        }

        private void TableDependency_OnError(object sender, ErrorEventArgs e)
        {
            Console.WriteLine($"SqlTableDependency error: {e.Error.Message}");
        }

        private void Changed(object sender, RecordChangedEventArgs<lmpTbl> e)
        {
            if (e.ChangeType != ChangeType.None)
            {
                _hubContext.Clients.All.SendAsync("GetGaugesData", _repository.Gauge);
            }
        }

        #region IDisposable

        ~GaugeDatabaseSubscription()
        {
            Dispose(false);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    _tableDependency.Stop();
                }

                _disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
