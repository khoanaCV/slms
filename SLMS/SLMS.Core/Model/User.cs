using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class User
    {
        public User()
        {
            Feedbacks = new HashSet<Feedback>();
            Notifications = new HashSet<Notification>();
            RolePermissions = new HashSet<RolePermission>();
            SocialMediaPosts = new HashSet<SocialMediaPost>();
            Teams = new HashSet<Team>();
            TournamentVotes = new HashSet<TournamentVote>();
            Tournaments = new HashSet<Tournament>();
            Votes = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public string? Avatar { get; set; }
        public string? Fullname { get; set; }
        public string? Bio { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? ContactInfo { get; set; }
        public string? Country { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Status { get; set; }
        public string? ConfirmationCode { get; set; }
        public string? ConfirmationCodExpired { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<RolePermission> RolePermissions { get; set; }
        public virtual ICollection<SocialMediaPost> SocialMediaPosts { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
        public virtual ICollection<TournamentVote> TournamentVotes { get; set; }
        public virtual ICollection<Tournament> Tournaments { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
