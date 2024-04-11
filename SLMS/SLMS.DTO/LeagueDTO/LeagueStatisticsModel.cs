using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LeagueDTO
{

    public class LeagueStatisticsModel
    {
        public int? TotalAthletes { get; set; }
        public int? TotalGoals { get; set; }
        public int? TotalOwnGoals { get; set; }
        public int? TotalMatches { get; set; }
        public int? TotalYellowCards { get; set; }
        public int? TotalRedCards { get; set; }
        public int? TotalCards { get; set; }
        public double? AverageGoalsPerMatch { get; set; }
        public double? AverageCardsPerMatch { get; set; }
        public int? TotalHattricks { get; set; } //hattrick
        public int? TotalPokers { get; set; } //poker
        public int? TotalDoubleGoals { get; set; } //cú đúp
    }
}
