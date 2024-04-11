

using Google;
using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.TeamDTO;
using SLMS.Repository.TeamStatisticRepository;

namespace SLMS.Repository.Implements.TeamStatisticRepository
{
    public class TeamsStatisticRepository :ITeamStatisticRepository
    {

        private readonly SEP490Context _context; // Sử dụng DbContext của bạn

        public TeamsStatisticRepository(SEP490Context context)
        {
            _context = context;
        }
        public async Task<TeamStatisticsDTO> GetTeamStatisticsAsync(int teamId)
        {
            var teamMatches = await _context.Matches
                .Where(m => (m.Team1Id == teamId || m.Team2Id == teamId) && m.Tournament.CurrentStatus == "Ended")
                .Include(m => m.MatchStatistics)
                .ToListAsync();

            var stats = new TeamStatisticsDTO
            {
                TotalMatchesPlayed = teamMatches.Count,
                TotalWins = 0,
                TotalDraws = 0,
                TotalLosses = 0,
                TotalGoalsFor = 0,
                TotalGoalsAgainst = 0,
                TotalYellowCards = 0,
                TotalRedCards = 0
            };

            foreach (var match in teamMatches)
            {
                foreach (var stat in match.MatchStatistics)
                {
                    // Điều kiện xác định đội 1 hay đội 2 là đội mình
                    bool isTeam1 = match.Team1Id == teamId;

                    int goalsFor = isTeam1 ? stat.GoalsTeam1 ?? 0 : stat.GoalsTeam2 ?? 0;
                    int goalsAgainst = isTeam1 ? stat.GoalsTeam2 ?? 0 : stat.GoalsTeam1 ?? 0;

                    stats.TotalGoalsFor += goalsFor;
                    stats.TotalGoalsAgainst += goalsAgainst;

                    // Điều kiện thắng, hòa, thua
                    if (goalsFor > goalsAgainst) stats.TotalWins++;
                    else if (goalsFor == goalsAgainst) stats.TotalDraws++;
                    else stats.TotalLosses++;

                    // Tính thẻ vàng và đỏ
                    stats.TotalYellowCards += isTeam1 ? stat.YellowCardsTeam1 ?? 0 : stat.YellowCardsTeam2 ?? 0;
                    stats.TotalRedCards += isTeam1 ? stat.RedCardsTeam1 ?? 0 : stat.RedCardsTeam2 ?? 0;
                }
            }

            return stats;
        }
    }
}
