using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.AwardsDTO
{
    public class VoteAwardDTO
    {
        public int UserId { get; set; }
        public int AwardId { get; set; }
        public int NomineePlayerId { get; set; }
        // Thêm các trường khác nếu cần
        public int NomineeteamId { get; set; }

        public DateTime VotedAt { get; set; }

    }

}
