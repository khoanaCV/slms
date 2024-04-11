using System.ComponentModel.DataAnnotations;

namespace SLMS.DTO.UserDTO
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
