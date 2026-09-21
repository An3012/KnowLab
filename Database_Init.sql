-- ==============================================================================
-- DỰ ÁN: KNOWLAB (Zero-Knowledge First Decision Support Platform)
-- MỤC ĐÍCH: Kịch bản khởi tạo cơ sở dữ liệu Microsoft SQL Server (DDL & Seed Data)
-- SERVER: WIN-NT0F62URHT9\ANND
-- DATABASE: WED_KnowLab
-- QUY TẮC: Tuân thủ 100% MASTER_EXECUTE/SQL_SAVE_PROMPT.md (Index-First, Không dùng MERGE)
-- ==============================================================================

-- 1. TẠO DATABASE NẾU CHƯA CÓ
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'WED_KnowLab')
BEGIN
    CREATE DATABASE [WED_KnowLab]
    COLLATE Latin1_General_100_CI_AS_SC_UTF8;
    PRINT N'==> Đã tạo Database [WED_KnowLab] thành công.';
END
ELSE
BEGIN
    PRINT N'==> Database [WED_KnowLab] đã tồn tại.';
END
GO

USE [WED_KnowLab];
GO

-- ==============================================================================
-- 2. TẠO CÁC BẢNG DỮ LIỆU CHUẨN
-- ==============================================================================

-- 2.1 BẢNG LƯU TRỮ KỊCH BẢN THỬ NGHIỆM ĐA LĨNH VỰC (KichBan)
-- Dùng cho cả 6 Domain: pc-building, real-estate, cars, motorcycles, home, feng-shui
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'KichBan')
BEGIN
    CREATE TABLE [dbo].[KichBan] (
        [MaKichBan]       INT IDENTITY(1,1) NOT NULL,
        [MaLinhVuc]       NVARCHAR(50)      NOT NULL, -- pc-building, real-estate, cars, motorcycles, home, feng-shui
        [TieuDe]          NVARCHAR(255)     NOT NULL, -- Tên hiển thị kịch bản
        [MucTieu]         NVARCHAR(500)     NULL,     -- Mục đích phân tích / tiêu chí
        [DuLieuJson]      NVARCHAR(MAX)     NOT NULL, -- Toàn bộ payload tham số cấu hình JSON
        [PhienBanEngine]  NVARCHAR(50)      NOT NULL DEFAULT (N'1.0.0'),
        [PhienBanData]    NVARCHAR(50)      NOT NULL DEFAULT (N'2026-01'),
        [NgayTao]         DATETIME2(7)      NOT NULL DEFAULT (SYSDATETIME()),
        [NgayCapNhat]     DATETIME2(7)      NOT NULL DEFAULT (SYSDATETIME()),
        CONSTRAINT [PK_KichBan] PRIMARY KEY CLUSTERED ([MaKichBan] ASC)
    );
    PRINT N'==> Đã tạo bảng [KichBan].';
END
ELSE
BEGIN
    PRINT N'==> Bảng [KichBan] đã tồn tại.';
END
GO

-- 2.2 BẢNG LƯU NHẬT KÝ RA QUYẾT ĐỊNH CÁ NHÂN (NhatKyQuyetDinh)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'NhatKyQuyetDinh')
BEGIN
    CREATE TABLE [dbo].[NhatKyQuyetDinh] (
        [MaNhatKy]    INT IDENTITY(1,1) NOT NULL,
        [MucTieu]     NVARCHAR(500)     NOT NULL, -- Mục tiêu quyết định (vd: Mua căn hộ hay đi thuê?)
        [GiaDinh]     NVARCHAR(MAX)     NULL,     -- Giả định chính đã đưa ra
        [QuyetDinh]   NVARCHAR(MAX)     NOT NULL, -- Kết luận / phương án đã chọn
        [NgayTao]     DATETIME2(7)      NOT NULL DEFAULT (SYSDATETIME()),
        CONSTRAINT [PK_NhatKyQuyetDinh] PRIMARY KEY CLUSTERED ([MaNhatKy] ASC)
    );
    PRINT N'==> Đã tạo bảng [NhatKyQuyetDinh].';
END
ELSE
BEGIN
    PRINT N'==> Bảng [NhatKyQuyetDinh] đã tồn tại.';
