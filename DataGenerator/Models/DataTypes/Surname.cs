using System;
using System.Collections.Generic;
using DataGenerator.Models.Database;

namespace DataGenerator.Models.DataTypes
{
    public class Surname : DataType, IGenerateDb
    {

        public Surname(string title)
        {
            Title = title;
            ElementList = new List<string>();
        }

        public void GenerateDb(RequisitCollection reqcoll)
        {
            foreach (var item in reqcoll.Requisities)
            {
                ElementList.Add(item.LastName);
            }
        }
    }
}