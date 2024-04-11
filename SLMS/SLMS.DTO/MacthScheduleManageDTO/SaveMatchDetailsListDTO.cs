using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.MacthScheduleManageDTO
{
    public class SaveMatchDetailsListDTO
    {
        public int? TournamentId { get; set; }
        public List<SaveMatchDetailsDTO>? MatchDetailsList { get; set; }
    }
}
