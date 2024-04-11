using System;
using System.Collections.Generic;

namespace SLMS.Core.Model
{
    public partial class Sponsor
    {
        public int Id { get; set; }
        public int? TournamentId { get; set; }
        public string? SponsorName { get; set; }
        public string? SponsorPhone { get; set; }
        public string? SponsorType { get; set; }
        public string? SponsorInfor { get; set; }
        public string? SponsorLogo { get; set; }
        public string? SponsorLink { get; set; }

        public virtual Tournament? Tournament { get; set; }
    }
}
