using Microsoft.AspNetCore.Http;

namespace SLMS.DTO.PlayerDTO
{
    public class CreatePlayerModel
    {
        public int TeamId {  get; set; }    
        public IFormFile Avatar { get; set; }
        public string? ShirtNumber { get; set; }
        public string? Position { get; set; }
        public string? Name { get; set; }
        public string? CompetitionName { get; set; }
        public string? Phone { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Email { get; set; }
        public string? Bio { get; set; }
    }
}
