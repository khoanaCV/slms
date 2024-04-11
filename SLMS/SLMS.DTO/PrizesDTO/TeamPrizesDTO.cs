using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.PrizesDTO
{
    public class TeamPrizesDTO
    {
        public int? TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? TotalCards { get; set; } // Tổng số thẻ của đội
        public string Logo { get; set; }
        public string Phone { get; set; }
        public string ContactPerson { get; set; }
    }
}
