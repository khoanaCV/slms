using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.MacthReportsDTO
{
    public class PartOneDTO
    {
        public int? MatchId { get; set; }
        public int? FirstHalfExtraTime { get; set; }
        public int? SecondHalfExtraTime { get; set; }
        public int? Team1Id { get; set; }
        public int? Team2Id { get; set; }
        public int? GoalsTeam1 { get; set; }
        public int? GoalsTeam2 { get; set; }
        public int? SubGoalsTeam1 { get; set; }
        public int? SubGoalsTeam2 { get; set; }
        public int? YellowCardsTeam1 { get; set; }
        public int? RedCardsTeam1 { get; set; }
        public int? YellowCardsTeam2 { get; set; }
        public int? RedCardsTeam2 { get; set; }
        public string? MainReferee { get; set; }
        public string? ReportCreatorName { get; set; }
    }
}
