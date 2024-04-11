using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.UserDTO
{
    public class ViewprofileModel
    {
        public string? Avatar { get; set; }
        public string? Fullname { get; set; }
        public string? Country { get; set; }
        public string? Bio { get; set; }
        public string? Email { get; set; }


        public DateTime? BirthDate { get; set; }
        public string? ContactInfo { get; set; }


    }
}
