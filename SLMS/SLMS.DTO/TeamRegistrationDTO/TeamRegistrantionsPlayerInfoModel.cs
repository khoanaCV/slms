using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.TeamRegistrationDTO
{
    public class TeamRegistrantionsPlayerInfoModel
    {
        public string? Avatar { get; set; } // Ảnh đại diện của cầu thủ
        public string? Name { get; set; } // Tên của cầu thủ
        public string? Position { get; set; } // Vị trí thi đấu  
        public string? ShirtNumber { get; set; } // Số áo
        public int? Goals { get; set; } // Số bàn thắng đã ghi được
        public int? YellowCards { get; set; } // Số thẻ vàng
        public int? RedCards { get; set; } // Số thẻ đỏ

    }
}
