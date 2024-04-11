using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.AdminDTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Avatar { get; set; }
        public string? Fullname { get; set; }
        public string? Bio { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? ContactInfo { get; set; }
        public string? Country { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Status { get; set; }
        public IEnumerable<string> Permissions { get; set; } = new List<string>();

    }
}
