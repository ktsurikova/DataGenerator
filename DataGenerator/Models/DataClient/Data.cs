using System.Collections.Generic;

namespace DataGenerator.Models.DataClient
{
    public class Data
    {
        public List<DataUnit> DataUnits { set; get; }
        public int NumberOfRows { set; get; }
    }
}