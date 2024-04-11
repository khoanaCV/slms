using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.MacthScheduleManageDTO;
using SLMS.Repository.Implements.MatchScheduleManageRepository;
using System.Threading.Tasks;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchScheduleManageController : ControllerBase
    {
        private readonly IMatchScheduleManageRepository _matchScheduleManageRepository;

        public MatchScheduleManageController(IMatchScheduleManageRepository matchScheduleManageRepository)
        {
            _matchScheduleManageRepository = matchScheduleManageRepository;
        }

        [HttpGet("{tournamentId}")]
        public async Task<IActionResult> GetScheduleForTournament(int tournamentId)
        {
            var schedule = await _matchScheduleManageRepository.GetScheduleForTournament(tournamentId);
            if (schedule == null || schedule.Count == 0)
            {
                return NotFound("Schedule not found for the given tournament.");
            }
            return Ok(schedule);
        }

        /*[HttpPost("batch/{tournamentId}")]
        public async Task<IActionResult> SaveMatchDetailsList(int tournamentId, [FromBody] SaveMatchDetailsListDTO matchDetailsBatch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set TournamentId từ parameter vào DTO
            matchDetailsBatch.TournamentId = tournamentId;

            var result = await _matchScheduleManageRepository.SaveMatchDetailsList(matchDetailsBatch);
            if (!result)
            {
                return BadRequest("Failed to save match details.");
            }

            return Ok("Match details saved successfully.");
        }*/


        [HttpPut("batch/{tournamentId}")]
        public async Task<IActionResult> UpdateMatchDetailsList(int tournamentId, [FromBody] UpdateMatchDetailsListDTO updateMatchDetailsListDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            updateMatchDetailsListDto.TournamentId = tournamentId;
            var result = await _matchScheduleManageRepository.UpdateMatchDetailsList(updateMatchDetailsListDto);
            if (!result)
            {
                return BadRequest("Failed to update match details.");
            }

            return Ok("Match details updated successfully.");
        }

    }
}
