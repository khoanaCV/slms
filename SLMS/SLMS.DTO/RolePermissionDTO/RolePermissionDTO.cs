using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.RolePermissionDTO
{
    public class RolePermissionDTO
    {
        public int UserId { get; set; }
        public List<RolePermissionDetailDTO>? RolePermissions { get; set; }
    }

    public class RolePermissionDetailDTO
    {
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public int? TeamID { get; set; }
        public int? TournamentID { get; set; }
    }

    public class RevokeRolePermissionDTO
    {
        public int UserId { get; set; }
        public List<RolePermissionDetailDTO>? RolePermissions { get; set; }
    }

}
