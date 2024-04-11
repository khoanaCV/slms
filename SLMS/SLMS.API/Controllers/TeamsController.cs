using Microsoft.AspNetCore.Mvc;
using SLMS.Repository.Implements.TeamRepository;
using SLMS.DTO.PlayerDTO;
using SLMS.DTO.TeamDTO;
using SLMS.DTO.LineUpDTO;


namespace SLMS.API.Controllers
{
    [Route("api/teams")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamRepository _teamRepository;

        public TeamsController(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        [HttpGet("player/{playerId}")]
        public async Task<ActionResult<PlayerProfileDTO>> GetPlayerProfile(int playerId)
        {
            try
            {
                var playerProfile = await _teamRepository.GetPlayerProfileAsync(playerId);
                return Ok(playerProfile);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Player with ID {playerId} not found.");
            }
        }

        [HttpPost("/lineups")]
        public async Task<IActionResult> CreateATeamLineUp([FromBody] TeamLineUpDTO lineUpDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                int lineUpId = await _teamRepository.CreateTeamLineUpAsync(lineUpDTO);
                return CreatedAtAction(nameof(GetATeamLineUp), new { lineUpId }, lineUpDTO);
            }
            catch (Exception ex)
            {
                // Log the exception (ex)
                return StatusCode(500, "An error occurred while creating the team lineup.");
            }
        }

        [HttpGet("{teamId}/lineups")]
        public async Task<IActionResult> GetAllTeamLineUps(int teamId)
        {
            try
            {
                var teamLineUps = await _teamRepository.GetAllTeamLineUpsAsync(teamId);
                return Ok(teamLineUps);
            }
            catch (Exception ex)
            {
                // Log the exception (ex)
                return StatusCode(500, "An error occurred while retrieving the team lineups.");
            }
        }

        [HttpGet("lineups/{lineUpId}")]
        public async Task<IActionResult> GetATeamLineUp(int lineUpId)
        {
            try
            {
                var teamLineUp = await _teamRepository.GetTeamLineUpAsync(lineUpId);
                if (teamLineUp != null)
                {
                    return Ok(teamLineUp);
                }
                return NotFound($"Team lineup with ID {lineUpId} not found.");
            }
            catch (Exception ex)
            {
                // Log the exception (ex)
                return StatusCode(500, "An error occurred while retrieving the team lineup.");
            }
        }

        [HttpPut("lineups/{lineUpId}")]
        public async Task<IActionResult> UpdateATeamLineUp(int lineUpId, [FromBody] TeamLineUpDTO lineUpDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _teamRepository.UpdateTeamLineUpAsync(lineUpId, lineUpDTO);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Team lineup with ID {lineUpId} not found.");
            }
            catch (Exception ex)
            {
                // Log the exception (ex)
                return StatusCode(500, "An error occurred while updating the team lineup.");
            }
        }

        [HttpDelete("lineups/{lineUpId}")]
        public async Task<IActionResult> DeleteTeamLineUp(int lineUpId)
        {
            try
            {
                await _teamRepository.DeleteTeamLineUpAsync(lineUpId);
                return NoContent(); // Indicates a successful deletion without returning data
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Team lineup with ID {lineUpId} not found.");
            }
            catch (Exception ex)
            {
                // Log the exception (ex)
                return StatusCode(500, "An error occurred while deleting the team lineup.");
            }
        }

        [HttpGet("{teamId}/activeplayers")]
        public async Task<IActionResult> GetActivePlayersByTeamId(int teamId)
        {
            try
            {
                var activePlayers = await _teamRepository.GetActivePlayersByTeamIdAsync(teamId);
                if (activePlayers != null && activePlayers.Any())
                {
                    return Ok(activePlayers);
                }
                return NotFound("No active players found for the given team ID.");
            }
            catch (Exception ex)
            {
                // Log the exception (ex)
                return StatusCode(500, "An error occurred while retrieving active players.");
            }
        }

        [HttpPost("createteam")]
        public async Task<IActionResult> CreateTeam([FromForm] CreateTeamModel createTeamDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var teamId = await _teamRepository.CreateTeamAsync(createTeamDto);
                if (teamId != null)
                {
                    return Ok(teamId);
                }
                return BadRequest("Unable to create team.");
            }
            catch
            {
                // Log the exception
                return StatusCode(500, "An error occurred while creating the team.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, [FromForm] UpdateTeamModel model)
        {
            if (id != model.TeamID)
            {
                return BadRequest("ID on the URL does not match the ID in the form data.");
            }

            try
            {
                var updatedTeam = await _teamRepository.UpdateTeamAsync(model);
                if (updatedTeam == null)
                {
                    return NotFound($"Team with ID {id} not found.");
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


        [HttpGet("{teamId}")]
        public async Task<IActionResult> GetTeamById(int teamId)
        {
            try
            {
                var team = await _teamRepository.GetTeamById(teamId);

                if (team == null)
                {
                    return NotFound(); // Return 404 if team not found
                }

                return Ok(team); // Return team data if found
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        //Get information team(number player, information player)
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<GetInformationTeamModel>>> GetTeamsByUser(int userId)
        {
            var teams = await _teamRepository.GetTeamsByUserIdAsync(userId);
            if (teams == null)
            {
                return NotFound();
            }
            return Ok(teams);
        }




    }
}
