using SLMS.DTO.UserDTO;

namespace SLMS.Repository.Implements.EmailRepository
{
    public interface IEmailSenderRepository
    {
        
        public void SendEmail(Message message, bool isHtml = false);
        public Task SaveCustomLink(string email, string link);
        Task SendEmailAsync(Message message, bool isHtml = false);
        Task SendOtpEmail(string email, string otp);
    }
}
