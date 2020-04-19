

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
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TableDependency.SqlClient.Base;
using System.Linq.Expressions;
using TableDependency.SqlClient.Base.Abstracts;
using TableDependency.SqlClient.Where;
using System.Collections.Generic;


namespace WebELS.SqlTableDependencies
{
    public class ISODBSubscription : IISODBSubscription
    {

        private bool _disposedValue;

        private readonly IHubContext<ISODataHub> _hubContext;

        private ILMPRepository _LMPrepository;
        private ILoadRepository _Loadrepository;
        private IFuelTypeRepository _FuelTypeRepository;
        private IMeterRepository _MeterRepository;

        private SqlTableDependency<GenFuelTbl> _GenFueltableDependency;
        private SqlTableDependency<lmpTbl> _LMPtableDependency;

        private SqlTableDependency<loadTbl> _LoadTableDependency;

        private SqlTableDependency<MeterTbl> _MeterTableDependency;


        public ISODBSubscription(ILMPRepository repository, ILoadRepository loadRepository, IFuelTypeRepository FuelTypeRepository, 
            IMeterRepository MeterRepository,  IHubContext<ISODataHub> hubContext)
        {
            _LMPrepository = repository;
            _hubContext = hubContext;
            _Loadrepository = loadRepository;
            _FuelTypeRepository = FuelTypeRepository;
            _MeterRepository = MeterRepository;
        }

        public void Configure(string ConnectionString)
        {
            // Define WHERE filter specifing the WHERE condition
            // We also pass the mapper defined above as last contructor's parameter
            Expression<Func<lmpTbl, bool>> expression = p =>
                p.node_id  == "PSEG" ;

            ITableDependencyFilter whereCondition = new SqlTableDependencyFilter<lmpTbl>(
                expression);

            _LMPtableDependency = new SqlTableDependency<lmpTbl>(ConnectionString,
                filter: whereCondition, executeUserPermissionCheck:false);
                _LMPtableDependency.OnChanged += Changed;
                _LMPtableDependency.OnError += TableDependency_OnError;
                _LMPtableDependency.Start();

            // Define WHERE filter specifing the WHERE condition

            Expression<Func<loadTbl, bool>> Loadexpression = p =>
                p.Area == "PJM RTO";

            ITableDependencyFilter whereLoadCondition = new SqlTableDependencyFilter<loadTbl>(
                Loadexpression);


            _LoadTableDependency = new SqlTableDependency<loadTbl>(ConnectionString,
                filter: whereLoadCondition, executeUserPermissionCheck: false);
            _LoadTableDependency.OnChanged += LoadChanged;
            _LoadTableDependency.OnError += TableDependency_OnError;
            _LoadTableDependency.Start();


            _GenFueltableDependency = new SqlTableDependency<GenFuelTbl>(ConnectionString,
                executeUserPermissionCheck: false);
            _GenFueltableDependency.OnChanged += GenFueltableDependency;
            _GenFueltableDependency.OnError += TableDependency_OnError;
            _GenFueltableDependency.Start();

            
            _MeterTableDependency = new SqlTableDependency<MeterTbl>(ConnectionString,
                 executeUserPermissionCheck: false);
            _MeterTableDependency.OnChanged += MeterChanged;
            _MeterTableDependency.OnError += TableDependency_OnError;
            _MeterTableDependency.Start();

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
                lmpDataRow lmpData = new lmpDataRow();
                lmpData.timestamp = e.Entity.timestamp;
                lmpData.Interval5MinLMP= e.Entity._5_Minute_Weighted_Avg__LMP;

                _hubContext.Clients.All.SendAsync("ReceiveLMP", lmpData);
            }
        }
        private void LoadChanged(object sender, RecordChangedEventArgs<loadTbl> e)
        {
            if (e.ChangeType != ChangeType.None)
            {
                
                loadTblRow loadData = new loadTblRow();
                loadData.timestamp = e.Entity.timestamp;
                loadData.Instantaneous_Load = e.Entity.Instantaneous_Load; ;

                _hubContext.Clients.All.SendAsync("ReceiveLoad", loadData);
            }
        }

        private void GenFueltableDependency(object sender, RecordChangedEventArgs<GenFuelTbl> e)
        {
            if (e.ChangeType != ChangeType.None)
            {
                List<fuelTypeData> data = new List<fuelTypeData>();
                data = _FuelTypeRepository.GetFuelType(1);

                _hubContext.Clients.All.SendAsync("ReceiveGenmix", data[0]);
            }
        }
        private void MeterChanged(object sender, RecordChangedEventArgs<MeterTbl> e)
        {
            if (e.ChangeType != ChangeType.None)
            {
               MeterTbl meterData = new MeterTbl();

                meterData.MeterId = e.Entity.MeterId;
                meterData.timestamp = e.Entity.timestamp;
                meterData.RMS_Watts_Tot = e.Entity.RMS_Watts_Tot;

                _hubContext.Clients.All.SendAsync("ReceiveMeterKWData", meterData);

            }
        }
        #region IDisposable

        ~ISODBSubscription()

        {
            Dispose(false);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposedValue)
            {
                if (disposing)
                {
                    _LMPtableDependency.Stop();
                    _LoadTableDependency.Stop();
                    _GenFueltableDependency.Stop();
                    _MeterTableDependency.Stop();
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
