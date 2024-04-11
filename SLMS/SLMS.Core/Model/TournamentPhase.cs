using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class TournamentPhase
    {
        public TournamentPhase()
        {
            GroupStages = new HashSet<GroupStage>();
            KnockoutStages = new HashSet<KnockoutStage>();
            Matches = new HashSet<Match>();
        }

        public int Id { get; set; }
        public string? PhaseName { get; set; }
        public string? PhaseDescription { get; set; }

        public virtual ICollection<GroupStage> GroupStages { get; set; }
        public virtual ICollection<KnockoutStage> KnockoutStages { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
    }
}
