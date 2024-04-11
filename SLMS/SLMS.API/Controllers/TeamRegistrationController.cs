using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.JwtSettingDTO;
using SLMS.DTO.TeamRegistrationDTO;
using SLMS.Repository.Implements.TeamRegistrationRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamRegistrationController : ControllerBase
    {
        private readonly ITeamRegistrationRepository _teamRegistrationRepository;

        public TeamRegistrationController(ITeamRegistrationRepository teamRegistrationRepository)
        {
            _teamRegistrationRepository = teamRegistrationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamRegistrationModel>>> GetTeamRegistrations()
        {
            var teamRegistrations = await _teamRegistrationRepository.GetTeamRegistrationsAsync();
            if (teamRegistrations == null)
            {
                return NotFound();
            }
            return Ok(teamRegistrations);
        }

        [HttpPost("inviteTeam")]
        public async Task<IActionResult> InviteTeam([FromBody] InvitedTeamLeagueModel team)
        {
            try
            {
                bool inviteSuccess = await _teamRegistrationRepository.InviteTeam(team);
                if (inviteSuccess)
                {
                    return Ok(new APIResponse
                    {
                        Success = true,
                        Message = "Team invited successfully"
                    });
                }
                else
                {
                    return BadRequest(new APIResponse
                    {
                        Success = false,
                        Message = "Failed to invite team."
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetTeamRegistrationsByTournament/{tournamentId}")]
        public async Task<IActionResult> GetTeamRegistrationsByTournament(int tournamentId)
        {
            var teams = await _teamRegistrationRepository.GetTeamRegistrationLeague(tournamentId);
            if (teams == null || !teams.Any()) return NotFound("No teams found for the given tournament.");
            return Ok(teams);
        }

        [HttpGet("{tournamentId}/teams/{teamId}")]
        public async Task<IActionResult> GetTeamDetailInTournament(int tournamentId, int teamId)
        {
            var teamDetail = await _teamRegistrationRepository.GetTeamDetailInTournament(tournamentId, teamId);
            if (teamDetail == null)
            {
                return NotFound("Không tìm thấy  đội trong giải đấu này."); ; // Trả về mã lỗi 404 nếu không tìm thấy thông tin đội bóng
            }
            return Ok(teamDetail); // Trả về thông tin đội bóng nếu thành công
        }


        [HttpGet("GetTeamMembersInfo/{teamId}/{tournamentId}")]
        public async Task<ActionResult<IEnumerable<TeamRegistrantionsPlayerInfoModel>>> GetTeamMembersInfo(int teamId, int tournamentId)
        {
            var teamMembersInfo = await _teamRegistrationRepository.GetTeamMembersInfo(teamId, tournamentId);
            if (teamMembersInfo == null || !teamMembersInfo.Any())
            {
                return NotFound("Không tìm thấy thành viên nào của đội trong giải đấu này.");
            }
            return Ok(teamMembersInfo);
        }

        [HttpPost("accept")]
        public async Task<IActionResult> AcceptInvitation(AcceptInvitationModel model)
        {
            if (await _teamRegistrationRepository.AcceptInvitation(model))
            {
                return Ok("Invitation accepted successfully.");
            }

            return BadRequest("Failed to accept the invitation.");
        }

        [HttpPost("reject")]
        public async Task<IActionResult> DeclineInvitation(DeclineInvitationModel model)
        {
            if (await _teamRegistrationRepository.DeclineInvitation(model))
            {
                return Ok("Invitation reject successfully.");
            }

            return BadRequest("Failed to decline the invitation.");
        }

    }
}
