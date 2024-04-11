using SLMS.Core.Model;
using SLMS.Repository.BaseRepository;
using Microsoft.EntityFrameworkCore;
using SLMS.DTO.AdminDTO;
using SLMS.Repository.BaseRepository;
using SLMS.DTO.AwardsDTO;
using MailKit.Search;
namespace SLMS.Repository.Implements.AdminRepository
{
    public class AdminRepository : BaseRepository<User>, IAdminRepository
    {
        public AdminRepository(SEP490Context dbcontext) : base(dbcontext) { }
        public async Task<IEnumerable<UserDTO>> GetAccountAsync()
        {
            var users = await _dbcontext.Users
          // Lọc ra những người dùng không có Permission "System management"
          .Where(u => !u.RolePermissions.Any(rp => rp.Permission != null && rp.Permission.Name == "System management"))
          .Select(u => new UserDTO
          {
              Id = u.Id,
              Avatar = u.Avatar,
              Fullname = u.Fullname,
              Bio = u.Bio,
              BirthDate = u.BirthDate,
              ContactInfo = u.ContactInfo,
              Country = u.Country,
              Username = u.Username,
              Email = u.Email,
              Status = u.Status,
              Permissions = u.RolePermissions
                  .Where(rp => rp.Permission != null)
                  .Select(rp => rp.Permission.Name)
                  .Distinct()
                  .ToList()
          })
          .ToListAsync();

            return users;
        }

        public async Task<IEnumerable<UserDTO>> SearchAccountsAsync(string searchTerm)
        {
            var users = await _dbcontext.Users
                // Thêm bộ lọc để không bao gồm người dùng có Permission "System management"
                .Where(u => !u.RolePermissions.Any(rp => rp.Permission != null && rp.Permission.Name == "System management"))
                // Áp dụng tìm kiếm theo Fullname hoặc Email
                .Where(u => u.Fullname.Contains(searchTerm) || u.Email.Contains(searchTerm))
                .Select(u => new UserDTO
                {
                    Id = u.Id,
                    Avatar = u.Avatar,
                    Fullname = u.Fullname,
                    Bio = u.Bio,
                    BirthDate = u.BirthDate,
                    ContactInfo = u.ContactInfo,
                    Country = u.Country,
                    Username = u.Username,
                    // Loại trừ trường Password khỏi DTO
                    Email = u.Email,
                    Status = u.Status,
                    Permissions = u.RolePermissions
                  .Where(rp => rp.Permission != null)
                  .Select(rp => rp.Permission.Name)
                  .Distinct()
                  .ToList()
                    // Bạn có thể thêm các trường khác nếu cần
                })
                .ToListAsync();

            return users;
        }

        public async Task<IEnumerable<UserDTO>> ViewProfile(int idAccount)
        {
            var users = await _dbcontext.Users
                .Where(u => !u.RolePermissions.Any(rp => rp.Permission != null && rp.Permission.Name == "System management"))
            .Where(u => u.Id == idAccount)
            .Select(u => new UserDTO
            {
                Id = u.Id,
                Avatar = u.Avatar,
                Fullname = u.Fullname,
                Bio = u.Bio,
                BirthDate = u.BirthDate,
                ContactInfo = u.ContactInfo,
                Country = u.Country,
                Username = u.Username,
                //      Password = u.Password,
                Email = u.Email,
                Status = u.Status
                // Thêm các trường khác nếu cần
            })
              .ToListAsync();

            return users;
        }

