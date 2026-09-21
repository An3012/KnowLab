using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace KnowLab.Engines
{
    public class ScenarioEntity
    {
        public int Id { get; set; }
        public string DomainId { get; set; }
        public string Title { get; set; }
        public string Goal { get; set; }
        public string PayloadJson { get; set; }
        public string EngineVersion { get; set; }
        public string DataVersion { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class DecisionJournalEntity
    {
        public int Id { get; set; }
        public string Goal { get; set; }
        public string Assumptions { get; set; }
        public string Decision { get; set; }
        public DateTime CreatedAt { get; set; }
    }

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

        public static int SaveScenario(string domainId, string title, string goal, string payloadJson, string engineVersion = "1.0.0", string dataVersion = "2026-01")
        {
            if (string.IsNullOrWhiteSpace(domainId)) throw new ArgumentNullException(nameof(domainId));
            if (string.IsNullOrWhiteSpace(title)) throw new ArgumentNullException(nameof(title));
            if (string.IsNullOrWhiteSpace(payloadJson)) throw new ArgumentNullException(nameof(payloadJson));

            const string sql = @"
                INSERT INTO Scenarios (DomainId, Title, Goal, PayloadJson, EngineVersion, DataVersion, CreatedAt, UpdatedAt)
                OUTPUT INSERTED.Id
                VALUES (@DomainId, @Title, @Goal, @PayloadJson, @EngineVersion, @DataVersion, GETDATE(), GETDATE());";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@DomainId", SqlDbType.NVarChar, 50).Value = domainId;
                cmd.Parameters.Add("@Title", SqlDbType.NVarChar, 255).Value = title;
                cmd.Parameters.Add("@Goal", SqlDbType.NVarChar, 500).Value = (object)goal ?? DBNull.Value;
                cmd.Parameters.Add("@PayloadJson", SqlDbType.NVarChar, -1).Value = payloadJson;
                cmd.Parameters.Add("@EngineVersion", SqlDbType.NVarChar, 50).Value = engineVersion ?? "1.0.0";
                cmd.Parameters.Add("@DataVersion", SqlDbType.NVarChar, 50).Value = dataVersion ?? "2026-01";

                conn.Open();
                var result = cmd.ExecuteScalar();
                return Convert.ToInt32(result);
            }
        }

        public static List<ScenarioEntity> GetScenarios(string domainId = null)
        {
            var list = new List<ScenarioEntity>();
            string sql = "SELECT Id, DomainId, Title, Goal, PayloadJson, EngineVersion, DataVersion, CreatedAt FROM Scenarios";
            if (!string.IsNullOrWhiteSpace(domainId))
            {
                sql += " WHERE DomainId = @DomainId";
            }
            sql += " ORDER BY CreatedAt DESC";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                if (!string.IsNullOrWhiteSpace(domainId))
                {
                    cmd.Parameters.Add("@DomainId", SqlDbType.NVarChar, 50).Value = domainId;
                }

                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new ScenarioEntity
                        {
                            Id = reader.GetInt32(0),
                            DomainId = reader.GetString(1),
                            Title = reader.GetString(2),
                            Goal = reader.IsDBNull(3) ? "" : reader.GetString(3),
                            PayloadJson = reader.GetString(4),
                            EngineVersion = reader.IsDBNull(5) ? "1.0.0" : reader.GetString(5),
                            DataVersion = reader.IsDBNull(6) ? "2026-01" : reader.GetString(6),
                            CreatedAt = reader.GetDateTime(7)
                        });
                    }
                }
            }
            return list;
        }

        public static int SaveDecisionJournal(string goal, string assumptions, string decision)
        {
            if (string.IsNullOrWhiteSpace(goal)) throw new ArgumentNullException(nameof(goal));
            if (string.IsNullOrWhiteSpace(decision)) throw new ArgumentNullException(nameof(decision));

            const string sql = @"
                INSERT INTO DecisionJournals (Goal, Assumptions, Decision, CreatedAt)
                OUTPUT INSERTED.Id
                VALUES (@Goal, @Assumptions, @Decision, GETDATE());";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.Add("@Goal", SqlDbType.NVarChar, 500).Value = goal;
                cmd.Parameters.Add("@Assumptions", SqlDbType.NVarChar, -1).Value = (object)assumptions ?? DBNull.Value;
                cmd.Parameters.Add("@Decision", SqlDbType.NVarChar, -1).Value = decision;

                conn.Open();
                var result = cmd.ExecuteScalar();
                return Convert.ToInt32(result);
            }
        }

        public static List<DecisionJournalEntity> GetDecisionJournals()
        {
            var list = new List<DecisionJournalEntity>();
            const string sql = "SELECT Id, Goal, Assumptions, Decision, CreatedAt FROM DecisionJournals ORDER BY CreatedAt DESC";

            using (var conn = new SqlConnection(GetConnectionString()))
            using (var cmd = new SqlCommand(sql, conn))
            {
                conn.Open();
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new DecisionJournalEntity
                        {
                            Id = reader.GetInt32(0),
                            Goal = reader.GetString(1),
                            Assumptions = reader.IsDBNull(2) ? "" : reader.GetString(2),
                            Decision = reader.GetString(3),
                            CreatedAt = reader.GetDateTime(4)
                        });
                    }
                }
            }
            return list;
        }
    }
}
