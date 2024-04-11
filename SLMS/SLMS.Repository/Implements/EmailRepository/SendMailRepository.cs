using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using SLMS.DTO.UserDTO;

namespace SLMS.Repository.Implements.EmailRepository
{
    public class SendMailRepository : IEmailSenderRepository
    {
        private readonly EmailConfiguration _emailConfig;
        public SendMailRepository(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }

        private MimeMessage CreateEmailMessage(Message message, bool isHtml)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(MailboxAddress.Parse(_emailConfig.From)); // Sử dụng Parse để chuyển từ string sang MailboxAddress
            emailMessage.To.AddRange(message.To); // Giả định message.To đã là List<MailboxAddress>
            emailMessage.Subject = message.Subject;

            var textPart = new TextPart(isHtml ? TextFormat.Html : TextFormat.Plain)
            {
                Text = message.Content
            };
            emailMessage.Body = textPart;

            return emailMessage;
        }
        private void Send(MimeMessage emailMessage)
        {
            using var client = new MailKit.Net.Smtp.SmtpClient();
            try
            {
                client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate(_emailConfig.UserName, _emailConfig.Password);

                client.Send(emailMessage);
            }
            catch (Exception ex)
            {
                // Handle the exception here.
                throw;
            }
            finally
            {
                client.DisconnectAsync(true);
                client.Dispose();
            }
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using var client = new MailKit.Net.Smtp.SmtpClient();
            try
            {
                await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, SecureSocketOptions.StartTls);
                client.AuthenticationMechanisms.Remove("XOAUTH2"); // Nếu bạn không sử dụng xác thực OAuth2
                await client.AuthenticateAsync(_emailConfig.UserName, _emailConfig.Password);
                await client.SendAsync(mailMessage);
            }
            catch (Exception ex)
            {
                // Log error or throw
                throw;
            }
            finally
            {
                await client.DisconnectAsync(true);
                client.Dispose();
            }
        }

        // Ví dụ cải thiện việc xử lý ngoại lệ và log
        public async Task SendEmailAsync(Message message, bool isHtml = false)
        {
            var mailMessage = CreateEmailMessage(message, isHtml);
            try
            {
                await SendAsync(mailMessage);
                // Log success
            }
            catch (Exception ex)
            {
                // Log exception
                throw new InvalidOperationException($"Error sending email: {ex.Message}", ex);
            }
        }


        public void SendEmail(Message message, bool isHtml = false)
        {
            var emailMessage = CreateEmailMessage(message, isHtml);

            Send(emailMessage);
        }

        public async Task SaveCustomLink(string email, string link)
        {
            // Tạo message email với đường link đến Facebook
            var facebookLinkMessage = new Message(new[] { email }, "Facebook Link", $"Click the link to visit Facebook: {link}");

            // Gửi email chứa đường link đến Facebook
            await SendEmailAsync(facebookLinkMessage, isHtml: true);
        }

        public async Task SendOtpEmail(string email, string otp)
        {
            var subject = "Your OTP Code";
            var content = $"Your OTP code is: {otp}. This OTP will expire in 15 minutes.";
            var message = new Message(new[] { email }, subject, content);
            await SendEmailAsync(message, isHtml: false);
        }
    }
}
