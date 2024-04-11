using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Venue
    {
        public Venue()
        {
            Matches = new HashSet<Match>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? BigImage { get; set; }
        public string? Location { get; set; }
        public string? Capacity { get; set; }
        public string? FacilityDetails { get; set; }
        public int? TournamentId { get; set; }

        public virtual Tournament? Tournament { get; set; }
        public virtual ICollection<Match> Matches { get; set; }
    }
}
