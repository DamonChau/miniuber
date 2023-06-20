USE MiniUber
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Customers_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Customers] DROP CONSTRAINT [FK_Customers_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Driver_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Drivers] DROP CONSTRAINT [FK_Driver_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Trips_Customers]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Trips] DROP CONSTRAINT [FK_Trips_Customers]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Trips_Drivers]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Trips] DROP CONSTRAINT [FK_Trips_Drivers]
;


IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Customers]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Customers]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Drivers]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Drivers]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Trips]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Trips]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Users]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Users]
;




CREATE TABLE [Customers] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[Address] nvarchar(256) NULL,
	[Latitude] decimal(8,6) NULL,
	[Longtidude] decimal(9,6) NULL
)
;

CREATE TABLE [Drivers] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[Latitude] decimal(8,6) NULL,
	[Longitude] decimal(9,6) NULL,
	[Image] nvarchar(256) NULL,
	[Rate] int NULL
)
;

CREATE TABLE [Trips] ( 
	[Id] uniqueidentifier NOT NULL,
	[DriverId] uniqueidentifier NULL,
	[CustomerId] uniqueidentifier NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[FinishedDate] datetime NULL,
	[AddFrom] nvarchar(256) NULL,
	[AddTo] nvarchar(256) NULL
)
;

CREATE TABLE [Users] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserName] nvarchar(125) NULL,
	[Password] nvarchar(125) NULL,
	[RefreshToken] nvarchar(125) NULL,
	[PhoneNo] varchar(20) NULL,
	[CreatedDate] datetime NULL,
	[LoginDate] datetime NULL,
	[Status] int NULL,
	[UserRole] int NULL
)
;


ALTER TABLE [Customers] ADD CONSTRAINT [PK_Customers] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Drivers] ADD CONSTRAINT [PK_Driver] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Trips] ADD CONSTRAINT [PK_Trips] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Users] ADD CONSTRAINT [PK_User] 
	PRIMARY KEY CLUSTERED ([Id])
;




ALTER TABLE [Customers] ADD CONSTRAINT [FK_Customers_Users] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Drivers] ADD CONSTRAINT [FK_Driver_User] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Trips] ADD CONSTRAINT [FK_Trips_Customers] 
	FOREIGN KEY ([CustomerId]) REFERENCES [Customers] ([Id])
;

ALTER TABLE [Trips] ADD CONSTRAINT [FK_Trips_Drivers] 
	FOREIGN KEY ([DriverId]) REFERENCES [Drivers] ([Id])
;
