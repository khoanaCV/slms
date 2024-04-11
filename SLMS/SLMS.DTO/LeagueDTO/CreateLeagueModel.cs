using Microsoft.AspNetCore.Http;

namespace SLMS.DTO.LeagueDTO
{
    public class CreateLeagueModel
    {
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

        public DateTime? SubmissionDeadline { get; set; }
    }
}
