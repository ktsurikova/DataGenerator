using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DataGenerator.Models.Database
{
    public class RequisitRepository
    {
        public static async Task<List<Requisit>> GetAll(int number) {

            var client = new MongoClient();
            var db = client.GetDatabase("data_for_generator");
            var coll = db.GetCollection<Requisit>("requisites");
            var filter = new BsonDocument();
            Random rnd = new Random();
            return await coll.Find(filter).Skip(rnd.Next(0,498-number)).Limit(number).ToListAsync();

        }

        public static async Task<List<Requisit>> GetByGender(int number, string gender)
        {

            var client = new MongoClient();
            var db = client.GetDatabase("data_for_generator");
            var coll = db.GetCollection<Requisit>("requisites");
            Random rnd = new Random();
            if (number < 200)
            {
                return await coll.Find(b => b.Gender == gender)
                    .Skip(rnd.Next(0, 250 - number))
                    .Limit(number)
                    .ToListAsync();
            }
            else
            {
                return await coll.Find(b => b.Gender == gender)
                    .Limit(number)
                    .ToListAsync();
            }

        }
    }
}