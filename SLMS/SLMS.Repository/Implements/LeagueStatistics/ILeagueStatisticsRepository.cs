using SLMS.Core.Model;
using SLMS.DTO.LeagueDTO;
using SLMS.Repository.BaseRepository;

namespace SLMS.Repository.Implements.LeagueStatistics
{
    public interface ILeagueStatisticsRepository
    {

        Task<LeagueStatisticsModel> GetLeagueStatisticsAsync(int tournamentId);
        Task<MatchWithMostCardsModel> GetMatchWithMostCardsAsync(int tournamentId);

        Task<MatchWithMostGoalsModel> GetMatchWithMostGoalsAsync(int tournamentId);

        Task<TeamWithMostGoalsModel> GetTeamWithMostGoalsAsync(int tournamentId);
        Task<TeamWithMostCardsModel> GetTeamWithMostCardsAsync(int tournamentId);

        Task<PlayerWithLeagueModel> GetPlayerWithMostCardsAsync(int tournamentId);

        Task<PlayerWithLeagueModel> GetPlayerWithMostGoalsAsync(int tournamentId);

        Task<List<PlayerGoalsModel>> GetAllPlayersWithMostGoalsAsync(int tournamentId);
    }
}
