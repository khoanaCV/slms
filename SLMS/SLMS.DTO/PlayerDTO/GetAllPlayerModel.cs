namespace SLMS.DTO.PlayerDTO
{
    public class GetAllPlayerModel
    {
        public int Id { get; set; }
        public string Avatar { get; set; }
        public string Name { get; set; }
        public string? Position { get; set; } // Vị trí thi đấu  
        public string Height { get; set; }
        public string PreferredFoot { get; set; }
        public int Age { get; set; }
        public string Country { get; set; }
        public string? ShirtNumber { get; set; } // Số áo
        public int? Goals { get; set; } // Số bàn thắng đã ghi được
        public int? YellowCards { get; set; } // Số thẻ vàng
        public int? RedCards { get; set; } // Số thẻ đỏ
        public int ? TotalMatchesPlayed { get; set; }   
        public bool IsActive { get; set; } // Giả sử trạng thái hoạt động được biểu diễn bằng giá trị boolean
    }
}
