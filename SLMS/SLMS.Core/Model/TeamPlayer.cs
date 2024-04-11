using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class TeamPlayer
    {
        public int Id { get; set; }
        public int? TeamId { get; set; }
        public int? PlayerId { get; set; }
        public DateTime? JoinDate { get; set; }
        public DateTime? TerminateDate { get; set; }
        public string? CurrentStatus { get; set; }

        public virtual Player? Player { get; set; }
        public virtual Team? Team { get; set; }
    }
}
