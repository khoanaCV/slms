using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class MatchHighlight
    {
        public int Id { get; set; }
        public int? MatchId { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public string? HighlightUrl { get; set; }
        public string? Description { get; set; }

        public virtual Match? Match { get; set; }
    }
}
