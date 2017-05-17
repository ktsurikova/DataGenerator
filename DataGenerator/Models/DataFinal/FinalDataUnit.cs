using System.Collections.Generic;

namespace DataGenerator.Models.DataFinal
{
    public class FinalDataUnit
    {
        public Dictionary<string, string> Properties { get; set; }

        public FinalDataUnit()
        {
            Properties = new Dictionary<string, string>();
        }

        public void SetProperty(string name, string value)
        {
            if (Properties.ContainsKey(name))
                Properties[name] = value;
            else
                Properties.Add(name, value);
        }

        //public override string ToString()
        //{
        //    string s = "";
        //    foreach (var item in Properties)
        //    {
        //        s += item.Key + item.Value;
        //    }
        //    return s;
        //}
    }
}