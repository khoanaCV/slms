using SLMS.DTO.MatchInfoDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.MatchRepository
{
    public interface IMatchRepository
    {
        Task<IEnumerable<MatchInfoDTO>> GetMatchInfosAsync(int tournamentId, int? phaseId, int? groupStageId, int? knockoutStageId, int? roundRobinId, int? venueId);
        Task<IEnumerable<GroupStageDTO>> GetGroupStagesAsync(int tournamentId, int? phaseId);
        Task<IEnumerable<KnockoutStageDTO>> GetKnockoutStagesAsync(int tournamentId, int? phaseId);
        Task<IEnumerable<RoundRobinDTO>> GetRoundRobinsAsync(int tournamentId);
        Task<IEnumerable<KnockoutStagesTypesDTO>> GetKnockoutStagesTypeAsync(int tournamentId);
    }
}
