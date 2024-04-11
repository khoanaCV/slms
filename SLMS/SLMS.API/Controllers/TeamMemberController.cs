using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.Core.Model;
using SLMS.DTO.PlayerDTO;
using SLMS.DTO.TeamDTO;
using SLMS.Repository.Implements.PlayersRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamMemberController : ControllerBase
    {
        private readonly IPlayerRepository _playerRepository;

        public TeamMemberController(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        [HttpPost]
        public async Task<ActionResult<Player>> CreateTeamMember([FromForm] CreatePlayerModel dto)
        {
            try
            {
                var player = await _playerRepository.CreateTeamMemberAsync(dto);
                return CreatedAtAction(nameof(CreateTeamMember), new { id = player.Id }, player);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayerMemberOfTeam([FromForm] UpdatePlayerModel model)
        {
            if (model.Id == null)
            {
                return BadRequest("ID on the URL does not match the ID in the form data.");
            }

            try
            {
                var updatedTeam = await _playerRepository.UpdateTeamPlayerAsync(model);
                if (updatedTeam == null)
                {
                    return NotFound($"Team with ID {model.Id} not found.");
                }

                return Ok(updatedTeam);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return StatusCode(500, "An error occurred while updating the team.");
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMembersOfTeam([FromQuery] string searchQuery)
        {
            var results = await _playerRepository.SearchPlayers(searchQuery);
            if (results == null)
            {
                return BadRequest("Search không thành công");
            }
            return Ok(results);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetPlayersByStatus([FromQuery] string status)
        {
            var players = await _playerRepository.FilterPlayersByStatus(status);
            if (players == null)
            {
                return NotFound("No players found with the specified status.");
            }
            return Ok(players);

        }

        [HttpGet("GetPlayersByTeamIdAsync")]
        public async Task<IActionResult> GetPlayersByTeamIdAsync(int? teamId)
        {
            // Kiểm tra xem teamId có được cung cấp hay không
            if (!teamId.HasValue)
            {
                return BadRequest("Team ID is required.");
            }

            var players = await _playerRepository.GetPlayersByTeamIdAsync(teamId.Value);
            if (players == null || !players.Any())
            {
                return NotFound("No players found for the given team ID.");
            }
            return Ok(players);
        }
    }
}
