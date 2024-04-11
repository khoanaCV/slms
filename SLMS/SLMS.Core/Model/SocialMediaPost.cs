using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class SocialMediaPost
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public int? PostedBy { get; set; }
        public DateTime? PostDate { get; set; }
        public int? IdCategory { get; set; }

        public virtual SocialMediaPostCategory? IdCategoryNavigation { get; set; }
        public virtual User? PostedByNavigation { get; set; }
    }
}
