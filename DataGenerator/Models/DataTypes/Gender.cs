using System;
using System.Collections.Generic;
using DataGenerator.Models.Database;

namespace DataGenerator.Models.DataTypes
{
    public class Gender : DataType, IGenerate, IGenerateDb
    {
        private string value;
        public string Value {
            set
            {
                switch (value)
                {
                    case "Male":
                        this.value = "M";
                        break;
                    case "Female":
                        this.value = "F";
                        break;
                    default:
                        this.value = "Any";
                        break;
                }
            }
            get { return value; }
        }

        public Gender(string title, string value)
        {
            Title = title;
            Value = value;
            ElementList = new List<string>();
        }

        public void Generate(int number)
        {
            Random rnd = new Random();
            if (Value == "Any")
                for (int i = 0; i < number; i++)
                {
                    ElementList.Add(rnd.Next(0, 10) % 2 == 0 ? "M" : "F");
                }
            else
            {
                for (int i = 0; i < number; i++)
                {
                    ElementList.Add(Value);
                }
            }
        }

        public void GenerateDb(RequisitCollection reqcoll)
        {
            foreach (var item in reqcoll.Requisities)
            {
                ElementList.Add(item.Gender);
            }
        }
    }
}