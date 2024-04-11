using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class TeamRegistration
    {
        public int Id { get; set; }
        public int? TeamId { get; set; }
        public int? TournamentId { get; set; }
        public DateTime? ApplicationDate { get; set; }
        public string? ApprovalStatus { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public string? ApprovalNote { get; set; }

        public virtual Team? Team { get; set; }
        public virtual Tournament? Tournament { get; set; }
    }
}
