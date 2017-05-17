using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataGenerator.Models.Database;

namespace DataGenerator.Models.DataTypes
{
    interface IGenerateDb
    {
        void GenerateDb(RequisitCollection reqcoll);
    }
}
