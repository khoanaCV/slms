using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.ArrangeMatchesDTO
{
    public class MatchPairingDTO
    {
        public int? Team1Id { get; set; }
        public string? Team1Name { get; set; }
        public string? Team1Logo{ get; set; }
        public int? Team2Id { get; set; }
        public string? Team2Name { get; set; }
        public string? Team2Logo { get; set; }
        public int? PhaseId { get; set; }
        public int? GroupStageId { get; set; }
        public int? KnockOutStageId { get; set; }
        public int? RoundRobinId { get; set; }
    }
}
