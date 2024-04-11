using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.MacthScheduleManageDTO
{
    public class MatchScheduleDTO
    {
        public int? MatchId { get; set; }
        public int? TournamentId { get; set; }
        public string? Team1Name { get; set; }
        public string? Team2Name { get; set; }
        public DateTime? MatchDate { get; set; }
        public string? VenueName { get; set; }
    }
}
