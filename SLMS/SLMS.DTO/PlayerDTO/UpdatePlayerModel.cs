

using Microsoft.AspNetCore.Http;

namespace SLMS.DTO.PlayerDTO
{
    public class UpdatePlayerModel
    {
        public int Id { get; set; }
        public IFormFile Avatar { get; set; }
        public string? Phone { get; set; }
        public string? Country { get; set; }
        public int? CitizenshipId { get; set; }
        public IFormFile CitizenIdPhoto1 { get; set; }
        public IFormFile CitizenIdPhoto2 { get; set; }
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Position { get; set; }
        public string? Height { get; set; }
        public string? ShirtNumber { get; set; }
        public string? PreferredFoot { get; set; }
        public string? Strengths { get; set; }
        public string? Weaknesses { get; set; }
        public string? Bio { get; set; }
        public string? Email { get; set; }
        public string? CompetitionName { get; set; }
    }
}
