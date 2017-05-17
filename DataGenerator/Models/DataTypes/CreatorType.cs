using System;
using System.Collections.Generic;
using System.IO;
using DataGenerator.Models.DataClient;

namespace DataGenerator.Models.DataTypes
{
    public class CreatorType
    {
        public const string Path = "DataGenerator.Models.DataTypes.";
        public static List<DataType> CreateTypes(IEnumerable<DataUnit> dataUnits)
        {
            List<DataType> res = new List<DataType>();
            foreach (var item in dataUnits)
            {
                res.Add(Create(item));
            }
            return res;
        }

        private static DataType Create(DataUnit item)
        {
            object[] arg;
            if (item.Rule == "None")
                arg = new string[]{item.Title};
            else arg = new string[]{item.Title, item.Rule};
            return
                (DataType)Activator.CreateInstance(Type.GetType(Path + item.Type), 
                args: arg);
        }
    }
}