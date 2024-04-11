using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.PrizesDTO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.PrizesRepository
{
    public class PrizesRepository : IPrizesRepository
    {
        private readonly SEP490Context _context;

        public PrizesRepository(SEP490Context context)
        {
            _context = context;
        }

        public async Task<PlayerPrizesDTO> GetPlayerWithMostGoalsAsync(int tournamentId)
        {
            var player = _context.PlayerMatchStatistics
                .Where(pms => pms.Goals.HasValue && pms.Match.TournamentId == tournamentId)
                .GroupBy(pms => new { pms.PlayerId, pms.Player.Name, pms.Player.Avatar, pms.Player.Phone })
                .Select(group => new PlayerPrizesDTO
                {
                    PlayerId = group.Key.PlayerId,
                    PlayerName = group.Key.Name,
                    Avatar = group.Key.Avatar,
                    Phone = group.Key.Phone,
                    StatisticCount = group.Sum(g => g.Goals.Value)
                })
                .OrderByDescending(dto => dto.StatisticCount)
                .FirstOrDefault(); // Thay đổi ở đây

            return await Task.FromResult(player);
        }


        public async Task<PlayerPrizesDTO> GetPlayerWithMostAssistsAsync(int tournamentId)
        {
            var player = _context.PlayerMatchStatistics
                .Where(pms => pms.Assists.HasValue && pms.Match.TournamentId == tournamentId)
                .GroupBy(pms => new { pms.PlayerId, pms.Player.Name, pms.Player.Avatar, pms.Player.Phone })
                .Select(group => new PlayerPrizesDTO
                {
                    PlayerId = group.Key.PlayerId,
                    PlayerName = group.Key.Name,
                    Avatar = group.Key.Avatar,
                    Phone = group.Key.Phone,
                    StatisticCount = group.Sum(g => g.Assists.Value)
                })
                .OrderByDescending(dto => dto.StatisticCount)
                .FirstOrDefault(); // Sửa đổi ở đây

            return await Task.FromResult(player);
        }


        public async Task<PlayerPrizesDTO> GetPlayerWithMostSavesAsync(int tournamentId)
        {
            var player = _context.PlayerMatchStatistics
                .Where(pms => pms.Saves.HasValue && pms.Match.TournamentId == tournamentId)
                .GroupBy(pms => new { pms.PlayerId, pms.Player.Name, pms.Player.Avatar, pms.Player.Phone })
                .Select(group => new PlayerPrizesDTO
                {
                    PlayerId = group.Key.PlayerId,
                    PlayerName = group.Key.Name,
                    Avatar = group.Key.Avatar,
                    Phone = group.Key.Phone,
                    StatisticCount = group.Sum(g => g.Saves.Value)
                })
                .OrderByDescending(dto => dto.StatisticCount)
                .FirstOrDefault(); // Sửa đổi ở đây

            return await Task.FromResult(player);
        }


        public async Task<TeamPrizesDTO> GetTeamFewestTotalCardsAsync(int tournamentId)
        {
            // Lấy tất cả trận đấu trong giải đấu
            var matches = _context.Matches
                .Where(m => m.TournamentId == tournamentId)
                .Include(m => m.MatchStatistics)
                .ToList(); // Chuyển đổi sang xử lý trên client

            var teamCards = new List<(int TeamId, int TotalCards)>();

            // Tính tổng số thẻ cho mỗi đội trong từng trận đấu
            foreach (var match in matches)
            {
                if (match.Team1Id.HasValue)
                {
                    teamCards.Add((match.Team1Id.Value, match.MatchStatistics.Sum(ms => (ms.YellowCardsTeam1 ?? 0) + (ms.RedCardsTeam1 ?? 0))));
                }
                if (match.Team2Id.HasValue)
                {
                    teamCards.Add((match.Team2Id.Value, match.MatchStatistics.Sum(ms => (ms.YellowCardsTeam2 ?? 0) + (ms.RedCardsTeam2 ?? 0))));
                }
            }

            // Nhóm theo TeamId và tính tổng số thẻ, sau đó sắp xếp
            var teamWithFewestCards = teamCards
                .GroupBy(t => t.TeamId)
                .Select(group => new { TeamId = group.Key, TotalCards = group.Sum(g => g.TotalCards) })
                .OrderBy(t => t.TotalCards)
                .FirstOrDefault();

            if (teamWithFewestCards == null)
            {
                return null; // Hoặc xử lý phù hợp nếu không có đội nào
            }

            // Lấy thông tin chi tiết đội bóng
            var teamInfo = _context.Teams
                .Where(t => t.Id == teamWithFewestCards.TeamId)
                .Select(t => new TeamPrizesDTO
                {
                    TeamId = t.Id,
                    TeamName = t.Name,
                    Logo = t.Logo,
                    Phone = t.Phone,
                    ContactPerson = t.ContactPerson,
                    TotalCards = teamWithFewestCards.TotalCards
                })
                .FirstOrDefault();

            return await Task.FromResult(teamInfo);
        }


    }
}
