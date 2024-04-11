using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class GroupStage
    {
        public GroupStage()
        {
            Matches = new HashSet<Match>();
            TeamRankings = new HashSet<TeamRanking>();
        }

        public int Id { get; set; }
        public int? TournamentId { get; set; }
        public int? PhaseId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual TournamentPhase? Phase { get; set; }
        public virtual Tournament? Tournament { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        public virtual ICollection<TeamRanking> TeamRankings { get; set; }
    }
}
