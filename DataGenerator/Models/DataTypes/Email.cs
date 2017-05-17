using System;
using System.Collections.Generic;
using System.Text;
using DataGenerator.Models.Database;

namespace DataGenerator.Models.DataTypes
{
    public class Email : DataType, IGenerateDb
    {

        public Email(string title)
        {
            Title = title;
            ElementList = new List<string>();
        }

        public void GenerateDb(RequisitCollection reqcoll)
        {
            Random rnd = new Random();
            StringBuilder sb = new StringBuilder();

            foreach (var item in reqcoll.Requisities)
            {
                sb.Append(item.FirstName, 0, item.FirstName.Length / 2);
                sb.Append(item.LastName, 0, item.LastName.Length / 2);
                sb.AppendFormat("{0}@gmail.com", rnd.Next(101, 999));

                ElementList.Add(sb.ToString());

                sb.Clear();
            }
        }
    }
}