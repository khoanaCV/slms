
namespace SLMS.DTO.MacthReportsDTO
{
    public class MatchEventDTO
    {
        public int? MatchId { get; set; }
        public string? EventType { get; set; }
        public int? EventMinute { get; set; }
        public int? PlayerId { get; set; }
        public string? PlayerName { get; set; }
        public string? ShirtNumber { get; set; }
        public int? TeamId { get; set; }
        public string? TeamName { get; set; }
        public string? Description { get; set; }
    }

    public class MatchStatisticDTO
    {
        // Assuming these are the statistics you want to collect.\
        public int? MatchId { get; set; }
        public int? FirstHalfExtraTime { get; set; }
        public int? SecondHalfExtraTime { get; set; }
        public int? GoalsTeam1 { get; set; }
        public int? GoalsTeam2 { get; set; }
        public int? SubGoalsTeam1 { get; set; }
        public int? SubGoalsTeam2 { get; set; }
        public int? YellowCardsTeam1 { get; set; }
        public int? RedCardsTeam1 { get; set; }
        public int? YellowCardsTeam2 { get; set; }
        public int? RedCardsTeam2 { get; set; }
        // ... Add properties for other statistics you are tracking ...
    }

    public class PlayerMatchStatisticDTO
    {
        public int? PlayerId { get; set; }
        public int? MatchId { get; set; }
        public int? Goals { get; set; }
        public int? Assists { get; set; }
        public int? YellowCards { get; set; }
        public int? RedCards { get; set; }
        // ... other player statistic properties ...
    }

    public class MatchReportDTO
    {
        public int? MatchId { get; set; }
        public int? TournamentId { get; set; }
        public string? TournamentName { get; set; }
        public int? Team1Id { get; set; }
        public string? Team1Name { get; set; }
        public int? Team2Id { get; set; }
        public string? Team2Name { get; set; }
        public int? VenueId { get; set; }
        public string? VenueName { get; set; }
        public DateTime? MatchDate { get; set; }
        public DateTime? StartTime { get; set; }
        public string? MainReferee { get; set; }
        public string? ReportCreatorName { get; set; }
        // Add additional properties as needed for the match report details.
        public List<MatchEventDTO>? MatchEvents { get; set; }
        public MatchStatisticDTO? MatchStatistics { get; set; }
        public List<PlayerMatchStatisticDTO>? PlayerMatchStatistics { get; set; }
        // ... Any additional collections or related data ...
    }
}
