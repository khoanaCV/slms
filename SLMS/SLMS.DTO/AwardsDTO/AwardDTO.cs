using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.AwardsDTO
{
    public class AwardDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int TournamentId { get; set; }
        // Thêm các trường khác nếu cần
    }
}
