using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.Repository.TeamStatisticRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamStatisticsController : ControllerBase
    {
        private readonly ITeamStatisticRepository _teamStatisticRepository;

        public TeamStatisticsController(ITeamStatisticRepository teamStatisticRepository)
        {
            _teamStatisticRepository = teamStatisticRepository;
        }

        // GET: api/TeamStatistics/5
        [HttpGet("{teamId}")]
        public async Task<IActionResult> GetTeamStatistics(int teamId)
        {
            try
            {
                var teamStatistics = await _teamStatisticRepository.GetTeamStatisticsAsync(teamId);
                if (teamStatistics == null)
                {
                    return NotFound($"Statistics for team ID {teamId} not found.");
                }
                return Ok(teamStatistics);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while retrieving team statistics: " + ex.Message);
            }
        }
    }
}
