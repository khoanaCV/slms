using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class TournamentVote
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? TournamentId { get; set; }
        public int? StarRating { get; set; }
        public DateTime? VotedAt { get; set; }
        public string? Description { get; set; }

        public virtual Tournament? Tournament { get; set; }
        public virtual User? User { get; set; }
    }
}
