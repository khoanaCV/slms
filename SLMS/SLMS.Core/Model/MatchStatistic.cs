using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class MatchStatistic
    {
        public int Id { get; set; }
        public int? MatchId { get; set; }
        public int? FirstHalfExtraTime { get; set; }
        public int? SecondHalfExtraTime { get; set; }
        public int? GoalsTeam1 { get; set; }
        public int? GoalsTeam2 { get; set; }
        public int? SubGoalsTeam1 { get; set; }
        public int? SubGoalsTeam2 { get; set; }
        public int? YellowCardsTeam1 { get; set; }
        public int? RedCardsTeam1 { get; set; }
        public int? YellowCardsTeam2 { get; set; }
        public int? RedCardsTeam2 { get; set; }
        public int? DoubleGoals { get; set; }
        public int? HattrickGoals { get; set; }
        public int? PokerGoals { get; set; }

        public virtual Match? Match { get; set; }
    }
}
