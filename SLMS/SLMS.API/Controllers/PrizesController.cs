using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using SLMS.Repository.Implements.PrizesRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrizesController : ControllerBase
    {
        private readonly IPrizesRepository _repository;

        public PrizesController(IPrizesRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("GetPlayerMostGoals/{tournamentId}")]
        public async Task<IActionResult> GetPlayerMostGoals(int tournamentId)
        {
            var players = await _repository.GetPlayerWithMostGoalsAsync(tournamentId);
            return Ok(players);
        }

        [HttpGet("GetPlayerMostAssists/{tournamentId}")]
        public async Task<IActionResult> GetPlayerMostAssists(int tournamentId)
        {
            var players = await _repository.GetPlayerWithMostAssistsAsync(tournamentId);
            return Ok(players);
        }

        [HttpGet("GetPlayerMostSaves/{tournamentId}")]
        public async Task<IActionResult> GetPlayerMostSaves(int tournamentId)
        {
            var players = await _repository.GetPlayerWithMostSavesAsync(tournamentId);
            return Ok(players);
        }

        [HttpGet("GetTeamFewestTotalCards/{tournamentId}")]
        public async Task<IActionResult> GetTeamFewestTotalCards(int tournamentId)
        {
            var team = await _repository.GetTeamFewestTotalCardsAsync(tournamentId);
            return Ok(team);
        }
    }
}
