using System;
using System.Collections.Generic;
using System.Threading;
using DataGenerator.Models.Database;

namespace DataGenerator.Models.DataTypes
{
    public class Name : DataType, IGenerateDb
    {

        public Name()
        {
            ElementList = new List<string>();   
        }

        public Name( string title)
        {
            Title = title;
            ElementList = new List<string>();
        }

        public void GenerateDb(RequisitCollection reqcoll)
        {
            foreach (var item in reqcoll.Requisities)
            {
                ElementList.Add(item.FirstName);
            }
        }
    }
}