using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.AdminDTO
{
    public class DashboardDTO
    {
        public int TotalAccounts { get; set; }
        public int TotalTournaments { get; set; }
        public int TotalPlayers { get; set; }
        public int TotalMatches { get; set; }
        public int TotalTeams { get; set; }
    }
}
