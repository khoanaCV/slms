using SLMS.Core.Model;
using SLMS.DTO.LineUpDTO;
using SLMS.DTO.PlayerDTO;
using SLMS.DTO.TeamDTO;
using SLMS.Repository.BaseRepository;

namespace SLMS.Repository.Implements.TeamRepository
{
    public interface ITeamRepository : IBaseRepository<Team>
    {
        Task<Team> CreateTeamAsync(CreateTeamModel model);
        Task<Team> UpdateTeamAsync(UpdateTeamModel model);
        Task<PlayerProfileDTO> GetPlayerProfileAsync(int playerId);
        Task<Team> GetTeamById(int teamId);
        Task<IEnumerable<GetInformationTeamModel>> GetTeamsByUserIdAsync(int userId);
        Task<int> CreateTeamLineUpAsync(TeamLineUpDTO lineUpDTO);
        Task<IEnumerable<TeamLineUpDTO>> GetAllTeamLineUpsAsync(int teamId);
        Task<TeamLineUpDTO> GetTeamLineUpAsync(int lineUpId);
        Task UpdateTeamLineUpAsync(int lineUpId, TeamLineUpDTO lineUpDTO);
        Task DeleteTeamLineUpAsync(int lineUpId);
        Task<List<PlayerDTO>> GetActivePlayersByTeamIdAsync(int teamId);

    }
}
