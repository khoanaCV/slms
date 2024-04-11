USE [SEP490]
GO
/****** Object:  Table [dbo].[Awards]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Awards](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournamentID] [int] NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Document]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Document](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NULL,
	[content] [nvarchar](4000) NULL,
	[documentType] [nvarchar](255) NULL,
	[uploadedAt] [datetime] NULL,
	[tournament_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[content] [nvarchar](4000) NULL,
	[submittedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Group_Stage]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Group_Stage](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournamentID] [int] NULL,
	[groupName] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GroupStage_Match]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GroupStage_Match](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[groupID] [int] NULL,
	[matchID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Knockout_Match]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Knockout_Match](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[knockoutStageID] [int] NULL,
	[matchID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Knockout_Stage]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Knockout_Stage](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournamentID] [int] NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Match]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Match](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournamentID] [int] NULL,
	[team1ID] [int] NULL,
	[team2ID] [int] NULL,
	[matchDate] [date] NULL,
	[startTime] [datetime] NULL,
	[venueID] [int] NULL,
	[phaseID] [int] NULL,
	[reportCreatorName] [nvarchar](255) NULL,
	[storedReportUrl] [nvarchar](1000) NULL,
	[currentStatus] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Match_Event]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Match_Event](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[matchID] [int] NULL,
	[eventType] [nvarchar](100) NULL,
	[eventMinute] [int] NULL,
	[playerID] [int] NULL,
	[shirtNumberPlayer] [int] NULL,
	[teamID] [int] NULL,
	[eventCreatedAt] [datetime] NULL,
	[eventUpdatedAt] [datetime] NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Match_Highlights]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Match_Highlights](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[matchID] [int] NULL,
	[highlightURL] [nvarchar](1000) NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Match_Officials]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Match_Officials](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[matchID] [int] NULL,
	[name] [nvarchar](255) NULL,
	[role] [nvarchar](255) NULL,
	[contactInfo] [nvarchar](255) NULL,
	[bio] [nvarchar](500) NULL,
	[tournamentID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Match_Statistics]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Match_Statistics](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[matchID] [int] NULL,
	[1stHalfExtraTime] [int] NULL,
	[2ndHalfExtraTime] [int] NULL,
	[goalsTeam1] [int] NULL,
	[goalsTeam2] [int] NULL,
	[subGoalsTeam1] [int] NULL,
	[subGoalsTeam2] [int] NULL,
	[yellowCardsTeam1] [int] NULL,
	[redCardsTeam1] [int] NULL,
	[yellowCardsTeam2] [int] NULL,
	[redCardsTeam2] [int] NULL,
	[doubleGoals] [int] NULL,
	[hattrickGoals] [int] NULL,
	[pokerGoals] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notifications]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notifications](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[NotificationType] [nvarchar](255) NULL,
	[Content] [nvarchar](255) NULL,
	[CreatedAt] [datetime] NULL,
	[IsRead] [int] NULL,
	[ReadAt] [datetime] NULL,
	[ActionTaken] [nvarchar](255) NULL,
	[ActionTakenAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Player]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Player](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[avatar] [nvarchar](4000) NULL,
	[phone] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[Citizenship_ID] [int] NULL,
	[Citizen_ID_photo1] [nvarchar](4000) NULL,
	[Citizen_ID_photo2] [nvarchar](4000) NULL,
	[name] [nvarchar](255) NULL,
	[gender] [nvarchar](255) NULL,
	[birthDate] [date] NULL,
	[position] [nvarchar](255) NULL,
	[height] [nvarchar](255) NULL,
	[shirtNumber] [nvarchar](255) NULL,
	[preferredFoot] [nvarchar](255) NULL,
	[strengths] [nvarchar](255) NULL,
	[weaknesses] [nvarchar](255) NULL,
	[bio] [nvarchar](750) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Player_Match_Statistics]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Player_Match_Statistics](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[playerID] [int] NULL,
	[matchID] [int] NULL,
	[goals] [int] NULL,
	[subGoals] [int] NULL,
	[ownGoals] [int] NULL,
	[saves] [int] NULL,
	[assists] [int] NULL,
	[yellowCards] [int] NULL,
	[redCards] [int] NULL,
	[wasfouled] [int] NULL,
	[anotherStatistics] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Playoff_Match]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Playoff_Match](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[playoffStageID] [int] NULL,
	[matchID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PlayoffStage]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PlayoffStage](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournamentID] [int] NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolePermission]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolePermission](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[roleID] [int] NULL,
	[permissionID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Social_Media_Post]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Social_Media_Post](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NULL,
	[content] [nvarchar](4000) NULL,
	[postedBy] [int] NULL,
	[postDate] [datetime] NULL,
	[idCategory] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Social_Media_Post_Category]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Social_Media_Post_Category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sponsor]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sponsor](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournament_id] [int] NULL,
	[sponsorName] [nvarchar](255) NULL,
	[sponsorType] [nvarchar](255) NULL,
	[sponsorInfor] [nvarchar](1000) NULL,
	[sponsorLogo] [nvarchar](1000) NULL,
	[sponsorLink] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Team]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[logo] [nvarchar](4000) NULL,
	[level] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[open_Or_Not] [int] NULL,
	[ageJoin] [nvarchar](255) NULL,
	[contactPerson] [nvarchar](255) NULL,
	[contactPersonEmail] [nvarchar](255) NULL,
	[activityArea] [nvarchar](255) NULL,
	[operatingTime] [nvarchar](255) NULL,
	[uniForm1] [nvarchar](4000) NULL,
	[uniForm2] [nvarchar](4000) NULL,
	[uniForm3] [nvarchar](4000) NULL,
	[currentStatus] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[teamManagerID] [int] NULL,
	[description] [nvarchar](4000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Team_GroupStage]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team_GroupStage](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[teamID] [int] NULL,
	[groupStageID] [int] NULL,
	[playedMatch] [int] NULL,
	[wins] [int] NULL,
	[draws] [int] NULL,
	[losses] [int] NULL,
	[points] [int] NULL,
	[totalGoalsScored] [int] NULL,
	[totalGoalsConceded] [int] NULL,
	[redCards] [int] NULL,
	[yellowCards] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Team_KnockoutStage]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team_KnockoutStage](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[teamID] [int] NULL,
	[knockoutStageID] [int] NULL,
	[playedMatch] [int] NULL,
	[wins] [int] NULL,
	[draws] [int] NULL,
	[losses] [int] NULL,
	[points] [int] NULL,
	[totalGoalsScored] [int] NULL,
	[totalGoalsConceded] [int] NULL,
	[redCards] [int] NULL,
	[yellowCards] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Team_Lineup]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team_Lineup](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[matchID] [int] NULL,
	[teamID] [int] NULL,
	[numberOfPlayers] [int] NULL,
	[formation] [nvarchar](255) NULL,
	[dateCreated] [datetime] NULL,
	[linkPathSaveDiagram] [nvarchar](4000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Team_Player]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team_Player](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[teamID] [int] NULL,
	[playerID] [int] NULL,
	[joinDate] [datetime] NULL,
	[terminateDate] [datetime] NULL,
	[currentStatus] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Team_PlayoffStage]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team_PlayoffStage](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[teamID] [int] NULL,
	[playoffStageID] [int] NULL,
	[playedMatch] [int] NULL,
	[wins] [int] NULL,
	[draws] [int] NULL,
	[losses] [int] NULL,
	[points] [int] NULL,
	[totalGoalsScored] [int] NULL,
	[totalGoalsConceded] [int] NULL,
	[redCards] [int] NULL,
	[yellowCards] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Team_Registration]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Team_Registration](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[teamID] [int] NULL,
	[tournamentID] [int] NULL,
	[applicationDate] [datetime] NULL,
	[approvalStatus] [int] NULL,
	[approvalDate] [datetime] NULL,
	[approvalNote] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tournament]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tournament](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[avatarTournament] [nvarchar](4000) NULL,
	[phone] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[startDate] [datetime] NULL,
	[endDate] [datetime] NULL,
	[description] [nvarchar](255) NULL,
	[organizerID] [int] NULL,
	[currentStatus] [nvarchar](255) NULL,
	[open_Or_Not] [int] NULL,
	[linkPath] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tournament_Configuration]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tournament_Configuration](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournament_type_id] [int] NULL,
	[numberOfTeams] [int] NULL,
	[numberOfPlayersPerTeamRange] [int] NULL,
	[numberOfMatches] [int] NULL,
	[numberOfStages] [int] NULL,
	[numberOfRounds] [int] NULL,
	[matchDurationOneRoundTime] [int] NULL,
	[numberOfTables] [int] NULL,
	[numberOfTeamsToNextRound] [int] NULL,
	[registrationAllowed] [int] NULL,
	[winPoints] [int] NULL,
	[drawPoints] [int] NULL,
	[lossPoints] [int] NULL,
	[tournament_id] [int] NULL,
	[configuration] [nvarchar](1000) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tournament_Phase]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tournament_Phase](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[tournament_ID] [int] NULL,
	[phaseName] [nvarchar](255) NULL,
	[phaseDescription] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tournament_Type]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tournament_Type](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[typeName] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[avatar] [nvarchar](4000) NULL,
	[fullname] [nvarchar](255) NULL,
	[bio] [nvarchar](750) NULL,
	[birthDate] [date] NULL,
	[contactInfo] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[username] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[roleID] [int] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Venue]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Venue](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[location] [nvarchar](255) NULL,
	[capacity] [nvarchar](255) NULL,
	[facilityDetails] [nvarchar](255) NULL,
	[tournamentID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Votes]    Script Date: 25/3/2024 10:30:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Votes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[awardID] [int] NULL,
	[nomineePlayerID] [int] NULL,
	[nomineeteamID] [int] NULL,
	[votedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Document] ON 

INSERT [dbo].[Document] ([id], [title], [content], [documentType], [uploadedAt], [tournament_id]) VALUES (2, N'Đặng Anh Quân_Java.pdf', N'D:\FPT_ki9\SEP490\SEP490_project\slms\SLMS\SLMS.API\documents\2706b379-0592-44e2-b5e9-12fb10c4e33b.pdf', N'PDF', NULL, 3)
INSERT [dbo].[Document] ([id], [title], [content], [documentType], [uploadedAt], [tournament_id]) VALUES (3, N'Dang-Anh-Quan-CV.pdf', N'D:\FPT_ki9\SEP490\SEP490_project\slms\SLMS\SLMS.API\documents\0ad92218-f619-4ac3-b9b8-9ded86410a7d.pdf', N'PDF', NULL, 5)
SET IDENTITY_INSERT [dbo].[Document] OFF
GO
SET IDENTITY_INSERT [dbo].[Permission] ON 

INSERT [dbo].[Permission] ([id], [name], [description]) VALUES (1, N'Create', N'Permission to create data')
INSERT [dbo].[Permission] ([id], [name], [description]) VALUES (2, N'Read', N'Permission to read data')
INSERT [dbo].[Permission] ([id], [name], [description]) VALUES (3, N'Update', N'Permission to update data')
INSERT [dbo].[Permission] ([id], [name], [description]) VALUES (4, N'Delete', N'Permission to delete data')
SET IDENTITY_INSERT [dbo].[Permission] OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([id], [name], [description]) VALUES (1, N'Administrator', N'Administrator role')
INSERT [dbo].[Role] ([id], [name], [description]) VALUES (2, N'Supervisor', N'Regular user role')
INSERT [dbo].[Role] ([id], [name], [description]) VALUES (3, N'BasicUser', NULL)
INSERT [dbo].[Role] ([id], [name], [description]) VALUES (4, N'LeagueManage', NULL)
INSERT [dbo].[Role] ([id], [name], [description]) VALUES (5, N'TeamManage', NULL)
SET IDENTITY_INSERT [dbo].[Role] OFF
GO
SET IDENTITY_INSERT [dbo].[RolePermission] ON 

INSERT [dbo].[RolePermission] ([id], [roleID], [permissionID]) VALUES (1, 1, 1)
INSERT [dbo].[RolePermission] ([id], [roleID], [permissionID]) VALUES (2, 1, 2)
INSERT [dbo].[RolePermission] ([id], [roleID], [permissionID]) VALUES (3, 1, 3)
INSERT [dbo].[RolePermission] ([id], [roleID], [permissionID]) VALUES (4, 1, 4)
INSERT [dbo].[RolePermission] ([id], [roleID], [permissionID]) VALUES (5, 2, 2)
INSERT [dbo].[RolePermission] ([id], [roleID], [permissionID]) VALUES (6, 2, 3)
SET IDENTITY_INSERT [dbo].[RolePermission] OFF
GO
SET IDENTITY_INSERT [dbo].[Tournament] ON 

INSERT [dbo].[Tournament] ([id], [avatarTournament], [phone], [name], [startDate], [endDate], [description], [organizerID], [currentStatus], [open_Or_Not], [linkPath]) VALUES (2, N'D:\FPT_ki9\SEP490\SEP490_project\slms\SLMS\SLMS.API\images\86c0b199-044e-478d-8ad8-2c7fdd2fc930.jpg', N'987654321', N'phủi ', NULL, NULL, NULL, 5, NULL, 1, NULL)
INSERT [dbo].[Tournament] ([id], [avatarTournament], [phone], [name], [startDate], [endDate], [description], [organizerID], [currentStatus], [open_Or_Not], [linkPath]) VALUES (3, N'D:\FPT_ki9\SEP490\SEP490_project\slms\SLMS\SLMS.API\images\cd57f1a1-076f-4863-8a24-1ca222cbba72.jpg', N'987654321', N'rin', NULL, NULL, NULL, 2, NULL, 1, NULL)
INSERT [dbo].[Tournament] ([id], [avatarTournament], [phone], [name], [startDate], [endDate], [description], [organizerID], [currentStatus], [open_Or_Not], [linkPath]) VALUES (4, N'D:\FPT_ki9\SEP490\SEP490_project\slms\SLMS\SLMS.API\images\86c0b199-044e-478d-8ad8-2c7fdd2fc930.jpg', N'987654321', N'phủi ', NULL, NULL, NULL, 5, NULL, 1, NULL)
INSERT [dbo].[Tournament] ([id], [avatarTournament], [phone], [name], [startDate], [endDate], [description], [organizerID], [currentStatus], [open_Or_Not], [linkPath]) VALUES (5, N'D:\FPT_ki9\SEP490\SEP490_project\slms\SLMS\SLMS.API\images\84565392-52b6-44de-8310-f3c45385336a.jpg', N'9898786', N'ádasdsd', NULL, NULL, NULL, 4, NULL, 1, NULL)
SET IDENTITY_INSERT [dbo].[Tournament] OFF
GO
SET IDENTITY_INSERT [dbo].[Tournament_Phase] ON 

INSERT [dbo].[Tournament_Phase] ([id], [tournament_ID], [phaseName], [phaseDescription]) VALUES (1, 2, N'Vòng Bảng', NULL)
INSERT [dbo].[Tournament_Phase] ([id], [tournament_ID], [phaseName], [phaseDescription]) VALUES (2, 2, N'Đấu Loại', NULL)
INSERT [dbo].[Tournament_Phase] ([id], [tournament_ID], [phaseName], [phaseDescription]) VALUES (3, 2, N'Tứ kết ', NULL)
INSERT [dbo].[Tournament_Phase] ([id], [tournament_ID], [phaseName], [phaseDescription]) VALUES (4, 2, N'Chung kết', NULL)
SET IDENTITY_INSERT [dbo].[Tournament_Phase] OFF
GO
SET IDENTITY_INSERT [dbo].[Tournament_Type] ON 

INSERT [dbo].[Tournament_Type] ([id], [typeName], [description]) VALUES (1, N'Vòng tròn', N'Description for Type 1')
INSERT [dbo].[Tournament_Type] ([id], [typeName], [description]) VALUES (2, N'Tính điểm', N'Description for Type 2')
INSERT [dbo].[Tournament_Type] ([id], [typeName], [description]) VALUES (3, N'Chia bảng', N'Description for Type 3')
SET IDENTITY_INSERT [dbo].[Tournament_Type] OFF
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([id], [avatar], [fullname], [bio], [birthDate], [contactInfo], [country], [username], [password], [email], [roleID], [status]) VALUES (2, N'string', N'Đặng Anh Quân', N'string', CAST(N'2024-02-22' AS Date), N'0354701736', N'Country', N'admin', N'admin_password', N'admin@example.com', 1, 1)
INSERT [dbo].[User] ([id], [avatar], [fullname], [bio], [birthDate], [contactInfo], [country], [username], [password], [email], [roleID], [status]) VALUES (3, N'avatar_url_here', N'Regular User', N'Regular user', CAST(N'1990-01-01' AS Date), N'user@example.com', N'Country', N'user', N'user_password', N'user@example.com', 2, 1)
INSERT [dbo].[User] ([id], [avatar], [fullname], [bio], [birthDate], [contactInfo], [country], [username], [password], [email], [roleID], [status]) VALUES (4, N'ahihi.jpg', N'Đặng Anh Quân ', N'be', CAST(N'2022-02-23' AS Date), N'0987654312', NULL, NULL, N'ducanh123', N'luuanh45123@gmail.com', 3, 1)
INSERT [dbo].[User] ([id], [avatar], [fullname], [bio], [birthDate], [contactInfo], [country], [username], [password], [email], [roleID], [status]) VALUES (5, NULL, NULL, NULL, NULL, NULL, NULL, N'anh', N'ducanh123', N'luuanh451236@gmail.com', 3, 1)
INSERT [dbo].[User] ([id], [avatar], [fullname], [bio], [birthDate], [contactInfo], [country], [username], [password], [email], [roleID], [status]) VALUES (6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'ducanh123', N'ducanh123@gmail.com', 3, 0)
INSERT [dbo].[User] ([id], [avatar], [fullname], [bio], [birthDate], [contactInfo], [country], [username], [password], [email], [roleID], [status]) VALUES (7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'123', N'duc@gmail.com', 3, 0)
INSERT [dbo].[User] ([id], [avatar], [fullname], [bio], [birthDate], [contactInfo], [country], [username], [password], [email], [roleID], [status]) VALUES (8, NULL, N'quan', NULL, NULL, NULL, NULL, NULL, N'123', N'quandang2001@gmail.com', 3, 1)
SET IDENTITY_INSERT [dbo].[User] OFF
GO
SET IDENTITY_INSERT [dbo].[Venue] ON 

INSERT [dbo].[Venue] ([id], [name], [location], [capacity], [facilityDetails], [tournamentID]) VALUES (1, N'Venue 1', N'Location for Venue 1', N'1000', NULL, NULL)
INSERT [dbo].[Venue] ([id], [name], [location], [capacity], [facilityDetails], [tournamentID]) VALUES (2, N'Venue 2', N'Location for Venue 2', N'1500', NULL, NULL)
INSERT [dbo].[Venue] ([id], [name], [location], [capacity], [facilityDetails], [tournamentID]) VALUES (3, N'Venue 3', N'Location for Venue 3', N'2000', NULL, NULL)
INSERT [dbo].[Venue] ([id], [name], [location], [capacity], [facilityDetails], [tournamentID]) VALUES (4, N'Venue 4', N'Location for Venue 4', N'1200', NULL, NULL)
INSERT [dbo].[Venue] ([id], [name], [location], [capacity], [facilityDetails], [tournamentID]) VALUES (5, N'Venue 5', N'Location for Venue 5', N'1800', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Venue] OFF
GO
ALTER TABLE [dbo].[Awards]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Document]  WITH CHECK ADD FOREIGN KEY([tournament_id])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Group_Stage]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[GroupStage_Match]  WITH CHECK ADD FOREIGN KEY([groupID])
REFERENCES [dbo].[Group_Stage] ([id])
GO
ALTER TABLE [dbo].[GroupStage_Match]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Knockout_Match]  WITH CHECK ADD FOREIGN KEY([knockoutStageID])
REFERENCES [dbo].[Knockout_Stage] ([id])
GO
ALTER TABLE [dbo].[Knockout_Match]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Knockout_Stage]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Match]  WITH CHECK ADD FOREIGN KEY([phaseID])
REFERENCES [dbo].[Tournament_Phase] ([id])
GO
ALTER TABLE [dbo].[Match]  WITH CHECK ADD FOREIGN KEY([team1ID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Match]  WITH CHECK ADD FOREIGN KEY([team2ID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Match]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Match]  WITH CHECK ADD FOREIGN KEY([venueID])
REFERENCES [dbo].[Venue] ([id])
GO
ALTER TABLE [dbo].[Match_Event]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Match_Event]  WITH CHECK ADD FOREIGN KEY([playerID])
REFERENCES [dbo].[Player] ([id])
GO
ALTER TABLE [dbo].[Match_Event]  WITH CHECK ADD FOREIGN KEY([teamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Match_Highlights]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Match_Officials]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Match_Officials]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Match_Statistics]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Notifications]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Player_Match_Statistics]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Player_Match_Statistics]  WITH CHECK ADD FOREIGN KEY([playerID])
REFERENCES [dbo].[Player] ([id])
GO
ALTER TABLE [dbo].[Playoff_Match]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Playoff_Match]  WITH CHECK ADD FOREIGN KEY([playoffStageID])
REFERENCES [dbo].[PlayoffStage] ([id])
GO
ALTER TABLE [dbo].[PlayoffStage]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[RolePermission]  WITH CHECK ADD FOREIGN KEY([permissionID])
REFERENCES [dbo].[Permission] ([id])
GO
ALTER TABLE [dbo].[RolePermission]  WITH CHECK ADD FOREIGN KEY([roleID])
REFERENCES [dbo].[Role] ([id])
GO
ALTER TABLE [dbo].[Social_Media_Post]  WITH CHECK ADD FOREIGN KEY([idCategory])
REFERENCES [dbo].[Social_Media_Post_Category] ([id])
GO
ALTER TABLE [dbo].[Social_Media_Post]  WITH CHECK ADD FOREIGN KEY([postedBy])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Sponsor]  WITH CHECK ADD FOREIGN KEY([tournament_id])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Team]  WITH CHECK ADD FOREIGN KEY([teamManagerID])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Team_GroupStage]  WITH CHECK ADD FOREIGN KEY([groupStageID])
REFERENCES [dbo].[Group_Stage] ([id])
GO
ALTER TABLE [dbo].[Team_GroupStage]  WITH CHECK ADD FOREIGN KEY([teamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Team_KnockoutStage]  WITH CHECK ADD FOREIGN KEY([knockoutStageID])
REFERENCES [dbo].[Knockout_Stage] ([id])
GO
ALTER TABLE [dbo].[Team_KnockoutStage]  WITH CHECK ADD FOREIGN KEY([teamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Team_Lineup]  WITH CHECK ADD FOREIGN KEY([matchID])
REFERENCES [dbo].[Match] ([id])
GO
ALTER TABLE [dbo].[Team_Lineup]  WITH CHECK ADD FOREIGN KEY([teamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Team_Player]  WITH CHECK ADD FOREIGN KEY([playerID])
REFERENCES [dbo].[Player] ([id])
GO
ALTER TABLE [dbo].[Team_Player]  WITH CHECK ADD FOREIGN KEY([teamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Team_PlayoffStage]  WITH CHECK ADD FOREIGN KEY([playoffStageID])
REFERENCES [dbo].[PlayoffStage] ([id])
GO
ALTER TABLE [dbo].[Team_PlayoffStage]  WITH CHECK ADD FOREIGN KEY([teamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Team_Registration]  WITH CHECK ADD FOREIGN KEY([teamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Team_Registration]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Tournament]  WITH CHECK ADD FOREIGN KEY([organizerID])
REFERENCES [dbo].[User] ([id])
GO
ALTER TABLE [dbo].[Tournament_Configuration]  WITH CHECK ADD FOREIGN KEY([tournament_id])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Tournament_Configuration]  WITH CHECK ADD FOREIGN KEY([tournament_type_id])
REFERENCES [dbo].[Tournament_Type] ([id])
GO
ALTER TABLE [dbo].[Tournament_Phase]  WITH CHECK ADD FOREIGN KEY([tournament_ID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD FOREIGN KEY([roleID])
REFERENCES [dbo].[Role] ([id])
GO
ALTER TABLE [dbo].[Venue]  WITH CHECK ADD FOREIGN KEY([tournamentID])
REFERENCES [dbo].[Tournament] ([id])
GO
ALTER TABLE [dbo].[Votes]  WITH CHECK ADD FOREIGN KEY([awardID])
REFERENCES [dbo].[Awards] ([id])
GO
ALTER TABLE [dbo].[Votes]  WITH CHECK ADD FOREIGN KEY([nomineePlayerID])
REFERENCES [dbo].[Player] ([id])
GO
ALTER TABLE [dbo].[Votes]  WITH CHECK ADD FOREIGN KEY([nomineeteamID])
REFERENCES [dbo].[Team] ([id])
GO
ALTER TABLE [dbo].[Votes]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[User] ([id])
GO
