using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.MacthScheduleManageDTO
{
    public class UpdateMatchDetailsListDTO
    {
        public int? TournamentId { get; set; }
        public List<UpdateMatchDetailsDTO>? MatchDetailsList { get; set; }
    }

}
