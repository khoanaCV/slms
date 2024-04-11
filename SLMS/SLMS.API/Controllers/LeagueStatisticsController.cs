using Microsoft.AspNetCore.Mvc;
using SLMS.DTO.LeagueDTO;
using SLMS.Repository.Implements.LeagueStatistics;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueStatisticsController : ControllerBase
    {


        private readonly ILeagueStatisticsRepository _leagueStatisticsRepository;

        public LeagueStatisticsController(ILeagueStatisticsRepository leagueStatisticsRepository)
        {
            _leagueStatisticsRepository = leagueStatisticsRepository;
        }

        [HttpGet("{tournamentId}")]
        public async Task<ActionResult<LeagueStatisticsModel>> GetLeagueStatistics(int tournamentId)
        {
            try
            {
                var statistics = await _leagueStatisticsRepository.GetLeagueStatisticsAsync(tournamentId);
                if (statistics == null)
                {
                    return NotFound($"Statistics not found for tournament ID: {tournamentId}");
                }
                return Ok(statistics);
            }
            catch
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("MatchWithMostCards/{tournamentId}")]
        public async Task<ActionResult<MatchWithMostCardsModel>> GetMatchWithMostCards(int tournamentId)
        {
            try
            {
                var matchWithMostCards = await _leagueStatisticsRepository.GetMatchWithMostCardsAsync(tournamentId);
                if (matchWithMostCards == null)
                {
                    return NotFound($"No match with most cards found for tournament ID {tournamentId}.");
                }

                return Ok(matchWithMostCards);
            }
            catch
            {
                // Log exception (ex) if needed
                return StatusCode(500, "Internal server error occurred.");
            }
        }

        [HttpGet("GetMatchWithMostGoals/{tournamentId}")]
        public async Task<ActionResult<MatchWithMostGoalsModel>> GetMatchWithMostGoals(int tournamentId)
        {
            var matchWithMostGoals = await _leagueStatisticsRepository.GetMatchWithMostGoalsAsync(tournamentId);
            if (matchWithMostGoals == null)
            {
                return NotFound();
            }
            return Ok(matchWithMostGoals);
        }


        [HttpGet("GetTeamWithMostGoals/{tournamentId}")]
        public async Task<ActionResult<TeamWithMostGoalsModel>> GetTeamWithMostGoals(int tournamentId)
        {
            var teamWithMostGoals = await _leagueStatisticsRepository.GetTeamWithMostGoalsAsync(tournamentId);
            if (teamWithMostGoals == null)
            {
                return NotFound();
            }

            return Ok(teamWithMostGoals);
        }

        [HttpGet("GetTeamWithMostCard/{tournamentId}")]
        public async Task<ActionResult<TeamWithMostCardsModel>> GetTeamWithMostCards(int tournamentId)
        {
            var teamWithMostPenalties = await _leagueStatisticsRepository.GetTeamWithMostCardsAsync(tournamentId);

            if (teamWithMostPenalties == null)
                return NotFound();

            var result = new TeamWithMostCardsModel
            {
                TeamID = teamWithMostPenalties.TeamID,
                TeamName = teamWithMostPenalties.TeamName,
                Logo = teamWithMostPenalties.Logo, // Map the logo URL or path
                TotalCards = teamWithMostPenalties.TotalCards
            };

            return Ok(result);
        }


        [HttpGet("GetPlayerWithMostCards/{tournamentId}")]
        public async Task<ActionResult<PlayerWithLeagueModel>> GetPlayerWithMostCards(int tournamentId)
        {
            var playerWithMostPenalties = await _leagueStatisticsRepository.GetPlayerWithMostCardsAsync(tournamentId);

            if (playerWithMostPenalties == null)
                return NotFound();

            var result = new PlayerWithLeagueModel
            {
                PlayerID = playerWithMostPenalties.PlayerID,
                PlayerName = playerWithMostPenalties.PlayerName,
                PlayerImage = playerWithMostPenalties.PlayerImage,
                TotalCards = playerWithMostPenalties.TotalCards
            };

            return Ok(result);
        }


        [HttpGet("GetPlayerWithMostGoals/{tournamentId}")]
        public async Task<ActionResult<PlayerWithLeagueModel>> GetPlayerWithMostGoals(int tournamentId)
        {
            var playerWithMostPenalties = await _leagueStatisticsRepository.GetPlayerWithMostGoalsAsync(tournamentId);

            if (playerWithMostPenalties == null)
                return NotFound();

            var result = new PlayerWithLeagueModel
            {
                PlayerID = playerWithMostPenalties.PlayerID,
                PlayerName = playerWithMostPenalties.PlayerName,
                PlayerImage = playerWithMostPenalties.PlayerImage,
                TotalGoals = playerWithMostPenalties.TotalGoals

            };

            return Ok(result);
        }

        [HttpGet("GetAllPlayersWithMostGoalsAsync/{tournamentId}")]
        public async Task<ActionResult<List<PlayerGoalsModel>>> GetAllPlayersWithMostGoalsAsync(int tournamentId)
        {
            try
            {
                var playersWithMostGoals = await _leagueStatisticsRepository.GetAllPlayersWithMostGoalsAsync(tournamentId);
                if (playersWithMostGoals == null || playersWithMostGoals.Count == 0)
                {
                    return NotFound($"No players found with goals scored for tournament ID: {tournamentId}");
                }
                return Ok(playersWithMostGoals);
            }
            catch
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }



    }
}

