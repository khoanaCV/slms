using SLMS.DTO.PrizesDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.PrizesRepository
{
    public interface IPrizesRepository
    {
        Task<PlayerPrizesDTO> GetPlayerWithMostGoalsAsync(int tournamentId);
        Task<PlayerPrizesDTO> GetPlayerWithMostAssistsAsync(int tournamentId);
        Task<PlayerPrizesDTO> GetPlayerWithMostSavesAsync(int tournamentId);
        Task<TeamPrizesDTO> GetTeamFewestTotalCardsAsync(int tournamentId);
    }
}
