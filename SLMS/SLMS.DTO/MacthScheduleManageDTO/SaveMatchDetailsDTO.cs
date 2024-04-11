using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.MacthScheduleManageDTO
{
    public class SaveMatchDetailsDTO
    {
        public int? MatchId { get; set; }
        public int? TournamentId { get; set; }
        public int? Team1Id { get; set; }
        public int? Team2Id { get; set; }
        public DateTime? MatchDate { get; set; }
        public int? VenueId { get; set; }
    }
}
