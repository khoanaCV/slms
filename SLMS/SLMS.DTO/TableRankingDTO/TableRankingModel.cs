namespace SLMS.DTO.TableRankingDTO
{
    public class TableRankingModel
    {
        public int Rank { get; set; }
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
    }
}
