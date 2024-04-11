using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class PlayersInLineup
    {
        public int Id { get; set; }
        public int? LineUpId { get; set; }
        public int? PlayerId { get; set; }
        public string? Name { get; set; }
        public string? CompetitionName { get; set; }
        public string? Position { get; set; }
        public string? StartOrSub { get; set; }
        public string? X { get; set; }
        public string? Y { get; set; }

        public virtual TeamLineup? LineUp { get; set; }
        public virtual Player? Player { get; set; }
    }
}
