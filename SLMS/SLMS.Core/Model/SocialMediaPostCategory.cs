using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class SocialMediaPostCategory
    {
        public SocialMediaPostCategory()
        {
            SocialMediaPosts = new HashSet<SocialMediaPost>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<SocialMediaPost> SocialMediaPosts { get; set; }
    }
}
