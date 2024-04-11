using SLMS.DTO.AdminDTO;
using SLMS.DTO.AwardsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.AdminRepository
{
    public interface IAdminRepository
    {
        Task<IEnumerable<UserDTO>> GetAccountAsync();
        Task<IEnumerable<UserDTO>> SearchAccountsAsync(string searchTerm);
        Task<IEnumerable<UserDTO>> ViewProfile(int idAccount);
        Task<IEnumerable<FeedbackDTO>> GetFeedback();
        Task<IEnumerable<LeagueDTO>> GetAllLeagues();
        Task<IEnumerable<LeagueDTO>> ViewLeagueDetails(int idLeague);
        Task<IEnumerable<TeamDTO>> GetAllTeam();
        Task<IEnumerable<TeamDTO>> ViewTeamDetail(int idTeam);

        Task<IEnumerable<DashboardDTO>> GetTotalsAsync();

        Task<bool> UpdateUserStatusAsync(int userId, string status);
    }
}
