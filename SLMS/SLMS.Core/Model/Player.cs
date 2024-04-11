using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Player
    {
        public Player()
        {
            MatchEvents = new HashSet<MatchEvent>();
            PlayerMatchStatistics = new HashSet<PlayerMatchStatistic>();
            PlayersInLineups = new HashSet<PlayersInLineup>();
            TeamPlayers = new HashSet<TeamPlayer>();
            Votes = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public string? Avatar { get; set; }
        public string? Phone { get; set; }
        public string? Country { get; set; }
        public int? CitizenshipId { get; set; }
        public string? CitizenIdPhoto1 { get; set; }
        public string? CitizenIdPhoto2 { get; set; }
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Position { get; set; }
        public string? Height { get; set; }
        public string? ShirtNumber { get; set; }
        public string? PreferredFoot { get; set; }
        public string? Strengths { get; set; }
        public string? Weaknesses { get; set; }
        public string? Bio { get; set; }
        public string? Email { get; set; }
        public string? CompetitionName { get; set; }

        public virtual ICollection<MatchEvent> MatchEvents { get; set; }
        public virtual ICollection<PlayerMatchStatistic> PlayerMatchStatistics { get; set; }
        public virtual ICollection<PlayersInLineup> PlayersInLineups { get; set; }
        public virtual ICollection<TeamPlayer> TeamPlayers { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
