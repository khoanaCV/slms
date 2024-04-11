using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LineUpDTO
{
    public class TeamLineUpDTO
    {
        public int? TeamId { get; set; }
        public int? MatchId { get; set; }
        public string? Formation { get; set; }
        public int? NumberOfPlayers { get; set; }
        public DateTime? DateCreated { get; set; }
        public string? LinkPathSaveDiagram { get; set; }
        public string? IsPublic { get; set; }
        public string? NameLineUp { get; set; }
        public List<PlayerInLineupDTO>? Players { get; set; }
    }

    public class PlayerInLineupDTO
    {
        public int? PlayerId { get; set; }
        public string? Name { get; set; }
        public string? CompetitionName { get; set; }
        public string? Position { get; set; }
        public string? StartOrSub { get; set; } // "Start" for starting player, "Sub" for substitute
        public string? X { get; set; }
        public string? Y { get; set; }
    }

}
