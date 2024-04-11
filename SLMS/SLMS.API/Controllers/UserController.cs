using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SLMS.Core.Model;
using SLMS.DTO.JwtSettingDTO;

using SLMS.DTO.UserDTO;
using SLMS.DTO.RolePermissionDTO;
using SLMS.Repository.Implements.UserRepository;
using System.Text.Json.Serialization;
using System.Text.Json;
using SLMS.Repository.Implements.EmailRepository;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using SLMS.DTO.SponsorDTO;
using Microsoft.EntityFrameworkCore;

namespace SLMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IEmailSenderRepository _repositoryEmail;
        private Cloudinary _cloudinary;
        private string GenerateOtp()
        {
            return new Random().Next(100000, 999999).ToString();
        }


        public UserController(IUserRepository repository, IOptionsMonitor<AppSettingDTO> optionsMonitor, IEmailSenderRepository repositoryEmail, IConfiguration configuration)
        {
            _repository = repository;
            _repositoryEmail = repositoryEmail;
            var account = new Account(
                  configuration["Cloudinary:CloudName"],
                  configuration["Cloudinary:ApiKey"],
                  configuration["Cloudinary:ApiSecret"]
              );
            _cloudinary = new Cloudinary(account);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAuthen(LoginModel model)
        {
            try
            {
                var user = await _repository.Login(model.Email, model.Password);

                if (user == null)
                {
                    return Ok(new APIResponse
                    {
                        Success = false,
                        Message = "User not valid"
                    });
                }

                var token = _repository.GenerateToken(user);

                return Ok(new APIResponse
                {
                    Success = true,
                    Message = "Authenticate success",
                    Data = token
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterModel model)
        {
            if (model.Password != model.RePassword)
            {
                return BadRequest(new APIResponse { Success = false, Message = "Passwords do not match" });
            }

            var registerUser = new User
            {
                Email = model.Email,
                Password = model.Password,
                Fullname = model.Fullname,
            };

            try
            {
                var registeredUser = await _repository.Register(registerUser);

                if (registeredUser == null)
                {
                    return Ok(new APIResponse
                    {
                        Success = false,
                        Message = "User already exists."
                    });
                }

                // OTP is sent within the Register method of the repository
                return Ok(new APIResponse
                {
                    Success = true,
                    Message = "User registered successfully. Please check your email to activate your account."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("GetProfileById")]
        public async Task<IActionResult> GetProfileById(int id)
        {
            try
            {
                var userProfile = await _repository.ViewProfileById(id);

                if (userProfile == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                var userDTO = new ViewprofileModel // Chỉnh sửa tên DTO thành đúng tên của DTO bạn đã định nghĩa
                {
                    Avatar = userProfile.Avatar,
                    Fullname = userProfile.Fullname,
                    Country = userProfile.Country,
                    ContactInfo = userProfile.ContactInfo,
                    Email= userProfile.Email,
                    BirthDate = userProfile.BirthDate,
                    Bio = userProfile.Bio
                };

                return Ok(new APIResponse
                {
                    Success = true,
                    Message = "Profile retrieved successfully",
                    Data = userDTO
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        private async Task<string> UploadImageToCloudinary(IFormFile file)
        {
            // Tạo và cấu hình đối tượng Cloudinary như đã hướng dẫn trước đó

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                // Các thiết lập khác nếu bạn cần
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }

        [HttpPut("updateprofile/{id}")]
        public async Task<IActionResult> UpdateProfile(int id, [FromForm] UpdateProfileModel model)
        {
            try
            {
                var updatedUser = await _repository.UpdateProfileAsync(id, model);
                if (updatedUser == null)
                {
                    return NotFound($"No user found with ID {id}.");
                }
                return Ok(updatedUser);
            }
            catch (KeyNotFoundException knfe)
            {
                return NotFound(knfe.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPost("send-email")]
        public async Task<IActionResult> SendCaptcha(string email)
        {

            try
            {
                var encodedEmail = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(email));
                var customLink = $"http://103.183.119.91/account/changepassword/{encodedEmail}";

                // Lưu trữ đường link trong hệ thống (Có thể lưu trong cơ sở dữ liệu hoặc bộ nhớ cache)
                // Ví dụ: Giả sử bạn có một phương thức để lưu trữ đường link trong repository
                await _repositoryEmail.SaveCustomLink(email, customLink);

                // Tạo message email với đường link tùy chọn
                var emailMessage = new Message(new[] { email }, "Liên kết tùy chọn", $"Nhấp vào <a href='{customLink}'>đây</a> để điều hướng đến trang web tùy chọn.");

                // Gửi email
                await _repositoryEmail.SendEmailAsync(emailMessage, isHtml: true);

                return Ok(new APIResponse
                {
                    Success = true,
                    Message = "Đã gửi đường link xác nhận thành công"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword(int id, ChangePasswordModel changePasswordModel)
        {
            try
            {
                var success = await _repository.ChangePassword(id, changePasswordModel);

                if (success)
                {
                    return Ok(new APIResponse
                    {
                        Success = true,
                        Message = "Change password successfully"
                    });


                }
                else
                {
                    throw new Exception("Failed to change password. Please check your current password.");

                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error");
            }
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email, ForgotPasswordModel forgotPasswordModel)
        {
            try
            {
                var success = await _repository.ResetPassword(email, forgotPasswordModel);

                if (success)
                {
                    return Ok(new APIResponse
                    {
                        Success = true,
                        Message = "Password reset successfully"
                    });
                }
                else
                {
                    return BadRequest(new APIResponse
                    {
                        Success = false,
                        Message = "Failed to reset password. Please check your email."
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }

        [HttpGet("GetListRolePermissionForUser/{userId}")]
        public async Task<IActionResult> GetListRolePermissionForUser(int userId)
        {
            var rolePermissions = await _repository.GetListRolePermissionForUser(userId);
            return Ok(new APIResponse { Success = true, Data = rolePermissions });
        }

        [HttpPost("AssignListRolePermissionToUser")]
        public async Task<IActionResult> AssignListRolePermissionToUser(RolePermissionDTO rolePermissionDTO)
        {
            var result = await _repository.AssignListRolePermissionToUser(rolePermissionDTO);
            return Ok(new APIResponse { Success = result });
        }

        [HttpPost("RevokeListRolePermissionFromUser")]
        public async Task<IActionResult> RevokeListRolePermissionFromUser(RevokeRolePermissionDTO revokeRolePermissionDTO)
        {
            var result = await _repository.RevokeListRolePermissionFromUser(revokeRolePermissionDTO);
            return Ok(new APIResponse { Success = result });
        }

        [HttpPost("validate-otp")]
        public async Task<IActionResult> ValidateOtp(string email, string otp)
        {
            var user = await _repository.GetUserByEmail(email);
            if (user == null || user.ConfirmationCode != otp || DateTime.Now > DateTime.Parse(user.ConfirmationCodExpired))
            {
                return BadRequest(new APIResponse { Success = false, Message = "Invalid or expired OTP" });
            }

            // Kích hoạt tài khoản
            user.Status = "Active";
            await _repository.ActivateUser(user);

            return Ok(new APIResponse { Success = true, Message = "Account activated successfully" });
        }

        [HttpPost("send-otp")]
        public async Task<IActionResult> SendOtp(string email)
        {
            try
            {
                var user = await _repository.GetUserByEmail(email);
                if (user == null)
                {
                    return NotFound(new APIResponse { Success = false, Message = "User not found." });
                }

                if (user.Status == "Active")
                {
                    return BadRequest(new APIResponse { Success = false, Message = "User already activated." });
                }

                var otp = GenerateOtp(); // A method to generate an OTP
                user.ConfirmationCode = otp;
                user.ConfirmationCodExpired = DateTime.Now.AddMinutes(1).ToString("o");

                // Now, instead of using dbcontext directly, use your repository's update method
                await _repository.UpdateUserAsync(user);

                // Send the OTP email after the update
                await _repositoryEmail.SendOtpEmail(email, user.ConfirmationCode);

                return Ok(new APIResponse { Success = true, Message = "OTP sent successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse { Success = false, Message = ex.Message });
            }
        }

        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOtp(string email)
        {
            try
            {
                var user = await _repository.GetUserByEmail(email);
                if (user == null)
                {
                    return NotFound(new APIResponse { Success = false, Message = "User not found." });
                }

                if (user.Status == "Active")
                {
                    return BadRequest(new APIResponse { Success = false, Message = "User already activated." });
                }

                if (DateTime.TryParse(user.ConfirmationCodExpired, out var expiryTime) && DateTime.Now <= expiryTime)
                {
                    return BadRequest(new APIResponse { Success = false, Message = "OTP is still valid." });
                }

                // Generate a new OTP and set a new expiration time
                var otp = GenerateOtp(); // Make sure you have this method to generate the OTP
                user.ConfirmationCode = otp;
                user.ConfirmationCodExpired = DateTime.Now.AddMinutes(1).ToString("o");

                // Use repository method to update the user
                await _repository.UpdateUserAsync(user);

                // Send the OTP email
                await _repositoryEmail.SendOtpEmail(email, otp);

                return Ok(new APIResponse { Success = true, Message = "OTP resent successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new APIResponse { Success = false, Message = ex.Message });
            }
        }

    }
}

