﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace KnowLab.Engines
{
    public class ScenarioModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string DomainId { get; set; }
        public string EngineVersion { get; set; }
        public string DataVersion { get; set; }
        public string SummaryResults { get; set; }
        public string InputsJson { get; set; }
        public string OutputsJson { get; set; }
        public string UserNotes { get; set; }
        public DateTime CreatedAt { get; set; }

        public ScenarioModel()
        {
            Id = Guid.NewGuid().ToString();
            EngineVersion = "1.0.0";
            DataVersion = "2026-01";
            CreatedAt = DateTime.Now;
        }
    }

    public class DecisionJournalModel
    {
        public string Id { get; set; }
        public string Goal { get; set; }
        public string Options { get; set; }
        public string ImportantFactors { get; set; }
        public string Assumptions { get; set; }
        public string Decision { get; set; }
        public string ExpectedResult { get; set; }
        public string ActualResult { get; set; }
        public string Reflection { get; set; }
        public DateTime CreatedAt { get; set; }

        public DecisionJournalModel()
        {
            Id = Guid.NewGuid().ToString();
            CreatedAt = DateTime.Now;
        }
    }

    public class ScenarioDiffModel
    {
        public ScenarioModel ScenarioA { get; set; }
        public ScenarioModel ScenarioB { get; set; }
        public List<string> KeyDifferences { get; set; }
        public string RecommendationSummary { get; set; }

        public ScenarioDiffModel()
        {
            KeyDifferences = new List<string>();
        }
    }

    public static class ScenarioEngine
    {
        private static readonly List<ScenarioModel> _scenarios = new List<ScenarioModel>();
        private static readonly List<DecisionJournalModel> _journals = new List<DecisionJournalModel>();

        static ScenarioEngine()
        {
            _scenarios.Add(new ScenarioModel {
                Id = "scen-default-01",
                Name = "Căn Hộ BĐS 2.5 Tỷ (Vay 70% 20 Năm)",
                DomainId = "real-estate",
                SummaryResults = "Trả gốc lãi: 15,310,480 VNĐ/tháng | DTI: 43.7%",
                UserNotes = "Phương án ưu tiên nếu thu nhập tăng thêm 5 triệu/tháng."
            });
            _scenarios.Add(new ScenarioModel {
                Id = "scen-default-02",
                Name = "Build PC i5-13600K + RTX 4070 (Nguồn 750W)",
                DomainId = "pc-building",
                SummaryResults = "Peak Watts: 455 W | Nguồn đề xuất: 650 W | Headroom: 39%",
                UserNotes = "Dùng tản nhiệt khí kép Dual Tower để giữ nhiệt độ dưới 75 độ."
            });
            _scenarios.Add(new ScenarioModel {
                Id = "scen-cross-01",
                Name = "Cross-Domain Setup (BĐS + Ô Tô + PC + Sửa Nhà)",
                DomainId = "life-simulator",
                SummaryResults = "Tổng cam kết: 23,800,000 VNĐ/tháng | DTI: 52.9% | Điểm sức khỏe: 35/100",
                UserNotes = "Cần cắt giảm chi phí mua xe ô tô sang xe máy để đưa DTI về dưới 40%."
            });

            _journals.Add(new DecisionJournalModel {
                Id = "j-default-01",
                Goal = "Quyết định mua nhà 2.5 tỷ hay tiếp tục thuê nhà 3 năm tới",
                Options = "Phương án 1: Vay 70% mua nhà ngay. Phương án 2: Thuê nhà 2 năm tích vốn 40%.",
                ImportantFactors = "Lãi suất thả nổi ngân hàng, dòng tiền thu nhập ròng ổn định.",
                Assumptions = "Lãi suất thả nổi 10.5%/năm, giá nhà tăng 5%/năm.",
                Decision = "Thuê nhà thêm 2 năm để tích lũy đủ 40% vốn tự có trước khi vay mua.",
                ExpectedResult = "Tích lũy đủ 1 tỷ tiền mặt, giảm nợ gốc vay còn 1.5 tỷ.",
                ActualResult = "Đã tích lũy đúng tiến độ 420 triệu sau năm đầu tiên.",
                Reflection = "Quyết định đúng đắn giúp tâm lý thoải mái không bị áp lực nợ nần đè nặng."
            });
        }

        public static List<ScenarioModel> GetScenarios(string domainId = null)
        {
            if (string.IsNullOrEmpty(domainId)) return _scenarios;
            return _scenarios.Where(s => s.DomainId.Equals(domainId, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        public static ScenarioModel GetScenarioById(string id)
        {
            return _scenarios.FirstOrDefault(s => s.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        }

        public static void AddScenario(ScenarioModel model)
        {
            _scenarios.Insert(0, model);
        }

        public static bool DeleteScenario(string id)
        {
            var item = GetScenarioById(id);
            if (item != null)
            {
                _scenarios.Remove(item);
                return true;
            }
            return false;
        }

        public static List<DecisionJournalModel> GetJournals()
        {
            return _journals;
        }

        public static void AddJournal(DecisionJournalModel model)
        {
            _journals.Insert(0, model);
        }

        public static ScenarioDiffModel CompareScenarios(string idA, string idB)
        {
            var a = GetScenarioById(idA);
            var b = GetScenarioById(idB);
            ScenarioDiffModel diff = new ScenarioDiffModel();
            diff.ScenarioA = a;
            diff.ScenarioB = b;

            if (a != null && b != null)
            {
                diff.KeyDifferences.Add($"Kịch Bản A [{a.Name}]: {a.SummaryResults}");
                diff.KeyDifferences.Add($"Kịch Bản B [{b.Name}]: {b.SummaryResults}");
                if (a.DomainId != b.DomainId)
                {
                    diff.KeyDifferences.Add($"Chênh lệch Domain: Kịch bản A thuộc [{a.DomainId}] trong khi B thuộc [{b.DomainId}].");
                }
                diff.RecommendationSummary = "Đánh giá sự chênh lệch chi phí và rủi ro nợ hàng tháng trước khi chốt quyết định.";
            }
            return diff;
        }
    }
}
