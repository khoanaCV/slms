using SLMS.DTO.TeamRankingDTO;

namespace SLMS.Repository.Implements.TeamRankingRepository
{
    public interface ITeamRankingRepository
    {
        Task<IEnumerable<TeamRankingDTO>> GetTeamStandingsAsync(int tournamentId);
    }
}
