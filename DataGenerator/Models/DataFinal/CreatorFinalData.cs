using System.Collections.Generic;
using System.Linq;
using DataGenerator.Models.DataTypes;

namespace DataGenerator.Models.DataFinal
{
    public class CreatorFinalData
    {
        public static List<FinalDataUnit> Create(IEnumerable<DataType> dataTypes, int number)
        {
            List<FinalDataUnit> resList = new List<FinalDataUnit>(number);

            for (int i = 0; i < number; i++)
            {
                resList.Add(new FinalDataUnit());
            }

            foreach (var item in dataTypes)
            {
                for (int i = 0; i < number ; i++)
                {
                    resList.ElementAt(i).SetProperty(item.Title, item.ElementList.ElementAt(i));
                }
            }

            return resList;
        }
    }
}