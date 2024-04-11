using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.TeamDTO
{
    public class TeamStatisticsDTO
    {
        public int TotalMatchesPlayed { get; set; }
        public int TotalWins { get; set; }
        public int TotalDraws { get; set; }
        public int TotalLosses { get; set; }
        public int TotalGoalsFor { get; set; }
        public int TotalGoalsAgainst { get; set; }
        public int TotalYellowCards { get; set; }
        public int TotalRedCards { get; set; }
    }
}