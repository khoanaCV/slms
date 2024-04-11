using Google;
using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.LeagueDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.LeagueStatistics
{
    public class LeagueStatisticsRepository : ILeagueStatisticsRepository
    {
        private readonly SEP490Context _context;

        public LeagueStatisticsRepository(SEP490Context context)
        {
            _context = context;
        }

        public async Task<LeagueStatisticsModel> GetLeagueStatisticsAsync(int tournamentId)
        {


            // Tổng số vận động viên tham gia
            var totalAthletes = await _context.TeamPlayers
                .Where(tp => _context.TeamRegistrations 
                    .Any(tr => tr.TournamentId == tournamentId && tr.TeamId == tp.TeamId))
                .Select(tp => tp.PlayerId)
                .Distinct()
                .CountAsync();

            // Tổng số bàn thắng
            var totalGoals = await _context.MatchStatistics
                .Where(ms => _context.Matches
                    .Any(m => m.TournamentId == tournamentId && m.Id == ms.MatchId))
                .SumAsync(ms => ms.GoalsTeam1 + ms.GoalsTeam2);

            // Tổng số phản lưới nhà (Giả sử đây là ownGoals)
            var totalOwnGoals = await _context.PlayerMatchStatistics
                .Where(pms => _context.Matches
                    .Any(m => m.TournamentId == tournamentId && m.Id == pms.MatchId))
                .SumAsync(pms => pms.OwnGoals);

            // Tổng số trận đấu
            var totalMatches = await _context.Matches
                .CountAsync(m => m.TournamentId == tournamentId);

            // Tổng số thẻ vàng
            var totalYellowCards = await _context.MatchStatistics
                .Where(ms => _context.Matches
                    .Any(m => m.TournamentId == tournamentId && m.Id == ms.MatchId))
                .SumAsync(ms => ms.YellowCardsTeam1 + ms.YellowCardsTeam2);

            // Tổng số thẻ đỏ
            var totalRedCards = await _context.MatchStatistics
                .Where(ms => _context.Matches
                    .Any(m => m.TournamentId == tournamentId && m.Id == ms.MatchId))
                .SumAsync(ms => ms.RedCardsTeam1 + ms.RedCardsTeam2);

            // Tổng số thẻ phạt
            var totalCards = totalYellowCards + totalRedCards;

            // Trung bình số bàn thắng trong một trận
            var averageGoalsPerMatch = totalMatches > 0 ? Math.Round((double)totalGoals / totalMatches, 2) : 0;

            // Trung bình số thẻ trong một trận
            var averageCardsPerMatch = totalMatches > 0 ? Math.Round((double)totalCards / totalMatches, 2) : 0;


            // Tổng số Hattrick
            var totalHattricks = await _context.PlayerMatchStatistics
                .Where(pms => _context.Matches
                    .Any(m => m.TournamentId == tournamentId && m.Id == pms.MatchId) && pms.Goals >= 3)
                .CountAsync();

            // Tổng số Poker (4 bàn thắng trở lên)
            var totalPokers = await _context.PlayerMatchStatistics
                .Where(pms => _context.Matches
                    .Any(m => m.TournamentId == tournamentId && m.Id == pms.MatchId) && pms.Goals >= 4)
                .CountAsync();
            //Tổng số cú đúp
            var totalDoubleGoals = await _context.PlayerMatchStatistics
                .Where(pms => _context.Matches
                    .Any(m => m.TournamentId == tournamentId && m.Id == pms.MatchId) && pms.Goals >= 2)
                .CountAsync();

            return new LeagueStatisticsModel
            {
                TotalAthletes = totalAthletes,
                TotalGoals = (int)totalGoals,
                TotalOwnGoals = (int)totalOwnGoals,
                TotalMatches = totalMatches,
                TotalYellowCards = (int)totalYellowCards,
                TotalRedCards = (int)totalRedCards,
                TotalCards = (int)totalCards,
                AverageGoalsPerMatch = averageGoalsPerMatch,
                AverageCardsPerMatch = averageCardsPerMatch,
                TotalDoubleGoals = totalDoubleGoals,
                TotalHattricks = totalHattricks,
                TotalPokers = totalPokers
            };
        }


        public async Task<MatchWithMostCardsModel> GetMatchWithMostCardsAsync(int tournamentId)
        {
            var matchWithMostCards = await _context.Matches
        .Where(m => m.TournamentId == tournamentId)
        .Select(m => new
        {
            Match = m,
            TotalCards = m.MatchStatistics.Sum(ms => ms.YellowCardsTeam1 + ms.RedCardsTeam1 + ms.YellowCardsTeam2 + ms.RedCardsTeam2),
            // Đảm bảo rằng chúng ta xử lý trường hợp không có MatchStatistics
            GoalsTeam1 = m.MatchStatistics.FirstOrDefault() != null ? m.MatchStatistics.FirstOrDefault().GoalsTeam1 : 0,
            GoalsTeam2 = m.MatchStatistics.FirstOrDefault() != null ? m.MatchStatistics.FirstOrDefault().GoalsTeam2 : 0,
            Team1Name = m.Team1.Name, // Lấy tên đội 1
            Team2Name = m.Team2.Name  // Lấy tên đội 2
        })
        .OrderByDescending(x => x.TotalCards)
        .Select(x => new MatchWithMostCardsModel
        {
            MatchID = x.Match.Id,
            TournamentName = x.Match.Tournament.Name,
            TotalCards = (int)x.TotalCards,
            MatchDate = x.Match.MatchDate ?? default(DateTime),
            GoalsTeam1 = x.GoalsTeam1, // Sử dụng giá trị đã được xử lý
            GoalsTeam2 = x.GoalsTeam2, // Sử dụng giá trị đã được xử lý
            Team1ID = x.Match.Team1.Id,
            Team1Name = x.Team1Name,
            Team2ID = x.Match.Team2.Id,
            Team2Name = x.Team2Name
        })
        .FirstOrDefaultAsync();

            return matchWithMostCards;
        }

        public async Task<MatchWithMostGoalsModel> GetMatchWithMostGoalsAsync(int tournamentId)
        {
            // Kiểm tra xem có tồn tại trận đấu nào trong giải đấu này không
            bool tournamentExists = await _context.Tournaments.AnyAsync(t => t.Id == tournamentId);
            if (!tournamentExists)
            {
                return null; // Hoặc có thể throw một exception tùy theo logic ứng dụng của bạn
            }

            // Nếu giải đấu tồn tại, tiếp tục truy vấn trận đấu có nhiều thẻ nhất
            var matchWithMostGoals = await _context.Matches
     .Where(m => m.TournamentId == tournamentId)
     .Select(m => new
     {
         Match = m,
         FirstStatistic = m.MatchStatistics.FirstOrDefault()
     })
     .Select(m => new MatchWithMostGoalsModel
     {
         MatchID = m.Match.Id,
         StartDate = m.Match.MatchDate,
         VenueID = (int)m.Match.VenueId,
         Team1Name = m.Match.Team1.Name,
         Team2Name = m.Match.Team2.Name,
         GoalsTeam1 = m.FirstStatistic != null ? (int)m.FirstStatistic.GoalsTeam1 : 0,
         GoalsTeam2 = m.FirstStatistic != null ? (int)m.FirstStatistic.GoalsTeam2 : 0,
         TotalGoals = m.FirstStatistic != null ? (int)(m.FirstStatistic.GoalsTeam1 + m.FirstStatistic.GoalsTeam2) : 0
     })
     .OrderByDescending(mg => mg.TotalGoals)
     .FirstOrDefaultAsync();


            return matchWithMostGoals;
        }

        //Đội bóng ghi nhiều bàn thắng nhất trong một giải đấu:
        public async Task<TeamWithMostGoalsModel> GetTeamWithMostGoalsAsync(int tournamentId)
        {
            var teamWithMostGoals = await _context.MatchStatistics
                .Where(ms => ms.Match.TournamentId == tournamentId)
                .GroupBy(ms => new { ms.Match.Team1Id, ms.Match.Team1.Name, ms.Match.Team1.Logo })
                .Select(g => new TeamWithMostGoalsModel
                {
                    TeamID = (int)g.Key.Team1Id,
                    TeamName = g.Key.Name,
                    Logo = g.Key.Logo,
                    TotalGoalsScored = (int)g.Sum(ms => ms.GoalsTeam1 + ms.GoalsTeam2) // Assuming this calculates correctly for both teams
                })
                .OrderByDescending(t => t.TotalGoalsScored)
                .FirstOrDefaultAsync();

            return teamWithMostGoals;
            /*
                        // Tính tổng bàn thắng cho team1
                        var team1Goals = await _context.Matches
                            .Where(m => m.TournamentId == tournamentId)
                            .GroupBy(m => new { m.Team1Id })
                            .Select(g => new { TeamId = g.Key.Team1Id, TotalGoals = g.Sum(m => m.MatchStatistics.GoalsTeam1)) })
                            .ToListAsync();

                        // Tính tổng bàn thắng cho team2
                        var team2Goals = await _context.Matches
                            .Where(m => m.TournamentId == tournamentId)
                            .GroupBy(m => new { m.Team2Id })
                            .Select(g => new { TeamId = g.Key.Team2Id, TotalGoals = g.Sum(m => m.MatchStatistics.Sum(ms => ms.GoalsTeam2)) })
                            .ToListAsync();

                        // Gộp và tính tổng bàn thắng
                        var totalGoals = team1Goals.Concat(team2Goals)
                            .GroupBy(t => t.TeamId)
                            .Select(g => new { TeamId = g.Key, TotalGoals = g.Sum(t => t.TotalGoals) })
                            .OrderByDescending(t => t.TotalGoals)
                            .FirstOrDefault();

                        if (totalGoals == null)
                        {
                            return null;
                        }

                        // Lấy thông tin đội bóng dựa trên TeamId
                        var teamInfo = await _context.Teams
                            .Where(t => t.Id == totalGoals.TeamId)
                            .Select(t => new TeamWithMostGoalsModel
                            {
                                TeamID = t.Id,
                                TeamName = t.Name,
                                Logo = t.Logo,
                                TotalGoalsScored = (int)totalGoals.TotalGoals
                            })
                            .FirstOrDefaultAsync();

                        return teamInfo;*/
        }


        public async Task<TeamWithMostCardsModel> GetTeamWithMostCardsAsync(int tournamentId)
        {
            var teamWithMostCards = await _context.Teams
                .SelectMany(team => _context.Matches
                    .Where(match => (match.Team1Id == team.Id || match.Team2Id == team.Id) && match.TournamentId == tournamentId)
                    .SelectMany(match => _context.MatchStatistics
                        .Where(ms => ms.MatchId == match.Id)
                        .Select(ms => new
                        {
                            TeamId = team.Id,
                            TeamName = team.Name,
                            Logo = team.Logo, // Select the team's logo here
                            TotalCards = ms.YellowCardsTeam1 + ms.RedCardsTeam1 + ms.YellowCardsTeam2 + ms.RedCardsTeam2
                        })))
                .GroupBy(t => new { t.TeamId, t.TeamName, t.Logo })
                .Select(group => new TeamWithMostCardsModel
                {
                    TeamID = group.Key.TeamId,
                    TeamName = group.Key.TeamName,
                    Logo = group.Key.Logo, // Include the logo in the grouped result
                    TotalCards = (int)group.Sum(t => t.TotalCards)
                })
                .OrderByDescending(t => t.TotalCards)
                .FirstOrDefaultAsync();

            return teamWithMostCards;
        }


        public async Task<PlayerWithLeagueModel> GetPlayerWithMostCardsAsync(int tournamentId)
        {
            var playerWithMostPenalties = await _context.Players
                .SelectMany(player => _context.PlayerMatchStatistics
                    .Where(pms => pms.PlayerId == player.Id && _context.Matches
                        .Any(match => match.Id == pms.MatchId && match.TournamentId == tournamentId))
                    .Select(pms => new
                    {
                        PlayerId = player.Id,
                        PlayerName = player.Name,
                        PlayerImage = player.Avatar,
                        TotalCards = pms.YellowCards + pms.RedCards
                    }))
                .GroupBy(p => new { p.PlayerId, p.PlayerName, p.PlayerImage })
                .Select(group => new PlayerWithLeagueModel
                {
                    PlayerID = group.Key.PlayerId,
                    PlayerName = group.Key.PlayerName,
                    PlayerImage = group.Key.PlayerImage,
                    TotalCards = (int)group.Sum(p => p.TotalCards)
                })
                .OrderByDescending(p => p.TotalCards)
                .FirstOrDefaultAsync();

            return playerWithMostPenalties;
        }



        public async Task<PlayerWithLeagueModel> GetPlayerWithMostGoalsAsync(int tournamentId)
        {
            var playerWithMostGoals = await _context.Players
                .SelectMany(player => _context.PlayerMatchStatistics
                    .Where(pms => pms.PlayerId == player.Id && _context.Matches
                        .Any(match => match.Id == pms.MatchId && match.TournamentId == tournamentId))
                    .Select(pms => new
                    {
                        PlayerId = player.Id,
                        PlayerName = player.Name,
                        PlayerImage = player.Avatar, // Assume there's a field for the player's image
                        TotalGoals = pms.Goals
                    }))
                .GroupBy(p => new { p.PlayerId, p.PlayerName, p.PlayerImage })
                .Select(group => new PlayerWithLeagueModel
                {
                    PlayerID = group.Key.PlayerId,
                    PlayerName = group.Key.PlayerName,
                    PlayerImage = group.Key.PlayerImage,
                    TotalGoals = (int)group.Sum(p => p.TotalGoals)
                })
                .OrderByDescending(p => p.TotalGoals)
                .FirstOrDefaultAsync();

            return playerWithMostGoals;
        }



        public async Task<List<PlayerGoalsModel>> GetAllPlayersWithMostGoalsAsync(int tournamentId)
        {
            var playersWithMostGoals = await _context.PlayerMatchStatistics
                .Where(pms => _context.Matches.Any(m => m.Id == pms.MatchId && m.TournamentId == tournamentId))
                .GroupBy(pms => new
                {
                    pms.PlayerId,
                    pms.Player.Name,
                    pms.Player.ShirtNumber,
                    pms.Player.Avatar,


                })
                .Select(g => new PlayerGoalsModel
                {
                    PlayerID = (int)g.Key.PlayerId,
                    PlayerName = g.Key.Name,
                    NumberPlayer = g.Key.ShirtNumber,
                    PlayerLogo = g.Key.Avatar,
                    //     TeamLogo = g.Key.Logo,
                    GoalsScored = (int)g.Sum(pms => pms.Goals)
                })
                .OrderByDescending(p => p.GoalsScored)
                .ToListAsync();

            return playersWithMostGoals;
        }

        /*     var playersWithGoals = await _context.Players
          .Where(p => (int)p.Goals.Any(g => g.TournamentId == tournamentId))
          .Select(p => new PlayerGoalsModel
          {
              PlayerID = p.Id,
              PlayerName = p.Name,
              NumberPlayer = p.,
              PlayerLogo = p.Logo,
              TeamLogo = p.Team.Logo, // Assuming each player is associated with a team.
              Goals = p.Goals.Count(g => g.TournamentId == tournamentId)
          })
          .OrderByDescending(p => p.Goals)
          .ToListAsync();

             return playersWithGoals;
         }
 */





    }

}

