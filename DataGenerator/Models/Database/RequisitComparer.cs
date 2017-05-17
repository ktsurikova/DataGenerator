using System;
using System.Collections.Generic;

namespace DataGenerator.Models.Database
{
    public class RequisitComparer : IComparer<Requisit>
    {
        private Random rnd = new Random();

        int IComparer<Requisit>.Compare(Requisit r1, Requisit r2)
        {
            return rnd.Next(-1, 1);
        }
    }
}