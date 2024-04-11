using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SLMS.Core.Model
{
    public partial class SEP490Context : DbContext
    {
        public SEP490Context()
        {
        }

        public SEP490Context(DbContextOptions<SEP490Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Award> Awards { get; set; } = null!;
        public virtual DbSet<Document> Documents { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<GroupStage> GroupStages { get; set; } = null!;
        public virtual DbSet<KnockoutStage> KnockoutStages { get; set; } = null!;
        public virtual DbSet<Match> Matches { get; set; } = null!;
        public virtual DbSet<MatchEvent> MatchEvents { get; set; } = null!;
        public virtual DbSet<MatchHighlight> MatchHighlights { get; set; } = null!;
        public virtual DbSet<MatchStatistic> MatchStatistics { get; set; } = null!;
        public virtual DbSet<Notification> Notifications { get; set; } = null!;
        public virtual DbSet<Permission> Permissions { get; set; } = null!;
        public virtual DbSet<Player> Players { get; set; } = null!;
        public virtual DbSet<PlayerMatchStatistic> PlayerMatchStatistics { get; set; } = null!;
        public virtual DbSet<PlayersInLineup> PlayersInLineups { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<RolePermission> RolePermissions { get; set; } = null!;
        public virtual DbSet<RoundRobin> RoundRobins { get; set; } = null!;
        public virtual DbSet<SocialMediaPost> SocialMediaPosts { get; set; } = null!;
        public virtual DbSet<SocialMediaPostCategory> SocialMediaPostCategories { get; set; } = null!;
        public virtual DbSet<Sponsor> Sponsors { get; set; } = null!;
        public virtual DbSet<Team> Teams { get; set; } = null!;
        public virtual DbSet<TeamLineup> TeamLineups { get; set; } = null!;
        public virtual DbSet<TeamPlayer> TeamPlayers { get; set; } = null!;
        public virtual DbSet<TeamRanking> TeamRankings { get; set; } = null!;
        public virtual DbSet<TeamRegistration> TeamRegistrations { get; set; } = null!;
        public virtual DbSet<Tournament> Tournaments { get; set; } = null!;
        public virtual DbSet<TournamentPhase> TournamentPhases { get; set; } = null!;
        public virtual DbSet<TournamentVote> TournamentVotes { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Venue> Venues { get; set; } = null!;
        public virtual DbSet<Vote> Votes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=103.183.119.91;Database=SEP490;uid=sep490;pwd=Lorenkid@123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Award>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(1000)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Awards)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Awards__tourname__49C3F6B7");
            });

            modelBuilder.Entity<Document>(entity =>
            {
                entity.ToTable("Document");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Content)
                    .HasMaxLength(2000)
                    .HasColumnName("content");

                entity.Property(e => e.DocumentType)
                    .HasMaxLength(255)
                    .HasColumnName("documentType");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .HasColumnName("title");

                entity.Property(e => e.TournamentId).HasColumnName("tournament_id");

                entity.Property(e => e.UploadedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("uploadedAt");

                entity.Property(e => e.UrlStored)
                    .HasMaxLength(255)
                    .HasColumnName("urlStored");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Document__tourna__4AB81AF0");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("Feedback");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Content)
                    .HasMaxLength(1000)
                    .HasColumnName("content");

                entity.Property(e => e.SubmittedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("submittedAt");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .HasColumnName("title");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Feedback__userID__4BAC3F29");
            });

            modelBuilder.Entity<GroupStage>(entity =>
            {
                entity.ToTable("Group_Stage");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.PhaseId).HasColumnName("phaseID");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.HasOne(d => d.Phase)
                    .WithMany(p => p.GroupStages)
                    .HasForeignKey(d => d.PhaseId)
                    .HasConstraintName("FK__Group_Sta__phase__4CA06362");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.GroupStages)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Group_Sta__tourn__4D94879B");
            });

            modelBuilder.Entity<KnockoutStage>(entity =>
            {
                entity.ToTable("Knockout_Stage");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.PhaseId).HasColumnName("phaseID");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.HasOne(d => d.Phase)
                    .WithMany(p => p.KnockoutStages)
                    .HasForeignKey(d => d.PhaseId)
                    .HasConstraintName("FK__Knockout___phase__4E88ABD4");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.KnockoutStages)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Knockout___tourn__4F7CD00D");
            });

            modelBuilder.Entity<Match>(entity =>
            {
                entity.ToTable("Match");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CurrentStatus)
                    .HasMaxLength(255)
                    .HasColumnName("currentStatus");

                entity.Property(e => e.GroupStageId).HasColumnName("groupStageID");

                entity.Property(e => e.KnockOutStageId).HasColumnName("knockOutStageID");

                entity.Property(e => e.MainReferee)
                    .HasMaxLength(255)
                    .HasColumnName("mainReferee");

                entity.Property(e => e.MatchDate)
                    .HasColumnType("date")
                    .HasColumnName("matchDate");

                entity.Property(e => e.PhaseId).HasColumnName("phaseID");

                entity.Property(e => e.ReportCreatorName)
                    .HasMaxLength(255)
                    .HasColumnName("reportCreatorName");

                entity.Property(e => e.RoundRobinId).HasColumnName("roundRobinID");

                entity.Property(e => e.StartTime)
                    .HasColumnType("datetime")
                    .HasColumnName("startTime");

                entity.Property(e => e.StoredReportUrl)
                    .HasMaxLength(1000)
                    .HasColumnName("storedReportUrl");

                entity.Property(e => e.Team1Id).HasColumnName("team1ID");

                entity.Property(e => e.Team2Id).HasColumnName("team2ID");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.Property(e => e.VenueId).HasColumnName("venueID");

                entity.HasOne(d => d.GroupStage)
                    .WithMany(p => p.Matches)
                    .HasForeignKey(d => d.GroupStageId)
                    .HasConstraintName("FK__Match__groupStag__5070F446");

                entity.HasOne(d => d.KnockOutStage)
                    .WithMany(p => p.Matches)
                    .HasForeignKey(d => d.KnockOutStageId)
                    .HasConstraintName("FK__Match__knockOutS__5165187F");

                entity.HasOne(d => d.Phase)
                    .WithMany(p => p.Matches)
                    .HasForeignKey(d => d.PhaseId)
                    .HasConstraintName("FK__Match__phaseID__52593CB8");

                entity.HasOne(d => d.RoundRobin)
                    .WithMany(p => p.Matches)
                    .HasForeignKey(d => d.RoundRobinId)
                    .HasConstraintName("FK__Match__roundRobi__534D60F1");

                entity.HasOne(d => d.Team1)
                    .WithMany(p => p.MatchTeam1s)
                    .HasForeignKey(d => d.Team1Id)
                    .HasConstraintName("FK__Match__team1ID__5441852A");

                entity.HasOne(d => d.Team2)
                    .WithMany(p => p.MatchTeam2s)
                    .HasForeignKey(d => d.Team2Id)
                    .HasConstraintName("FK__Match__team2ID__5535A963");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Matches)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Match__tournamen__5629CD9C");

                entity.HasOne(d => d.Venue)
                    .WithMany(p => p.Matches)
                    .HasForeignKey(d => d.VenueId)
                    .HasConstraintName("FK__Match__venueID__571DF1D5");
            });

            modelBuilder.Entity<MatchEvent>(entity =>
            {
                entity.ToTable("Match_Event");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.EventCreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("eventCreatedAt");

                entity.Property(e => e.EventMinute).HasColumnName("eventMinute");

                entity.Property(e => e.EventType)
                    .HasMaxLength(100)
                    .HasColumnName("eventType");

                entity.Property(e => e.EventUpdatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("eventUpdatedAt");

                entity.Property(e => e.MatchId).HasColumnName("matchID");

                entity.Property(e => e.PlayerId).HasColumnName("playerID");

                entity.Property(e => e.ShirtNumberPlayer)
                    .HasMaxLength(100)
                    .HasColumnName("shirtNumberPlayer");

                entity.Property(e => e.TeamId).HasColumnName("teamID");

                entity.HasOne(d => d.Match)
                    .WithMany(p => p.MatchEvents)
                    .HasForeignKey(d => d.MatchId)
                    .HasConstraintName("FK__Match_Eve__match__5812160E");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.MatchEvents)
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("FK__Match_Eve__playe__59063A47");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.MatchEvents)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Match_Eve__teamI__59FA5E80");
            });

            modelBuilder.Entity<MatchHighlight>(entity =>
            {
                entity.ToTable("Match_Highlights");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.HighlightUrl)
                    .HasMaxLength(1000)
                    .HasColumnName("highlightURL");

                entity.Property(e => e.Image)
                    .HasMaxLength(255)
                    .HasColumnName("image");

                entity.Property(e => e.MatchId).HasColumnName("matchID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.HasOne(d => d.Match)
                    .WithMany(p => p.MatchHighlights)
                    .HasForeignKey(d => d.MatchId)
                    .HasConstraintName("FK__Match_Hig__match__5AEE82B9");
            });

            modelBuilder.Entity<MatchStatistic>(entity =>
            {
                entity.ToTable("Match_Statistics");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DoubleGoals).HasColumnName("doubleGoals");

                entity.Property(e => e.FirstHalfExtraTime).HasColumnName("firstHalfExtraTime");

                entity.Property(e => e.GoalsTeam1).HasColumnName("goalsTeam1");

                entity.Property(e => e.GoalsTeam2).HasColumnName("goalsTeam2");

                entity.Property(e => e.HattrickGoals).HasColumnName("hattrickGoals");

                entity.Property(e => e.MatchId).HasColumnName("matchID");

                entity.Property(e => e.PokerGoals).HasColumnName("pokerGoals");

                entity.Property(e => e.RedCardsTeam1).HasColumnName("redCardsTeam1");

                entity.Property(e => e.RedCardsTeam2).HasColumnName("redCardsTeam2");

                entity.Property(e => e.SecondHalfExtraTime).HasColumnName("secondHalfExtraTime");

                entity.Property(e => e.SubGoalsTeam1).HasColumnName("subGoalsTeam1");

                entity.Property(e => e.SubGoalsTeam2).HasColumnName("subGoalsTeam2");

                entity.Property(e => e.YellowCardsTeam1).HasColumnName("yellowCardsTeam1");

                entity.Property(e => e.YellowCardsTeam2).HasColumnName("yellowCardsTeam2");

                entity.HasOne(d => d.Match)
                    .WithMany(p => p.MatchStatistics)
                    .HasForeignKey(d => d.MatchId)
                    .HasConstraintName("FK__Match_Sta__match__5BE2A6F2");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ActionTaken).HasMaxLength(255);

                entity.Property(e => e.ActionTakenAt).HasColumnType("datetime");

                entity.Property(e => e.Content).HasMaxLength(255);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.IsRead).HasMaxLength(50);

                entity.Property(e => e.NotificationType).HasMaxLength(255);

                entity.Property(e => e.ReadAt).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Notifications)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Notificat__userI__245D67DE");
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.ToTable("Permission");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.ToTable("Player");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Avatar)
                    .HasMaxLength(4000)
                    .HasColumnName("avatar");

                entity.Property(e => e.Bio)
                    .HasMaxLength(4000)
                    .HasColumnName("bio");

                entity.Property(e => e.BirthDate)
                    .HasColumnType("date")
                    .HasColumnName("birthDate");

                entity.Property(e => e.CitizenIdPhoto1)
                    .HasMaxLength(4000)
                    .HasColumnName("Citizen_ID_photo1");

                entity.Property(e => e.CitizenIdPhoto2)
                    .HasMaxLength(4000)
                    .HasColumnName("Citizen_ID_photo2");

                entity.Property(e => e.CitizenshipId).HasColumnName("Citizenship_ID");

                entity.Property(e => e.CompetitionName)
                    .HasMaxLength(255)
                    .HasColumnName("competitionName");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .HasColumnName("country");

                entity.Property(e => e.Email)
                    .HasMaxLength(4000)
                    .HasColumnName("email");

                entity.Property(e => e.Gender)
                    .HasMaxLength(255)
                    .HasColumnName("gender");

                entity.Property(e => e.Height)
                    .HasMaxLength(255)
                    .HasColumnName("height");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Phone)
                    .HasMaxLength(255)
                    .HasColumnName("phone");

                entity.Property(e => e.Position)
                    .HasMaxLength(255)
                    .HasColumnName("position");

                entity.Property(e => e.PreferredFoot)
                    .HasMaxLength(255)
                    .HasColumnName("preferredFoot");

                entity.Property(e => e.ShirtNumber)
                    .HasMaxLength(255)
                    .HasColumnName("shirtNumber");

                entity.Property(e => e.Strengths)
                    .HasMaxLength(255)
                    .HasColumnName("strengths");

                entity.Property(e => e.Weaknesses)
                    .HasMaxLength(255)
                    .HasColumnName("weaknesses");
            });

            modelBuilder.Entity<PlayerMatchStatistic>(entity =>
            {
                entity.ToTable("Player_Match_Statistics");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Assists).HasColumnName("assists");

                entity.Property(e => e.Goals).HasColumnName("goals");

                entity.Property(e => e.MatchId).HasColumnName("matchID");

                entity.Property(e => e.OwnGoals).HasColumnName("ownGoals");

                entity.Property(e => e.PlayerId).HasColumnName("playerID");

                entity.Property(e => e.RedCards).HasColumnName("redCards");

                entity.Property(e => e.Saves).HasColumnName("saves");

                entity.Property(e => e.SubGoals).HasColumnName("subGoals");

                entity.Property(e => e.Wasfouled).HasColumnName("wasfouled");

                entity.Property(e => e.YellowCards).HasColumnName("yellowCards");

                entity.HasOne(d => d.Match)
                    .WithMany(p => p.PlayerMatchStatistics)
                    .HasForeignKey(d => d.MatchId)
                    .HasConstraintName("FK__Player_Ma__match__5DCAEF64");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.PlayerMatchStatistics)
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("FK__Player_Ma__playe__5EBF139D");
            });

            modelBuilder.Entity<PlayersInLineup>(entity =>
            {
                entity.ToTable("Players_In_Lineup");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompetitionName)
                    .HasMaxLength(255)
                    .HasColumnName("competitionName");

                entity.Property(e => e.LineUpId).HasColumnName("lineUpID");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.PlayerId).HasColumnName("playerID");

                entity.Property(e => e.Position)
                    .HasMaxLength(255)
                    .HasColumnName("position");

                entity.Property(e => e.StartOrSub)
                    .HasMaxLength(255)
                    .HasColumnName("Start_Or_Sub");

                entity.Property(e => e.X).HasMaxLength(255);

                entity.Property(e => e.Y).HasMaxLength(255);

                entity.HasOne(d => d.LineUp)
                    .WithMany(p => p.PlayersInLineups)
                    .HasForeignKey(d => d.LineUpId)
                    .HasConstraintName("FK__Players_I__lineU__5FB337D6");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.PlayersInLineups)
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("FK__Players_I__playe__60A75C0F");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<RolePermission>(entity =>
            {
                entity.ToTable("RolePermission");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PermissionId).HasColumnName("permissionID");

                entity.Property(e => e.RoleId).HasColumnName("roleID");

                entity.Property(e => e.TeamId).HasColumnName("teamID");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.PermissionId)
                    .HasConstraintName("FK__RolePermi__permi__619B8048");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK__RolePermi__roleI__628FA481");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__RolePermi__teamI__6383C8BA");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__RolePermi__tourn__6477ECF3");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.RolePermissions)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__RolePermi__userI__656C112C");
            });

            modelBuilder.Entity<RoundRobin>(entity =>
            {
                entity.ToTable("Round_Robin");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.RoundRobins)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Round_Rob__tourn__66603565");
            });

            modelBuilder.Entity<SocialMediaPost>(entity =>
            {
                entity.ToTable("Social_Media_Post");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Content)
                    .HasMaxLength(2000)
                    .HasColumnName("content");

                entity.Property(e => e.IdCategory).HasColumnName("idCategory");

                entity.Property(e => e.PostDate)
                    .HasColumnType("datetime")
                    .HasColumnName("postDate");

                entity.Property(e => e.PostedBy).HasColumnName("postedBy");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .HasColumnName("title");

                entity.HasOne(d => d.IdCategoryNavigation)
                    .WithMany(p => p.SocialMediaPosts)
                    .HasForeignKey(d => d.IdCategory)
                    .HasConstraintName("FK__Social_Me__idCat__6754599E");

                entity.HasOne(d => d.PostedByNavigation)
                    .WithMany(p => p.SocialMediaPosts)
                    .HasForeignKey(d => d.PostedBy)
                    .HasConstraintName("FK__Social_Me__poste__68487DD7");
            });

            modelBuilder.Entity<SocialMediaPostCategory>(entity =>
            {
                entity.ToTable("Social_Media_Post_Category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Sponsor>(entity =>
            {
                entity.ToTable("Sponsor");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.SponsorInfor)
                    .HasMaxLength(1000)
                    .HasColumnName("sponsorInfor");

                entity.Property(e => e.SponsorLink)
                    .HasMaxLength(4000)
                    .HasColumnName("sponsorLink");

                entity.Property(e => e.SponsorLogo)
                    .HasMaxLength(4000)
                    .HasColumnName("sponsorLogo");

                entity.Property(e => e.SponsorName)
                    .HasMaxLength(255)
                    .HasColumnName("sponsorName");

                entity.Property(e => e.SponsorPhone)
                    .HasMaxLength(255)
                    .HasColumnName("sponsorPhone");

                entity.Property(e => e.SponsorType)
                    .HasMaxLength(255)
                    .HasColumnName("sponsorType");

                entity.Property(e => e.TournamentId).HasColumnName("tournament_id");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Sponsors)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Sponsor__tournam__693CA210");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.ToTable("Team");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ActivityArea)
                    .HasMaxLength(255)
                    .HasColumnName("activityArea");

                entity.Property(e => e.AgeJoin)
                    .HasMaxLength(255)
                    .HasColumnName("ageJoin");

                entity.Property(e => e.ContactPerson)
                    .HasMaxLength(255)
                    .HasColumnName("contactPerson");

                entity.Property(e => e.ContactPersonEmail)
                    .HasMaxLength(255)
                    .HasColumnName("contactPersonEmail");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .HasColumnName("country");

                entity.Property(e => e.CurrentStatus)
                    .HasMaxLength(255)
                    .HasColumnName("currentStatus");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Level)
                    .HasMaxLength(255)
                    .HasColumnName("level");

                entity.Property(e => e.Logo)
                    .HasMaxLength(4000)
                    .HasColumnName("logo");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.OpenOrNot)
                    .HasMaxLength(255)
                    .HasColumnName("open_Or_Not");

                entity.Property(e => e.OperatingTime)
                    .HasMaxLength(255)
                    .HasColumnName("operatingTime");

                entity.Property(e => e.Phone)
                    .HasMaxLength(255)
                    .HasColumnName("phone");

                entity.Property(e => e.TeamManagerId).HasColumnName("teamManagerID");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.Property(e => e.UniForm1)
                    .HasMaxLength(4000)
                    .HasColumnName("uniForm1");

                entity.Property(e => e.UniForm2)
                    .HasMaxLength(4000)
                    .HasColumnName("uniForm2");

                entity.Property(e => e.UniForm3)
                    .HasMaxLength(4000)
                    .HasColumnName("uniForm3");

                entity.HasOne(d => d.TeamManager)
                    .WithMany(p => p.Teams)
                    .HasForeignKey(d => d.TeamManagerId)
                    .HasConstraintName("FK__Team__teamManage__6A30C649");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Teams)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK_Team_Tournament");
            });

            modelBuilder.Entity<TeamLineup>(entity =>
            {
                entity.ToTable("Team_Lineup");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasColumnName("dateCreated");

                entity.Property(e => e.Formation)
                    .HasMaxLength(255)
                    .HasColumnName("formation");

                entity.Property(e => e.IsPublic)
                    .HasMaxLength(50)
                    .HasColumnName("isPublic");

                entity.Property(e => e.LinkPathSaveDiagram)
                    .HasMaxLength(4000)
                    .HasColumnName("linkPathSaveDiagram");

                entity.Property(e => e.MatchId).HasColumnName("matchID");

                entity.Property(e => e.NameLineUp)
                    .HasMaxLength(255)
                    .HasColumnName("nameLineUp");

                entity.Property(e => e.NumberOfPlayers).HasColumnName("numberOfPlayers");

                entity.Property(e => e.TeamId).HasColumnName("teamID");

                entity.HasOne(d => d.Match)
                    .WithMany(p => p.TeamLineups)
                    .HasForeignKey(d => d.MatchId)
                    .HasConstraintName("FK__Team_Line__match__6C190EBB");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.TeamLineups)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Team_Line__teamI__6D0D32F4");
            });

            modelBuilder.Entity<TeamPlayer>(entity =>
            {
                entity.ToTable("Team_Player");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CurrentStatus)
                    .HasMaxLength(255)
                    .HasColumnName("currentStatus");

                entity.Property(e => e.JoinDate)
                    .HasColumnType("datetime")
                    .HasColumnName("joinDate");

                entity.Property(e => e.PlayerId).HasColumnName("playerID");

                entity.Property(e => e.TeamId).HasColumnName("teamID");

                entity.Property(e => e.TerminateDate)
                    .HasColumnType("datetime")
                    .HasColumnName("terminateDate");

                entity.HasOne(d => d.Player)
                    .WithMany(p => p.TeamPlayers)
                    .HasForeignKey(d => d.PlayerId)
                    .HasConstraintName("FK__Team_Play__playe__6E01572D");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.TeamPlayers)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Team_Play__teamI__6EF57B66");
            });

            modelBuilder.Entity<TeamRanking>(entity =>
            {
                entity.ToTable("Team_Ranking");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Draws).HasColumnName("draws");

                entity.Property(e => e.GroupStageId).HasColumnName("groupStageID");

                entity.Property(e => e.KnockOutStageId).HasColumnName("knockOutStageID");

                entity.Property(e => e.Losses).HasColumnName("losses");

                entity.Property(e => e.PlayedMatch).HasColumnName("playedMatch");

                entity.Property(e => e.Points).HasColumnName("points");

                entity.Property(e => e.RedCards).HasColumnName("redCards");

                entity.Property(e => e.TeamId).HasColumnName("teamID");

                entity.Property(e => e.TotalGoalsConceded).HasColumnName("totalGoalsConceded");

                entity.Property(e => e.TotalGoalsScored).HasColumnName("totalGoalsScored");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.Property(e => e.Wins).HasColumnName("wins");

                entity.Property(e => e.YellowCards).HasColumnName("yellowCards");

                entity.HasOne(d => d.GroupStage)
                    .WithMany(p => p.TeamRankings)
                    .HasForeignKey(d => d.GroupStageId)
                    .HasConstraintName("FK__Team_Rank__group__6FE99F9F");

                entity.HasOne(d => d.KnockOutStage)
                    .WithMany(p => p.TeamRankings)
                    .HasForeignKey(d => d.KnockOutStageId)
                    .HasConstraintName("FK__Team_Rank__knock__70DDC3D8");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.TeamRankings)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Team_Rank__teamI__71D1E811");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.TeamRankings)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Team_Rank__tourn__72C60C4A");
            });

            modelBuilder.Entity<TeamRegistration>(entity =>
            {
                entity.ToTable("Team_Registration");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ApplicationDate)
                    .HasColumnType("datetime")
                    .HasColumnName("applicationDate");

                entity.Property(e => e.ApprovalDate)
                    .HasColumnType("datetime")
                    .HasColumnName("approvalDate");

                entity.Property(e => e.ApprovalNote)
                    .HasMaxLength(1000)
                    .HasColumnName("approvalNote");

                entity.Property(e => e.ApprovalStatus)
                    .HasMaxLength(50)
                    .HasColumnName("approvalStatus");

                entity.Property(e => e.TeamId).HasColumnName("teamID");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.TeamRegistrations)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK__Team_Regi__teamI__2739D489");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.TeamRegistrations)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Team_Regi__tourn__282DF8C2");
            });

            modelBuilder.Entity<Tournament>(entity =>
            {
                entity.ToTable("Tournament");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AvatarTournament)
                    .HasMaxLength(4000)
                    .HasColumnName("avatarTournament");

                entity.Property(e => e.BigPhotoTournament)
                    .HasMaxLength(4000)
                    .HasColumnName("bigPhotoTournament");

                entity.Property(e => e.CompetitionDescription)
                    .HasMaxLength(255)
                    .HasColumnName("competitionDescription");

                entity.Property(e => e.CompetitionFormatName)
                    .HasMaxLength(255)
                    .HasColumnName("competitionFormatName");

                entity.Property(e => e.CurrentStatus)
                    .HasMaxLength(255)
                    .HasColumnName("currentStatus");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.DrawPoints).HasColumnName("drawPoints");

                entity.Property(e => e.EndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("endDate");

                entity.Property(e => e.LinkPath)
                    .HasMaxLength(4000)
                    .HasColumnName("linkPath");

                entity.Property(e => e.LossPoints).HasColumnName("lossPoints");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.NumberOfMatches).HasColumnName("numberOfMatches");

                entity.Property(e => e.NumberOfMatchesBannedDirectRedCard).HasColumnName("numberOfMatchesBannedDirectRedCard");

                entity.Property(e => e.NumberOfMatchesBannedIndirectRedCard).HasColumnName("numberOfMatchesBannedIndirectRedCard");

                entity.Property(e => e.NumberOfMatchesBannedYellowCard).HasColumnName("numberOfMatchesBannedYellowCard");

                entity.Property(e => e.NumberOfPlayersPerTeamRange).HasColumnName("numberOfPlayersPerTeamRange");

                entity.Property(e => e.NumberOfRounds).HasColumnName("numberOfRounds");

                entity.Property(e => e.NumberOfTables).HasColumnName("numberOfTables");

                entity.Property(e => e.NumberOfTeams).HasColumnName("numberOfTeams");

                entity.Property(e => e.NumberOfTeamsToNextRound).HasColumnName("numberOfTeamsToNextRound");

                entity.Property(e => e.NumberOfTurns).HasColumnName("numberOfTurns");

                entity.Property(e => e.OpenOrNot)
                    .HasMaxLength(255)
                    .HasColumnName("open_Or_Not");

                entity.Property(e => e.OrganizerId).HasColumnName("organizerID");

                entity.Property(e => e.Phone)
                    .HasMaxLength(255)
                    .HasColumnName("phone");

                entity.Property(e => e.RegistrationAllowed)
                    .HasMaxLength(255)
                    .HasColumnName("registrationAllowed");

                entity.Property(e => e.SetDirectRedCards).HasColumnName("setDirectRedCards");

                entity.Property(e => e.SetIndirectRedCards).HasColumnName("setIndirectRedCards");

                entity.Property(e => e.SetToOrganizeThirdPrize)
                    .HasMaxLength(255)
                    .HasColumnName("setToOrganizeThirdPrize");

                entity.Property(e => e.SetYellowCardsToBan).HasColumnName("setYellowCardsToBan");

                entity.Property(e => e.StartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("startDate");

                entity.Property(e => e.SubmissionDeadline)
                    .HasColumnType("datetime")
                    .HasColumnName("submissionDeadline");

                entity.Property(e => e.ViewNumber).HasColumnName("viewNumber");

                entity.Property(e => e.WinPoints).HasColumnName("winPoints");

                entity.HasOne(d => d.Organizer)
                    .WithMany(p => p.Tournaments)
                    .HasForeignKey(d => d.OrganizerId)
                    .HasConstraintName("FK__Tournamen__organ__75A278F5");
            });

            modelBuilder.Entity<TournamentPhase>(entity =>
            {
                entity.ToTable("Tournament_Phase");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.PhaseDescription)
                    .HasMaxLength(500)
                    .HasColumnName("phaseDescription");

                entity.Property(e => e.PhaseName)
                    .HasMaxLength(255)
                    .HasColumnName("phaseName");
            });

            modelBuilder.Entity<TournamentVote>(entity =>
            {
                entity.ToTable("Tournament_Votes");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.StarRating).HasColumnName("starRating");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.Property(e => e.VotedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("votedAt");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.TournamentVotes)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Tournamen__tourn__778AC167");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TournamentVotes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Tournamen__userI__787EE5A0");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Avatar)
                    .HasMaxLength(4000)
                    .HasColumnName("avatar");

                entity.Property(e => e.Bio)
                    .HasMaxLength(750)
                    .HasColumnName("bio");

                entity.Property(e => e.BirthDate)
                    .HasColumnType("date")
                    .HasColumnName("birthDate");

                entity.Property(e => e.ConfirmationCodExpired)
                    .HasMaxLength(255)
                    .HasColumnName("confirmationCodExpired");

                entity.Property(e => e.ConfirmationCode)
                    .HasMaxLength(255)
                    .HasColumnName("confirmationCode");

                entity.Property(e => e.ContactInfo)
                    .HasMaxLength(255)
                    .HasColumnName("contactInfo");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .HasColumnName("country");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Fullname)
                    .HasMaxLength(255)
                    .HasColumnName("fullname");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(255)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<Venue>(entity =>
            {
                entity.ToTable("Venue");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BigImage)
                    .HasMaxLength(255)
                    .HasColumnName("bigImage");

                entity.Property(e => e.Capacity)
                    .HasMaxLength(255)
                    .HasColumnName("capacity");

                entity.Property(e => e.FacilityDetails)
                    .HasMaxLength(255)
                    .HasColumnName("facilityDetails");

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .HasColumnName("location");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.TournamentId).HasColumnName("tournamentID");

                entity.HasOne(d => d.Tournament)
                    .WithMany(p => p.Venues)
                    .HasForeignKey(d => d.TournamentId)
                    .HasConstraintName("FK__Venue__tournamen__797309D9");
            });

            modelBuilder.Entity<Vote>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AwardId).HasColumnName("awardID");

                entity.Property(e => e.NomineePlayerId).HasColumnName("nomineePlayerID");

                entity.Property(e => e.NomineeteamId).HasColumnName("nomineeteamID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.Property(e => e.VotedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("votedAt");

                entity.HasOne(d => d.Award)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.AwardId)
                    .HasConstraintName("FK__Votes__awardID__7A672E12");

                entity.HasOne(d => d.NomineePlayer)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.NomineePlayerId)
                    .HasConstraintName("FK__Votes__nomineePl__7B5B524B");

                entity.HasOne(d => d.Nomineeteam)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.NomineeteamId)
                    .HasConstraintName("FK__Votes__nomineete__7C4F7684");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Votes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Votes__userID__7D439ABD");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
