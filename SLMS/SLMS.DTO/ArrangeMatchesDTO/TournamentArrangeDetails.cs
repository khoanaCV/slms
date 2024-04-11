using SLMS.DTO.AdminDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.ArrangeMatchesDTO
{
    public class TournamentArrangeDetails
    {
        public TournamentArrangeConfigDTO? Config { get; set; }
        public List<TeamArrangeMatches>? Teams { get; set; }
    }
}
