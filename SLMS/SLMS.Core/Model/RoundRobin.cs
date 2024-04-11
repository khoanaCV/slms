using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class RoundRobin
    {
        public RoundRobin()
        {
            Matches = new HashSet<Match>();
        }

        public int Id { get; set; }
        public int? TournamentId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual Tournament? Tournament { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
    }
}
