using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataGenerator.Models;
using DataGenerator.Models.DataTypes;
using System.Threading.Tasks;
using DataGenerator.Models.DataClient;
using DataGenerator.Models.DataFinal;
using System.Web.Helpers;
using Newtonsoft.Json.Linq;

namespace DataGenerator.Controllers
{
    public class ValuesController : ApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> GenerateData([FromBody] Data data)
        {
            List<DataType> list = CreatorType.CreateTypes(data.DataUnits);

            await Generator.Generate(list, data.NumberOfRows);

            List<FinalDataUnit> finallist = CreatorFinalData.Create(list, data.NumberOfRows);

            return Json(finallist);

        }
    }
}
