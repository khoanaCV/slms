using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.AdminDTO;
using SLMS.Repository.Implements.AdminRepository;

namespace SLMS.API.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet("accounts")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAccounts()
        {
            var accounts = await _adminRepository.GetAccountAsync();
            return Ok(accounts);
        }

        [HttpGet("search-accounts")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> SearchAccounts([FromQuery] string searchTerm)
        {
            var accounts = await _adminRepository.SearchAccountsAsync(searchTerm);
            return Ok(accounts);
        }

        [HttpGet("view-profile/{idAccount}")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> ViewProfile(int idAccount)
        {
            var profile = await _adminRepository.ViewProfile(idAccount);
            return Ok(profile);
        }

        [HttpGet("feedback")]
        public async Task<ActionResult<IEnumerable<FeedbackDTO>>> GetFeedback()
        {
            var feedback = await _adminRepository.GetFeedback();
            return Ok(feedback);
        }

        [HttpGet("leagues")]
        public async Task<ActionResult<IEnumerable<LeagueDTO>>> GetAllLeagues()
        {
            var leagues = await _adminRepository.GetAllLeagues();
            return Ok(leagues);
        }

        [HttpGet("view-league-details/{idLeague}")]
        public async Task<ActionResult<IEnumerable<LeagueDTO>>> ViewLeagueDetails(int idLeague)
        {
            var league = await _adminRepository.ViewLeagueDetails(idLeague);
            return Ok(league);
        }

        [HttpGet("teams")]
        public async Task<ActionResult<IEnumerable<TeamDTO>>> GetAllTeams()
        {
            var teams = await _adminRepository.GetAllTeam();
            return Ok(teams);
        }

        [HttpGet("view-team-details/{idTeam}")]
        public async Task<ActionResult<IEnumerable<TeamDTO>>> ViewTeamDetails(int idTeam)
        {
            var team = await _adminRepository.ViewTeamDetail(idTeam);
            return Ok(team);
        }

        [HttpGet("GetTotals")]
        public async Task<ActionResult<DashboardDTO>> GetTotals()
        {
            try
            {
                var totals = await _adminRepository.GetTotalsAsync();
                return Ok(totals);
            }
            catch (Exception ex)
            {
                // Xử lý exception tùy thuộc vào quy định của dự án
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        [HttpPatch("UpdateStatus/{userId}")]
        public async Task<IActionResult> UpdateUserStatus(int userId, [FromBody] string status)
        {
            try
            {
                var result = await _adminRepository.UpdateUserStatusAsync(userId, status);
                if (!result)
                {
                    return NotFound("User not found.");
                }

                return Ok($"User status updated to {status} successfully.");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
