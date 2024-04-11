using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.ArrangeMatchesDTO
{
    public class TournamentConfigDto
    {
        public int NumberOfTeams { get; set; }
        public int NumberOfGroups { get; set; }
        public int NumberOfTeamsAdvancing { get; set; }
        public int RoundRobinRounds { get; set; }
        // ... Other configuration properties
    }

    public class TeamDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        // ... Other team properties
    }

    public class TournamentDetailsDto
    {
        public TournamentConfigDto Config { get; set; }
        public List<TeamDto> Teams { get; set; }
    }
}
