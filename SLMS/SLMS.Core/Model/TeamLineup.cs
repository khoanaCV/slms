using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class TeamLineup
    {
        public TeamLineup()
        {
            PlayersInLineups = new HashSet<PlayersInLineup>();
        }

        public int Id { get; set; }
        public int? MatchId { get; set; }
        public int? TeamId { get; set; }
        public int? NumberOfPlayers { get; set; }
        public string? Formation { get; set; }
        public DateTime? DateCreated { get; set; }
        public string? LinkPathSaveDiagram { get; set; }
        public string? IsPublic { get; set; }
        public string? NameLineUp { get; set; }

        public virtual Match? Match { get; set; }
        public virtual Team? Team { get; set; }
        public virtual ICollection<PlayersInLineup> PlayersInLineups { get; set; }
    }
}
