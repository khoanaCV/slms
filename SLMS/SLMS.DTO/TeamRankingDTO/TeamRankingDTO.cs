namespace SLMS.DTO.TeamRankingDTO
{
    public class TeamRankingDTO
    {
        public string? TeamName { get; set; }
        public string? Logo { get; set; }
        public int? Played { get; set; }
        public int? Win { get; set; }
        public int? Draw { get; set; }
        public int? Lose { get; set; }
        public int? GoalsFor { get; set; }
        public int? GoalsAgainst { get; set; }
        public int? GoalDifference => GoalsFor - GoalsAgainst;
        public int? Points { get; set; }
        public int? YellowCards { get; set; }
        public int? RedCards { get; set; }
        public int? TotalCards => YellowCards + RedCards; // Total cards as a new property
    }
}
