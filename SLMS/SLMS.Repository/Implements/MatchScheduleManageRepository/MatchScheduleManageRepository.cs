using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.MacthScheduleManageDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.MatchScheduleManageRepository
{
    public class MatchScheduleManageRepository : IMatchScheduleManageRepository
    {
        private readonly SEP490Context _context;

        public MatchScheduleManageRepository(SEP490Context context)
        {
            _context = context;
        }

        public async Task<List<MatchScheduleDTO>> GetScheduleForTournament(int tournamentId)
        {
            var matches = await _context.Matches
                .Where(m => m.TournamentId == tournamentId)
                .Include(m => m.Team1)
                .Include(m => m.Team2)
                .Include(m => m.Venue)
                .Select(m => new MatchScheduleDTO
                {
                    MatchId = m.Id,
                    Team1Name = m.Team1.Name,
                    Team2Name = m.Team2.Name,
                    MatchDate = m.MatchDate,
                    VenueName = m.Venue.Name
                })
                .ToListAsync();

            return matches;
        }

        /*public async Task<bool> SaveMatchDetailsList(SaveMatchDetailsListDTO batchDto)
        {
            var matchesToAdd = batchDto.MatchDetailsList.Select(d => new Match
            {
                TournamentId = batchDto.TournamentId,
                Team1Id = d.Team1Id,
                Team2Id = d.Team2Id,
                MatchDate = d.MatchDate,
                VenueId = d.VenueId
            }).ToList();

            await _context.Matches.AddRangeAsync(matchesToAdd);
            var saved = await _context.SaveChangesAsync();
            return saved > 0;
        }*/


        public async Task<bool> UpdateMatchDetailsList(UpdateMatchDetailsListDTO updateDto)
        {
            foreach (var matchDto in updateDto.MatchDetailsList)
            {
                var match = await _context.Matches.FindAsync(matchDto.MatchId);
                if (match != null && match.TournamentId == updateDto.TournamentId)
                {
                    match.Team1Id = matchDto.Team1Id;
                    match.Team2Id = matchDto.Team2Id;
                    match.MatchDate = matchDto.MatchDate;
                    match.VenueId = matchDto.VenueId;
                    _context.Matches.Update(match);
                }
            }

            var updated = await _context.SaveChangesAsync();
            return updated > 0;
        }

    }
}
