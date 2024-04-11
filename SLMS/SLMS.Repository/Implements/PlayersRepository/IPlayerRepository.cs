
using SLMS.Core.Model;
using SLMS.DTO.LineUpDTO;
using SLMS.DTO.PlayerDTO;
using SLMS.Repository.BaseRepository;

namespace SLMS.Repository.Implements.PlayersRepository
{
    public interface IPlayerRepository : IBaseRepository<Player>
    {
        Task<Player> CreateTeamMemberAsync(CreatePlayerModel model);

        Task<bool> UpdateTeamPlayerAsync(UpdatePlayerModel model);

        Task<List<SearchPlayerModel>> SearchPlayers(string searchQuery);

        Task<IEnumerable<PlayerStatusModel>> FilterPlayersByStatus(string status);

        Task<IEnumerable<GetAllPlayerModel>> GetPlayersByTeamIdAsync(int teamId);
    }
}
