using Microsoft.AspNetCore.Mvc;
using SLMS.Core.Model;
using SLMS.DTO.SponsorDTO;
using SLMS.Repository.Implements.SponsorRepository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorController : ControllerBase
    {
        private readonly ISponsorRepository _sponsorRepository;

        public SponsorController(ISponsorRepository sponsorRepository)
        {
            _sponsorRepository = sponsorRepository;
        }

        [HttpPost]
        public async Task<ActionResult<SponsorDTO>> CreateSponsor(int tournamentId, [FromForm] SponsorDTO sponsorDTO)
        {
            try
            {
                var sponsor = await _sponsorRepository.CreateSponsorAsync(tournamentId, sponsorDTO);
                return Ok(sponsor);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/{tournamentId}")]
        public async Task<ActionResult<SponsorModel>> GetSponsor(int id, int tournamentId)
        {
            var sponsor = await _sponsorRepository.GetSponsorAsync(id, tournamentId);
            if (sponsor == null) return NotFound();
            return Ok(sponsor);
        }

        [HttpGet("GetAllSponsors/{tournamentId}")]
        public async Task<ActionResult<IEnumerable<SponsorModel>>> GetAllSponsors(int tournamentId)
        {
            var sponsors = await _sponsorRepository.GetAllSponsorsAsync(tournamentId);
            return Ok(sponsors);
        }

        [HttpPut("{id}/{tournamentId}")]
        public async Task<ActionResult<SponsorDTO>> UpdateSponsor(int id, int tournamentId, [FromForm] SponsorDTO sponsorDTO)
        {
            var updatedSponsor = await _sponsorRepository.UpdateSponsorAsync(id, tournamentId, sponsorDTO);

            if (updatedSponsor == null)
            {
                return NotFound($"No sponsor found with ID {id} in tournament {tournamentId}.");
            }

            return Ok(updatedSponsor);
        }


        [HttpDelete("{id}/{tournamentId}")]
        public async Task<IActionResult> DeleteSponsor(int id, int tournamentId)
        {
            var success = await _sponsorRepository.DeleteSponsorAsync(id, tournamentId);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
