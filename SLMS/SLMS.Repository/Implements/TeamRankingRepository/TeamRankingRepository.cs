using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.TeamRankingDTO;

namespace SLMS.Repository.Implements.TeamRankingRepository
{
    public class TeamRankingRepository : ITeamRankingRepository
    {
        private readonly SEP490Context _context;

        public TeamRankingRepository(SEP490Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TeamRankingDTO>> GetTeamStandingsAsync(int tournamentId)
        {
            var teams = await _context.Teams
                                      .Where(t => t.TeamRegistrations.Any(tr => tr.TournamentId == tournamentId && tr.ApprovalStatus == "Approve"))
                                      .ToListAsync();
            var teamStandings = teams.Select(team => CalculateTeamStatistics(team, tournamentId)).ToList();

            // Order by points, goal difference, and then fewer total cards
            return teamStandings.OrderByDescending(ts => ts.Points)
                                .ThenByDescending(ts => ts.GoalDifference)
                                .ThenBy(ts => ts.TotalCards); // Fewer cards as the next criterion
        }

        private TeamRankingDTO CalculateTeamStatistics(Team team, int tournamentId)
        {
            var tournament = _context.Tournaments.FirstOrDefault(t => t.Id == tournamentId);
            int winPoints = tournament?.WinPoints ?? 3;  // Default to 3 if null
            int drawPoints = tournament?.DrawPoints ?? 1;  // Default to 1 if null
            int lossPoints = tournament?.LossPoints ?? 0;  // Default to 0 if null

            var teamStats = new TeamRankingDTO
            {
                TeamName = team.Name,
                Logo = team.Logo,
                Played = 0,
                Win = 0,
                Draw = 0,
                Lose = 0,
                GoalsFor = 0,
                GoalsAgainst = 0,
                Points = 0,
                YellowCards = 0,
                RedCards = 0
            };

            var matches = _context.MatchStatistics
                                  .Where(ms => (ms.Match.Team1Id == team.Id || ms.Match.Team2Id == team.Id) && ms.Match.TournamentId == tournamentId);

            foreach (var match in matches)
            {
                bool isTeam1 = match.Match?.Team1Id == team.Id;
                int goalsFor = isTeam1 ? match.GoalsTeam1 ?? 0 : match.GoalsTeam2 ?? 0;
                int goalsAgainst = isTeam1 ? match.GoalsTeam2 ?? 0 : match.GoalsTeam1 ?? 0;
                int yellowCards = isTeam1 ? match.YellowCardsTeam1 ?? 0 : match.YellowCardsTeam2 ?? 0;
                int redCards = isTeam1 ? match.RedCardsTeam1 ?? 0 : match.RedCardsTeam2 ?? 0;

                teamStats.Played++;
                teamStats.GoalsFor += goalsFor;
                teamStats.GoalsAgainst += goalsAgainst;
                teamStats.YellowCards += yellowCards;
                teamStats.RedCards += redCards;

                if (goalsFor > goalsAgainst)
                {
                    teamStats.Win++;
                    teamStats.Points += winPoints;
                }
                else if (goalsFor == goalsAgainst)
                {
                    teamStats.Draw++;
                    teamStats.Points += drawPoints;
                }
                else
                {
                    teamStats.Lose++;
                    teamStats.Points += lossPoints;
                }
            }

            return teamStats;
        }
    }
}
