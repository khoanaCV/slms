using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LeagueDTO
{
    public class MatchWithMostCardsModel
    {
        public int MatchID { get; set; }
        public string? TournamentName { get; set; }
        public int TotalCards { get; set; }
        public DateTime MatchDate { get; set; }
        public int? GoalsTeam1 { get; set; }
        public int? GoalsTeam2 { get; set; }
        public int Team1ID { get; set; }
        public string? Team1Name { get; set; } // Thêm tên đội 1
        public int Team2ID { get; set; }
        public string? Team2Name { get; set; } // Thêm tên đội 2
    }

}
