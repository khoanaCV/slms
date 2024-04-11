using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.LeagueDTO
{
    public class PlayerWithLeagueModel
    {
        public int PlayerID { get; set; }
        public string? PlayerName { get; set; }
        public string? PlayerImage { get; set; }
        public int? TotalCards { get; set; }
        public int? TotalGoals { get; set; }
    }

}
