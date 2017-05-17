using System.Collections.Generic;

namespace DataGenerator.Models.DataTypes
{
    public abstract class DataType
    {
        public string Title { set; get; }
        public List<string> ElementList { set; get; }
    }
}