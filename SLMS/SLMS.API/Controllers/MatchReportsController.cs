using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.MacthReportsDTO;
using SLMS.Repository.Implements.MatchReportRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchReportsController : ControllerBase
    {
        private readonly IMatchReportRepository _matchReportRepository;

        public MatchReportsController(IMatchReportRepository matchReportRepository)
        {
            _matchReportRepository = matchReportRepository;
        }

        [HttpPost("createPartTwo")]
        public async Task<IActionResult> CreatePartTwo([FromBody] PartTwoDTO partTwoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _matchReportRepository.ProcessMatchEventsAndStatisticsAsync(partTwoDto);
                if (result)
                {
                    return Ok(new { message = "Match events and player statistics created/updated successfully." });
                }
                return BadRequest(new { message = "An error occurred while processing match events and statistics." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("createPartOne")]
        public async Task<IActionResult> CreatePartOne([FromForm] PartOneDTO partOneDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _matchReportRepository.CreateOrUpdatePartOneAsync(partOneDto);
                if (result)
                {
                    return Ok(new { message = "Match part one created/updated successfully." });
                }
                return BadRequest(new { message = "An error occurred while creating/updating match part one." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("match{id}")]
        public async Task<IActionResult> GetMatchReport(int id)
        {
            try
            {
                var matchReportDto = await _matchReportRepository.GetAsync(id);
                if (matchReportDto == null)
                {
                    return NotFound($"Match report with ID {id} not found.");
                }

                return Ok(matchReportDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



    }
}