END
GO

-- 2.3 BẢNG CHUYÊN BIỆT LƯU CẤU HÌNH SMART PC BUILDER (CauHinhMayTinh)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'CauHinhMayTinh')
BEGIN
    CREATE TABLE [dbo].[CauHinhMayTinh] (
        [MaCauHinh]             INT IDENTITY(1,1) NOT NULL,
        [TenCauHinh]            NVARCHAR(255)     NOT NULL, -- Tên bộ máy (vd: PC Gaming 25tr 1440p)
        [TongGia]               DECIMAL(18,2)     NOT NULL DEFAULT (0),
        [CongSuatDinhMucW]      INT               NOT NULL DEFAULT (0), -- Công suất tiêu thụ tối đa ước tính (W)
        [PhanTramDuPhongNguon]  DECIMAL(5,2)      NOT NULL DEFAULT (20), -- % Headroom PSU (>= 20% là an toàn)
        [TuongThich]            BIT               NOT NULL DEFAULT (1), -- 1: Tương thích hoàn toàn, 0: Có xung đột
        [ChiTietLinhKienJson]   NVARCHAR(MAX)     NULL,     -- Dữ liệu 8 slot linh kiện (CPU, Main, RAM, GPU, PSU...)
        [NgayTao]               DATETIME2(7)      NOT NULL DEFAULT (SYSDATETIME()),
        [NgayCapNhat]           DATETIME2(7)      NOT NULL DEFAULT (SYSDATETIME()),
        CONSTRAINT [PK_CauHinhMayTinh] PRIMARY KEY CLUSTERED ([MaCauHinh] ASC)
    );
    PRINT N'==> Đã tạo bảng [CauHinhMayTinh].';
END
ELSE
BEGIN
    PRINT N'==> Bảng [CauHinhMayTinh] đã tồn tại.';
END
GO

-- ==============================================================================
-- 3. TẠO INDEXES (QUY TẮC INDEX-FIRST & HIỆU NĂNG CAO)
-- ==============================================================================

-- 3.1 Composite Index cho KichBan: Tối ưu query lọc theo MaLinhVuc và ORDER BY NgayTao DESC
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = N'IX_KichBan_MaLinhVuc_NgayTao' AND object_id = OBJECT_ID(N'[dbo].[KichBan]'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_KichBan_MaLinhVuc_NgayTao]
    ON [dbo].[KichBan] ([MaLinhVuc] ASC, [NgayTao] DESC);
    PRINT N'==> Đã tạo Composite Index [IX_KichBan_MaLinhVuc_NgayTao].';
END
GO

-- 3.2 Index cho NhatKyQuyetDinh: Tối ưu query xem nhật ký mới nhất
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = N'IX_NhatKyQuyetDinh_NgayTao' AND object_id = OBJECT_ID(N'[dbo].[NhatKyQuyetDinh]'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_NhatKyQuyetDinh_NgayTao]
    ON [dbo].[NhatKyQuyetDinh] ([NgayTao] DESC);
    PRINT N'==> Đã tạo Index [IX_NhatKyQuyetDinh_NgayTao].';
END
GO

-- 3.3 Index cho CauHinhMayTinh: Tối ưu query lịch sử cấu hình máy
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = N'IX_CauHinhMayTinh_NgayTao' AND object_id = OBJECT_ID(N'[dbo].[CauHinhMayTinh]'))
BEGIN
    CREATE NONCLUSTERED INDEX [IX_CauHinhMayTinh_NgayTao]
    ON [dbo].[CauHinhMayTinh] ([NgayTao] DESC);
    PRINT N'==> Đã tạo Index [IX_CauHinhMayTinh_NgayTao].';
END
GO

-- ==============================================================================
-- 4. THÊM DỮ LIỆU MẪU (SEED DATA KIỂM TRA HỆ THỐNG)
-- ==============================================================================

