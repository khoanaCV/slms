using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SLMS.Core.Model;
using SLMS.DTO.LineUpDTO;
using SLMS.DTO.PlayerDTO;
using SLMS.DTO.SponsorDTO;
using SLMS.DTO.TeamDTO;
using SLMS.Repository.BaseRepository;

namespace SLMS.Repository.Implements.TeamRepository
{
    public class TeamsRepository : BaseRepository<Team>, ITeamRepository
    {
        private Cloudinary _cloudinary;
        public TeamsRepository(SEP490Context dbcontext, IConfiguration configuration) : base(dbcontext)
        {
            var account = new Account(
                  configuration["Cloudinary:CloudName"],
                  configuration["Cloudinary:ApiKey"],
                  configuration["Cloudinary:ApiSecret"]
              );
            _cloudinary = new Cloudinary(account);
        }

        public async Task<PlayerProfileDTO> GetPlayerProfileAsync(int playerId)
        {
            var player = await _dbcontext.Players.FindAsync(playerId);
            if (player == null) throw new KeyNotFoundException("Player not found");

            // Giả sử Player_Match_Statistics đã chứa tổng hợp dữ liệu cần thiết
            var statistics = await _dbcontext.PlayerMatchStatistics
                .Where(pms => pms.PlayerId == playerId)
                .ToListAsync();

            var matchHistories = await _dbcontext.Matches
                .Where(m => m.PlayerMatchStatistics.Any(pms => pms.PlayerId == playerId))
                .Select(m => new MatchHistoryDTO
                {
                    MatchID = m.Id,
                    MatchDate = (DateTime)m.MatchDate,
                    OpponentTeamName = m.Team2.Name, // Ví dụ, cần logic để xác định đúng đội đối thủ
                    Result = "N/A" // Giả định, cần logic để tính toán kết quả
                }).ToListAsync();

            return new PlayerProfileDTO
            {
                PlayerID = player.Id,
                Name = player.Name,
                // Ánh xạ các trường còn lại
                TotalGoals = statistics.Sum(s => s.Goals),
                TotalAssists = statistics.Sum(s => s.Assists),
                TotalMatchesPlayed = statistics.Count,
                TotalYellowCards = statistics.Sum(s => s.YellowCards),
                TotalRedCards = statistics.Sum(s => s.RedCards),
                MatchHistories = matchHistories
            };
        }

