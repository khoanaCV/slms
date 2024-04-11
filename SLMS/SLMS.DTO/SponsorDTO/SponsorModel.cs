using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SLMS.DTO.SponsorDTO
{
    public class SponsorModel
    {
        public int? Id { get; set; }
        public int? TournamentId { get; set; }
        public string? SponsorName { get; set; }
        public string? SponsorPhone { get; set; }
        public string? SponsorType { get; set; }
        public string? SponsorInfo { get; set; } // Đã sửa từ SponsorInfor sang SponsorInfo cho đúng chính tả
        public string? SponsorLogo { get; set; }
        public string? SponsorLink { get; set; }
    }
}
