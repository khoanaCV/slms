using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LeagueDTO
{
    public class TeamWithMostGoalsModel
    {
        public int TournamentID { get; set; }
        public int TeamID { get; set; }
        public string? Logo { get; set; }
        public string? TeamName { get; set; }
        public int? TotalGoalsScored { get; set; }
    }

}
