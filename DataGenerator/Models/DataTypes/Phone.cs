using System;
using System.Collections.Generic;
using System.Text;

namespace DataGenerator.Models.DataTypes
{
    public class Phone : DataType, IGenerate
    {
        public string Type { set; get; }

        public Phone(string title, string rule)
        {
            Title = title;
            Type = rule;
            ElementList = new List<string>();
        }

        public void Generate(int number)
        {
            if (Type == "Mobile") GenerateMobile(number);
            else GenerateLandline(number);
        }

        private void GenerateMobile(int number)
        {
            Random rnd = new Random();
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < number; i++)
            {
                sb.AppendFormat("+1 201-{0}-{1}", rnd.Next(100, 999),
                    rnd.Next(1000, 9999));

                ElementList.Add(sb.ToString());

                sb.Clear();
            }
        }

        private void GenerateLandline(int number)
        {
            Random rnd = new Random();
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < number; i++)
            {
                sb.AppendFormat("{0}-{1}-{2}", rnd.Next(201, 210),
                    rnd.Next(100, 999), rnd.Next(1000, 9999));

                ElementList.Add(sb.ToString());

                sb.Clear();
            }
        }
    }
}