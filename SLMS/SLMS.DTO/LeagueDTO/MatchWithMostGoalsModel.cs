using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LeagueDTO
{
    public class MatchWithMostGoalsModel
    {

        public int MatchID { get; set; }
        public DateTime? StartDate { get; set; }
        public int? VenueID { get; set; }
        public string? Team1Name { get; set; }
        public string? Team2Name { get; set; }
        public int? GoalsTeam1 { get; set; }
        public int? GoalsTeam2 { get; set; }
        public int? TotalGoals { get; set; }
    }

}
