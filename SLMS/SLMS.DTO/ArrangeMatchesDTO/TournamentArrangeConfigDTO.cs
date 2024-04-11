using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.ArrangeMatchesDTO
{
    public class TournamentArrangeConfigDTO
    {
        public int? NumberOfTeams { get; set; } //x teams
        public int? NumberOfGroups { get; set; } //y groups
        public int? NumberOfTeamsAdvancing { get; set; } //z qualified_teams
        public int? RoundRobinRounds { get; set; } //numberOfTurns in model // k rounds
        public int? NumberOfRoundsInRoundRobinFormat { get; set; } //numberOfRounds in model
        public int? NumberOfMatches { get; set; } //
        // ... Other configuration properties
    }
}
