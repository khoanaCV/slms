using Microsoft.AspNetCore.Http;

namespace SLMS.DTO.LeagueDTO
{
    public class UpdateLeagueModel
    {
        public int LeagueId { get; set; }   
        public int organizerID { get; set; }
        public string? LeagueName { get; set; }
        public string? Phone { get; set; }
        public string? Open_Or_Not { get; set; }
        public string? Location { get; set; }
        public IFormFile? ImageAvatar { get; set; }
        public IFormFile? FilePDF { get; set; }
        public string? CompetitionFormatName { get; set; }
        public int? NumberOfTeams { get; set; }   
        public int? NumberOfPlayersPerTeamRange { get; set; }
        public int? NumberOfMatches { get; set; }
        public int? NumberOfTurns { get; set; }
        public int? NumberOfTables { get; set; }
        public int? NumberOfTeamsToNextRound { get; set; }
        public string? RegistrationAllowed { get; set; }
        public int? WinPoints { get; set; }
        public int? DrawPoints { get; set; }
        public int? LossPoints { get; set; }
        public int? SetYellowCardsToBan { get; set; }
        public int? NumberOfMatchesBannedYellowCard { get; set; }
        public int? SetIndirectRedCards { get; set; }
        public int? NumberOfMatchesBannedIndirectRedCard { get; set; }
        public int? SetDirectRedCards { get; set; }
        public int? NumberOfMatchesBannedDirectRedCard { get; set; }
    }
}
