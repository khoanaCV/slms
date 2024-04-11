using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.Repository.BaseRepository;
using SLMS.DTO.SponsorDTO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.Extensions.Configuration;
using SLMS.DTO.UserDTO;

namespace SLMS.Repository.Implements.SponsorRepository
{
    public class SponsorRepository : ISponsorRepository
    {
        private readonly SEP490Context _context;
        private Cloudinary _cloudinary;


        public SponsorRepository(SEP490Context context, IConfiguration configuration)
        {
            _context = context;
            var account = new Account(
                   configuration["Cloudinary:CloudName"],
                   configuration["Cloudinary:ApiKey"],
                   configuration["Cloudinary:ApiSecret"]
               );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<Sponsor> CreateSponsorAsync(int tournamentId, SponsorDTO sponsorDTO)
        {
            // Kiểm tra xem giải đấu có tồn tại không
            var tournamentExists = await _context.Tournaments.AnyAsync(t => t.Id == tournamentId);
            if (!tournamentExists)
            {
                throw new ArgumentException($"Tournament with ID {tournamentId} does not exist.");
            }

            // Tải ảnh lên Cloudinary và lấy URL
            string sponsorLogoUrl = null;
            if (sponsorDTO.SponsorLogo != null)
            {
                sponsorLogoUrl = await UploadImageToCloudinary(sponsorDTO.SponsorLogo);
            }

            var sponsor = new Sponsor
            {
                TournamentId = sponsorDTO.TournamentId,
                SponsorName = sponsorDTO.SponsorName,
                SponsorPhone = sponsorDTO.SponsorPhone,
                SponsorType = sponsorDTO.SponsorType,
                SponsorInfor = sponsorDTO.SponsorInfo,
                SponsorLogo = sponsorLogoUrl, // Lưu URL ảnh từ Cloudinary
                SponsorLink = sponsorDTO.SponsorLink
            };

            _context.Sponsors.Add(sponsor);
            await _context.SaveChangesAsync();
            return sponsor;
        }

        public async Task<string> UploadImageToCloudinary(IFormFile file)
        {
            // Tạo và cấu hình đối tượng Cloudinary như đã hướng dẫn trước đó

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                // Các thiết lập khác nếu bạn cần
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }

        public async Task<SponsorModel> GetSponsorAsync(int id, int tournamentId)
        {
            return await _context.Sponsors
                .Where(s => s.Id == id && s.TournamentId == tournamentId)
                .Select(s => new SponsorModel
                {
                    Id = s.Id,
                    TournamentId = s.TournamentId,
                    SponsorName = s.SponsorName,
                    SponsorPhone = s.SponsorPhone,
                    SponsorType = s.SponsorType,
                    SponsorInfo = s.SponsorInfor,
                    SponsorLogo = s.SponsorLogo,
                    SponsorLink = s.SponsorLink
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<SponsorModel>> GetAllSponsorsAsync(int tournamentId)
        {
            return await _context.Sponsors
                .Where(s => s.TournamentId == tournamentId)
                .Select(s => new SponsorModel
                {
                    Id = s.Id,
                    TournamentId = s.TournamentId,
                    SponsorName = s.SponsorName,
                    SponsorPhone = s.SponsorPhone,
                    SponsorType = s.SponsorType,
                    SponsorInfo = s.SponsorInfor,
                    SponsorLogo = s.SponsorLogo,
                    SponsorLink = s.SponsorLink
                })
                .ToListAsync();
        }

        public async Task<Sponsor> UpdateSponsorAsync(int id, int tournamentId, SponsorDTO sponsorDTO)
        {
            var sponsor = await _context.Sponsors
                .FirstOrDefaultAsync(s => s.Id == id && s.TournamentId == tournamentId);

            if (sponsor == null)
            {
                // Sponsor không tồn tại với ID hoặc tournamentId được cung cấp
                return null;
            }
            // Tải ảnh lên Cloudinary và lấy URL
            string sponsorLogoUrl = null;
            if (sponsorDTO.SponsorLogo != null)
            {
                sponsorLogoUrl = await UploadImageToCloudinary(sponsorDTO.SponsorLogo);
                sponsor.SponsorLogo = sponsorLogoUrl;
            }
            // Cập nhật thông tin sponsor từ sponsorDTO
            sponsor.SponsorName = sponsorDTO.SponsorName;
            sponsor.SponsorPhone = sponsorDTO.SponsorPhone;
            sponsor.SponsorType = sponsorDTO.SponsorType;
            sponsor.SponsorInfor = sponsorDTO.SponsorInfo;
            
            sponsor.SponsorLink = sponsorDTO.SponsorLink;

            _context.Sponsors.Update(sponsor);
            await _context.SaveChangesAsync();
            return sponsor;
        }


        public async Task<bool> DeleteSponsorAsync(int id, int tournamentId)
        {
            var sponsor = await _context.Sponsors
                .FirstOrDefaultAsync(s => s.Id == id && s.TournamentId == tournamentId);

            if (sponsor == null) return false;

            _context.Sponsors.Remove(sponsor);
            await _context.SaveChangesAsync();
            return true;
        }

    }

}
