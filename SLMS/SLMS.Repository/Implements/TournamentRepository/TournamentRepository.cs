using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.LeagueDTO;
using SLMS.Repository.BaseRepository;
using Microsoft.Extensions.Configuration;


namespace SLMS.Repository.Implements.TournamenceRepository
{
    public class TournamentRepository : BaseRepository<Tournament>, ITournamentRepository
    {
        private Cloudinary _cloudinary;
        private string[] Scopes = { Google.Apis.Drive.v3.DriveService.Scope.Drive };
        private Google.Apis.Drive.v3.DriveService _driveService;
        public TournamentRepository(SEP490Context dbcontext, IConfiguration configuration) : base(dbcontext)
        {
            var account = new Account(
                  configuration["Cloudinary:CloudName"],
                  configuration["Cloudinary:ApiKey"],
                  configuration["Cloudinary:ApiSecret"]
              );
            _cloudinary = new Cloudinary(account);

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
        public async Task<Tournament> CreateLeagueAsync(CreateLeagueModel model)
        {
            //var imagePath = await SaveFileAsync(model.ImageAvatar, "images");

            // Tải ảnh lên Cloudinary và lấy URL
            string leagueLogoUrl = null;
            if (model.ImageAvatar != null)
            {
                leagueLogoUrl = await UploadImageToCloudinary(model.ImageAvatar);
            }
            string pdfPath = null;
            if (model.FilePDF != null)
            {
                //pdfPath = await UploadFileToGoogleDrive(model.FilePDF, _driveService);
                pdfPath = await UploadPDFToCloudinary(model.FilePDF);
            }

            var tournament = new Tournament
            {
                OrganizerId = model.organizerID,
                Name = model.LeagueName,
                Phone = model.Phone,
                OpenOrNot = model.Open_Or_Not,
                AvatarTournament = leagueLogoUrl,
                CompetitionFormatName = model.CompetitionFormatName,
                NumberOfTeams = model.NumberOfTeams,
                NumberOfPlayersPerTeamRange = model.NumberOfPlayersPerTeamRange,
                NumberOfMatches = model.NumberOfMatches,
                NumberOfTurns = model.NumberOfTurns,
                NumberOfTables = model.NumberOfTables,
                NumberOfTeamsToNextRound = model.NumberOfTeamsToNextRound,
                RegistrationAllowed = model.RegistrationAllowed,
                WinPoints = model.WinPoints,
                DrawPoints = model.DrawPoints,
                LossPoints = model.LossPoints,
                SubmissionDeadline = model.SubmissionDeadline,
                // Thêm các trường khác nếu cần
            };

            _dbcontext.Tournaments.Add(tournament);
            await _dbcontext.SaveChangesAsync();



            var venue = new Venue
            {
                Location = model.Location,
                TournamentId = tournament.Id,
                // Thêm các trường khác nếu cần
            };

            _dbcontext.Venues.Add(venue);

            var document = new Document
            {
                Title = model.FilePDF.FileName,
                UrlStored = pdfPath,
                DocumentType = "PDF",
                TournamentId = tournament.Id,
                UploadedAt = DateTime.Now,
                // Thêm các trường khác nếu cần
            };

            _dbcontext.Documents.Add(document);
            await _dbcontext.SaveChangesAsync();

            return tournament;
        }

        public async Task<string> UploadPDFToCloudinary(IFormFile file)
        {
            if (file.Length == 0)
            {
                throw new ArgumentException("File is empty", nameof(file));
            }

            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (fileExtension != ".pdf")
            {
                throw new ArgumentException("File is not a PDF", nameof(file));
            }

            var uploadParams = new RawUploadParams
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                PublicId = Path.GetFileNameWithoutExtension(file.FileName)
            };

            // Use the Upload method for raw files
            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return uploadResult.SecureUrl.AbsoluteUri;
        }


