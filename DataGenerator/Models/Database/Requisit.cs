﻿using MongoDB.Bson;

namespace DataGenerator.Models.Database
{
    public class Requisit
    {
        public ObjectId Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
    }
}