using SLMS.Core.Model;
using SLMS.DTO.SponsorDTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.SponsorRepository
{
    public interface ISponsorRepository
    {
        Task<Sponsor> CreateSponsorAsync(int tournamentId, SponsorDTO sponsorDTO); // ID giải đấu nằm trong DTO
        Task<SponsorModel> GetSponsorAsync(int id, int tournamentId);
        Task<IEnumerable<SponsorModel>> GetAllSponsorsAsync(int tournamentId);
        Task<Sponsor> UpdateSponsorAsync(int id, int tournamentId, SponsorDTO sponsorDTO);
        Task<bool> DeleteSponsorAsync(int id, int tournamentId);
    }
}
