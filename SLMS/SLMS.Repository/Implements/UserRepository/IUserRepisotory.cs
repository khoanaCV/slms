using Microsoft.AspNetCore.Http;
using SLMS.Core.Model;
using SLMS.DTO.RolePermissionDTO;
using SLMS.DTO.UserDTO;
using SLMS.Repository.BaseRepository;

namespace SLMS.Repository.Implements.UserRepository
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> Login(string email, string password);
        Task<User> Register(User user);

        public string GenerateToken(User user);

        public Task<bool> FindUserByPhone(string phoneNumber);
        Task<User> ViewProfileById(int id);
        Task<bool> ChangePassword(int id, ChangePasswordModel changePasswordModel);
        Task<bool> ResetPassword(string email, ForgotPasswordModel forgotPasswordModel);
        Task<List<RolePermissionDTO>> GetListRolePermissionForUser(int userId);
        Task<User> UpdateProfileAsync(int id, UpdateProfileModel updateProfileModel);
        Task<bool> AssignListRolePermissionToUser(RolePermissionDTO rolePermissionDTO);
        Task<bool> RevokeListRolePermissionFromUser(RevokeRolePermissionDTO revokeRolePermissionDTO);

        Task<User> GetUserByEmail(string email);
        Task<bool> ActivateUser(User user);

        Task UpdateUserAsync(User user);
    }
}
