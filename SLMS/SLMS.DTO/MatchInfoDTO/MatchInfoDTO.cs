using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.MatchInfoDTO
{
    public class MatchInfoDTO
    {
        public int? Id { get; set; }
        public string? Team1Name { get; set; }
        public int? Team1Id { get; set; }
        public string? Team2Name { get; set; }
        public int? Team2Id { get; set; }
        public DateTime? MatchDate { get; set; }
        public DateTime? StartTime { get; set; }
        public string? VenueName { get; set; }
        public string? PhaseName { get; set; }
        public string? StageName { get; set; } // Could be GroupStage or KnockoutStage or RoundRobin
        public string? CurrentStatus { get; set; }
        public string? LogoTeam1 { get; set; }
        public string? LogoTeam2 { get; set; }
        public string? TournamentName { get; set; }
        public int? GoalsTeam1 { get; set; }
        public int? GoalsTeam2 { get; set; }
        public int? SubGoalsTeam1 { get; set; }
        public int? SubGoalsTeam2 { get; set; }
        public string DisplayInformation => CurrentStatus == "completed" ? $"Goals: {GoalsTeam1} - {GoalsTeam2}" : $"Scheduled: {MatchDate?.ToString("dd/MM/yyyy")} at {StartTime?.ToString("HH:mm")}";
        // Add other fields as required
    }
}