        public async Task<Team> CreateTeamAsync(CreateTeamModel model)
        {
            //var logoPath = model.Logo != null ? await SaveFileAsync(model.Logo, "Uniform") : null;
            //var uniForm1Path = model.UniForm1 != null ? await SaveFileAsync(model.UniForm1, "Uniform") : null;
            //var uniForm2Path = model.UniForm2 != null ? await SaveFileAsync(model.UniForm2, "Uniform") : null;
            //var uniForm3Path = model.UniForm3 != null ? await SaveFileAsync(model.UniForm3, "Uniform") : null;

            string logoPath = null;
            string uniForm1Path = null;
            string uniForm2Path = null;
            string uniForm3Path = null;
            if (model.Logo != null)
            {
                logoPath = await UploadImageToCloudinary(model.Logo);
            }
            if (model.UniForm1 != null)
            {
                logoPath = await UploadImageToCloudinary(model.UniForm1);
            }
            if (model.UniForm2 != null)
            {
                logoPath = await UploadImageToCloudinary(model.UniForm2);
            }
            if (model.UniForm3 != null)
            {
                logoPath = await UploadImageToCloudinary(model.UniForm3);
            }

            var team = new Team
            {
                Name = model.Name,
                Level = model.Level,
                Phone = model.Phone,
                OpenOrNot = model.OpenOrNot,
                AgeJoin = model.AgeJoin,
                ContactPerson = model.ContactPerson,
                ContactPersonEmail = model.ContactPersonEmail,
                ActivityArea = model.ActivityArea,
                OperatingTime = model.OperatingTime,
                Logo = logoPath,
                UniForm1 = uniForm1Path,
                UniForm2 = uniForm2Path,
                UniForm3 = uniForm3Path,
                Description = model.Description,
                TeamManagerId = model.TeamManagerId,
            };

            _dbcontext.Teams.Add(team);
            try
            {
                await _dbcontext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return team;
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

        public async Task<Team> UpdateTeamAsync(UpdateTeamModel model)
        {
            var team = await _dbcontext.Teams.FindAsync(model.TeamID);
            if (team == null)
            {
                throw new ArgumentException("Team not found", nameof(model.Name));
            }

            // Chỉ cập nhật logo và đồng phục nếu file mới được cung cấp
            // Tải ảnh lên Cloudinary và lấy URL
            string logoPath = null;
            string uniForm1Path = null;
            string uniForm2Path = null;
            string uniForm3Path = null;
            if (model.Logo != null)
            {
                logoPath = await UploadImageToCloudinary(model.Logo);
                team.Logo = logoPath;
            }
            if (model.UniForm1 != null)
            {
                logoPath = await UploadImageToCloudinary(model.UniForm1);
                team.UniForm1 = uniForm1Path;
            }
            if (model.UniForm2 != null)
            {
                logoPath = await UploadImageToCloudinary(model.UniForm2);
                team.UniForm2 = uniForm2Path;
            }
            if (model.UniForm3 != null)
            {
                logoPath = await UploadImageToCloudinary(model.UniForm3);
                team.UniForm3 = uniForm3Path;
            }

            // Cập nhật các thuộc tính còn lại từ model vào đối tượng team
            team.Logo = logoPath;
            team.Name = model.Name;
            team.Level = model.Level;
            team.Phone = model.Phone;
            team.AgeJoin = model.AgeJoin;
            team.ContactPerson = model.ContactPerson;
            team.ContactPersonEmail = model.ContactPersonEmail;
            team.ActivityArea = model.ActivityArea;
            team.OperatingTime = model.OperatingTime;
            team.Description = model.Description;
            team.TeamManagerId = model.TeamManagerId;

            // Đối tượng team đã được theo dõi nên không cần gọi Add
            await _dbcontext.SaveChangesAsync();

            return team;
        }

        public async Task<Team> GetTeamById(int teamId)
        {
            try
            {
                var team = await _dbcontext.Teams
                        .Where(t => t.Id == teamId).FirstOrDefaultAsync();

                if (team == null)
                {
                    throw new InvalidOperationException("Team not found");
                }

                return team;
            }
            catch (ArgumentException ex)
            {

                throw new Exception(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                throw new Exception(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while processing your request.");
            }
        }

        public async Task<IEnumerable<GetInformationTeamModel>> GetTeamsByUserIdAsync(int userId)
        {
            var teams = await _dbcontext.Teams
                .Where(t => t.TeamManagerId == userId)
                .Select(t => new GetInformationTeamModel
                {
                    Id = t.Id,
                    Name = t.Name,
                    Logo = t.Logo,
                    Description = t.Description,
                    Players = t.TeamPlayers.Where(tp => tp.CurrentStatus == "Active")
                                .Select(tp => new PlayerModel
                                {
                                    Id = tp.Player.Id,
                                    Name = tp.Player.Name,
                                    Avatar = tp.Player.Avatar,
                                    Position = tp.Player.Position,
                                    ShirtNumber = tp.Player.ShirtNumber
                                }).ToList(),
                    MemberCount = t.TeamPlayers.Count(tp => tp.CurrentStatus == "Active")

                }).ToListAsync();

            return teams;
        }

        public async Task<int> CreateTeamLineUpAsync(TeamLineUpDTO lineUpDTO)
        {
            // Initialize the TeamLineup object with the necessary properties from lineUpDTO
            var teamLineUp = new TeamLineup
            {
                // Using null-coalescing and conditional operators to handle null or default values
                MatchId = lineUpDTO?.MatchId == 0 ? null : lineUpDTO?.MatchId,
                TeamId = lineUpDTO?.TeamId == 0 ? null : lineUpDTO ?.TeamId,
                Formation = lineUpDTO.Formation,
                DateCreated = DateTime.Now, // Setting the creation date to the current date and time
                NumberOfPlayers = lineUpDTO.NumberOfPlayers,
                LinkPathSaveDiagram = lineUpDTO.LinkPathSaveDiagram,
                IsPublic = lineUpDTO.IsPublic,
                NameLineUp = lineUpDTO.NameLineUp,
                // Mapping each PlayerInLineupDTO to a PlayersInLineup entity
                PlayersInLineups = lineUpDTO.Players?.Select(p => new PlayersInLineup
                {
                    PlayerId = p?.PlayerId == 0 ? null :p.PlayerId,//Correctly handling nullable PlayerId
                    Name = p.Name,
                    CompetitionName = p.CompetitionName,
                    Position = p.Position,
                    StartOrSub = p.StartOrSub,
                    X = p.X,
                    Y = p.Y
                }).ToList()
            };

            // Adding the constructed TeamLineup object to the DbSet<TeamLineup>
            _dbcontext.TeamLineups.Add(teamLineUp);
            // Saving the changes asynchronously to the database
            await _dbcontext.SaveChangesAsync();

            // Returning the ID of the newly created TeamLineup record
            return teamLineUp.Id;
        }

        public async Task<IEnumerable<TeamLineUpDTO>> GetAllTeamLineUpsAsync(int teamId)
        {
            return await _dbcontext.TeamLineups
                .Where(tl => tl.TeamId == teamId)
                .Select(tl => new TeamLineUpDTO
                {
                    MatchId = tl.MatchId == 0 ? null: tl.MatchId, // Assuming MatchId is not nullable in TeamLineUpDTO
                    TeamId = tl.TeamId == 0 ? null: tl.MatchId, // Assuming TeamId is not nullable in TeamLineUpDTO
                    Formation = tl.Formation,
                    NumberOfPlayers = tl.NumberOfPlayers,
                    LinkPathSaveDiagram = tl.LinkPathSaveDiagram,
                    IsPublic = tl.IsPublic,
                    NameLineUp= tl.NameLineUp
                    // Map the list of starting players and substitutes
                }).ToListAsync();
        }

        public async Task<TeamLineUpDTO> GetTeamLineUpAsync(int lineUpId)
        {
            var teamLineUp = await _dbcontext.TeamLineups
                .Include(tl => tl.PlayersInLineups) // Đảm bảo rằng thông tin về các cầu thủ cũng được tải lên
                .FirstOrDefaultAsync(tl => tl.Id == lineUpId);

            if (teamLineUp == null)
            {
                throw new KeyNotFoundException($"Team lineup with ID {lineUpId} not found.");
            }

            // Chuyển đổi thông tin đội hình và danh sách cầu thủ sang TeamLineUpDTO
            return new TeamLineUpDTO
            {
                MatchId = teamLineUp.MatchId ?? 0,
                TeamId = teamLineUp.TeamId ?? 0,
                Formation = teamLineUp.Formation,
                NumberOfPlayers = teamLineUp.NumberOfPlayers,
                LinkPathSaveDiagram = teamLineUp.LinkPathSaveDiagram,
                IsPublic = teamLineUp.IsPublic,
                NameLineUp = teamLineUp.NameLineUp,
                // Chuyển đổi danh sách cầu thủ sang PlayerInLineupDTO
                Players = teamLineUp.PlayersInLineups.Select(p => new PlayerInLineupDTO
                {
                    PlayerId = p.PlayerId,
                    Name = p.Name,
                    CompetitionName = p.CompetitionName,
                    Position = p.Position,
                    StartOrSub = p.StartOrSub,
                    X = p.X,
                    Y = p.Y
                }).ToList()
            };
        }

        public async Task UpdateTeamLineUpAsync(int lineUpId, TeamLineUpDTO lineUpDTO)
        {
            var teamLineUp = await _dbcontext.TeamLineups
                .Include(tl => tl.PlayersInLineups)
                .FirstOrDefaultAsync(tl => tl.Id == lineUpId);

            if (teamLineUp == null)
            {
                throw new KeyNotFoundException($"Team lineup with ID {lineUpId} not found.");
            }

            // Cập nhật thông tin cơ bản của đội hình
            teamLineUp.MatchId = lineUpDTO.MatchId == 0 ? null : lineUpDTO.MatchId;
            teamLineUp.TeamId = lineUpDTO.TeamId == 0 ? null : lineUpDTO.TeamId;
            teamLineUp.Formation = lineUpDTO.Formation;
            teamLineUp.NumberOfPlayers = lineUpDTO.NumberOfPlayers;
            teamLineUp.LinkPathSaveDiagram = lineUpDTO.LinkPathSaveDiagram;
            teamLineUp.IsPublic = lineUpDTO.IsPublic;
            teamLineUp.NameLineUp = lineUpDTO.NameLineUp;
            teamLineUp.DateCreated = lineUpDTO.DateCreated ?? teamLineUp.DateCreated; // Giữ nguyên ngày tạo nếu DTO không cung cấp

            // Cập nhật danh sách cầu thủ trong đội hình
            // Đầu tiên, xác định các cầu thủ nào cần được thêm mới hoặc cập nhật
            var existingPlayerIds = teamLineUp.PlayersInLineups.Select(p => p.PlayerId).ToList();
            foreach (var playerDTO in lineUpDTO.Players)
            {
                var existingPlayer = teamLineUp.PlayersInLineups
                    .FirstOrDefault(p => p.PlayerId == playerDTO.PlayerId);

                if (existingPlayer != null)
                {
                    // Cập nhật thông tin cầu thủ hiện có
                    existingPlayer.Name = playerDTO.Name;
                    existingPlayer.CompetitionName = playerDTO.CompetitionName;
                    existingPlayer.Position = playerDTO.Position;
                    existingPlayer.StartOrSub = playerDTO.StartOrSub;
                    existingPlayer.X = playerDTO.X;
                    existingPlayer.Y = playerDTO.Y;
                }
                else
                {
                    // Thêm cầu thủ mới vào đội hình
                    teamLineUp.PlayersInLineups.Add(new PlayersInLineup
                    {
                        PlayerId = playerDTO.PlayerId,
                        Name = playerDTO.Name,
                        CompetitionName = playerDTO.CompetitionName,
                        Position = playerDTO.Position,
                        StartOrSub = playerDTO.StartOrSub,
                        X = playerDTO.X,
                        Y = playerDTO.Y
                    });
                }
            }

            // Xác định và xóa những cầu thủ không còn trong đội hình mới
            var playerIdsToUpdate = lineUpDTO.Players.Select(p => p.PlayerId).ToList();
            var playersToRemove = teamLineUp.PlayersInLineups
                .Where(p => !playerIdsToUpdate.Contains(p.PlayerId))
                .ToList();

            _dbcontext.PlayersInLineups.RemoveRange(playersToRemove);

            await _dbcontext.SaveChangesAsync();
        }

        public async Task DeleteTeamLineUpAsync(int lineUpId)
        {
            // Tìm đội hình cần xóa
            var teamLineUp = await _dbcontext.TeamLineups
                .Include(tl => tl.PlayersInLineups) // Đảm bảo rằng thông tin về các cầu thủ cũng được tải lên để xóa
                .FirstOrDefaultAsync(tl => tl.Id == lineUpId);

            if (teamLineUp == null)
            {
                // Nếu không tìm thấy đội hình, phát sinh ngoại lệ
                throw new KeyNotFoundException($"Team lineup with ID {lineUpId} not found.");
            }

            // Xóa các bản ghi cầu thủ trong đội hình
            // Do đã include thông tin cầu thủ khi tải đội hình, EF Core sẽ tự động xử lý việc xóa các bản ghi liên quan
            _dbcontext.PlayersInLineups.RemoveRange(teamLineUp.PlayersInLineups);

            // Xóa đội hình sau khi đã xóa thông tin cầu thủ
            _dbcontext.TeamLineups.Remove(teamLineUp);

            // Lưu thay đổi vào cơ sở dữ liệu
            await _dbcontext.SaveChangesAsync();
        }


        public async Task<List<PlayerDTO>> GetActivePlayersByTeamIdAsync(int teamId)
        {
            try
            {
                var data = await _dbcontext.TeamPlayers
                    .Where(tp => tp.TeamId == teamId && tp.CurrentStatus == "Active")
                    .Select(tp => new PlayerDTO
                    {
                        Id = tp.PlayerId ?? 0, // Đặt là 0 nếu PlayerId là null
                        Name = tp.Player.Name, // Lấy tên từ đối tượng Player
                        CompetitionName = tp.Player.CompetitionName, // Lấy tên thi đấu từ đối tượng Player
                        Number = tp.Player.ShirtNumber, // Lấy số áo từ đối tượng Player
                        Position = tp.Player.Position, // Lấy vị trí từ đối tượng Player
                        Active = false,
                        X = 10,
                        Y = 90
                    }).ToListAsync();

                if (data == null)
                {
                    Console.WriteLine("Player not found");
                }
                return data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
