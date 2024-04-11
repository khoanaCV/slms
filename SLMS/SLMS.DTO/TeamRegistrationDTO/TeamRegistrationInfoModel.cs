namespace SLMS.DTO.TeamRegistrationDTO
{
    public class TeamRegistrationInfoModel
    { 
        public int Id { get; set; }
        public string? Logo { get; set; }
        public string? Name { get; set; }
        public int? PlayedMatches { get; set; }
        public int? Wins { get; set; }
        public int? Draws { get; set; }
        public int? Losses { get; set; }
        public int? NumberOfMembers { get; set; }
    }
}
