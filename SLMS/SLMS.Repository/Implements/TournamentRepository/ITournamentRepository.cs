using Microsoft.AspNetCore.Http;
using SLMS.Core.Model;
using SLMS.DTO.LeagueDTO;
using SLMS.Repository.BaseRepository;
using System.Text.Json.Serialization;

namespace SLMS.Repository.Implements.TournamenceRepository
{
    public interface ITournamentRepository : IBaseRepository<Tournament>
    {
        Task<Tournament> CreateLeagueAsync(CreateLeagueModel model);
        Task<Tournament> UpdateLeagueAsync(UpdateLeagueModel model);
        Task<IEnumerable<TournamentModel>> GetAllPublicLeaguesAsync();
        Task<IEnumerable<TournamentModel>> GetLeaguesByOrganizerIdAsync(int organizerId);
        Task<List<LeagueSearchResultModel>> SearchTournamentsAsync(string searchText);
        Task<string> GetLatestDocumentPathAsync(int tournamentId);
        Task<List<LeagueSearchResultModel>> GetTournamentsByTypeAsync(string CompetitionFormatName);
        Task<Tournament> GetTournamentByIdAsync(int tournamentId);
    }
}
