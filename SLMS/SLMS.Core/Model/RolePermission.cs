using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class RolePermission
    {
        public int Id { get; set; }
        public int? RoleId { get; set; }
        public int? PermissionId { get; set; }
        public int? UserId { get; set; }
        public int? TournamentId { get; set; }
        public int? TeamId { get; set; }

        public virtual Permission? Permission { get; set; }
        public virtual Role? Role { get; set; }
        public virtual Team? Team { get; set; }
        public virtual Tournament? Tournament { get; set; }
        public virtual User? User { get; set; }
    }
}