        public async Task<IEnumerable<TournamentModel>> GetAllPublicLeaguesAsync()
        {
            return await _dbcontext.Tournaments
                .Where(t => t.OpenOrNot == "yes")
                .Include(t => t.Organizer)

                .Include(t => t.Venues)
                .Select(t => new TournamentModel
                {
                    Id = t.Id,
                    ImageLeague = t.AvatarTournament,
                    LeagueName = t.Name,
                    OrganizerId= t.OrganizerId,
                    CurrentStatus = t.CurrentStatus,
                    OrganizerName = t.Organizer.Fullname,
                    Location = t.Venues.FirstOrDefault().Location,
                    CompetitionFormatName = t.CompetitionFormatName,
                    NumberOfPlayersPerTeamRange = t.NumberOfPlayersPerTeamRange ?? 0,
                    NumberOfTeam = t.NumberOfTeams ?? 0,
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<TournamentModel>> GetLeaguesByOrganizerIdAsync(int organizerId)
        {
            return await _dbcontext.Tournaments
                .Where(t => t.OrganizerId == organizerId)
                .Include(t => t.Organizer)
                .Include(t => t.Venues)
                .Select(t => new TournamentModel
                {
                    Id = t.Id,
                    ImageLeague = t.AvatarTournament,
                    LeagueName = t.Name,
                    OrganizerName = t.Organizer.Fullname,
                    Location = t.Venues.FirstOrDefault().Location,
                    CompetitionFormatName = t.CompetitionFormatName,
                    NumberOfPlayersPerTeamRange = t.NumberOfPlayersPerTeamRange ?? 0,

                })
                .ToListAsync();
        }

        public async Task<List<LeagueSearchResultModel>> SearchTournamentsAsync(string searchText)
        {
            var result = await _dbcontext.Tournaments
                .Include(t => t.Organizer)
                .Include(t => t.Venues)
                .Where(t => t.Name.Contains(searchText) ||
                            t.Organizer.Fullname.Contains(searchText))
                .Select(t => new LeagueSearchResultModel
                {
                    Id = t.Id,
                    ImageLeague = t.AvatarTournament,
                    LeagueName = t.Name,
                    OrganizerName = t.Organizer.Fullname,
                    Location = t.Venues.FirstOrDefault().Location,
                    CompetitionFormatName = t.CompetitionFormatName,
                    NumberOfPlayersPerTeamRange = t.NumberOfPlayersPerTeamRange ?? 0,
                    NumberOfTeam = t.NumberOfTeams ?? 0,
                })
                .ToListAsync();

            return result;
        }

        //public async Task<string> GetLatestDocumentPathAsync()
        //{
        //    var document = await _dbcontext.Documents
        //                                   .Where(d => d.DocumentType.ToLower() == "PDF")
        //                                   .OrderByDescending(d => d.UploadedAt)
        //                                   .FirstOrDefaultAsync();
        //    if (document == null)
        //    {
        //        throw new FileNotFoundException("No documents found.");
        //    }

        //    // Giả sử URL lưu trữ tài liệu trên Cloud được lưu trong trường `UrlStored`
        //    if (string.IsNullOrEmpty(document.UrlStored))
        //    {
        //        throw new FileNotFoundException("Document URL is not available.");
        //    }

        //    return document.UrlStored;
        //}


        public async Task<List<LeagueSearchResultModel>> GetTournamentsByTypeAsync(string CompetitionFormatName)
        {
            var result = await _dbcontext.Tournaments
                .Include(t => t.Organizer)
                .Include(t => t.Venues)
                .Where(t => t.CompetitionFormatName.Equals(CompetitionFormatName))
                .Select(t => new LeagueSearchResultModel
                {
                    Id = t.Id,
                    ImageLeague = t.AvatarTournament,
                    LeagueName = t.Name,
                    OrganizerName = t.Organizer.Fullname,
                    Location = t.Venues.FirstOrDefault().Location,
                    CompetitionFormatName = t.CompetitionFormatName,
                    NumberOfPlayersPerTeamRange = t.NumberOfPlayersPerTeamRange ?? 0,
                    NumberOfTeam = t.NumberOfTeams ?? 0,
                })
                .ToListAsync();

            return result;
        }

        public async Task<Tournament> GetTournamentByIdAsync(int tournamentId)
        {
            var tournament = await _dbcontext.Tournaments
                .Select(t => new Tournament
                {
                    Id = t.Id,
                    AvatarTournament = t.AvatarTournament,
                    BigPhotoTournament = t.BigPhotoTournament,
                    Phone = t.Phone,
                    Name = t.Name,
                    CompetitionFormatName = t.CompetitionFormatName,
                    CompetitionDescription = t.CompetitionDescription,
                    StartDate = t.StartDate,
                    EndDate = t.EndDate,
                    SubmissionDeadline = t.SubmissionDeadline,
                    RegistrationAllowed = t.RegistrationAllowed,
                    Description = t.Description,
                    OrganizerId = t.OrganizerId,
                    CurrentStatus = t.CurrentStatus,
                    OpenOrNot = t.OpenOrNot,
                    ViewNumber = t.ViewNumber,
                    NumberOfTeams = t.NumberOfTeams,
                    NumberOfPlayersPerTeamRange = t.NumberOfPlayersPerTeamRange,
                    NumberOfMatches = t.NumberOfMatches,
                    NumberOfTurns = t.NumberOfTurns,
                    NumberOfRounds = t.NumberOfTables,
                    NumberOfTables = t.NumberOfTables,
                    NumberOfTeamsToNextRound = t.NumberOfTeamsToNextRound,
                    WinPoints = t.WinPoints,
                    DrawPoints = t.DrawPoints,
                    LossPoints = t.LossPoints,
                    SetToOrganizeThirdPrize = t.SetToOrganizeThirdPrize,
                    SetYellowCardsToBan = t.SetYellowCardsToBan,
                    NumberOfMatchesBannedYellowCard = t.NumberOfMatchesBannedYellowCard,
                    SetIndirectRedCards = t.SetIndirectRedCards,
                    NumberOfMatchesBannedIndirectRedCard = t.NumberOfMatchesBannedIndirectRedCard,
                    SetDirectRedCards = t.SetDirectRedCards,
                    NumberOfMatchesBannedDirectRedCard = t.NumberOfMatchesBannedDirectRedCard
                    // Không cần thiết lập các thuộc tính cho các mối quan hệ ở đây
                })
                .FirstOrDefaultAsync(t => t.Id == tournamentId);

            return tournament;
        }

        public async Task<Tournament> UpdateLeagueAsync(UpdateLeagueModel model)
        {
            var league = await _dbcontext.Tournaments.FindAsync(model.LeagueId);
            if (league == null)
            {
                throw new KeyNotFoundException("League not found");
            }
            // Tải ảnh lên Cloudinary và lấy URL
            string leagueLogoUrl = null;
            if (model.ImageAvatar != null)
            {
                leagueLogoUrl = await UploadImageToCloudinary(model.ImageAvatar);
                league.AvatarTournament = leagueLogoUrl;
            }


            league.Name = model.LeagueName;
            league.Phone = model.Phone;
            league.OpenOrNot = model.Open_Or_Not;
            league.NumberOfPlayersPerTeamRange = model.NumberOfPlayersPerTeamRange;
            league.SetYellowCardsToBan = model.SetYellowCardsToBan;
            league.NumberOfMatchesBannedYellowCard = model.NumberOfMatchesBannedYellowCard;
            league.SetDirectRedCards = model.SetDirectRedCards;
            league.SetIndirectRedCards = model.SetIndirectRedCards;
            league.NumberOfMatchesBannedDirectRedCard = model.NumberOfMatchesBannedDirectRedCard;
            league.NumberOfMatchesBannedIndirectRedCard = model.NumberOfMatchesBannedIndirectRedCard;
            
            // Thêm các trường khác nếu cần

            _dbcontext.Tournaments.Update(league);
            //await _dbcontext.SaveChangesAsync();


            var venue = await _dbcontext.Venues.FirstOrDefaultAsync(v => v.TournamentId == league.Id);
            if (venue != null)
            {
                venue.Location = model.Location;
                venue.TournamentId = league.Id;
            }

            if (model.FilePDF != null && model.FilePDF.Length > 0)
            {
                // Kiểm tra định dạng file PDF
                var validPdfExtension = ".pdf";
                var fileExtension = Path.GetExtension(model.FilePDF.FileName).ToLowerInvariant();
                if (fileExtension == validPdfExtension)
                {
                    try
                    {
                        var pdfPath = await UploadPDFToCloudinary(model.FilePDF);

                        var document = new Document
                        {
                            Title = model.FilePDF.FileName,
                            Content = pdfPath,
                            DocumentType = "PDF",
                            TournamentId = league.Id,
                        };
                        _dbcontext.Documents.Add(document);
                    }
                    catch (Exception ex)
                    {
                        // Xử lý nếu việc tải PDF lên Cloudinary không thành công
                        // Có thể log lỗi hoặc thông báo cho người dùng biết
                        throw new Exception("Error uploading PDF file: " + ex.Message, ex);
                    }
                }
                else
                {
                    throw new ArgumentException("Invalid PDF file format.");
                }
            }


            await _dbcontext.SaveChangesAsync();
            return league;

        }

        public async Task<string> GetLatestDocumentPathAsync(int tournamentId)
        {
            var document = await _dbcontext.Documents
                                           .Where(d => d.DocumentType.ToLower() == "pdf" && d.TournamentId == tournamentId)
                                           .OrderByDescending(d => d.UploadedAt)
                                           .FirstOrDefaultAsync();
            if (document == null)
            {
                throw new FileNotFoundException("No documents found for the specified tournament.");
            }

            if (string.IsNullOrEmpty(document.UrlStored))
            {
                throw new FileNotFoundException("Document URL is not available.");
            }

            return document.UrlStored;
        }

    }
}
