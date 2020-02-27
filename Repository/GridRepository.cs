﻿
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
        public List<loadTbl> GetLoad(int n)
        {
            using (var context = _contextFactory.Invoke())
            {
                LoadData = (from x in context.loadTbl where x.Area == "PJM RTO"  orderby x.timestamp descending select x).Take(n).ToList();
                LoadData.Reverse();


                return LoadData;

            }
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

                fuelTypeData.Reverse();
                return fuelTypeData;

            }
        }

    }

}
