using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Match
    {
        public Match()
        {
            MatchEvents = new HashSet<MatchEvent>();
            MatchHighlights = new HashSet<MatchHighlight>();
            MatchStatistics = new HashSet<MatchStatistic>();
            PlayerMatchStatistics = new HashSet<PlayerMatchStatistic>();
            TeamLineups = new HashSet<TeamLineup>();
        }

        public int Id { get; set; }
        public int? TournamentId { get; set; }
        public int? Team1Id { get; set; }
        public int? Team2Id { get; set; }
        public DateTime? MatchDate { get; set; }
        public DateTime? StartTime { get; set; }
        public int? VenueId { get; set; }
        public int? PhaseId { get; set; }
        public int? GroupStageId { get; set; }
        public int? KnockOutStageId { get; set; }
        public int? RoundRobinId { get; set; }
        public string? ReportCreatorName { get; set; }
        public string? StoredReportUrl { get; set; }
        public string? CurrentStatus { get; set; }
        public string? MainReferee { get; set; }

        public virtual GroupStage? GroupStage { get; set; }
        public virtual KnockoutStage? KnockOutStage { get; set; }
        public virtual TournamentPhase? Phase { get; set; }
        public virtual RoundRobin? RoundRobin { get; set; }
        public virtual Team? Team1 { get; set; }
        public virtual Team? Team2 { get; set; }
        public virtual Tournament? Tournament { get; set; }
        public virtual Venue? Venue { get; set; }
        public virtual ICollection<MatchEvent> MatchEvents { get; set; }
        public virtual ICollection<MatchHighlight> MatchHighlights { get; set; }
        public virtual ICollection<MatchStatistic> MatchStatistics { get; set; }
        public virtual ICollection<PlayerMatchStatistic> PlayerMatchStatistics { get; set; }
        public virtual ICollection<TeamLineup> TeamLineups { get; set; }
    }
}
