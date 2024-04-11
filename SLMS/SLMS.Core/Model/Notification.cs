using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Notification
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? NotificationType { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? IsRead { get; set; }
        public DateTime? ReadAt { get; set; }
        public string? ActionTaken { get; set; }
        public DateTime? ActionTakenAt { get; set; }

        public virtual User? User { get; set; }
    }
}