-- Seed Kịch Bản Mẫu (Nếu chưa có dữ liệu)
IF NOT EXISTS (SELECT 1 FROM [dbo].[KichBan])
BEGIN
    INSERT INTO [dbo].[KichBan] ([MaLinhVuc], [TieuDe], [MucTieu], [DuLieuJson], [PhienBanEngine], [PhienBanData])
    VALUES 
    (
        N'pc-building', 
        N'PC Gaming 1440p Cân Bằng (Preset 25tr)', 
        N'Chơi mượt các tựa game AAA ở độ phân giải 2K 60-120fps', 
        N'{"cpu":"amd-r5-7600x","motherboard":"gigabyte-b650-gaming-x","ram":"kingston-fury-beast-ddr5-32gb","gpu":"gigabyte-rtx-4070-super","psu":"msi-mag-a750gl-750w","case":"montech-air-903-base","cooler":"thermalright-peerless-assassin-120-se","storage":"samsung-980-pro-1tb"}', 
        N'1.0.0', 
        N'2026-01'
    ),
    (
        N'real-estate', 
        N'Vay Mua Căn Hộ Chung Cư 2.5 Tỷ (Trả Góp 20 Năm)', 
        N'Đánh giá an toàn tỷ lệ DTI và áp lực trả nợ thả nổi sau ưu đãi', 
        N'{"price":2500000000,"downPaymentPercent":30,"interestRatePercent":9.5,"termYears":20,"monthlyIncome":35000000}', 
        N'1.0.0', 
        N'2026-01'
    );
    PRINT N'==> Đã thêm dữ liệu mẫu vào bảng [KichBan].';
END
GO

-- Seed Nhật Ký Quyết Định Mẫu
IF NOT EXISTS (SELECT 1 FROM [dbo].[NhatKyQuyetDinh])
BEGIN
    INSERT INTO [dbo].[NhatKyQuyetDinh] ([MucTieu], [GiaDinh], [QuyetDinh])
    VALUES 
    (
        N'Quyết định mua căn hộ 2.5 tỷ hay đi thuê nhà?',
        N'Lãi suất cố định 2 năm đầu 7.5%, sau đó thả nổi 10.5%. Thu nhập gia đình 40tr/tháng. Giá thuê căn hộ tương đương 10tr/tháng.',
        N'Chọn phương án MUA: Vay 1.5 tỷ trong 20 năm, tiền trả nợ tháng cao nhất khoảng 16.2tr (DTI = 40.5% - ngưỡng chấp nhận được). Sau 20 năm có tài sản sở hữu.'
    );
    PRINT N'==> Đã thêm dữ liệu mẫu vào bảng [NhatKyQuyetDinh].';
END
GO

-- Seed Cấu Hình Máy Tính Mẫu
IF NOT EXISTS (SELECT 1 FROM [dbo].[CauHinhMayTinh])
BEGIN
    INSERT INTO [dbo].[CauHinhMayTinh] ([TenCauHinh], [TongGia], [CongSuatDinhMucW], [PhanTramDuPhongNguon], [TuongThich], [ChiTietLinhKienJson])
    VALUES 
    (
        N'Dàn Máy Ryzen 7600X + RTX 4070 Super',
        25600000,
        435,
        42.0,
        1,
        N'{"cpu":"AMD Ryzen 5 7600X","mainboard":"Gigabyte B650 Gaming X AX","ram":"DDR5 32GB 6000MHz","gpu":"RTX 4070 Super 12GB","psu":"MSI 750W 80 Plus Gold ATX 3.0"}'
    );
    PRINT N'==> Đã thêm dữ liệu mẫu vào bảng [CauHinhMayTinh].';
END
GO

-- ==============================================================================
-- 5. TRUY VẤN KIỂM TRA KẾT QUẢ KHỞI TẠO
-- ==============================================================================
PRINT N'';
PRINT N'==============================================================================';
PRINT N'HOÀN TẤT KHỞI TẠO CƠ SỞ DỮ LIỆU [WED_KnowLab] THÀNH CÔNG!';
PRINT N'==============================================================================';

SELECT 
    t.name AS [TenBang],
    SUM(p.rows) AS [SoBanGhi]
FROM sys.tables t
JOIN sys.partitions p ON t.object_id = p.object_id
WHERE p.index_id IN (0, 1) AND t.name IN ('KichBan', 'NhatKyQuyetDinh', 'CauHinhMayTinh')
GROUP BY t.name;
GO
