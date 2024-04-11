using SLMS.DTO.MacthReportsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.MatchReportRepository
{
    public interface IMatchReportRepository
    {
       /* Task<MatchReportDTO> CreateAsync(MatchReportDTO matchReportDto);*/
        Task<MatchReportDTO> GetAsync(int id);
        /*  Task<MatchReportDTO> UpdateAsync(int id, MatchReportDTO matchReportDto);*/
        /*     Task<MatchReportDTO> CreateOrUpdateAsync(int matchId, CreateOrUpdateMatchReportDTO dto);*/
       /* Task<MatchReportDTO> CreateOrUpdateAsync(MatchReportDTO matchReportDto);*/

        Task<bool> CreateOrUpdatePartOneAsync(PartOneDTO partOneDto);

        Task<bool> ProcessMatchEventsAndStatisticsAsync(PartTwoDTO partTwoDto);
        // ... Other methods for CRUD operations
    }
}
