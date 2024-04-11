using Microsoft.AspNetCore.Http;

namespace SLMS.DTO.TeamDTO
{
    public class UpdateTeamModel
    {
        public int TeamID { get; set; } 
        public string? Name { get; set; }
        public string? Level { get; set; }
        public string? Phone { get; set; }
        public string? AgeJoin { get; set; }
        public string? ContactPerson { get; set; }
        public string? ContactPersonEmail { get; set; }
        public string? ActivityArea { get; set; }
        public string? OperatingTime { get; set; }
        public IFormFile? Logo { get; set; }
        public IFormFile? UniForm1 { get; set; }
        public IFormFile? UniForm2 { get; set; }
        public IFormFile? UniForm3 { get; set; }
        public string? Description { get; set; }
        public int? TeamManagerId { get; set; }
    }
}
