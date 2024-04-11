

namespace SLMS.DTO.TeamRegistrationDTO
{
    public class TeamRegistrationModel
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public int? MemberOfTeam { get; set; }
        public string? ContactName { get; set; }
        public string? ContactPhone { get; set; }
        public DateTime? RegistrationTime { get; set; }
        public string? Status { get; set; }
    }
}
