using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.ArrangeMatchesDTO
{
    public class SaveMatchPairingsDTO
    {
        public int? TournamentId { get; set; }
        public List<MatchPairingDTO>? Pairings { get; set; }
    }
}
