using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Award
    {
        public Award()
        {
            Votes = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public int? TournamentId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual Tournament? Tournament { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
