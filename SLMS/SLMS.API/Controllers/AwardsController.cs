using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.AwardsDTO;
using SLMS.Repository.Implements.AwardsRepository;
namespace SLMS.API.Controllers

{
    [Route("api/awards")]
    [ApiController]
    public class AwardsController : ControllerBase
    {
        private readonly IAwardsRepository _awardsRepository;

        public AwardsController(IAwardsRepository awardsRepository)
        {
            _awardsRepository = awardsRepository;
        }

        [HttpGet("{tournamentId}")]
        public async Task<ActionResult<IEnumerable<AwardDTO>>> GetAwards(int tournamentId)
        {
            var awards = await _awardsRepository.GetAwardsAsync(tournamentId);
            if (awards == null || !awards.Any())
            {
                return NotFound("No awards found for the given tournament.");
            }
            return Ok(awards);
        }

        [HttpPost("vote")]
        public async Task<ActionResult> VoteForAward([FromBody] VoteAwardDTO voteAwardDTO)
        {
            await _awardsRepository.VoteForAwardAsync(voteAwardDTO);
            return Ok("Vote registered successfully.");
        }

        [HttpPost("export")]
        public async Task<ActionResult> ExportAwards([FromBody] ExportAwardsDTO exportAwardsDTO)
        {
            var fileContent = await _awardsRepository.ExportAwardsAsync(exportAwardsDTO);
            if (fileContent == null || fileContent.Length == 0)
            {
                return NotFound("No awards data found to export.");
            }
            return File(fileContent, "application/octet-stream", "awards_export.xlsx");
        }
    }
}
