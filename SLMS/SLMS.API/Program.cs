using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Microsoft.EntityFrameworkCore;
using SLMS.Core.Model;
using SLMS.DTO.JwtSettingDTO;
using SLMS.DTO.UserDTO;
using SLMS.Repository.Implements.AdminRepository;
using SLMS.Repository.Implements.ArrangeMatchesRepository;
using SLMS.Repository.Implements.AwardsRepository;
using SLMS.Repository.Implements.EmailRepository;
using SLMS.Repository.Implements.LeagueStatistics;
using SLMS.Repository.Implements.MatchReportRepository;
using SLMS.Repository.Implements.MatchRepository;
using SLMS.Repository.Implements.MatchScheduleManageRepository;
using SLMS.Repository.Implements.NotificationsRepository;
using SLMS.Repository.Implements.PlayersRepository;
using SLMS.Repository.Implements.PrizesRepository;
using SLMS.Repository.Implements.SponsorRepository;
using SLMS.Repository.Implements.TeamRankingRepository;
using SLMS.Repository.Implements.TeamRegistrationRepository;
using SLMS.Repository.Implements.TeamRepository;
using SLMS.Repository.Implements.TeamStatisticRepository;
using SLMS.Repository.Implements.TournamenceRepository;
using SLMS.Repository.Implements.UserRepository;
using SLMS.Repository.TeamStatisticRepository;
using System.Text.Json.Serialization;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddHttpClient();

        IConfiguration configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();


        // Thêm dịch vụ CORS với một chính sách ví dụ
        builder.Services.AddCors(policy =>
        {
            policy.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        });

        //builder.Services.AddCors(options =>
        //{
        //    options.AddPolicy("AllowSpecificOrigin",
        //        builder => builder.WithOrigins("http://localhost:3000") // Chỉ định nguồn được phép
        //                          .AllowAnyMethod()
        //                          .AllowAnyHeader());
        //});

        //Add Repository

        builder.Services.AddScoped<IAdminRepository, AdminRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IEmailSenderRepository, SendMailRepository>();
        builder.Services.AddScoped<ITournamentRepository, TournamentRepository>();
        builder.Services.AddScoped<ILeagueStatisticsRepository, LeagueStatisticsRepository>();
        builder.Services.AddScoped<IMatchReportRepository, MatchReportRepository>();

        builder.Services.AddScoped<ISponsorRepository, SponsorRepository>();

        builder.Services.AddScoped<IPrizesRepository, PrizesRepository>();

        builder.Services.AddScoped<IArrangeMatchesRepository, ArrangeMatchesRepository>();

        builder.Services.AddScoped<IMatchScheduleManageRepository, MatchScheduleManageRepository>();

        builder.Services.AddScoped<INotificationRepository, NotificationRepository>();

        builder.Services.AddScoped<IMatchRepository, MatchRepository>();

        builder.Services.AddScoped<ITeamRegistrationRepository, TeamRegistraRepository>();
        builder.Services.AddScoped<ITeamRepository, TeamsRepository>();
        builder.Services.AddScoped<IAwardsRepository, AwardsRepository>();
        builder.Services.AddScoped<ITeamRankingRepository, TeamRankingRepository>();
        builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
        builder.Services.AddScoped<ITeamStatisticRepository, TeamsStatisticRepository>();

        //UserCredential credential;

        //// Cập nhật đường dẫn tới file credentials.json
        //string credPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "credentials.json");

        //using (var stream = new FileStream(credPath, FileMode.Open, FileAccess.Read))
        //{
        //    string tokenPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "token.json");
        //    credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
        //        GoogleClientSecrets.Load(stream).Secrets,
        //        new[] { DriveService.Scope.Drive },
        //        "user",
        //        CancellationToken.None,
        //        new FileDataStore(tokenPath, true)).Result;
        //    Console.WriteLine("Credential file saved to: " + tokenPath);
        //}

        //// Tạo Drive service
        //var service = new DriveService(new BaseClientService.Initializer()
        //{
        //    HttpClientInitializer = credential,
        //    ApplicationName = "SLMS",
        //});

        builder.Services.AddDbContext<SEP490Context>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnect")));
        var emailConfig = builder.Configuration.GetSection("EmailConfiguration")
                          .Get<EmailConfiguration>();
        builder.Services.AddSingleton(emailConfig);

        // JsonIgnore
        builder.Services.AddMvc().AddJsonOptions(o =>
        {
            o.JsonSerializerOptions
               .ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

        //setting JWT
        builder.Services.Configure<AppSettingDTO>(builder.Configuration.GetSection("AppSettings"));
        var secretKey = builder.Configuration["AppSettings:SecretKey"];

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        //if (app.Environment.IsDevelopment())
        //{
        //    app.UseSwagger();
        //    app.UseSwaggerUI();
        //}

        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseHttpsRedirection();

        // Sử dụng CORS với chính sách đã được định nghĩa
        //app.UseCors("AllowSpecificOrigin");
        app.UseCors("AllowAll");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}