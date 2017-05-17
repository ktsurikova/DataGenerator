using System;
using System.Collections.Generic;

namespace DataGenerator.Models.DataTypes
{
    public class Age : DataType, IGenerate
    {
        public int From { set; get; }
        public int To { set; get; }

        public Age( string title, string rule)
        {
            Title = title;
            if (rule == "Any")
            {
                From = 1;
                To = 100;
            }
            else if (rule.StartsWith("<"))
            {
                From = 1;
                To = 21;
                //To = Convert.ToInt32(rule.Substring(1));
            }
            else if (rule.StartsWith(">"))
            {
                //From = Convert.ToInt32(rule.Substring(1));
                From = 65;
                To = 100;
            }
            else
            {
                From = 21;
                To = 65;
                //From = Convert.ToInt32(rule.Substring(0,2));
                //To = Convert.ToInt32(rule.Substring(3));
            }
            ElementList = new List<string>();
        }

        public void Generate(int number)
        {
            Random rnd = new Random();
            for (int i = 0; i < number; i++)
            {
                ElementList.Add(rnd.Next(From, To).ToString());
            }
        }
    }
}