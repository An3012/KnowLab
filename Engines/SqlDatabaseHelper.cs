using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace KnowLab.Engines
{
    public class KichBanEntity
    {
        public int MaKichBan { get; set; }
        public string MaLinhVuc { get; set; }
        public string TieuDe { get; set; }
        public string MucTieu { get; set; }
        public string DuLieuJson { get; set; }
        public string PhienBanEngine { get; set; }
        public string PhienBanData { get; set; }
        public DateTime NgayTao { get; set; }
    }

    public class NhatKyQuyetDinhEntity
    {
        public int MaNhatKy { get; set; }
        public string MucTieu { get; set; }
        public string GiaDinh { get; set; }
        public string QuyetDinh { get; set; }
        public DateTime NgayTao { get; set; }
    }

    public class CauHinhMayTinhEntity
    {
        public int MaCauHinh { get; set; }
        public string TenCauHinh { get; set; }
        public decimal TongGia { get; set; }
        public int CongSuatDinhMucW { get; set; }
        public decimal PhanTramDuPhongNguon { get; set; }
        public bool TuongThich { get; set; }
        public string ChiTietLinhKienJson { get; set; }
        public DateTime NgayTao { get; set; }
    }

    /// <summary>
    /// SqlDatabaseHelper: Tuan thu nghiem ngat MASTER_EXECUTE/SQL_SAVE_PROMPT.md:
    /// 1. Khong dung MERGE cho CRUD thong thuong (Dung IF EXISTS -> UPDATE ELSE INSERT).
    /// 2. Index-first: Tan dung composite index IX_KichBan_MaLinhVuc_NgayTao, IX_NhatKyQuyetDinh_NgayTao, IX_CauHinhMayTinh_NgayTao.
    /// 3. Khong dung SELECT *, chi ro column cu the.
    /// 4. Ho tro Pagination (OFFSET / FETCH NEXT) cho performance cao.
    /// 5. Parameterized Queries 100%, using statement cho moi resource.
    /// </summary>
    public static class SqlDatabaseHelper
    {
        private static readonly string DefaultConnectionString =
            "Server=WIN-NT0F62URHT9\\ANND;Database=WED_KnowLab;Integrated Security=True;Encrypt=True;TrustServerCertificate=True";

        public static string GetConnectionString()
        {
            try
            {
                var connSetting = ConfigurationManager.ConnectionStrings["KnowLabDb"];
                if (connSetting != null && !string.IsNullOrWhiteSpace(connSetting.ConnectionString))
                {
                    return connSetting.ConnectionString;
                }
            }
            catch
            {
                // Fallback to default connection string
            }
            return DefaultConnectionString;
        }

        public static bool TestConnection(out string message)
        {
            try
            {
                using (var conn = new SqlConnection(GetConnectionString()))
                {
                    conn.Open();
                    using (var cmd = new SqlCommand("SELECT DB_NAME()", conn))
                    {
                        var dbName = cmd.ExecuteScalar()?.ToString();
                        message = $"Ket noi thanh cong den database: {dbName}";
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                message = $"Loi ket noi SQL Server: {ex.Message}";
                return false;
            }
        }

        #region KichBan CRUD (Performance Optimized & No MERGE)

        public static int SaveOrUpdateKichBan(int? maKichBan, string maLinhVuc, string tieuDe, string mucTieu, string duLieuJson, string phienBanEngine = "1.0.0", string phienBanData = "2026-01")
        {
            if (string.IsNullOrWhiteSpace(maLinhVuc)) throw new ArgumentNullException(nameof(maLinhVuc));
            if (string.IsNullOrWhiteSpace(tieuDe)) throw new ArgumentNullException(nameof(tieuDe));
            if (string.IsNullOrWhiteSpace(duLieuJson)) throw new ArgumentNullException(nameof(duLieuJson));

            // Quy tac SQL: Tuyet doi khong dung MERGE cho CRUD thong thuong. Dung IF EXISTS -> UPDATE ELSE INSERT.
            const string sql = @"
                IF @MaKichBan IS NOT NULL AND EXISTS (SELECT 1 FROM KichBan WHERE MaKichBan = @MaKichBan)
                BEGIN
                    UPDATE KichBan
                    SET MaLinhVuc = @MaLinhVuc,
                        TieuDe = @TieuDe,
                        MucTieu = @MucTieu,
                        DuLieuJson = @DuLieuJson,
                        PhienBanEngine = @PhienBanEngine,
                        PhienBanData = @PhienBanData,
                        NgayCapNhat = SYSDATETIME()
                    WHERE MaKichBan = @MaKichBan;
                    SELECT @MaKichBan;
                END
                ELSE
                BEGIN
                    INSERT INTO KichBan (MaLinhVuc, TieuDe, MucTieu, DuLieuJson, PhienBanEngine, PhienBanData, NgayTao, NgayCapNhat)
                    VALUES (@MaLinhVuc, @TieuDe, @MucTieu, @DuLieuJson, @PhienBanEngine, @PhienBanData, SYSDATETIME(), SYSDATETIME());
                    SELECT CAST(SCOPE_IDENTITY() AS INT);
                END";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@MaKichBan", SqlDbType.Int).Value = (object)maKichBan ?? DBNull.Value;
                cmd.Parameters.Add("@MaLinhVuc", SqlDbType.NVarChar, 50).Value = maLinhVuc;
                cmd.Parameters.Add("@TieuDe", SqlDbType.NVarChar, 255).Value = tieuDe;
                cmd.Parameters.Add("@MucTieu", SqlDbType.NVarChar, 500).Value = (object)mucTieu ?? DBNull.Value;
                cmd.Parameters.Add("@DuLieuJson", SqlDbType.NVarChar, -1).Value = duLieuJson;
                cmd.Parameters.Add("@PhienBanEngine", SqlDbType.NVarChar, 50).Value = phienBanEngine ?? "1.0.0";
                cmd.Parameters.Add("@PhienBanData", SqlDbType.NVarChar, 50).Value = phienBanData ?? "2026-01";

                conn.Open();
                var result = cmd.ExecuteScalar();
                return Convert.ToInt32(result);
            }
        }

        public static List<KichBanEntity> GetKichBanList(string maLinhVuc = null, int pageIndex = 1, int pageSize = 50)
        {
            var list = new List<KichBanEntity>();
            int offset = Math.Max(0, (pageIndex - 1) * pageSize);

            // Quy tac: Khong dung SELECT *, chi ro tung column, su dung composite index IX_KichBan_MaLinhVuc_NgayTao
            string sql = @"
                SELECT MaKichBan, MaLinhVuc, TieuDe, MucTieu, DuLieuJson, PhienBanEngine, PhienBanData, NgayTao
                FROM KichBan";

            if (!string.IsNullOrWhiteSpace(maLinhVuc))
            {
                sql += " WHERE MaLinhVuc = @MaLinhVuc";
            }
            sql += " ORDER BY NgayTao DESC OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                if (!string.IsNullOrWhiteSpace(maLinhVuc))
                {
                    cmd.Parameters.Add("@MaLinhVuc", SqlDbType.NVarChar, 50).Value = maLinhVuc;
                }
                cmd.Parameters.Add("@Offset", SqlDbType.Int).Value = offset;
                cmd.Parameters.Add("@PageSize", SqlDbType.Int).Value = pageSize;

                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new KichBanEntity
                        {
                            MaKichBan = reader.GetInt32(0),
                            MaLinhVuc = reader.GetString(1),
                            TieuDe = reader.GetString(2),
                            MucTieu = reader.IsDBNull(3) ? "" : reader.GetString(3),
                            DuLieuJson = reader.GetString(4),
                            PhienBanEngine = reader.IsDBNull(5) ? "1.0.0" : reader.GetString(5),
                            PhienBanData = reader.IsDBNull(6) ? "2026-01" : reader.GetString(6),
                            NgayTao = reader.GetDateTime(7)
                        });
                    }
                }
            }
            return list;
        }

        #endregion

        #region NhatKyQuyetDinh CRUD

        public static int SaveNhatKyQuyetDinh(string mucTieu, string giaDinh, string quyetDinh)
        {
            if (string.IsNullOrWhiteSpace(mucTieu)) throw new ArgumentNullException(nameof(mucTieu));
            if (string.IsNullOrWhiteSpace(quyetDinh)) throw new ArgumentNullException(nameof(quyetDinh));

            const string sql = @"
                INSERT INTO NhatKyQuyetDinh (MucTieu, GiaDinh, QuyetDinh, NgayTao)
                VALUES (@MucTieu, @GiaDinh, @QuyetDinh, SYSDATETIME());
                SELECT CAST(SCOPE_IDENTITY() AS INT);";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@MucTieu", SqlDbType.NVarChar, 500).Value = mucTieu;
                cmd.Parameters.Add("@GiaDinh", SqlDbType.NVarChar, -1).Value = (object)giaDinh ?? DBNull.Value;
                cmd.Parameters.Add("@QuyetDinh", SqlDbType.NVarChar, -1).Value = quyetDinh;

                conn.Open();
                var result = cmd.ExecuteScalar();
                return Convert.ToInt32(result);
            }
        }

        public static List<NhatKyQuyetDinhEntity> GetNhatKyQuyetDinhList(int pageIndex = 1, int pageSize = 50)
        {
            var list = new List<NhatKyQuyetDinhEntity>();
            int offset = Math.Max(0, (pageIndex - 1) * pageSize);

            // Tan dung index IX_NhatKyQuyetDinh_NgayTao
            const string sql = @"
                SELECT MaNhatKy, MucTieu, GiaDinh, QuyetDinh, NgayTao
                FROM NhatKyQuyetDinh
                ORDER BY NgayTao DESC
                OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@Offset", SqlDbType.Int).Value = offset;
                cmd.Parameters.Add("@PageSize", SqlDbType.Int).Value = pageSize;

                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new NhatKyQuyetDinhEntity
                        {
                            MaNhatKy = reader.GetInt32(0),
                            MucTieu = reader.GetString(1),
                            GiaDinh = reader.IsDBNull(2) ? "" : reader.GetString(2),
                            QuyetDinh = reader.GetString(3),
                            NgayTao = reader.GetDateTime(4)
                        });
                    }
                }
            }
            return list;
        }

        #endregion

        #region CauHinhMayTinh CRUD

        public static int SaveOrUpdateCauHinhMayTinh(int? maCauHinh, string tenCauHinh, decimal tongGia, int congSuatDinhMucW, decimal phanTramDuPhongNguon, bool tuongThich, string chiTietJson = null)
        {
            if (string.IsNullOrWhiteSpace(tenCauHinh)) throw new ArgumentNullException(nameof(tenCauHinh));

            // Quy tac: Khong dung MERGE cho CRUD thong thuong. Dung IF EXISTS -> UPDATE ELSE INSERT.
            const string sql = @"
                IF @MaCauHinh IS NOT NULL AND EXISTS (SELECT 1 FROM CauHinhMayTinh WHERE MaCauHinh = @MaCauHinh)
                BEGIN
                    UPDATE CauHinhMayTinh
                    SET TenCauHinh = @TenCauHinh,
                        TongGia = @TongGia,
                        CongSuatDinhMucW = @CongSuatDinhMucW,
                        PhanTramDuPhongNguon = @PhanTramDuPhongNguon,
                        TuongThich = @TuongThich,
                        ChiTietLinhKienJson = @ChiTietLinhKienJson,
                        NgayCapNhat = SYSDATETIME()
                    WHERE MaCauHinh = @MaCauHinh;
                    SELECT @MaCauHinh;
                END
                ELSE
                BEGIN
                    INSERT INTO CauHinhMayTinh (TenCauHinh, TongGia, CongSuatDinhMucW, PhanTramDuPhongNguon, TuongThich, ChiTietLinhKienJson, NgayTao, NgayCapNhat)
                    VALUES (@TenCauHinh, @TongGia, @CongSuatDinhMucW, @PhanTramDuPhongNguon, @TuongThich, @ChiTietLinhKienJson, SYSDATETIME(), SYSDATETIME());
                    SELECT CAST(SCOPE_IDENTITY() AS INT);
                END";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@MaCauHinh", SqlDbType.Int).Value = (object)maCauHinh ?? DBNull.Value;
                cmd.Parameters.Add("@TenCauHinh", SqlDbType.NVarChar, 255).Value = tenCauHinh;
                cmd.Parameters.Add("@TongGia", SqlDbType.Decimal).Value = tongGia;
                cmd.Parameters.Add("@CongSuatDinhMucW", SqlDbType.Int).Value = congSuatDinhMucW;
                cmd.Parameters.Add("@PhanTramDuPhongNguon", SqlDbType.Decimal).Value = phanTramDuPhongNguon;
                cmd.Parameters.Add("@TuongThich", SqlDbType.Bit).Value = tuongThich;
                cmd.Parameters.Add("@ChiTietLinhKienJson", SqlDbType.NVarChar, -1).Value = (object)chiTietJson ?? DBNull.Value;

                conn.Open();
                var result = cmd.ExecuteScalar();
                return Convert.ToInt32(result);
            }
        }

        public static List<CauHinhMayTinhEntity> GetCauHinhMayTinhList(int pageIndex = 1, int pageSize = 50)
        {
            var list = new List<CauHinhMayTinhEntity>();
            int offset = Math.Max(0, (pageIndex - 1) * pageSize);

            // Tan dung index IX_CauHinhMayTinh_NgayTao
            const string sql = @"
                SELECT MaCauHinh, TenCauHinh, TongGia, CongSuatDinhMucW, PhanTramDuPhongNguon, TuongThich, ChiTietLinhKienJson, NgayTao
                FROM CauHinhMayTinh
                ORDER BY NgayTao DESC
                OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@Offset", SqlDbType.Int).Value = offset;
                cmd.Parameters.Add("@PageSize", SqlDbType.Int).Value = pageSize;

                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new CauHinhMayTinhEntity
                        {
                            MaCauHinh = reader.GetInt32(0),
                            TenCauHinh = reader.GetString(1),
                            TongGia = reader.GetDecimal(2),
                            CongSuatDinhMucW = reader.GetInt32(3),
                            PhanTramDuPhongNguon = reader.GetDecimal(4),
                            TuongThich = reader.GetBoolean(5),
                            ChiTietLinhKienJson = reader.IsDBNull(6) ? "" : reader.GetString(6),
                            NgayTao = reader.GetDateTime(7)
                        });
                    }
                }
            }
            return list;
        }

        #endregion
    }
}