        public async Task<IEnumerable<FeedbackDTO>> GetFeedback()
        {
            var feedbacks = await _dbcontext.Feedbacks
              // Sử dụng .Include để lấy thông tin người dùng liên quan đến feedback
              .Include(f => f.User)
              .ThenInclude(u => u.RolePermissions)
              .ThenInclude(rp => rp.Permission)
              // Lọc ra feedback mà người dùng không có Permission là "System management"
              .Where(f => !f.User.RolePermissions.Any(rp => rp.Permission.Name == "System management"))
              .Select(f => new FeedbackDTO
              {
                  Id = f.Id,
                  UserId = f.UserId,
                  Title = f.Title,
                  Content = f.Content,
                  SubmittedAt = f.SubmittedAt,
                  // Bạn có thể thêm các trường khác của FeedbackDTO ở đây
              })
                  .ToListAsync();

            return feedbacks;
        }
        public async Task<IEnumerable<LeagueDTO>> GetAllLeagues()
        {
            var leagues = await _dbcontext.Tournaments
                .Select(l => new LeagueDTO
                {
                    Id = l.Id,
                    AvatarTournament = l.AvatarTournament,
                    BigPhotoTournament = l.BigPhotoTournament,
                    Phone = l.Phone,
                    Name = l.Name,
                    CompetitionFormatName = l.CompetitionFormatName,
                    CompetitionDescription = l.CompetitionDescription,
                    StartDate = l.StartDate,
                    EndDate = l.EndDate,
                    SubmissionDeadline = l.SubmissionDeadline,
                    RegistrationAllowed = l.RegistrationAllowed,
                    Description = l.Description,
                    OrganizerId = l.OrganizerId,
                    CurrentStatus = l.CurrentStatus,
                    OpenOrNot = l.OpenOrNot,
                    ViewNumber = l.ViewNumber,
                    NumberOfTeams = l.NumberOfTeams,
                    NumberOfPlayersPerTeamRange = l.NumberOfPlayersPerTeamRange,
                    NumberOfMatches = l.NumberOfMatches,
                    NumberOfTurns = l.NumberOfTurns,
                    NumberOfRounds = l.NumberOfRounds,
                    NumberOfTables = l.NumberOfTables,
                    NumberOfTeamsToNextRound = l.NumberOfTeamsToNextRound,
                    WinPoints = l.WinPoints,
                    DrawPoints = l.DrawPoints,
                    LossPoints = l.LossPoints,
                    LinkPath = l.LinkPath,
                    SetToOrganizeThirdPrize = l.SetToOrganizeThirdPrize,
                    SetYellowCardsToBan = l.SetYellowCardsToBan,
                    NumberOfMatchesBannedYellowCard = l.NumberOfMatchesBannedYellowCard,
                    SetIndirectRedCards = l.SetIndirectRedCards,
                    NumberOfMatchesBannedIndirectRedCard = l.NumberOfMatchesBannedIndirectRedCard,
                    SetDirectRedCards = l.SetDirectRedCards,
                    NumberOfMatchesBannedDirectRedCard = l.NumberOfMatchesBannedDirectRedCard
                    // Thêm các trường khác nếu cần
                })
                .ToListAsync();

            return leagues;
        }

        public async Task<IEnumerable<LeagueDTO>> ViewLeagueDetails(int idLeague)
        {
            var league = await _dbcontext.Tournaments
            .Where(l => l.Id == idLeague)
            .Select(l => new LeagueDTO
            {
                Id = l.Id,
                AvatarTournament = l.AvatarTournament,
                BigPhotoTournament = l.BigPhotoTournament,
                Phone = l.Phone,
                Name = l.Name,
                CompetitionFormatName = l.CompetitionFormatName,
                CompetitionDescription = l.CompetitionDescription,
                StartDate = l.StartDate,
                EndDate = l.EndDate,
                SubmissionDeadline = l.SubmissionDeadline,
                RegistrationAllowed = l.RegistrationAllowed,
                Description = l.Description,
                OrganizerId = l.OrganizerId,
                CurrentStatus = l.CurrentStatus,
                OpenOrNot = l.OpenOrNot,
                ViewNumber = l.ViewNumber,
                NumberOfTeams = l.NumberOfTeams,
                NumberOfPlayersPerTeamRange = l.NumberOfPlayersPerTeamRange,
                NumberOfMatches = l.NumberOfMatches,
                NumberOfTurns = l.NumberOfTurns,
                NumberOfRounds = l.NumberOfRounds,
                NumberOfTables = l.NumberOfTables,
                NumberOfTeamsToNextRound = l.NumberOfTeamsToNextRound,
                WinPoints = l.WinPoints,
                DrawPoints = l.DrawPoints,
                LossPoints = l.LossPoints,
                LinkPath = l.LinkPath,
                SetToOrganizeThirdPrize = l.SetToOrganizeThirdPrize,
                SetYellowCardsToBan = l.SetYellowCardsToBan,
                NumberOfMatchesBannedYellowCard = l.NumberOfMatchesBannedYellowCard,
                SetIndirectRedCards = l.SetIndirectRedCards,
                NumberOfMatchesBannedIndirectRedCard = l.NumberOfMatchesBannedIndirectRedCard,
                SetDirectRedCards = l.SetDirectRedCards,
                NumberOfMatchesBannedDirectRedCard = l.NumberOfMatchesBannedDirectRedCard
                // Thêm các trường khác nếu cần
            })
              .ToListAsync();

            return league;
        }

