using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.Repository.Implements.MatchRepository;
using SLMS.DTO.MatchInfoDTO;
namespace SLMS.API.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly IMatchRepository _matchRepository;

        public MatchesController(IMatchRepository matchRepository)
        {
            _matchRepository = matchRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchInfoDTO>>> GetMatches([FromQuery] int tournamentId, [FromQuery] int? phaseId, [FromQuery] int? groupStageId, [FromQuery] int? knockoutStageId, [FromQuery] int? roundRobinId, [FromQuery] int? venueId)
        {
            var matches = await _matchRepository.GetMatchInfosAsync(tournamentId, phaseId, groupStageId, knockoutStageId, roundRobinId, venueId);
            return Ok(matches);
        }

        [HttpGet("GroupStages")]
        public async Task<ActionResult<IEnumerable<GroupStageDTO>>> GetGroupStages([FromQuery] int tournamentId, [FromQuery] int? phaseId)
        {
            var groupStages = await _matchRepository.GetGroupStagesAsync(tournamentId, phaseId);
            if (groupStages == null)
            {
                return NotFound();
            }
            return Ok(groupStages);
        }

        [HttpGet("KnockoutStages")]
        public async Task<ActionResult<IEnumerable<KnockoutStageDTO>>> GetKnockoutStages([FromQuery] int tournamentId, [FromQuery] int? phaseId)
        {
            var knockoutStages = await _matchRepository.GetKnockoutStagesAsync(tournamentId, phaseId);
            if (knockoutStages == null)
            {
                return NotFound();
            }
            return Ok(knockoutStages);
        }

        [HttpGet("RoundRobins")]
        public async Task<ActionResult<IEnumerable<RoundRobinDTO>>> Get([FromQuery] int tournamentId)
        {
            var roundRobins = await _matchRepository.GetRoundRobinsAsync(tournamentId);
            if (roundRobins == null)
            {
                return NotFound();
            }
            return Ok(roundRobins);
        }

        [HttpGet("KnockoutStagesTypes")]
        public async Task<ActionResult<IEnumerable<KnockoutStagesTypesDTO>>> GetKnockoutStagesType([FromQuery] int tournamentId)
        {
            var knockoutStagesTypes = await _matchRepository.GetKnockoutStagesTypeAsync(tournamentId);
            if (knockoutStagesTypes == null)
            {
                return NotFound();
            }
            return Ok(knockoutStagesTypes);
        }
    }
}
