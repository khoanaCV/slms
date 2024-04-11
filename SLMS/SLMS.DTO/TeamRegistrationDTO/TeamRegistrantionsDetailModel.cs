using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.TeamRegistrationDTO
{
    public class TeamRegistrantionsDetailModel
    {
        public string? TeamName { get; set; } // Tên đội bóng
        public List<MatchDetailModel> Matches { get; set; } // Danh sách các trận đấu của đội bóng
    }

    public class MatchDetailModel
    {
        public int OpponentTeamId { get; set; } // ID của đội đối thủ
        public string? OpponentTeamName { get; set; } // Tên đội đối thủ
        public int? GoalsTeam1 { get; set; } // Số bàn thắng của đội 1
        public int? GoalsTeam2 { get; set; } // Số bàn thắng của đội 2
        public DateTime? MatchDate { get; set; }
        public DateTime? StartTime { get; set; }
        public string? CurrentStatus { get; set; }
        public string DisplayInformation => CurrentStatus == "completed" ? $"Goals: {GoalsTeam1} - {GoalsTeam2}" : $"Scheduled: {MatchDate?.ToString("dd/MM/yyyy")} at {StartTime?.ToString("HH:mm")}";
        // Add other fields as required
    }

}