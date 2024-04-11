﻿using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Permission
    {
        public Permission()
        {
            RolePermissions = new HashSet<RolePermission>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<RolePermission> RolePermissions { get; set; }
    }
}