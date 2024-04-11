using SLMS.DTO.MacthScheduleManageDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.MatchScheduleManageRepository
{
    public interface IMatchScheduleManageRepository
    {
        Task<List<MatchScheduleDTO>> GetScheduleForTournament(int tournamentId);
        /*Task<bool> SaveMatchDetailsList(SaveMatchDetailsListDTO batchDto);*/
        Task<bool> UpdateMatchDetailsList(UpdateMatchDetailsListDTO updateDto);
    }
}
