using System.ComponentModel.DataAnnotations;

namespace SLMS.DTO.UserDTO
{
    public class ForgotPasswordModel
    {
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
