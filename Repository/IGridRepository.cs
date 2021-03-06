﻿using System.Collections.Generic;
using WebELS.Models;

namespace WebELS.Repository
{
    
    public interface ILoadRepository
    {
        List<loadTbl> LoadData { get; set; }
    }

    public interface IFuelTypeRepository
    {
        List<fuelTypeData> fuelTypeData { get; set; }
        List<fuelTypeData> GetFuelType(int n);
    }
    public interface IMeterRepository
    {
        List<MeterTbl> MeterData { get; set; }
    }
}
