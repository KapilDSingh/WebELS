
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebELS.Models;


namespace WebELS.Repository
{
    public class LoadRepository : ILoadRepository
    {
        private readonly Func<ISODBContext> _contextFactory;

        public List<loadTbl> _loadData;


        public List<loadTbl> LoadData
        {
            get
            {
                return this._loadData;
            }
            set => this._loadData = value;
        }


        public LoadRepository(Func<ISODBContext> context)
        {
            _contextFactory = context;
        }
    }

    public class FuelTypeRepository : IFuelTypeRepository
    {
        private readonly Func<ISODBContext> _contextFactory;

        public List<fuelTypeData> _fuelTypeData;


        public List<fuelTypeData> fuelTypeData
        {
            get
            {
                return this._fuelTypeData;
            }
            set => this._fuelTypeData = value;
        }


        public FuelTypeRepository(Func<ISODBContext> context)
        {
            _contextFactory = context;


        }
        public List<fuelTypeData> GetFuelType(int n)
        {
            using (var context = _contextFactory.Invoke())
            {
         
                List<fuelTypeData> fuelTypeData = context.fuelTypeData.FromSql("GenFuelPivot {0}", n).ToList();

                return fuelTypeData;

            }
        }

    }
    public class MeterRepository : IMeterRepository
    {
        private readonly Func<ISODBContext> _contextFactory;

        public List<MeterTbl> _meterData;
        public string _meterId;

        public void SetMeterId(string MeterId)
        {
            _meterId = MeterId;
        }
        public string MeterId
        {
            get
            {
                return this._meterId;
            }
            set => this._meterId = value;
        }

        public List<MeterTbl> MeterData
        {
            get
            {
                return this._meterData;
            }
            set => this._meterData = value;
        }


        public MeterRepository(Func<ISODBContext> context)
        {
            _contextFactory = context;


        }
        public List<MeterTbl> GetMeterData(int n, string MeterId)
        {
            using (var context = _contextFactory.Invoke())
            {
                MeterData = (from x in context.MeterTbl where x.MeterId == MeterId orderby x.timestamp descending select x).Take(n).ToList();
                MeterData.Reverse();


                return MeterData;

            }
        }

    }

}

