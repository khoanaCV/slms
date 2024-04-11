using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.MatchInfoDTO;


namespace SLMS.Repository.Implements.MatchRepository
{
    public class MatchRepository : IMatchRepository
    {
        private readonly SEP490Context _context;

        public MatchRepository(SEP490Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MatchInfoDTO>> GetMatchInfosAsync(int tournamentId, int? phaseId, int? groupStageId, int? knockoutStageId, int? roundRobinId, int? venueId)
        {
            var query = from m in _context.Matches
                        join t1 in _context.Teams on m.Team1Id equals t1.Id // Join with Team for Team1
                        join t2 in _context.Teams on m.Team2Id equals t2.Id // Join with Team for Team2
                        join t in _context.Tournaments on m.TournamentId equals t.Id // Join with Tournament
                        join ms in _context.MatchStatistics on m.Id equals ms.MatchId into msGroup
                        from ms in msGroup.DefaultIfEmpty()
                        where m.TournamentId == tournamentId
                        select new { m, t1, t2, t, ms };

            if (phaseId.HasValue)
                query = query.Where(x => x.m.PhaseId == phaseId);
            if (groupStageId.HasValue)
                query = query.Where(x => x.m.GroupStageId == groupStageId);
            if (knockoutStageId.HasValue)
                query = query.Where(x => x.m.KnockOutStageId == knockoutStageId);
            if (roundRobinId.HasValue)
                query = query.Where(x => x.m.RoundRobinId == roundRobinId);
            if (venueId.HasValue)
                query = query.Where(x => x.m.VenueId == venueId);

            var result = await query.Select(x => new MatchInfoDTO
            {
                Id = x.m.Id,
                Team1Name = x.m.Team1.Name, // Ensure you have included navigation properties in your DbContext configuration
                Team1Id = x.m.Team1.Id,
                Team2Name = x.m.Team2.Name,
                Team2Id = x.m.Team2.Id,
                MatchDate = x.m.MatchDate,
                StartTime = x.m.StartTime,
                VenueName = x.m.Venue.Name,
                PhaseName = x.m.Phase.PhaseName,
                StageName = x.m.GroupStage != null ? x.m.GroupStage.Name : x.m.KnockOutStage != null ? x.m.KnockOutStage.Name : x.m.RoundRobin.Name,
                CurrentStatus = x.m.CurrentStatus,
                GoalsTeam1 = x.m.CurrentStatus == "completed" ? x.ms.GoalsTeam1 ?? 0 : (int?)null,
                GoalsTeam2 = x.m.CurrentStatus == "completed" ? x.ms.GoalsTeam2 ?? 0 : (int?)null,
                SubGoalsTeam1 = x.m.CurrentStatus == "completed" ? x.ms.SubGoalsTeam1 ?? 0 : (int?)null,
                SubGoalsTeam2 = x.m.CurrentStatus == "completed" ? x.ms.SubGoalsTeam2 ?? 0 : (int?)null,
                LogoTeam1 = x.t1.Logo,
                LogoTeam2 = x.t2.Logo,
                TournamentName = x.t.Name,
            }).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<GroupStageDTO>> GetGroupStagesAsync(int tournamentId, int? phaseId)
        {
            return await _context.GroupStages
                .Where(gs => gs.TournamentId == tournamentId && gs.PhaseId == phaseId)
                .Select(gs => new GroupStageDTO
                {
                    Id = gs.Id,
                    Name = gs.Name
                    // Map other properties as needed
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<KnockoutStageDTO>> GetKnockoutStagesAsync(int tournamentId, int? phaseId)
        {
            return await _context.KnockoutStages
                .Where(ks => ks.TournamentId == tournamentId && ks.PhaseId == phaseId)
                .Select(ks => new KnockoutStageDTO
                {
                    Id = ks.Id,
                    Name = ks.Name
                    // Map other properties as needed
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<RoundRobinDTO>> GetRoundRobinsAsync(int tournamentId)
        {
            return await _context.RoundRobins
                .Where(rr => rr.TournamentId == tournamentId)
                .Select(rr => new RoundRobinDTO
                {
                    Id = rr.Id,
                    Name = rr.Name
                    // Map other properties as needed
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<KnockoutStagesTypesDTO>> GetKnockoutStagesTypeAsync(int tournamentId)
        {
            return await _context.KnockoutStages
                .Where(rr => rr.TournamentId == tournamentId)
                .Select(rr => new KnockoutStagesTypesDTO
                {
                    Id = rr.Id,
                    Name = rr.Name
                    // Map other properties as needed
                })
                .ToListAsync();
        }
    }

}
