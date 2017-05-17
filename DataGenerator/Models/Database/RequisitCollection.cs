using System.Collections.Generic;

namespace DataGenerator.Models.Database
{
    public class RequisitCollection
    {
        public List<Requisit> Requisities { set; get; }

        public static IComparer<Requisit> SortRandom => (IComparer<Requisit>)new RequisitComparer();

        public void Sort() => Requisities.Sort(SortRandom);
    }
}