        public async Task<IEnumerable<TeamDTO>> GetAllTeam()
        {
            var teams = await _dbcontext.Teams
                .Select(t => new TeamDTO
                {
                    Id = t.Id,
                    Name = t.Name,
                    Logo = t.Logo,
                    Level = t.Level,
                    Phone = t.Phone,
                    OpenOrNot = t.OpenOrNot,
                    AgeJoin = t.AgeJoin,
                    ContactPerson = t.ContactPerson,
                    ContactPersonEmail = t.ContactPersonEmail,
                    ActivityArea = t.ActivityArea,
                    OperatingTime = t.OperatingTime,
                    UniForm1 = t.UniForm1,
                    UniForm2 = t.UniForm2,
                    UniForm3 = t.UniForm3,
                    CurrentStatus = t.CurrentStatus,
                    Country = t.Country,
                    TeamManagerId = t.TeamManagerId
                })
                .ToListAsync();

            return teams;
        }
        public async Task<IEnumerable<TeamDTO>> ViewTeamDetail(int idTeam)
        {
            var team = await _dbcontext.Teams
            .Where(t => t.Id == idTeam)
            .Select(t => new TeamDTO
            {
                Id = t.Id,
                Name = t.Name,
                Logo = t.Logo,
                Level = t.Level,
                Phone = t.Phone,
                OpenOrNot = t.OpenOrNot,
                AgeJoin = t.AgeJoin,
                ContactPerson = t.ContactPerson,
                ContactPersonEmail = t.ContactPersonEmail,
                ActivityArea = t.ActivityArea,
                OperatingTime = t.OperatingTime,
                UniForm1 = t.UniForm1,
                UniForm2 = t.UniForm2,
                UniForm3 = t.UniForm3,
                CurrentStatus = t.CurrentStatus,
                Country = t.Country,
                TeamManagerId = t.TeamManagerId
            })
            .ToListAsync();

            if (team == null)
            {
                throw new InvalidOperationException("Error");
            }


            return team;
        }

        public async Task<IEnumerable<DashboardDTO>> GetTotalsAsync()
        {

            var totalAccounts = await _dbcontext.Users.CountAsync();
            var totalTournaments = await _dbcontext.Tournaments.CountAsync();
            var totalPlayers = await _dbcontext.Players.CountAsync();
            var totalMatches = await _dbcontext.Matches.CountAsync();
            var totalTeams = await _dbcontext.Teams.CountAsync();

            // Creating a list with a single DashboardDTO object
            return new List<DashboardDTO>
    {
        new DashboardDTO
        {
            TotalAccounts = totalAccounts,
            TotalTournaments = totalTournaments,
            TotalPlayers = totalPlayers,
            TotalMatches = totalMatches,
            TotalTeams = totalTeams
        }
             };

        }


        public async Task<bool> UpdateUserStatusAsync(int userId, string status)
        {
            var validStatuses = new List<string> { "Active", "De-active" }; // Các trạng thái hợp lệ
            if (!validStatuses.Contains(status))
            {
                throw new ArgumentException("Invalid status value.");
            }

            var user = await _dbcontext.Users.FindAsync(userId);
            if (user == null) return false;

            user.Status = status;

            _dbcontext.Users.Update(user);
            await _dbcontext.SaveChangesAsync();

            return true;
        }






    }
}
