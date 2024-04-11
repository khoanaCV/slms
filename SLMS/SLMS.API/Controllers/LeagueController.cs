using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.JwtSettingDTO;
using SLMS.DTO.LeagueDTO;
using SLMS.Repository.Implements.TournamenceRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private string[] Scopes = { Google.Apis.Drive.v3.DriveService.Scope.Drive };
        private Google.Apis.Drive.v3.DriveService driveService;
        private readonly ITournamentRepository _tournamentRepository;
        private readonly IHttpClientFactory _httpClientFactory;

        public LeagueController(ITournamentRepository tournamentRepository, IHttpClientFactory httpClientFactory)
        {
            _tournamentRepository = tournamentRepository;
            _httpClientFactory = httpClientFactory; // Inject IHttpClientFactory here

        }

        [HttpPost("createInformation")]
        public async Task<IActionResult> CreateLeague([FromForm] CreateLeagueModel model)
        {
            try
            {
                var tournament = await _tournamentRepository.CreateLeagueAsync(model);
                return Ok(new { message = "League created successfully.", tournamentId = tournament.Id });
            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("downloadLatestDocument")]
        public async Task<IActionResult> DownloadLatestDocument(int tournamentId)
        {
            try
            {
                var fileUrl = await _tournamentRepository.GetLatestDocumentPathAsync(tournamentId); // Đây là URL công khai

                var httpClient = _httpClientFactory.CreateClient(); // Assuming _httpClientFactory is injected
                var response = await httpClient.GetAsync(fileUrl, HttpCompletionOption.ResponseHeadersRead); // Use HttpCompletionOption to stream the response
                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "Cannot download the document.");
                }

                var contentStream = await response.Content.ReadAsStreamAsync(); // Stream the content directly
                var contentType = "application/pdf";
                var fileName = Path.GetFileName(new Uri(fileUrl).AbsolutePath);
                Response.Headers.Add("Content-Disposition", $"attachment; filename={fileName}");
                return File(contentStream, contentType, fileName);
            }
            catch (FileNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("publicLeagues")]
        public async Task<IActionResult> GetPublicLeagues()
        {
            try
            {
                var leagues = await _tournamentRepository.GetAllPublicLeaguesAsync();
                return Ok(leagues);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("getLeagues/{organizerId}")]
        public async Task<IActionResult> GetLeaguesByOrganizerId(int organizerId)
        {
            try
            {
                var leagues = await _tournamentRepository.GetLeaguesByOrganizerIdAsync(organizerId);
                return Ok(leagues);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchTournaments(string searchText)
        {

            try
            {
                var tournaments = await _tournamentRepository.SearchTournamentsAsync(searchText);
                if (tournaments == null || tournaments.Count == 0)
                {
                    return Ok(new APIResponse
                    {
                        Success = false,
                        Message = "Could not find a solution matching the search term."
                    });
                }
                return Ok(tournaments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("getTournamentsByType/{CompetitionFormatName}")]
        public async Task<IActionResult> GetTournamentsByType(string CompetitionFormatName)
        {
            try
            {
                var tournaments = await _tournamentRepository.GetTournamentsByTypeAsync(CompetitionFormatName);
                if (tournaments == null || tournaments.Count == 0)
                {
                    return Ok(new APIResponse
                    {
                        Success = false,
                        Message = "No tournaments found for the given type."
                    });
                }
                return Ok(tournaments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("getTournamentDetails/{tournamentId}")]
        public async Task<IActionResult> GetTournamentDetails(int tournamentId)
        {
            try
            {
                var tournament = await _tournamentRepository.GetTournamentByIdAsync(tournamentId);
                if (tournament == null)
                {
                    return NotFound("Tournament not found");
                }

                var tournamentDetails = new TournamentDetailsDTO
                {
                    Id = tournament.Id,
                    AvatarTournament = tournament.AvatarTournament,
                    BigPhotoTournament = tournament.BigPhotoTournament,
                    Phone = tournament.Phone,
                    Name = tournament.Name,
                    CompetitionFormatName = tournament.CompetitionFormatName,
                    CompetitionDescription = tournament.CompetitionDescription,
                    StartDate = tournament.StartDate,
                    EndDate = tournament.EndDate,
                    SubmissionDeadline = tournament.SubmissionDeadline,
                    RegistrationAllowed = tournament.RegistrationAllowed,
                    Description = tournament.Description,
                    OrganizerId = tournament.OrganizerId,
                    CurrentStatus = tournament.CurrentStatus,
                    OpenOrNot = tournament.OpenOrNot,
                    ViewNumber = tournament.ViewNumber,
                    NumberOfTeams = tournament.NumberOfTeams,
                    NumberOfPlayersPerTeamRange = tournament.NumberOfPlayersPerTeamRange,
                    NumberOfMatches = tournament.NumberOfMatches,
                    NumberOfTurns = tournament.NumberOfTurns,
                    NumberOfRounds = tournament.NumberOfTables,
                    NumberOfTables = tournament.NumberOfTables,
                    NumberOfTeamsToNextRound = tournament.NumberOfTeamsToNextRound,
                    WinPoints = tournament.WinPoints,
                    DrawPoints = tournament.DrawPoints,
                    LossPoints = tournament.LossPoints,
                    SetToOrganizeThirdPrize = tournament.SetToOrganizeThirdPrize,
                    SetYellowCardsToBan = tournament.SetYellowCardsToBan,
                    NumberOfMatchesBannedYellowCard = tournament.NumberOfMatchesBannedYellowCard,
                    SetIndirectRedCards = tournament.SetIndirectRedCards,
                    NumberOfMatchesBannedIndirectRedCard = tournament.NumberOfMatchesBannedIndirectRedCard,
                    SetDirectRedCards = tournament.SetDirectRedCards,
                    NumberOfMatchesBannedDirectRedCard = tournament.NumberOfMatchesBannedDirectRedCard

                    // Map other properties...
                };

                return Ok(tournamentDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateLeague([FromForm] UpdateLeagueModel model)
        {
            try
            {
                var updatedLeague = await _tournamentRepository.UpdateLeagueAsync(model);
                return Ok(updatedLeague);
            }
            catch (KeyNotFoundException knfe)
            {
                return NotFound(knfe.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
