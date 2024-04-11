using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Tournament
    {
        public Tournament()
        {
            Awards = new HashSet<Award>();
            Documents = new HashSet<Document>();
            GroupStages = new HashSet<GroupStage>();
            KnockoutStages = new HashSet<KnockoutStage>();
            Matches = new HashSet<Match>();
            RolePermissions = new HashSet<RolePermission>();
            RoundRobins = new HashSet<RoundRobin>();
            Sponsors = new HashSet<Sponsor>();
            TeamRankings = new HashSet<TeamRanking>();
            TeamRegistrations = new HashSet<TeamRegistration>();
            Teams = new HashSet<Team>();
            TournamentVotes = new HashSet<TournamentVote>();
            Venues = new HashSet<Venue>();
        }

        public int Id { get; set; }
        public string? AvatarTournament { get; set; }
        public string? BigPhotoTournament { get; set; }
        public string? Phone { get; set; }
        public string? Name { get; set; }
        public string? CompetitionFormatName { get; set; }
        public string? CompetitionDescription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? SubmissionDeadline { get; set; }
        public string? RegistrationAllowed { get; set; }
        public string? Description { get; set; }
        public int? OrganizerId { get; set; }
        public string? CurrentStatus { get; set; }
        public string? OpenOrNot { get; set; }
        public int? ViewNumber { get; set; }
        public int? NumberOfTeams { get; set; }
        public int? NumberOfPlayersPerTeamRange { get; set; }
        public int? NumberOfMatches { get; set; }
        public int? NumberOfTurns { get; set; }
        public int? NumberOfRounds { get; set; }
        public int? NumberOfTables { get; set; }
        public int? NumberOfTeamsToNextRound { get; set; }
        public int? WinPoints { get; set; }
        public int? DrawPoints { get; set; }
        public int? LossPoints { get; set; }
        public string? LinkPath { get; set; }
        public string? SetToOrganizeThirdPrize { get; set; }
        public int? SetYellowCardsToBan { get; set; }
        public int? NumberOfMatchesBannedYellowCard { get; set; }
        public int? SetIndirectRedCards { get; set; }
        public int? NumberOfMatchesBannedIndirectRedCard { get; set; }
        public int? SetDirectRedCards { get; set; }
        public int? NumberOfMatchesBannedDirectRedCard { get; set; }

        public virtual User? Organizer { get; set; }
        public virtual ICollection<Award> Awards { get; set; }
        public virtual ICollection<Document> Documents { get; set; }
        public virtual ICollection<GroupStage> GroupStages { get; set; }
        public virtual ICollection<KnockoutStage> KnockoutStages { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
        public virtual ICollection<RolePermission> RolePermissions { get; set; }
        public virtual ICollection<RoundRobin> RoundRobins { get; set; }
        public virtual ICollection<Sponsor> Sponsors { get; set; }
        public virtual ICollection<TeamRanking> TeamRankings { get; set; }
        public virtual ICollection<TeamRegistration> TeamRegistrations { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
        public virtual ICollection<TournamentVote> TournamentVotes { get; set; }
        public virtual ICollection<Venue> Venues { get; set; }
    }
}
