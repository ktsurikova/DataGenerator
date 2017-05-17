using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using DataGenerator.Models.Database;
using DataGenerator.Models.DataTypes;

namespace DataGenerator.Models
{
    public class Generator
    {
        public static async Task Generate(IEnumerable<DataType> dataTypes, int numberOfRows) {

            if (DefineIfContains.Name(dataTypes) || DefineIfContains.Surname(dataTypes)
        || DefineIfContains.Email(dataTypes))
                await GenerateWithDb(dataTypes, numberOfRows);
            else GenerateWithoutDb(dataTypes, numberOfRows);
        }



        private static async Task GenerateWithDb(IEnumerable<DataType> dataTypes, int numberOfRows)
        {
            RequisitCollection reqcoll = new RequisitCollection();

            if (DefineIfContains.Gender(dataTypes))
                foreach (var item in dataTypes)
                {
                    if (item is Gender)
                    {
                        if (((Gender) item).Value != "Any")
                        {
                            reqcoll.Requisities = await RequisitRepository.GetByGender(numberOfRows,
                                ((Gender) item).Value);
                        }
                        else
                        {
                            reqcoll.Requisities = await RequisitRepository.GetAll(numberOfRows);
                        }
                        break;
                    }
                }
            else reqcoll.Requisities = await RequisitRepository.GetAll(numberOfRows);

            reqcoll.Sort();

            foreach (var item in dataTypes)
            {
                if (item is IGenerateDb)
                    (item as IGenerateDb).GenerateDb(reqcoll);
                else (item as IGenerate).Generate(numberOfRows);
            }
        }

        private static void GenerateWithoutDb(IEnumerable<DataType> list, int numberOfRows)
        {
            foreach (var item in list)
            {
                var generate = item as IGenerate;
                generate?.Generate(numberOfRows);
            }
        }
    }
}