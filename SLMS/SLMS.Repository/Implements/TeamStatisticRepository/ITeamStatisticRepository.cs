using SLMS.DTO.TeamDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.TeamStatisticRepository
{
    public interface ITeamStatisticRepository
    {
        Task<TeamStatisticsDTO> GetTeamStatisticsAsync(int teamId);
    }
}
