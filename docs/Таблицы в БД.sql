--стоиомсть материалов
CREATE TABLE [dbo].[RSPP_Osn_Mat](
[Nnom] [char](10) COLLATE Cyrillic_General_CI_AS NOT NULL,
[Ed_Izm] [char](3) COLLATE Cyrillic_General_CI_AS NOT NULL,
[Cena] [numeric](12, 4) NULL,
[idf] [char](12) COLLATE Cyrillic_General_CI_AS NULL
) ON [PRIMARY]

--стоимость покрытий
CREATE TABLE [dbo].[RSPP_Pokr](
[VPok] [int] NOT NULL,
[Ed_Izm] [char](3) COLLATE Cyrillic_General_CI_AS NOT NULL,
[Cena] [numeric](12, 4) NULL,
[idf] [char](6) COLLATE Cyrillic_General_CI_AS NULL
) ON [PRIMARY]

--формулы для расчета
CREATE TABLE [dbo].[RSPP_tz_formuls](
[op] [char](3) COLLATE Cyrillic_General_CI_AS NULL,
[priz] [char](1) COLLATE Cyrillic_General_CI_AS NOT NULL,
[idf] [varchar](50) COLLATE Cyrillic_General_CI_AS NOT NULL,
[namef] [varchar](255) COLLATE Cyrillic_General_CI_AS NOT NULL,
[f] [varchar](511) COLLATE Cyrillic_General_CI_AS NOT NULL,
[ei] [char](3) COLLATE Cyrillic_General_CI_AS NULL,
[tp] [char](3) COLLATE Cyrillic_General_CI_AS NULL,
CONSTRAINT [PK_RSPP_tz_formuls] PRIMARY KEY CLUSTERED 
(
[idf] ASC
)WITH (IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]

--архив изменения формул
CREATE TABLE [dbo].[RSPP_tz_formuls_arhv](
[op] [char](3) COLLATE Cyrillic_General_CI_AS NULL,
[priz] [char](1) COLLATE Cyrillic_General_CI_AS NOT NULL,
[idf] [varchar](50) COLLATE Cyrillic_General_CI_AS NOT NULL,
[namef] [varchar](255) COLLATE Cyrillic_General_CI_AS NOT NULL,
[f] [varchar](511) COLLATE Cyrillic_General_CI_AS NOT NULL,
[ei] [char](3) COLLATE Cyrillic_General_CI_AS NULL,
[tp] [char](3) COLLATE Cyrillic_General_CI_AS NULL,
[action] [char](1) COLLATE Cyrillic_General_CI_AS NULL,
[date_action] [datetime] NULL,
[user_action] [char](8) COLLATE Cyrillic_General_CI_AS NULL
) ON [PRIMARY]