using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LeagueDTO
{
    public class PlayerGoalsModel
    {
        public int PlayerID { get; set; }
        public string? PlayerName { get; set; }
        public string? NumberPlayer { get; set; }
        public string? PlayerLogo { get; set; }
        public string? TeamLogo { get; set; }
        public int? GoalsScored { get; set; }
    }

}
