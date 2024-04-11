namespace SLMS.DTO.TeamDTO
{
    public class GetInformationTeamModel
    {
        public int Id { get; set; }
      
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Logo { get; set; }
        public int MemberCount { get; set; }
    public List<PlayerModel>? Players { get; set; } = new List<PlayerModel>();
       

    }
}
