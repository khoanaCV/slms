using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.MacthReportsDTO
{
    public class PartTwoDTO
    {
        public List<EventDTO> Events { get; set; } = new List<EventDTO>();
    }

    public class EventDTO
    {
        public int? MatchId { get; set; }
        public string? EventType { get; set; } // "Goal", "YellowCard", "RedCard"
        public int? EventMinute { get; set; }
        public int? PlayerId { get; set; }
        public string? PlayerName { get; set; }
        public int? TeamId { get; set; }
        public string? Description { get; set; }
    }
}
