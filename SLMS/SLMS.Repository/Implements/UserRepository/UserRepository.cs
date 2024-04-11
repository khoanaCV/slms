using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SLMS.Core.Model;
using SLMS.DTO.JwtSettingDTO;
using SLMS.DTO.RolePermissionDTO;
using SLMS.DTO.UserDTO;
using SLMS.Repository.BaseRepository;

using SLMS.Repository.Implements.EmailRepository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace SLMS.Repository.Implements.UserRepository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly AppSettingDTO _appSettings;
        private readonly SEP490Context _context;
        private readonly IEmailSenderRepository _repositoryEmail;
        private Cloudinary _cloudinary;
        public UserRepository(SEP490Context dbcontext, IOptionsMonitor<AppSettingDTO> optionsMonitor, IConfiguration configuration) : base(dbcontext)
        {
            _context = dbcontext;
            _appSettings = optionsMonitor.CurrentValue;
            var account = new Account(
                   configuration["Cloudinary:CloudName"],
                   configuration["Cloudinary:ApiKey"],
                   configuration["Cloudinary:ApiSecret"]
               );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<User> Login(string email, string password)
        {
            var user = await _entities.Include(u => u.RolePermissions)
                                      .ThenInclude(rp => rp.Permission)
                                      .FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || user.Status != "Active"  )
            {
                return null;
            }

            // Verify password
            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return user;
        }


        public async Task<User> Register(User user)
        {
            var existingUser = await _entities.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return null; // Người dùng đã tồn tại
            }

            var basicUserRole = await _dbcontext.Roles.FirstOrDefaultAsync(r => r.Name == "Basic User");
            if (basicUserRole == null)
            {
                throw new Exception("Basic User role not found.");
            }

            // Hash the password
            var passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, user.Password);

            /*// Generate OTP and set expiry time
            var otp = new Random().Next(100000, 999999).ToString();
            var expiryTime = DateTime.Now.AddMinutes(15);

            // Set user status to Pending and save the OTP with the user
            user.ConfirmationCode = otp;
            user.ConfirmationCodExpired = expiryTime.ToString("o");*/
            user.Status = "Pending";

            // Thêm vai trò và lưu user
            var userRolePermission = new RolePermission
            {
                RoleId = basicUserRole.Id,
            };
            user.RolePermissions.Add(userRolePermission);

            // Save the user with the OTP information
            _dbcontext.Users.Add(user);
            await _dbcontext.SaveChangesAsync();

            return user;
        }

        public string GenerateToken(User user)
        {
            try
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();

                if (string.IsNullOrEmpty(_appSettings.SecretKey))
                    throw new ArgumentNullException(nameof(_appSettings.SecretKey), "SecretKey is not configured properly.");
                var secretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

                var userClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
            new Claim("id", user.Id.ToString()),
            new Claim("avatar", user.Avatar ?? string.Empty),
            new Claim("fullname", user.Fullname ?? string.Empty),
            new Claim("tokenId", user.Id.ToString()),
            new Claim("status", user.Status ?? string.Empty),
        };
                var roles = user.RolePermissions.Select(rp => new { rp.RoleId, rp.PermissionId }).ToList();
                foreach (var role in roles)
                {
                    userClaims.Add(new Claim("roleId", role.RoleId.ToString()));
                    userClaims.Add(new Claim("permissionId", role.PermissionId.ToString()));
                }

                // Extract roles from RolePermissions
                foreach (var rolePermission in user.RolePermissions)
                {
                    var roleName = rolePermission.Role?.Name;
                    if (!string.IsNullOrEmpty(roleName))
                    {
                        userClaims.Add(new Claim(ClaimTypes.Role, roleName));
                    }
                }

                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(userClaims),
                    Expires = DateTime.UtcNow.AddMinutes(1), // Token expiration time
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = jwtTokenHandler.CreateToken(tokenDescription);
                return jwtTokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                // Consider using a logging framework or mechanism to log the exception
                throw new Exception("Error generating token.", ex);
            }
        }

        public async Task<User> ViewProfileById(int id)
        {
            return await _dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> ChangePassword(int id, ChangePasswordModel changePasswordModel)
        {
            var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return false; // Người dùng không tồn tại
            }

            var passwordHasher = new PasswordHasher<User>();
            // Verify current password
            if (passwordHasher.VerifyHashedPassword(user, user.Password, changePasswordModel.CurrentPassword) == PasswordVerificationResult.Failed)
            {
                return false; // Mật khẩu hiện tại không đúng
            }

            if (changePasswordModel.NewPassword != changePasswordModel.ConfirmPassword)
            {
                return false; // Mật khẩu xác nhận không khớp
            }

            // Hash new password and update
            user.Password = passwordHasher.HashPassword(user, changePasswordModel.NewPassword);

            await _dbcontext.SaveChangesAsync();
            return true; // Thay đổi mật khẩu thành công
        }

        public async Task<bool> ResetPassword(string email, ForgotPasswordModel forgotPasswordModel)
        {
            try
            {
                var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                {
                    return false; // User does not exist
                }

                if (forgotPasswordModel.NewPassword != forgotPasswordModel.ConfirmPassword)
                {
                    return false; // New Password and Confirm Password do not match
                }

                // Hash new password
                var passwordHasher = new PasswordHasher<User>();
                user.Password = passwordHasher.HashPassword(user, forgotPasswordModel.NewPassword);

                // Save the hashed password
                _dbcontext.Users.Update(user);
                await _dbcontext.SaveChangesAsync();
                return true; // Password reset successfully
            }
            catch (Exception)
            {
                // Log the exception if necessary
                return false; // An error occurred
            }
        }


        public async Task<bool> FindUserByPhone(string phoneNumber)
        {
            if (phoneNumber == null)
            {
                return false;
            }
            var user = await _dbcontext.Users.FirstOrDefaultAsync(x => x.ContactInfo.Equals(phoneNumber));
            if (user == null)
            {
                return false;
            }
            return true;
        }

        public async Task<List<RolePermissionDTO>> GetListRolePermissionForUser(int userId)
        {
            var userRolePermissions = await _dbcontext.Users
                .Where(u => u.Id == userId)
                .SelectMany(u => u.RolePermissions)
                .Select(rp => new RolePermissionDetailDTO
                {
                    RoleId = (int)rp.RoleId,
                    PermissionId = (int)rp.PermissionId,
                    TeamID = rp.TeamId, // Assuming these are nullable ints in the model
                    TournamentID = rp.TournamentId
                })
                .ToListAsync();

            // Assuming RolePermissionDTO expects a list, we need to wrap our result
            var rolePermissionDtoList = new List<RolePermissionDTO>
    {
        new RolePermissionDTO
        {
            UserId = userId,
            RolePermissions = userRolePermissions
        }
    };

            return rolePermissionDtoList;
        }


        public async Task<bool> AssignListRolePermissionToUser(RolePermissionDTO rolePermissionDTO)
        {
            var user = await _dbcontext.Users.Include(u => u.RolePermissions)
                                            .FirstOrDefaultAsync(u => u.Id == rolePermissionDTO.UserId);
            if (user == null) return false;

            foreach (var rp in rolePermissionDTO.RolePermissions)
            {
                // Avoid duplicates
                if (!user.RolePermissions.Any(x => x.RoleId == rp.RoleId && x.PermissionId == rp.PermissionId &&
                                                   x.TeamId == rp.TeamID && x.TournamentId == rp.TournamentID))
                {
                    user.RolePermissions.Add(new RolePermission
                    {
                        RoleId = rp?.RoleId,
                        PermissionId = rp?.PermissionId,
                        TeamId = rp?.TeamID,
                        TournamentId = rp?.TournamentID
                    });
                }
            }

            await _dbcontext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RevokeListRolePermissionFromUser(RevokeRolePermissionDTO revokeRolePermissionDTO)
        {
            var user = await _dbcontext.Users.Include(u => u.RolePermissions)
                                            .FirstOrDefaultAsync(u => u.Id == revokeRolePermissionDTO.UserId);
            if (user == null) return false;

            var toRemove = user.RolePermissions.Where(rp => revokeRolePermissionDTO.RolePermissions.Any(rpd => rpd.RoleId == rp.RoleId &&
                                                                                                                  rpd.PermissionId == rp.PermissionId &&
                                                                                                                  rpd.TeamID == rp.TeamId &&
                                                                                                                  rpd.TournamentID == rp.TournamentId))
                                               .ToList();

            if (toRemove.Count > 0)
            {
                _dbcontext.RolePermissions.RemoveRange(toRemove);
                await _dbcontext.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<string> UploadImageToCloudinary(IFormFile file)
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

        public async Task<User> UpdateProfileAsync(int id, UpdateProfileModel model)
        {
            var user = await _dbcontext.Users.FindAsync(id);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            string userAvatarUrl = null;
            if (model.Avatar != null)
            {
                userAvatarUrl = await UploadImageToCloudinary(model.Avatar);
                user.Avatar = userAvatarUrl;
            }

            user.Fullname = model.Fullname;
            user.Country = model.Country;
            user.Bio = model.Bio;
            user.BirthDate = model.BirthDate;
            user.ContactInfo = model.ContactInfo;

            _dbcontext.Users.Update(user);
            await _dbcontext.SaveChangesAsync();

            return user;
        }


        public async Task<User> GetUserByEmail(string email)
        {
            return await _dbcontext.Users
                .AsNoTracking() // Sử dụng AsNoTracking() để tối ưu hóa hiệu suất vì không cần update entity này
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<bool> ActivateUser(User user)
        {
            try
            {
                user.Status = "Active";
                user.ConfirmationCode = null; // Xóa mã OTP sau khi kích hoạt thành công
                user.ConfirmationCodExpired = null; // Xóa thời gian hết hạn của mã OTP

                _dbcontext.Users.Update(user);
                await _dbcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ hoặc log lỗi tại đây
                return false;
            }
        }

        // In UserRepository
        public async Task UpdateUserAsync(User user)
        {
            // This method assumes _context is your DbContext instance within the UserRepository class
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }


    }
}

