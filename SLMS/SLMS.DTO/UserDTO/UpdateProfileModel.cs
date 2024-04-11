using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.UserDTO
{
    public class UpdateProfileModel
    {
        public int? Id { get; set; }
        public IFormFile? Avatar { get; set; }
        public string? Fullname { get; set; }
        public string? Country { get; set; }
        public string? Bio { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? ContactInfo { get; set; }
    }
}