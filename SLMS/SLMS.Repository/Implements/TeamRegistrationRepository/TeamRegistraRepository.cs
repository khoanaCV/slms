using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.TeamRegistrationDTO;
using SLMS.Repository.BaseRepository;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using SLMS.Repository.Implements.EmailRepository;
using SLMS.DTO.UserDTO;
using SLMS.DTO.NotificatioDTO;
using SLMS.Repository.Implements.NotificationsRepository;
using System.Threading;

namespace SLMS.Repository.Implements.TeamRegistrationRepository
{
    public class TeamRegistraRepository : BaseRepository<TeamRegistration>, ITeamRegistrationRepository
    {
        private readonly EmailConfiguration _emailConfiguration;
        private readonly IEmailSenderRepository _emailSenderRepository;
        public TeamRegistraRepository(SEP490Context dbcontext, EmailConfiguration emailConfiguration, IEmailSenderRepository emailSenderRepository) : base(dbcontext)
        {
            _emailConfiguration = emailConfiguration ?? throw new ArgumentNullException(nameof(emailConfiguration));
            _emailSenderRepository = emailSenderRepository;
        }


        public async Task<IEnumerable<TeamRegistrationModel>> GetTeamRegistrationsAsync()
        {
            // Lấy thông tin đăng ký đội từ database
            var teamRegistrations = from tr in _dbcontext.TeamRegistrations
                                    join team in _dbcontext.Teams on tr.TeamId equals team.Id
                                    join user in _dbcontext.Users on team.TeamManagerId equals user.Id
                                    select new
                                    {
                                        tr.Id,
                                        team.Name,
                                        TeamID = team.Id,
                                        user.Fullname,
                                        user.ContactInfo, // Giả định trường ContactInfo chứa số điện thoại
                                        tr.ApplicationDate,
                                        tr.ApprovalStatus
                                    };

            var result = await teamRegistrations.ToListAsync();

            // Dựa vào kết quả trên, lấy tổng số thành viên trong mỗi đội
            var teamRegistrationDTOs = result.Select(r => new TeamRegistrationModel
            {
                ID = r.Id,
                Name = r.Name,
                MemberOfTeam = _dbcontext.TeamPlayers.Count(tp => tp.TeamId == r.TeamID), // Đếm số lượng thành viên
                ContactName = r.Fullname,
                ContactPhone = r.ContactInfo, // Sử dụng ContactInfo như số điện thoại
                RegistrationTime = r.ApplicationDate,
                Status = r.ApprovalStatus
            });
            return teamRegistrationDTOs;
        }

        public async Task<bool> InviteTeam(InvitedTeamLeagueModel model)
        {
            try
            {
                // Kiểm tra xem đội đã tồn tại chưa
                var team = await _dbcontext.Teams.FirstOrDefaultAsync(t => t.Name == model.NameOfTeam);
                if (team == null)
                {
                    return false;
                }

                // Kiểm tra xem người quản lý đội đã tồn tại chưa
                var userManager = await _dbcontext.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (userManager == null)
                {
                    return false;
                }

                // Kiểm tra xem một đăng ký đã tồn tại chưa
                var registration = await _dbcontext.TeamRegistrations
                    .FirstOrDefaultAsync(tr => tr.TeamId == team.Id && tr.TournamentId == model.TournamentId);

                // Nếu chưa tồn tại, tạo một đăng ký mới
                if (registration == null)
                {
                    _dbcontext.TeamRegistrations.Add(new TeamRegistration
                    {
                        TeamId = team.Id,
                        TournamentId = model.TournamentId,
                        ApprovalStatus = "Processing", // Giả sử 0 có nghĩa là 'Đang chờ'
                        ApplicationDate = DateTime.Now
                        // Các trường khác nếu cần
                    });
                    await _dbcontext.SaveChangesAsync();
                }

                // Gửi thông báo mời đến người quản lý đội
                await SendNotificationToUser(userManager, team.Name);

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Không thể mời đội: {ex}");
                return false;
            }
        }

