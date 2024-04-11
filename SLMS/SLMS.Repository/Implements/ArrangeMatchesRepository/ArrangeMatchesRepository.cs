using SLMS.Core.Model;
using SLMS.DTO.AdminDTO;
using SLMS.DTO.ArrangeMatchesDTO;
using SLMS.DTO.LeagueDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.ArrangeMatchesRepository
{
    public class ArrangeMatchesRepository : IArrangeMatchesRepository
    {
        private readonly SEP490Context _context;
        public ArrangeMatchesRepository(SEP490Context context)
        {
            _context = context;
        }

        public TournamentArrangeDetails GetAllConfigAndListTeamsInTournament(int tournamentId)
        {
            // Get tournament configuration
            var config = _context.Tournaments
                                 .Where(t => t.Id == tournamentId)
                                 .Select(t => new TournamentArrangeConfigDTO
                                 {
                                     NumberOfTeams = t.NumberOfTeams, //số đội tham gia
                                     NumberOfGroups = t.GroupStages.Count(), //số bảng thuộc giải đấu ̣̣nếu có
                                     NumberOfTeamsAdvancing = t.NumberOfTeamsToNextRound, //tổng số đội tiến vào vòng trong của giải đấu sau giai đoạn đấu bảng
                                     RoundRobinRounds = t.NumberOfTurns, //số lượt đá vòng tròn ở mỗi bảng đấu
                                     NumberOfRoundsInRoundRobinFormat = t.NumberOfRounds //số vòng đá trong thể loại "đấu vòng tròn"
                                     // ... Other configuration properties
                                 })
                                 .FirstOrDefault();

            // Get teams either directly or through TeamRegistrations
            var teams = _context.Teams
                                .Where(t => t.TournamentId == tournamentId || t.TeamRegistrations.Any(tr => tr.TournamentId == tournamentId && tr.ApprovalStatus == "Approve"))
                                .Select(t => new TeamArrangeMatches
                                {
                                    Id = t.Id,
                                    Name = t.Name,
                                    Logo = t.Logo
                                    // ... Other team properties
                                })
                                .ToList();

            return new TournamentArrangeDetails
            {
                Config = config,
                Teams = teams
            };
        }

        public void SaveMatchPairings(SaveMatchPairingsDTO saveMatchPairingsDto)
        {
            var matchesToAdd = saveMatchPairingsDto.Pairings.Select(pairing => new Match
            {
                TournamentId = saveMatchPairingsDto.TournamentId ?? null,
                Team1Id = pairing.Team1Id ?? null,
                Team2Id = pairing.Team2Id ?? null,
                PhaseId = (pairing.PhaseId == 0) ? null : pairing.PhaseId,
                GroupStageId = (pairing.GroupStageId == 0) ? null : pairing.GroupStageId,
                KnockOutStageId = (pairing.KnockOutStageId == 0) ? null : pairing.KnockOutStageId,
                RoundRobinId = (pairing.RoundRobinId == 0) ? null : pairing.RoundRobinId
                // ... Initialize other properties as needed
            }).ToList();

            _context.Matches.AddRange(matchesToAdd);
            _context.SaveChanges();
        }
    }
}
