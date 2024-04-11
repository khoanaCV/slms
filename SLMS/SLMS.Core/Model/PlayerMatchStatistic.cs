using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class PlayerMatchStatistic
    {
        public int Id { get; set; }
        public int? PlayerId { get; set; }
        public int? MatchId { get; set; }
        public int? Goals { get; set; }
        public int? SubGoals { get; set; }
        public int? OwnGoals { get; set; }
        public int? Saves { get; set; }
        public int? Assists { get; set; }
        public int? YellowCards { get; set; }
        public int? RedCards { get; set; }
        public int? Wasfouled { get; set; }

        public virtual Match? Match { get; set; }
        public virtual Player? Player { get; set; }
    }
}
