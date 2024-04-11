using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Team
    {
        public Team()
        {
            MatchEvents = new HashSet<MatchEvent>();
            MatchTeam1s = new HashSet<Match>();
            MatchTeam2s = new HashSet<Match>();
            RolePermissions = new HashSet<RolePermission>();
            TeamLineups = new HashSet<TeamLineup>();
            TeamPlayers = new HashSet<TeamPlayer>();
            TeamRankings = new HashSet<TeamRanking>();
            TeamRegistrations = new HashSet<TeamRegistration>();
            Votes = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Logo { get; set; }
        public string? Level { get; set; }
        public string? Phone { get; set; }
        public string? OpenOrNot { get; set; }
        public string? AgeJoin { get; set; }
        public string? ContactPerson { get; set; }
        public string? ContactPersonEmail { get; set; }
        public string? ActivityArea { get; set; }
        public string? OperatingTime { get; set; }
        public string? UniForm1 { get; set; }
        public string? UniForm2 { get; set; }
        public string? UniForm3 { get; set; }
        public string? CurrentStatus { get; set; }
        public string? Country { get; set; }
        public int? TeamManagerId { get; set; }
        public string? Description { get; set; }
        public int? TournamentId { get; set; }

        public virtual User? TeamManager { get; set; }
        public virtual Tournament? Tournament { get; set; }
        public virtual ICollection<MatchEvent> MatchEvents { get; set; }
        public virtual ICollection<Match> MatchTeam1s { get; set; }
        public virtual ICollection<Match> MatchTeam2s { get; set; }
        public virtual ICollection<RolePermission> RolePermissions { get; set; }
        public virtual ICollection<TeamLineup> TeamLineups { get; set; }
        public virtual ICollection<TeamPlayer> TeamPlayers { get; set; }
        public virtual ICollection<TeamRanking> TeamRankings { get; set; }
        public virtual ICollection<TeamRegistration> TeamRegistrations { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
