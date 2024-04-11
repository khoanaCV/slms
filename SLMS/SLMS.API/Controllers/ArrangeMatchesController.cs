using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.ArrangeMatchesDTO;
using SLMS.Repository.Implements.ArrangeMatchesRepository;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArrangeMatchesController : ControllerBase
    {
    
        private readonly IArrangeMatchesRepository _arrangeMatchesRepository;
        public ArrangeMatchesController(IArrangeMatchesRepository arrangeMatchesRepository)
        {
            _arrangeMatchesRepository = arrangeMatchesRepository;
        }


        [HttpGet]
        public ActionResult GetAllConfigAndListTeamsInTournament(int tournamentId)
        {
            var tournamentDetails = _arrangeMatchesRepository.GetAllConfigAndListTeamsInTournament(tournamentId);
            if (tournamentDetails == null)
            {
                return NotFound();
            }

            return Ok(tournamentDetails);
        }

        [HttpPost]
        public IActionResult SaveArrangeMatches([FromBody] SaveMatchPairingsDTO saveMatchPairingsDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _arrangeMatchesRepository.SaveMatchPairings(saveMatchPairingsDto);

            return Ok("Match pairings saved successfully.");
        }
    }
}
