using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.PlayerDTO;
using SLMS.Repository.BaseRepository;
using System.Linq;
using Microsoft.Extensions.Configuration;
using SLMS.DTO.SponsorDTO;
using SLMS.DTO.LineUpDTO;
using System.Numerics;

namespace SLMS.Repository.Implements.PlayersRepository
{
    public class PlayerRepository : BaseRepository<Player>, IPlayerRepository
    {
        private Cloudinary _cloudinary;
        public PlayerRepository(SEP490Context dbcontext, IConfiguration configuration) : base(dbcontext)
        {
            var account = new Account(
                  configuration["Cloudinary:CloudName"],
                  configuration["Cloudinary:ApiKey"],
                  configuration["Cloudinary:ApiSecret"]
              );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<Player> CreateTeamMemberAsync(CreatePlayerModel model)
        {
            string imageAvarte = null;
            if (model.Avatar != null)
            {
                imageAvarte = await UploadImageToCloudinary(model.Avatar);
            }
            var player = new Player
            {
                Avatar = imageAvarte,
                ShirtNumber = model.ShirtNumber,
                Position = model.Position,
                Name = model.Name,
                Phone = model.Phone,
                CompetitionName = model.CompetitionName,
                Bio = model.Bio,
                BirthDate = model.BirthDate,
                Email = model.Email
            };

            // Thêm player mới vào database
            _dbcontext.Players.Add(player);
            await _dbcontext.SaveChangesAsync();

            // Sau khi player được lưu, tạo mối quan hệ giữa player và team
            var teamPlayer = new TeamPlayer
            {
                PlayerId = player.Id,
                TeamId = model.TeamId, // Sử dụng TeamId từ model
                JoinDate = DateTime.Now
            };

            // Thêm mối quan hệ TeamPlayer vào database
            _dbcontext.TeamPlayers.Add(teamPlayer);
            await _dbcontext.SaveChangesAsync();

            return player;
        }


        private async Task<string> UploadImageToCloudinary(IFormFile file)
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

        public async Task<bool> UpdateTeamPlayerAsync(UpdatePlayerModel updateTeamPlayerDTO)
        {
            var player = await _dbcontext.Players.FindAsync(updateTeamPlayerDTO.Id);
            if (player == null || !player.TeamPlayers.Any()) return false;

            string imageAvarte = null;
            string citizenImage1 = null;
            string citizenImage2 = null;
            if (updateTeamPlayerDTO.Avatar != null)
            {
                imageAvarte = await UploadImageToCloudinary(updateTeamPlayerDTO.Avatar);
            }
            if (updateTeamPlayerDTO.CitizenIdPhoto1 != null)
            {
                citizenImage1 = await UploadImageToCloudinary(updateTeamPlayerDTO.CitizenIdPhoto1);
            }
            if (updateTeamPlayerDTO.CitizenIdPhoto2 != null)
            {
                citizenImage2 = await UploadImageToCloudinary(updateTeamPlayerDTO.CitizenIdPhoto2);
            }
            player.Avatar = imageAvarte;
            player.Name = updateTeamPlayerDTO.Name;
            player.Phone = updateTeamPlayerDTO.Phone;
            player.Position = updateTeamPlayerDTO.Position;
            player.ShirtNumber = updateTeamPlayerDTO.ShirtNumber;
            player.CitizenIdPhoto1 = citizenImage1;
            player.CitizenIdPhoto2 = citizenImage2;
            player.BirthDate = updateTeamPlayerDTO.BirthDate;
            player.Email = updateTeamPlayerDTO.Email;
            player.Gender = updateTeamPlayerDTO.Gender;
            player.Bio = updateTeamPlayerDTO.Bio;
            player.PreferredFoot = updateTeamPlayerDTO.PreferredFoot;
            player.Height = updateTeamPlayerDTO.Height;
            player.Strengths = updateTeamPlayerDTO.Strengths;
            player.Weaknesses = updateTeamPlayerDTO.Weaknesses;
            player.CitizenshipId = updateTeamPlayerDTO.CitizenshipId;
            player.Country = updateTeamPlayerDTO.Country;
            player.CompetitionName = updateTeamPlayerDTO.CompetitionName;
            _dbcontext.Players.Update(player);
            return await _dbcontext.SaveChangesAsync() > 0;
        }

        public async Task<List<SearchPlayerModel>> SearchPlayers(string searchQuery)
        {
            var teamSearchResults = _dbcontext.Teams
                .Where(t => t.Name.Contains(searchQuery) ||
                            t.TeamPlayers.Any(tp => tp.Player.Name.Contains(searchQuery)) ||
                            t.TeamManager.Fullname.Contains(searchQuery))
                .Select(t => new SearchPlayerModel
                {
                    TeamId = t.Id,
                    TeamName = t.Name,
                    TeamManagerName = t.TeamManager.Fullname,
                    Players = t.TeamPlayers.Select(tp => new PlayersDto
                    {
                        PlayerId = tp.Player.Id,
                        PlayerName = tp.Player.Name,
                        Position = tp.Player.Position
                    }).ToList()
                }).ToList();

            return teamSearchResults;
        }

        public async Task<IEnumerable<PlayerStatusModel>> FilterPlayersByStatus(string status)
        {
            var result = await _dbcontext.TeamPlayers
               .Where(tp => tp.CurrentStatus.Equals(status))
               .Select(tp => new PlayerStatusModel
               {
                   PlayerId = tp.PlayerId.Value,
                   Name = tp.Player.Name,
                   CurrentStatus = tp.CurrentStatus
               })
               .ToListAsync();

            if (result.Count <= 0)
            {
                Console.WriteLine("Not found");
            }
            return result;
        }

        public async Task<IEnumerable<GetAllPlayerModel>> GetPlayersByTeamIdAsync(int teamId)
        {
            var players = await _dbcontext.Players
                      // Lọc ra các cầu thủ thuộc về đội có ID cụ thể
                      .Where(p => p.TeamPlayers.Any(tp => tp.TeamId == teamId))
                      .ToListAsync();

            var playerIds = players.Select(p => p.Id).ToList();

            // Lấy ra thống kê cho các cầu thủ này từ bảng PlayerMatchStatistic
            var statistics = await _dbcontext.PlayerMatchStatistics
                                .Where(pms => playerIds.Contains(pms.PlayerId.Value))
                                .GroupBy(pms => pms.PlayerId)
                                .Select(group => new
                                {
                                    PlayerId = group.Key,
                                    TotalMatchesPlayed = group.Count(),
                                    Goals = group.Sum(pms => pms.Goals ?? 0),
                                    YellowCards = group.Sum(pms => pms.YellowCards ?? 0),
                                    RedCards = group.Sum(pms => pms.RedCards ?? 0)
                                })
                                .ToListAsync();

            // Map thông tin từ player và statistics vào DTO
            var result = players.Select(p => new GetAllPlayerModel
            {
                Id = p.Id,
                Avatar=p.Avatar,
                Name = p.Name,
                Position = p.Position, // Giả sử có trong Player
                ShirtNumber = p.ShirtNumber, // Giả sử có trong Player
                PreferredFoot=p.PreferredFoot,
                Age = CalculateAge(p.BirthDate),
                Height = p.Height,
                TotalMatchesPlayed = statistics.FirstOrDefault(stat => stat.PlayerId == p.Id)?.TotalMatchesPlayed ?? 0, // Added this line
                Country = p.Country, // Assuming 'Country' is used for BirthPlace
                IsActive = p.TeamPlayers.Any(tp => tp.TeamId == teamId && tp.CurrentStatus == "Active"),
                // Ánh xạ thông tin thống kê
                
                Goals = statistics.FirstOrDefault(stat => stat.PlayerId == p.Id)?.Goals,
                YellowCards = statistics.FirstOrDefault(stat => stat.PlayerId == p.Id)?.YellowCards,
                RedCards = statistics.FirstOrDefault(stat => stat.PlayerId == p.Id)?.RedCards,
            });

            if (!result.Any())
            {
                Console.WriteLine("Not found");
            }

            return result;
        }

        private static int CalculateAge(DateTime? birthDate)
        {
            if (birthDate.HasValue)
            {
                var today = DateTime.Today;
                var age = today.Year - birthDate.Value.Year;
                if (birthDate > today.AddYears(-age)) age--;
                return age;
            }
            return 0;
        }
    }
}
