

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
    public class ISODBSubscription: IISODBSubscription
    {

        private bool _disposedValue;

        private readonly IHubContext<ISODataHub> _hubContext;
        
        private  ILMPRepository _LMPrepository;
        private  SqlTableDependency<lmpTbl> _LMPtableDependency;


        public ISODBSubscription(ILMPRepository repository, IHubContext<ISODataHub> hubContext)
        {
            _LMPrepository = repository;
            _hubContext = hubContext;
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
                List<lmpTbl> data = new List<lmpTbl>();

                data.Add(e.Entity);
                // _LMPrepository.LMPdata = _LMPrepository.GetLMP(1);
                _hubContext.Clients.All.SendAsync("ReceiveLMP", data);

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
