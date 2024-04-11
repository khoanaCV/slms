using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.TeamRankingDTO;
using SLMS.Repository.Implements.TeamRankingRepository;
using SLMS.Repository.TeamStatisticRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamRankingController : ControllerBase
    {
        private readonly ITeamRankingRepository _teamRankingRepository;

        public TeamRankingController(ITeamRankingRepository teamRankingRepository)
        {
            _teamRankingRepository = teamRankingRepository;
        }

        [HttpGet("{tournamentId}")]
        public async Task<IActionResult> GetTeamStandings(int tournamentId)
        {
            var teamStandings = await _teamRankingRepository.GetTeamStandingsAsync(tournamentId);
            if (teamStandings == null)
            {
                return NotFound();
            }
            return Ok(teamStandings);
        }
    }
}
