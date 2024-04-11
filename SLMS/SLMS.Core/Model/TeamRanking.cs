using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class TeamRanking
    {
        public int Id { get; set; }
        public int? TeamId { get; set; }
        public int? TournamentId { get; set; }
        public int? GroupStageId { get; set; }
        public int? KnockOutStageId { get; set; }
        public int? PlayedMatch { get; set; }
        public int? Wins { get; set; }
        public int? Draws { get; set; }
        public int? Losses { get; set; }
        public int? Points { get; set; }
        public int? TotalGoalsScored { get; set; }
        public int? TotalGoalsConceded { get; set; }
        public int? RedCards { get; set; }
        public int? YellowCards { get; set; }

        public virtual GroupStage? GroupStage { get; set; }
        public virtual KnockoutStage? KnockOutStage { get; set; }
        public virtual Team? Team { get; set; }
        public virtual Tournament? Tournament { get; set; }
    }
}
