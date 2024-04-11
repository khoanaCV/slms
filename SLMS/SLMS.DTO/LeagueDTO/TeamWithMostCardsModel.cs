using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LeagueDTO
{
    public class TeamWithMostCardsModel
    {
        public int TeamID { get; set; }
        public string? TeamName { get; set; }
        public string? Logo { get; set; }
        public int? TotalCards { get; set; }
    }

}
