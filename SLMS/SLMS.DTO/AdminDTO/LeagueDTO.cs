using System;
using System.Collections.Generic;

namespace SLMS.DTO.AdminDTO
{
    public partial class LeagueDTO
    {
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
    }
}
