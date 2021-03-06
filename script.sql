USE [master]
GO
/****** Object:  Database [ISODB]    Script Date: 11/25/2018 10:18:41 PM ******/
CREATE DATABASE [ISODB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ISODB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\ISODB.mdf' , SIZE = 1187840KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ISODB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\ISODB_log.ldf' , SIZE = 204800KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ISODB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ISODB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ISODB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ISODB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ISODB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ISODB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ISODB] SET ARITHABORT OFF 
GO
ALTER DATABASE [ISODB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ISODB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ISODB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ISODB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ISODB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ISODB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ISODB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ISODB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ISODB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ISODB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ISODB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ISODB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ISODB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ISODB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ISODB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ISODB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ISODB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ISODB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ISODB] SET  MULTI_USER 
GO
ALTER DATABASE [ISODB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ISODB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ISODB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ISODB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ISODB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ISODB] SET QUERY_STORE = OFF
GO
USE [ISODB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [ISODB]
GO
/****** Object:  User [Kapil]    Script Date: 11/25/2018 10:18:42 PM ******/
CREATE USER [Kapil] FOR LOGIN [Kapil] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Kapil]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [Kapil]
GO
/****** Object:  Table [dbo].[lmpTbl]    Script Date: 11/25/2018 10:18:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[lmpTbl](
	[Type] [nvarchar](50) NOT NULL,
	[5 Minute Weighted Avg. LMP] [float] NOT NULL,
	[Hourly Integrated LMP] [float] NOT NULL,
	[node_id] [nvarchar](50) NOT NULL,
	[timestamp] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_lmpTbl] PRIMARY KEY CLUSTERED 
(
	[node_id] ASC,
	[timestamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[loadTbl]    Script Date: 11/25/2018 10:18:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[loadTbl](
	[Area] [nvarchar](50) NOT NULL,
	[Instantaneous Load] [int] NOT NULL,
	[timestamp] [datetime2](7) NOT NULL,
	[load] [int] NOT NULL,
 CONSTRAINT [PK_loadTbl] PRIMARY KEY CLUSTERED 
(
	[Area] ASC,
	[timestamp] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_QueueActivationSender]    Script Date: 11/25/2018 10:18:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_QueueActivationSender] AS 
BEGIN 
    SET NOCOUNT ON;
    DECLARE @h AS UNIQUEIDENTIFIER;
    DECLARE @mt NVARCHAR(200);

    RECEIVE TOP(1) @h = conversation_handle, @mt = message_type_name FROM [dbo].[dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender];

    IF @mt = N'http://schemas.microsoft.com/SQL/ServiceBroker/EndDialog'
    BEGIN
        END CONVERSATION @h;
    END

    IF @mt = N'http://schemas.microsoft.com/SQL/ServiceBroker/DialogTimer' OR @mt = N'http://schemas.microsoft.com/SQL/ServiceBroker/Error'
    BEGIN 
        

        END CONVERSATION @h;

        DECLARE @conversation_handle UNIQUEIDENTIFIER;
        DECLARE @schema_id INT;
        SELECT @schema_id = schema_id FROM sys.schemas WITH (NOLOCK) WHERE name = N'dbo';

        
        IF EXISTS (SELECT * FROM sys.triggers WITH (NOLOCK) WHERE object_id = OBJECT_ID(N'[dbo].[tr_dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender]')) DROP TRIGGER [dbo].[tr_dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender];

        
        IF EXISTS (SELECT * FROM sys.service_queues WITH (NOLOCK) WHERE schema_id = @schema_id AND name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender') EXEC (N'ALTER QUEUE [dbo].[dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender] WITH ACTIVATION (STATUS = OFF)');

        
        SELECT conversation_handle INTO #Conversations FROM sys.conversation_endpoints WITH (NOLOCK) WHERE far_service LIKE N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_%' ORDER BY is_initiator ASC;
        DECLARE conversation_cursor CURSOR FAST_FORWARD FOR SELECT conversation_handle FROM #Conversations;
        OPEN conversation_cursor;
        FETCH NEXT FROM conversation_cursor INTO @conversation_handle;
        WHILE @@FETCH_STATUS = 0 
        BEGIN
            END CONVERSATION @conversation_handle WITH CLEANUP;
            FETCH NEXT FROM conversation_cursor INTO @conversation_handle;
        END
        CLOSE conversation_cursor;
        DEALLOCATE conversation_cursor;
        DROP TABLE #Conversations;

        
        IF EXISTS (SELECT * FROM sys.services WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Receiver') DROP SERVICE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Receiver];
        
        IF EXISTS (SELECT * FROM sys.services WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender') DROP SERVICE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender];

        
        IF EXISTS (SELECT * FROM sys.service_queues WITH (NOLOCK) WHERE schema_id = @schema_id AND name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Receiver') DROP QUEUE [dbo].[dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Receiver];
        
        IF EXISTS (SELECT * FROM sys.service_queues WITH (NOLOCK) WHERE schema_id = @schema_id AND name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender') DROP QUEUE [dbo].[dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_Sender];

        
        IF EXISTS (SELECT * FROM sys.service_contracts WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b') DROP CONTRACT [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b];
        
        IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/StartMessage/Insert') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/StartMessage/Insert];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/StartMessage/Update') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/StartMessage/Update];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/StartMessage/Delete') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/StartMessage/Delete];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/Type') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/Type];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/5 Minute Weighted Avg. LMP') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/5 Minute Weighted Avg. LMP];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/Hourly Integrated LMP') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/Hourly Integrated LMP];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/node_id') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/node_id];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/timestamp') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/timestamp];
IF EXISTS (SELECT * FROM sys.service_message_types WITH (NOLOCK) WHERE name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/EndMessage') DROP MESSAGE TYPE [dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b/EndMessage];

        
        IF EXISTS (SELECT * FROM sys.objects WITH (NOLOCK) WHERE schema_id = @schema_id AND name = N'dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_QueueActivationSender') DROP PROCEDURE [dbo].[dbo_lmpTbl_984cfb48-82f6-4b96-8894-978460d4b99b_QueueActivationSender];

        
    END
END
GO
USE [master]
GO
ALTER DATABASE [ISODB] SET  READ_WRITE 
GO
