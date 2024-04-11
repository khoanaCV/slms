using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.PlayerDTO
{
    public class PlayerProfileDTO
    {
        public int? PlayerID { get; set; }
        public string? Avatar { get; set; }
        public string? Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Position { get; set; }
        public string? Height { get; set; }
        public int? ShirtNumber { get; set; }
        public string? PreferredFoot { get; set; }
        public string? Strengths { get; set; }
        public string? Weaknesses { get; set; }
        public string? Bio { get; set; }
        public string? Gender { get; set; }
        public int? CitizenshipId { get; set; }
        public string? CitizenIdPhoto1 { get; set; }
        public string? CitizenIdPhoto2 { get; set; }
        public int? CurrentStatus { get; set; }

        // Thêm các trường thống kê yêu cầu
        public int? TotalGoals { get; set; }
        public int? TotalAssists { get; set; }
        public int? TotalMatchesPlayed { get; set; }
        public int? TotalYellowCards { get; set; }
        public int? TotalRedCards { get; set; }

        // Danh sách các trận đấu đã tham gia
        public List<MatchHistoryDTO>? MatchHistories { get; set; }
    }

    public class MatchHistoryDTO
    {
        public int? MatchID { get; set; }
        public DateTime? MatchDate { get; set; }
        public string? OpponentTeamName { get; set; } // Tên đội đối thủ
        public string? Result { get; set; } // Kết quả trận đấu (thắng/thua/hòa)
        // Các trường khác tùy theo yêu cầu cụ thể
    }
}
