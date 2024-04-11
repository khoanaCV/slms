using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class MatchEvent
    {
        public int Id { get; set; }
        public int? MatchId { get; set; }
        public string? EventType { get; set; }
        public int? EventMinute { get; set; }
        public int? PlayerId { get; set; }
        public string? ShirtNumberPlayer { get; set; }
        public int? TeamId { get; set; }
        public DateTime? EventCreatedAt { get; set; }
        public DateTime? EventUpdatedAt { get; set; }
        public string? Description { get; set; }

        public virtual Match? Match { get; set; }
        public virtual Player? Player { get; set; }
        public virtual Team? Team { get; set; }
    }
}
