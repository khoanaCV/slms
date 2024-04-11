namespace SLMS.DTO.LeagueDTO
{
    public class LeagueSearchResultModel
    {
        public int Id { get; set; }
        public string LeagueName { get; set; }
        public string ImageLeague { get; set; }
        public string? OrganizerName { get; set; }
        public string? Location { get; set; }

        public string? CompetitionFormatName { get; set; }

        public int NumberOfPlayersPerTeamRange { get; set; }

        public int NumberOfTeam { get; set; }

    }
}

