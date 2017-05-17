using System.Collections.Generic;

namespace DataGenerator.Models.DataTypes
{
    public class DefineIfContains
    {
        public static bool Gender(IEnumerable<DataType> dataTypes) {
            foreach (var item in dataTypes)
            {
                if (item is Gender) return true;
            }
            return false;
        }

        public static bool Name (IEnumerable<DataType> dataTypes)
        {
            foreach (var item in dataTypes)
            {
                if (item is Name) return true;
            }
            return false;
        }

        public static bool Surname(IEnumerable<DataType> dataTypes)
        {
            foreach (var item in dataTypes)
            {
                if (item is Surname) return true;
            }
            return false;
        }

        public static bool Email(IEnumerable<DataType> dataTypes)
        {
            foreach (var item in dataTypes)
            {
                if (item is Email) return true;
            }
            return false;
        }
    }
}