using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.PrizesDTO
{
    public class PlayerPrizesDTO
    {
        public int? PlayerId { get; set; }
        public string? PlayerName { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public int? StatisticCount { get; set; }
    }
}
