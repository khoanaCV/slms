using Google;
using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.MacthReportsDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.Repository.Implements.MatchReportRepository
{
    public class MatchReportRepository : IMatchReportRepository
    {
        private readonly SEP490Context _context;

        public MatchReportRepository(SEP490Context context)
        {
            _context = context;
        }

        public async Task<MatchReportDTO> GetAsync(int id)
        {
            var match = await _context.Matches
       .AsNoTracking()
       .Include(m => m.Tournament)
       .Include(m => m.Team1)
       .Include(m => m.Team2)
       .Include(m => m.Venue)
       .Include(m => m.MatchStatistics)
       .Include(m => m.MatchEvents)
           .ThenInclude(me => me.Player)
       .Include(m => m.MatchEvents)
           .ThenInclude(me => me.Team)
       .Include(m => m.PlayerMatchStatistics)
           .ThenInclude(pms => pms.Player)
       .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
            {
                return null;
            }

            // Assuming MatchStatistic and MatchEvent contain the needed data.
            var matchStatistic = await _context.MatchStatistics
                .AsNoTracking()
                .FirstOrDefaultAsync(ms => ms.MatchId == id);

            var matchEvents = await _context.MatchEvents
                .AsNoTracking()
                .Where(me => me.MatchId == id)
                .ToListAsync();

            var playerMatchStatistics = await _context.PlayerMatchStatistics
                .AsNoTracking()
                .Where(pms => pms.MatchId == id)
                .ToListAsync();

            var matchReportDto = new MatchReportDTO
            {
                MatchId = match.Id,
                TournamentId = match.TournamentId,
                TournamentName = match.Tournament?.Name,
                Team1Id = match.Team1Id,
                Team1Name = match.Team1?.Name,
                Team2Id = match.Team2Id,
                Team2Name = match.Team2?.Name,
                VenueId = match.VenueId,
                VenueName = match.Venue?.Name,
                MatchDate = match.MatchDate,
                StartTime = match.StartTime,
                MainReferee = match.MainReferee,
                ReportCreatorName = match.ReportCreatorName,
                MatchEvents = match.MatchEvents.Select(me => new MatchEventDTO
                {
                    MatchId = me.MatchId,
                    EventType = me.EventType,
                    EventMinute = me.EventMinute,
                    PlayerId = me.PlayerId,
                    PlayerName = me.Player?.Name,
                    ShirtNumber = me.Player?.ShirtNumber,
                    TeamId = me.TeamId,
                    TeamName = me.Team?.Name,
                    Description = me.Description
                }).ToList(),
                MatchStatistics = match.MatchStatistics.Select(ms => new MatchStatisticDTO
                {
                    MatchId = matchStatistic.MatchId != null ? matchStatistic.MatchId: 0,
                    FirstHalfExtraTime = matchStatistic.FirstHalfExtraTime != null ? matchStatistic.FirstHalfExtraTime :0,
                    SecondHalfExtraTime = matchStatistic.SecondHalfExtraTime != null ? matchStatistic.SecondHalfExtraTime : 0 ,
                    GoalsTeam1 = matchStatistic.GoalsTeam1 != null ? matchStatistic.GoalsTeam1 : 0,
                    GoalsTeam2 = matchStatistic.GoalsTeam2 != null ? matchStatistic.GoalsTeam2 : 0,
                    SubGoalsTeam1 = matchStatistic.SubGoalsTeam1 != null ? matchStatistic.SubGoalsTeam1 : 0,
                    SubGoalsTeam2 = matchStatistic.SubGoalsTeam2 != null ? matchStatistic.SubGoalsTeam2 : 0,
                    YellowCardsTeam1= matchStatistic.YellowCardsTeam1 != null ? matchStatistic.YellowCardsTeam1 : 0,
                    RedCardsTeam1= matchStatistic.RedCardsTeam1 != null ? matchStatistic.RedCardsTeam1 : 0,
                    YellowCardsTeam2= matchStatistic.YellowCardsTeam2 != null ? matchStatistic.YellowCardsTeam2 : 0,
                    RedCardsTeam2= matchStatistic.RedCardsTeam2 != null ? matchStatistic.RedCardsTeam2 : 0
                }).FirstOrDefault(),
                PlayerMatchStatistics = match.PlayerMatchStatistics.Select(pms => new PlayerMatchStatisticDTO
                {
                    PlayerId = pms.PlayerId,
                    Goals = pms.Goals,
                    Assists = pms.Assists,
                    YellowCards = pms.YellowCards,
                    RedCards = pms.RedCards
                    // ... other properties as needed ...
                }).ToList()
            };

            return matchReportDto;
        }

        public async Task<bool> CreateOrUpdatePartOneAsync(PartOneDTO partOneDto)
        {
            // Check if the match already exists
            var match = await _context.Matches
                                      .Include(m => m.MatchStatistics) // Assuming Match has a collection of MatchStatistics
                                      .FirstOrDefaultAsync(m => m.Id == partOneDto.MatchId);

            if (match == null)
            {
                // If not found, create a new Match along with MatchStatistic
                match = new Match
                {
                    Id = (int)partOneDto.MatchId,
                    Team1Id= partOneDto.Team1Id,
                    Team2Id= partOneDto.Team2Id,
                    ReportCreatorName = partOneDto.ReportCreatorName,
                    MainReferee = partOneDto.MainReferee
                    // Populate other Match properties if necessary
                };

                var matchStatistic = new MatchStatistic
                {
                    FirstHalfExtraTime = partOneDto.FirstHalfExtraTime,
                    SecondHalfExtraTime = partOneDto.SecondHalfExtraTime,
                    GoalsTeam1 = partOneDto.GoalsTeam1,
                    GoalsTeam2 = partOneDto.GoalsTeam2,
                    SubGoalsTeam1 = partOneDto.SubGoalsTeam1,
                    SubGoalsTeam2 = partOneDto.SubGoalsTeam2,
                    YellowCardsTeam1 = partOneDto.YellowCardsTeam1,
                    RedCardsTeam1 = partOneDto.RedCardsTeam1,
                    YellowCardsTeam2 = partOneDto.YellowCardsTeam2,
                    RedCardsTeam2 = partOneDto.RedCardsTeam2
                    // Populate other MatchStatistic properties if necessary
                };
                match.MatchStatistics.Add(matchStatistic);

                _context.Matches.Add(match);
            }
            else
            {
                // If found, update the existing Match and its MatchStatistic
                match.Team1Id = partOneDto.Team1Id;
                match.Team2Id = partOneDto.Team2Id;
                match.ReportCreatorName = partOneDto.ReportCreatorName;
                match.MainReferee = partOneDto.MainReferee;
                // Update other Match properties if necessary

                var matchStatistic = match.MatchStatistics.FirstOrDefault();
                if (matchStatistic != null)
                {
                    // Update existing MatchStatistic
                    matchStatistic.FirstHalfExtraTime = partOneDto.FirstHalfExtraTime;
                    matchStatistic.SecondHalfExtraTime = partOneDto.SecondHalfExtraTime;
                    matchStatistic.GoalsTeam1 = partOneDto.GoalsTeam1;
                    matchStatistic.GoalsTeam2 = partOneDto.GoalsTeam2;
                    matchStatistic.SubGoalsTeam1 = partOneDto.SubGoalsTeam1;
                    matchStatistic.SubGoalsTeam2 = partOneDto.SubGoalsTeam2;
                    matchStatistic.YellowCardsTeam1 = partOneDto.YellowCardsTeam1;
                    matchStatistic.RedCardsTeam1 = partOneDto.RedCardsTeam1;
                    matchStatistic.YellowCardsTeam2 = partOneDto.YellowCardsTeam2;
                    matchStatistic.RedCardsTeam2 = partOneDto.RedCardsTeam2;
                    // Update other MatchStatistic properties if necessary
                }
                else
                {
                    // If MatchStatistic does not exist, create a new one
                    matchStatistic = new MatchStatistic
                    {
                        MatchId = match.Id,
                        FirstHalfExtraTime = partOneDto.FirstHalfExtraTime,
                        SecondHalfExtraTime = partOneDto.SecondHalfExtraTime,
                        GoalsTeam1 = partOneDto.GoalsTeam1,
                        GoalsTeam2 = partOneDto.GoalsTeam2,
                        SubGoalsTeam1 = partOneDto.SubGoalsTeam1,
                        SubGoalsTeam2 = partOneDto.SubGoalsTeam2,
                        YellowCardsTeam1 = partOneDto.YellowCardsTeam1,
                        RedCardsTeam1 = partOneDto.RedCardsTeam1,
                        YellowCardsTeam2 = partOneDto.YellowCardsTeam2,
                        RedCardsTeam2 = partOneDto.RedCardsTeam2
                        // Populate other MatchStatistic properties if necessary
                    };
                    _context.MatchStatistics.Add(matchStatistic);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                return false;
            }
        }

        public async Task<bool> ProcessMatchEventsAndStatisticsAsync(PartTwoDTO partTwoDto)
        {
            foreach (var eventDto in partTwoDto.Events)
            {
                // Retrieve player's name based on PlayerId
                var playerName = await _context.Players
                                                .Where(p => p.Id == eventDto.PlayerId)
                                                .Select(p => p.Name)
                                                .FirstOrDefaultAsync();
                // If playerName is not null, assign it to eventDto
                if (!string.IsNullOrEmpty(playerName))
                {
                    eventDto.PlayerName = playerName;
                }

                var matchEvent = new MatchEvent
                {
                    MatchId = eventDto.MatchId,
                    EventType = eventDto.EventType,
                    EventMinute = eventDto.EventMinute,
                    PlayerId = eventDto.PlayerId,
                    TeamId = eventDto.TeamId,
                    Description = eventDto.Description,
                    EventCreatedAt = DateTime.Now, // Assuming creation time is now
                                                   // Populate other MatchEvent fields as necessary
                };

                _context.MatchEvents.Add(matchEvent);

                // Logic to update PlayerMatchStatistic based on EventType
                // This assumes that a record exists for each player in each match. Adjust logic if that's not the case.
                var playerStat = await _context.PlayerMatchStatistics
                                               .FirstOrDefaultAsync(p => p.MatchId == eventDto.MatchId && p.PlayerId == eventDto.PlayerId);
                if (playerStat == null)
                {
                    // Handle case where no statistics exist yet for this player in this match
                    playerStat = new PlayerMatchStatistic
                    {
                        PlayerId = eventDto.PlayerId,
                        MatchId = eventDto.MatchId,
                        Goals = 0,
                        YellowCards = 0,
                        RedCards = 0,
                        // Initialize other statistics as needed
                    };
                    _context.PlayerMatchStatistics.Add(playerStat);
                }

                switch (eventDto.EventType)
                {
                    case "Goal":
                        playerStat.Goals++;
                        break;
                    case "YellowCard":
                        playerStat.YellowCards++;
                        break;
                    case "RedCard":
                        playerStat.RedCards++;
                        break;
                        // Handle other event types as needed
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Log the exception
                return false;
            }
        }

        /*public async Task<MatchReportDTO> CreateOrUpdateAsync(MatchReportDTO matchReportDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var match = await _context.Matches
                                          .Include(m => m.MatchStatistics)
                                          .Include(m => m.MatchEvents)
                                          .Include(m => m.PlayerMatchStatistics)
                                          .SingleOrDefaultAsync(m => m.Id == matchReportDto.MatchId);

                if (match == null)
                {
                    // Tạo mới trận đấu và các bảng liên quan nếu không tồn tại
                    match = new Match
                    {
                        Id = matchReportDto.MatchId.Value,
                        // Thiết lập các thuộc tính khác của trận đấu từ matchReportDto
                    };
                    _context.Matches.Add(match);
                }
                else
                {
                    // Nếu trận đấu tồn tại, xóa dữ liệu cũ trước khi cập nhật dữ liệu mới
                    _context.MatchEvents.RemoveRange(match.MatchEvents);
                    _context.PlayerMatchStatistics.RemoveRange(match.PlayerMatchStatistics);
                    // Không xóa MatchStatistic vì nó sẽ được cập nhật dưới đây
                }

                // Xử lý thêm hoặc cập nhật MatchStatistic
                UpdateOrAddMatchStatistic(match, matchReportDto.MatchStatistics);

                // Biến tạm để lưu trữ các thống kê cầu thủ tạm thời dựa trên sự kiện
                var tempPlayerStats = new Dictionary<int, PlayerMatchStatistic>();

                // Thêm mới MatchEvents từ matchReportDto và cập nhật thống kê cầu thủ tương ứng
                foreach (var eventDto in matchReportDto.MatchEvents ?? new List<MatchEventDTO>())
                {
                    var matchEvent = new MatchEvent
                    {
                        MatchId = matchReportDto?.MatchId.Value,
                        EventType = eventDto?.EventType,
                        EventMinute = eventDto?.EventMinute ?? 0,
                        PlayerId = eventDto?.PlayerId,
                        TeamId = eventDto?.TeamId,
                        Description = eventDto?.Description
                    };
                    match.MatchEvents.Add(matchEvent);

                    if (!tempPlayerStats.TryGetValue(eventDto.PlayerId.Value, out var playerStat))
                    {
                        playerStat = new PlayerMatchStatistic
                        {
                            PlayerId = eventDto?.PlayerId.Value,
                            MatchId = matchReportDto?.MatchId.Value,
                            Goals = 0, // Khởi tạo giá trị bàn thắng là 0
                            Assists = 0, // Khởi tạo giá trị kiến tạo là 0
                            YellowCards = 0, // Khởi tạo giá trị thẻ vàng là 0
                            RedCards = 0, // Khởi tạo giá trị thẻ đỏ là 0
                        };
                        tempPlayerStats[eventDto.PlayerId.Value] = playerStat;
                    }

                    // Cập nhật thống kê dựa trên loại sự kiện
                    switch (eventDto.EventType)
                    {
                        case "Goal":
                            playerStat.Goals++; // Tăng số bàn thắng
                            break;
                        case "Assist":
                            playerStat.Assists++; // Tăng số lần kiến tạo
                            break;
                        case "YellowCard":
                            playerStat.YellowCards++; // Tăng số thẻ vàng
                            break;
                        case "RedCard":
                            playerStat.RedCards++; // Tăng số thẻ đỏ
                            break;
                    }
                }

                // Thêm hoặc cập nhật PlayerMatchStatistics vào cơ sở dữ liệu
                foreach (var stat in tempPlayerStats.Values)
                {
                    _context.PlayerMatchStatistics.Add(stat);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return matchReportDto; // Trả về DTO sau khi xử lý
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception($"An error occurred while creating or updating the match report: {ex.Message}", ex);
            }
        }

        private void UpdateOrAddMatchStatistic(Match match, MatchStatisticDTO matchStatisticDto)
        {
            var matchStatistic = match.MatchStatistics.FirstOrDefault();
            if (matchStatistic == null)
            {
                matchStatistic = new MatchStatistic
                {
                    MatchId = match?.Id,
                    FirstHalfExtraTime = matchStatisticDto.FirstHalfExtraTime,
                    SecondHalfExtraTime = matchStatisticDto.SecondHalfExtraTime,
                    GoalsTeam1 = matchStatisticDto.GoalsTeam1,
                    GoalsTeam2 = matchStatisticDto.GoalsTeam2,
                    SubGoalsTeam1 = matchStatisticDto.SubGoalsTeam1,
                    SubGoalsTeam2 = matchStatisticDto.SubGoalsTeam2,
                    // Tiếp tục với các thuộc tính khác
                };
                _context.MatchStatistics.Add(matchStatistic);
            }
            else
            {
                // Cập nhật thuộc tính của matchStatistic từ matchStatisticDto nếu có giá trị
                if (matchStatisticDto.FirstHalfExtraTime.HasValue)
                {
                    matchStatistic.FirstHalfExtraTime = matchStatisticDto.FirstHalfExtraTime;
                }
                if (matchStatisticDto.SecondHalfExtraTime.HasValue)
                {
                    matchStatistic.SecondHalfExtraTime = matchStatisticDto.SecondHalfExtraTime;
                }
                if (matchStatisticDto.GoalsTeam1.HasValue)
                {
                    matchStatistic.GoalsTeam1 = matchStatisticDto.GoalsTeam1;
                }
                if (matchStatisticDto.GoalsTeam2.HasValue)
                {
                    matchStatistic.GoalsTeam2 = matchStatisticDto.GoalsTeam2;
                }
                if (matchStatisticDto.SubGoalsTeam1.HasValue)
                {
                    matchStatistic.SubGoalsTeam1 = matchStatisticDto.SubGoalsTeam1;
                }
                if (matchStatisticDto.SubGoalsTeam2.HasValue)
                {
                    matchStatistic.SubGoalsTeam2 = matchStatisticDto.SubGoalsTeam2;
                }
                // Tiếp tục với các thuộc tính khác
            }
        }*/


        /* public async Task<MatchReportDTO> CreateAsync(MatchReportDTO matchReportDto)
         {
             using var transaction = await _context.Database.BeginTransactionAsync();
             try
             {
                 // First, check if the Match exists
                 var match = await _context.Matches.FindAsync(matchReportDto.MatchId);
                 if (match == null)
                 {
                     // Handling the case where the match doesn't exist.
                     // The caller should be informed that the operation failed due to a non-existent MatchId.
                     throw new ArgumentException($"No match found with ID {matchReportDto.MatchId}");
                 }

                 // If MatchStatisticDTO is provided, create and add new MatchStatistic
                 if (matchReportDto.MatchStatistics != null)
                 {
                     var existingStatistic = await _context.MatchStatistics
                         .SingleOrDefaultAsync(ms => ms.MatchId == matchReportDto.MatchId);

                     if (existingStatistic == null)
                     {
                         var matchStatistic = new MatchStatistic
                         {
                             MatchId = matchReportDto.MatchId.Value,
                             FirstHalfExtraTime = matchReportDto.MatchStatistics.FirstHalfExtraTime,
                             SecondHalfExtraTime = matchReportDto.MatchStatistics.SecondHalfExtraTime,
                             GoalsTeam1 = matchReportDto.MatchStatistics.GoalsTeam1,
                             GoalsTeam2 = matchReportDto.MatchStatistics.GoalsTeam2,
                             SubGoalsTeam1 = matchReportDto.MatchStatistics.SubGoalsTeam1,
                             SubGoalsTeam2 = matchReportDto.MatchStatistics.SubGoalsTeam2
                         };
                         _context.MatchStatistics.Add(matchStatistic);
                     }
                     else
                     {
                         // Update the existing statistics if they already exist.
                         existingStatistic.FirstHalfExtraTime = matchReportDto.MatchStatistics.FirstHalfExtraTime;
                         existingStatistic.SecondHalfExtraTime = matchReportDto.MatchStatistics.SecondHalfExtraTime;
                         existingStatistic.GoalsTeam1 = matchReportDto.MatchStatistics.GoalsTeam1;
                         existingStatistic.GoalsTeam2 = matchReportDto.MatchStatistics.GoalsTeam2;
                         existingStatistic.SubGoalsTeam1 = matchReportDto.MatchStatistics.SubGoalsTeam1;
                         existingStatistic.SubGoalsTeam2 = matchReportDto.MatchStatistics.SubGoalsTeam2;
                         _context.MatchStatistics.Update(existingStatistic);
                     }
                 }

                 // Add or update each MatchEventDTO
                 if (matchReportDto.MatchEvents != null)
                 {
                     foreach (var eventDto in matchReportDto.MatchEvents)
                     {
                         var matchEvent = new MatchEvent
                         {
                             MatchId = matchReportDto.MatchId.Value,
                             EventType = eventDto.EventType,
                             EventMinute = eventDto.EventMinute,
                             PlayerId = eventDto.PlayerId,
                             TeamId = eventDto.TeamId,
                             Description = eventDto.Description
                         };
                         _context.MatchEvents.Add(matchEvent);
                     }
                 }

                 if (matchReportDto.PlayerMatchStatistics != null)
                 {
                     foreach (var playerStatDto in matchReportDto.PlayerMatchStatistics)
                     {
                         var playerMatchStat = new PlayerMatchStatistic
                         {
                             MatchId = matchReportDto.MatchId.Value,
                             PlayerId = playerStatDto.PlayerId,
                             Goals = playerStatDto.Goals,
                             Assists = playerStatDto.Assists,
                             YellowCards = playerStatDto.YellowCards,
                             RedCards = playerStatDto.RedCards
                             // ... other statistics ...
                         };

                         // Add or update logic as needed
                         _context.PlayerMatchStatistics.Add(playerMatchStat);
                     }
                 }

                 await _context.SaveChangesAsync();
                 await transaction.CommitAsync();

                 return matchReportDto;
             }
             catch (Exception ex)
             {
                 await transaction.RollbackAsync();
                 // Depending on how you want to handle exceptions, you might want to log this exception
                 // and then throw a custom exception that the controller can catch to return the proper response.
                 throw new Exception($"An error occurred while creating the match report: {ex.Message}", ex);
             }
         }*/



        /*   public async Task<MatchReportDTO> UpdateAsync(int id, MatchReportDTO matchReportDto)
           {
               // Start a transaction
               using var transaction = await _context.Database.BeginTransactionAsync();

               try
               {
                   var match = await _context.Matches.FindAsync(id);
                   if (match == null)
                   {
                       throw new ArgumentException($"No match found with ID {id}");
                   }

                   // Update match details if necessary
                   // match.TournamentId = matchReportDto.TournamentId; // Update if needed
                   // match.VenueId = matchReportDto.VenueId; // Update if needed
                   // ... other properties ...

                   // Update MatchStatistic
                   var matchStatistic = await _context.MatchStatistics.FirstOrDefaultAsync(ms => ms.MatchId == id);
                   if (matchStatistic != null && matchReportDto.MatchStatistics != null)
                   {
                       matchStatistic.FirstHalfExtraTime = matchReportDto.MatchStatistics.FirstHalfExtraTime;
                       matchStatistic.SecondHalfExtraTime = matchReportDto.MatchStatistics.SecondHalfExtraTime;
                       matchStatistic.GoalsTeam1 = matchReportDto.MatchStatistics.GoalsTeam1;
                       matchStatistic.GoalsTeam2 = matchReportDto.MatchStatistics.GoalsTeam2;
                       matchStatistic.SubGoalsTeam1 = matchReportDto.MatchStatistics.SubGoalsTeam1;
                       matchStatistic.SubGoalsTeam2 = matchReportDto.MatchStatistics.SubGoalsTeam2;
                       // ... other statistics ...
                   }

                   // Update MatchEvents
                   var existingEvents = await _context.MatchEvents.Where(me => me.MatchId == id).ToListAsync();
                   _context.MatchEvents.RemoveRange(existingEvents); // Remove current events

                   if (matchReportDto.MatchEvents != null)
                   {
                       foreach (var eventDto in matchReportDto.MatchEvents) // Add new events
                       {
                           var matchEvent = new MatchEvent
                           {
                               MatchId = id,
                               EventType = eventDto.EventType,
                               EventMinute = eventDto.EventMinute,
                               PlayerId = eventDto.PlayerId,
                               TeamId = eventDto.TeamId,
                               Description = eventDto.Description
                           };
                           _context.MatchEvents.Add(matchEvent);
                       }
                   }

                   // Update PlayerMatchStatistics
                   var existingPlayerStats = await _context.PlayerMatchStatistics.Where(pms => pms.MatchId == id).ToListAsync();
                   _context.PlayerMatchStatistics.RemoveRange(existingPlayerStats); // Remove current player stats

                   if (matchReportDto.PlayerMatchStatistics != null)
                   {
                       foreach (var playerStatDto in matchReportDto.PlayerMatchStatistics) // Add new player stats
                       {
                           var playerMatchStatistic = new PlayerMatchStatistic
                           {
                               MatchId = id,
                               PlayerId = playerStatDto.PlayerId,
                               Goals = playerStatDto.Goals,
                               Assists = playerStatDto.Assists,
                               YellowCards = playerStatDto.YellowCards,
                               RedCards = playerStatDto.RedCards
                               // ... other stats ...
                           };
                           _context.PlayerMatchStatistics.Add(playerMatchStatistic);
                       }
                   }

                   await _context.SaveChangesAsync();
                   await transaction.CommitAsync();

                   return matchReportDto; // Return the updated match report DTO
               }
               catch (Exception ex)
               {
                   await transaction.RollbackAsync();
                   throw new Exception($"An error occurred while updating the match report: {ex.Message}", ex);
               }
           }*/




        // ... Implementations of other methods
    }
}