        private async Task SendNotificationToUser(User userManager, string teamName)
        {
            try
            {
                if (_emailConfiguration == null)
                {
                    throw new InvalidOperationException("Email configuration must be set before sending notifications.");
                }

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("SLMS.System", _emailConfiguration.From));
                message.To.Add(new MailboxAddress(userManager.Fullname, userManager.Email));
                message.Subject = "Thông báo mời tham gia giải đấu";
                message.Body = new TextPart("plain")
                {
                    Text = $"Bạn đã được mời tham gia giải đấu với đội bóng {teamName}. Vui lòng đăng nhập vào hệ thống để xác nhận."
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, SecureSocketOptions.StartTls);

                    // Đăng nhập vào SMTP server với username và password đã cung cấp
                    await client.AuthenticateAsync(_emailConfiguration.UserName, _emailConfiguration.Password);

                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex}");
                throw;
            }
        }

        public async Task<IEnumerable<TeamRegistrationInfoModel>> GetTeamRegistrationLeague(int tournamentId)
        {
            var teamsInTournament = await _dbcontext.TeamRegistrations
                .Where(tr => tr.TournamentId == tournamentId && tr.ApprovalStatus == "Approve") // Assuming 1 means approved
                .Select(tr => tr.TeamId)
                .ToListAsync();

            var teamRegistration = new List<TeamRegistrationInfoModel>();

            foreach (var teamId in teamsInTournament)
            {
                var team = await _dbcontext.Teams.FindAsync(teamId);
                var matches = await _dbcontext.Matches
                    .Where(m => (m.Team1Id == teamId || m.Team2Id == teamId) && m.TournamentId == tournamentId)
                    .ToListAsync();

                int wins = 0, draws = 0, loses = 0;

                foreach (var match in matches)
                {
                    var matchResult = await _dbcontext.MatchStatistics
                        .FirstOrDefaultAsync(ms => ms.MatchId == match.Id);

                    if (matchResult != null)
                    {
                        bool isTeam1 = match.Team1Id == teamId;
                        int goalsFor = isTeam1 ? matchResult.GoalsTeam1.Value : matchResult.GoalsTeam2.Value;
                        int goalsAgainst = isTeam1 ? matchResult.GoalsTeam2.Value : matchResult.GoalsTeam1.Value;

                        if (goalsFor > goalsAgainst) wins++;
                        else if (goalsFor == goalsAgainst) draws++;
                        else loses++;
                    }
                }

                var numberOfMembers = await _dbcontext.TeamPlayers
                    .CountAsync(tp => tp.TeamId == teamId && tp.CurrentStatus == "Approve"); // Assuming 1 means active

                teamRegistration.Add(new TeamRegistrationInfoModel
                {
                    Id = team.Id,
                    Logo = team.Logo,
                    Name = team.Name,
                    PlayedMatches = matches.Count,
                    Wins = wins,
                    Losses = loses,
                    Draws = draws,
                    NumberOfMembers = numberOfMembers
                });
            }
            return teamRegistration;
        }

        public async Task<TeamRegistrantionsDetailModel> GetTeamDetailInTournament(int tournamentId, int teamId)
        {
            // Kiểm tra xem đội bóng có tồn tại và được chấp nhận trong giải đấu không
            var teamRegistration = await _dbcontext.TeamRegistrations
                                    .FirstOrDefaultAsync(tr => tr.TeamId == teamId && tr.TournamentId == tournamentId && tr.ApprovalStatus == "Approve");
            var team = await _dbcontext.Teams.FindAsync(teamId);

            // Kiểm tra xem đối tượng team có tồn tại không
            if (team == null)
            {
                return null; // Hoặc xử lý phù hợp, ví dụ trả về một lỗi cụ thể
            }

            if (teamRegistration == null)
            {
                return null; // Hoặc trả về thông báo phù hợp
            }
            var matches = await _dbcontext.Matches
                .Where(m => (m.Team1Id == teamId || m.Team2Id == teamId) && m.TournamentId == tournamentId)
                .OrderByDescending(m => m.MatchDate)
                .Select(m => new
                {
                    Match = m,
                    MatchStatistic = m.MatchStatistics.FirstOrDefault() // Lấy thống kê đầu tiên
                })
                .Select(m => new MatchDetailModel
                {
                    OpponentTeamId = m.Match.Team1Id == teamId ? m.Match.Team2Id.Value : m.Match.Team1Id.Value, // Lấy ID đội đối thủ
                    OpponentTeamName = m.Match.Team1Id == teamId ? m.Match.Team2.Name : m.Match.Team1.Name, // Lấy tên đội đối thủ
                    MatchDate = m.Match.MatchDate,
                    StartTime = m.Match.StartTime,
                    CurrentStatus = m.Match.CurrentStatus,
                    GoalsTeam1 = m.Match.CurrentStatus == "completed" && m.MatchStatistic != null ? m.MatchStatistic.GoalsTeam1 ?? 0 : (int?)null,
                    GoalsTeam2 = m.Match.CurrentStatus == "completed" && m.MatchStatistic != null ? m.MatchStatistic.GoalsTeam2 ?? 0 : (int?)null,
                })
                .ToListAsync();


            return new TeamRegistrantionsDetailModel
            {
                TeamName = team.Name,
                Matches = matches
            };
        }


        public async Task<IEnumerable<TeamRegistrantionsPlayerInfoModel>> GetTeamMembersInfo(int teamId, int tournamentId)
        {
            // Ensure the team is registered and approved for the tournament
            var isTeamRegisteredAndApproved = await _dbcontext.TeamRegistrations
                .AnyAsync(tr => tr.TeamId == teamId && tr.TournamentId == tournamentId && tr.ApprovalStatus == "Approve");
            if (!isTeamRegisteredAndApproved)
            {
                return Enumerable.Empty<TeamRegistrantionsPlayerInfoModel>();
            }

            // Retrieve active team players' info and their statistics for the specific tournament
            var playersInfo = await _dbcontext.TeamPlayers
                .Where(tp => tp.TeamId == teamId && tp.CurrentStatus == "Active")
                .Select(tp => new
                {
                    Player = tp.Player,
                    Stats = tp.Player.PlayerMatchStatistics
                        .Where(pms => pms.Match.TournamentId == tournamentId)
                        .GroupBy(pms => pms.PlayerId)
                        .Select(g => new
                        {
                            Goals = g.Sum(x => x.Goals.HasValue ? x.Goals.Value : 0),
                            YellowCards = g.Sum(x => x.YellowCards.HasValue ? x.YellowCards.Value : 0),
                            RedCards = g.Sum(x => x.RedCards.HasValue ? x.RedCards.Value : 0)
                        }).FirstOrDefault() // Assuming a player will not have stats in multiple rows for the same tournament
                })
                .Select(p => new TeamRegistrantionsPlayerInfoModel
                {
                    Avatar = p.Player.Avatar,
                    Name = p.Player.Name,
                    Position = p.Player.Position,
                    ShirtNumber = p.Player.ShirtNumber,
                    Goals = p.Stats != null ? p.Stats.Goals : 0,
                    YellowCards = p.Stats != null ? p.Stats.YellowCards : 0,
                    RedCards = p.Stats != null ? p.Stats.RedCards : 0
                }).ToListAsync();

            return playersInfo;
        }


        public async Task<bool> AcceptInvitation(AcceptInvitationModel model)
        {
            var teamRegistration = await _dbcontext.TeamRegistrations.FindAsync(model.TeamRegistrationId);
            if (teamRegistration == null) return false;

            teamRegistration.ApprovalStatus = "Approve"; // Assuming 2 means accepted
            await _dbcontext.SaveChangesAsync();

            var team = await _dbcontext.Teams.FindAsync(teamRegistration.TeamId);
            if (team != null && team.TeamManagerId.HasValue)
            {
                // Create a new notification
                var approvalNotification = new Notification
                {
                    UserId = team.TeamManagerId.Value,
                    NotificationType = "Approval",
                    Content = "Your team has been approved for the tournament.",
                    CreatedAt = DateTime.Now, // Set the creation date/time
                    IsRead = "No"
                };

                // Add the notification to the context
                _dbcontext.Notifications.Add(approvalNotification);

                // Save changes to persist the notification
                await _dbcontext.SaveChangesAsync();
            }

            return true;
        }

        public async Task<bool> DeclineInvitation(DeclineInvitationModel model)
        {
            var teamRegistration = await _dbcontext.TeamRegistrations.FindAsync(model.TeamRegistrationId);
            if (teamRegistration == null) return false;

            teamRegistration.ApprovalStatus = "Reject"; // Assuming 3 means declined
            await _dbcontext.SaveChangesAsync();

            var team = await _dbcontext.Teams.FindAsync(teamRegistration.TeamId);
            if (team != null && team.TeamManagerId.HasValue)
            {
                var rejectionNotification = new Notification
                {
                    UserId = team.TeamManagerId.Value, // Cast to int
                    NotificationType = "Rejection",
                    Content = "Your team invitation has been declined for the tournament.",
                    CreatedAt = DateTime.Now, // Set the creation date/time
                    IsRead = "No"
                };

                // Add the notification to the context
                _dbcontext.Notifications.Add(rejectionNotification);

                // Save changes to persist the notification
                await _dbcontext.SaveChangesAsync();
            }

            return true;
        }
    }
}
