using SLMS.DTO.AwardsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.AwardsRepository
{
    public interface IAwardsRepository
    {
        Task<IEnumerable<AwardDTO>> GetAwardsAsync(int tournamentId);
        Task VoteForAwardAsync(VoteAwardDTO voteAwardDTO);
        Task<byte[]> ExportAwardsAsync(ExportAwardsDTO exportAwardsDTO);
    }


}
