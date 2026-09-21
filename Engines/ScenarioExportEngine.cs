﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web.Script.Serialization;

namespace KnowLab.Engines
{
    #region Export Models

    public class ExportMetadataModel
    {
        public string ExportId { get; set; }
        public string ExportedAt { get; set; } // ISO 8601 UTC
        public string ExportFormat { get; set; } // JSON or PDF
        public string DataVersion { get; set; }
        public string EngineVersion { get; set; }

        public ExportMetadataModel()
        {
            ExportId = "exp-" + Guid.NewGuid().ToString("N").Substring(0, 8);
            ExportedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");
            DataVersion = "2026-01";
            EngineVersion = "1.0.0";
        }
    }

    public class DomainExportItem
    {
        public string Label { get; set; }
        public object ValueRaw { get; set; }
        public string ValueFormatted { get; set; }
        public string Unit { get; set; }
        public string Classification { get; set; } // Fact, User Input, Assumption, Estimate, Derived Result

        public DomainExportItem() { }

        public DomainExportItem(string label, object raw, string formatted, string unit, string classification)
        {
            Label = label;
            ValueRaw = raw;
            ValueFormatted = formatted;
            Unit = unit;
            Classification = classification;
        }
    }

    public class DomainExportGroup
    {
        public string DomainId { get; set; }
        public string DomainName { get; set; }
        public List<DomainExportItem> Inputs { get; set; }
        public List<DomainExportItem> Outputs { get; set; }

        public DomainExportGroup()
        {
            Inputs = new List<DomainExportItem>();
            Outputs = new List<DomainExportItem>();
        }
    }

    public class ScenarioExportModel
    {
        public ExportMetadataModel Metadata { get; set; }
        public ScenarioModel ScenarioInfo { get; set; }
        public Dictionary<string, object> FinancialHealthSummary { get; set; }
        public List<DomainExportGroup> DomainGroups { get; set; }
        public List<string> DependencyTree { get; set; }
        public List<string> Assumptions { get; set; }
        public List<string> Constraints { get; set; }
        public ScenarioDiffModel ScenarioDiff { get; set; }

        public ScenarioExportModel()
        {
            Metadata = new ExportMetadataModel();
            FinancialHealthSummary = new Dictionary<string, object>();
            DomainGroups = new List<DomainExportGroup>();
            DependencyTree = new List<string>();
            Assumptions = new List<string>();
            Constraints = new List<string>();
        }
    }

    #endregion

    public static class ScenarioExportEngine
    {
        public static ScenarioExportModel BuildExportModel(ScenarioModel scenario, ScenarioDiffModel diff = null)
        {
            ScenarioExportModel export = new ScenarioExportModel();
            export.ScenarioInfo = scenario ?? new ScenarioModel { Name = "Cross-Domain Scenario Simulation", DomainId = "life-simulator" };
            export.ScenarioDiff = diff;

            // Default Life Simulator Input setup for export audit
            var simInput = new LifeSimulatorInput
            {
                MonthlyIncome = 45000000,
                HousePrice = 2500000000,
                HouseDownPercent = 30,
                LoanInterestRate = 9.5,
                LoanTermYears = 20,
                VehicleType = "Car",
                VehiclePrice = 600000000,
                AnnualKm = 15000,
                PcBudget = 25000000,
                HomeRenovationBudget = 100000000
            };

            var simResult = CrossDomainEngine.CalculateLifeSimulation(simInput);

            // Summary
            export.FinancialHealthSummary["HealthScore"] = simResult.FinancialHealthScore;
            export.FinancialHealthSummary["StatusMessage"] = simResult.StatusMessage;
            export.FinancialHealthSummary["TotalMonthlyCommitment"] = simResult.TotalMonthlyCommitment;
            export.FinancialHealthSummary["CrossDomainDTI"] = simResult.CrossDomainDTI;
            export.FinancialHealthSummary["RemainingDiscretionaryIncome"] = simResult.RemainingDiscretionaryIncome;

            // Group 1: Real Estate Domain
            var reGroup = new DomainExportGroup { DomainId = "real-estate", DomainName = "Bất Động Sản (Housing)" };
            reGroup.Inputs.Add(new DomainExportItem("Giá trị bất động sản", simInput.HousePrice, simInput.HousePrice.ToString("N0") + " VNĐ", "VND", "User Input"));
            reGroup.Inputs.Add(new DomainExportItem("% Trả trước", simInput.HouseDownPercent, simInput.HouseDownPercent + "%", "%", "User Input"));
            reGroup.Inputs.Add(new DomainExportItem("Lãi suất vay cố định giả định", simInput.LoanInterestRate, simInput.LoanInterestRate + "%/năm", "%/year", "Assumption"));
            reGroup.Outputs.Add(new DomainExportItem("Gốc lãi hàng tháng (Annuity)", simResult.MonthlyHousingCost, simResult.MonthlyHousingCost.ToString("N0") + " VNĐ/tháng", "VND/month", "Derived Result"));
            export.DomainGroups.Add(reGroup);

            // Group 2: Vehicles Domain
            var carGroup = new DomainExportGroup { DomainId = "cars", DomainName = "Phương Tiện Đi Lại (Transportation)" };
            carGroup.Inputs.Add(new DomainExportItem("Loại phương tiện", simInput.VehicleType, simInput.VehicleType, "text", "User Input"));
            carGroup.Inputs.Add(new DomainExportItem("Giá xe mua ban đầu", simInput.VehiclePrice, simInput.VehiclePrice.ToString("N0") + " VNĐ", "VND", "User Input"));
            carGroup.Outputs.Add(new DomainExportItem("Chi phí vận hành & TCO hàng tháng", simResult.MonthlyVehicleCost, simResult.MonthlyVehicleCost.ToString("N0") + " VNĐ/tháng", "VND/month", "Derived Result"));
            export.DomainGroups.Add(carGroup);

            // Group 3: PC & Home Domains
            var pcHomeGroup = new DomainExportGroup { DomainId = "pc-home", DomainName = "Build PC & Ngân Sách Sửa Nhà" };
            pcHomeGroup.Inputs.Add(new DomainExportItem("Ngân sách Build PC", simInput.PcBudget, simInput.PcBudget.ToString("N0") + " VNĐ", "VND", "User Input"));
            pcHomeGroup.Inputs.Add(new DomainExportItem("Ngân sách sửa nhà", simInput.HomeRenovationBudget, simInput.HomeRenovationBudget.ToString("N0") + " VNĐ", "VND", "User Input"));
            pcHomeGroup.Outputs.Add(new DomainExportItem("Trích lập khấu hao PC hàng tháng (36 tháng)", simResult.MonthlyPcReserve, simResult.MonthlyPcReserve.ToString("N0") + " VNĐ/tháng", "VND/month", "Derived Result"));
            pcHomeGroup.Outputs.Add(new DomainExportItem("Trích lập ngân sách sửa nhà (60 tháng)", simResult.MonthlyHomeReserve, simResult.MonthlyHomeReserve.ToString("N0") + " VNĐ/tháng", "VND/month", "Derived Result"));
            export.DomainGroups.Add(pcHomeGroup);

            // Dependency tree & assumptions
            export.DependencyTree = simResult.DependencyChain;
            export.Assumptions = simResult.Assumptions;
            export.Constraints = simResult.Limitations;

            return export;
        }

        public static string ExportToJson(ScenarioExportModel exportModel)
        {
            exportModel.Metadata.ExportFormat = "JSON";
            JavaScriptSerializer js = new JavaScriptSerializer();
            return js.Serialize(exportModel);
        }

        public static byte[] ExportToPdfBytes(ScenarioExportModel exportModel)
        {
            exportModel.Metadata.ExportFormat = "PDF";
            
            // Build valid binary PDF 1.4 Document Stream
            StringBuilder pdfStream = new StringBuilder();
            
            string scenarioName = exportModel.ScenarioInfo != null ? exportModel.ScenarioInfo.Name : "Cross-Domain Scenario";
            string statusMsg = exportModel.FinancialHealthSummary.ContainsKey("StatusMessage") ? exportModel.FinancialHealthSummary["StatusMessage"].ToString() : "Audit OK";
            double commitment = exportModel.FinancialHealthSummary.ContainsKey("TotalMonthlyCommitment") ? Convert.ToDouble(exportModel.FinancialHealthSummary["TotalMonthlyCommitment"]) : 0;
            double dti = exportModel.FinancialHealthSummary.ContainsKey("CrossDomainDTI") ? Convert.ToDouble(exportModel.FinancialHealthSummary["CrossDomainDTI"]) : 0;
            double remaining = exportModel.FinancialHealthSummary.ContainsKey("RemainingDiscretionaryIncome") ? Convert.ToDouble(exportModel.FinancialHealthSummary["RemainingDiscretionaryIncome"]) : 0;

            StringBuilder contentBuilder = new StringBuilder();
            contentBuilder.AppendLine("BT");
            contentBuilder.AppendLine("/F1 16 Tf");
            contentBuilder.AppendLine("40 780 Td");
            contentBuilder.AppendLine("(KNOWLAB CROSS-DOMAIN SCENARIO AUDIT REPORT) Tj");
            contentBuilder.AppendLine("/F1 11 Tf");
            contentBuilder.AppendLine("0 -25 Td");
            contentBuilder.AppendLine($" (Export ID: {exportModel.Metadata.ExportId} | DataVersion: {exportModel.Metadata.DataVersion} | EngineVersion: {exportModel.Metadata.EngineVersion}) Tj");
            contentBuilder.AppendLine("0 -20 Td");
            contentBuilder.AppendLine($" (Scenario Name: {SanitizePdfText(scenarioName)}) Tj");
            contentBuilder.AppendLine("0 -20 Td");
            contentBuilder.AppendLine($" (Exported At: {exportModel.Metadata.ExportedAt}) Tj");
            contentBuilder.AppendLine("0 -30 Td");
            contentBuilder.AppendLine("/F1 13 Tf");
            contentBuilder.AppendLine(" (1. FINANCIAL HEALTH SUMMARY) Tj");
            contentBuilder.AppendLine("/F1 10 Tf");
            contentBuilder.AppendLine("0 -20 Td");
            contentBuilder.AppendLine($" (Total Monthly Commitment: {commitment:N0} VND/month) Tj");
            contentBuilder.AppendLine("0 -15 Td");
            contentBuilder.AppendLine($" (Cross-Domain DTI: {dti}% | Remaining Cash Flow: {remaining:N0} VND/month) Tj");
            contentBuilder.AppendLine("0 -15 Td");
            contentBuilder.AppendLine($" (Status: {SanitizePdfText(statusMsg)}) Tj");
            contentBuilder.AppendLine("0 -30 Td");
            contentBuilder.AppendLine("/F1 13 Tf");
            contentBuilder.AppendLine(" (2. DOMAIN INPUTS & DERIVED OUTPUTS) Tj");
            contentBuilder.AppendLine("/F1 10 Tf");

            int yOffset = -20;
            foreach (var grp in exportModel.DomainGroups)
            {
                contentBuilder.AppendLine($"0 {yOffset} Td");
                contentBuilder.AppendLine($" ([Domain: {SanitizePdfText(grp.DomainName)}]) Tj");
                yOffset = -15;

                foreach (var inputItem in grp.Inputs)
                {
                    contentBuilder.AppendLine($"0 {yOffset} Td");
                    contentBuilder.AppendLine($" (  - [Input] {SanitizePdfText(inputItem.Label)}: {SanitizePdfText(inputItem.ValueFormatted)} | Tag: {inputItem.Classification}) Tj");
                    yOffset = -14;
                }
                foreach (var outItem in grp.Outputs)
                {
                    contentBuilder.AppendLine($"0 {yOffset} Td");
                    contentBuilder.AppendLine($" (  - [Output] {SanitizePdfText(outItem.Label)}: {SanitizePdfText(outItem.ValueFormatted)} | Tag: {outItem.Classification}) Tj");
                    yOffset = -14;
                }
            }

            contentBuilder.AppendLine("0 -25 Td");
            contentBuilder.AppendLine("/F1 13 Tf");
            contentBuilder.AppendLine(" (3. AUDIT & EXPLAINABILITY ASSUMPTIONS) Tj");
            contentBuilder.AppendLine("/F1 10 Tf");
            foreach (var asm in exportModel.Assumptions)
            {
                contentBuilder.AppendLine("0 -15 Td");
                contentBuilder.AppendLine($" (  * {SanitizePdfText(asm)}) Tj");
            }

            contentBuilder.AppendLine("ET");

            string textContent = contentBuilder.ToString();
            byte[] textBytes = Encoding.ASCII.GetBytes(textContent);

            // Construct PDF binary catalog structure
            MemoryStream ms = new MemoryStream();
            StreamWriter writer = new StreamWriter(ms, Encoding.ASCII);

            writer.WriteLine("%PDF-1.4");
            writer.Flush();
            long offset1 = ms.Position;
            writer.WriteLine("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj");
            writer.Flush();
            long offset2 = ms.Position;
            writer.WriteLine("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj");
            writer.Flush();
            long offset3 = ms.Position;
            writer.WriteLine("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj");
            writer.Flush();
            long offset4 = ms.Position;
            writer.WriteLine("4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj");
            writer.Flush();
            long offset5 = ms.Position;
            writer.WriteLine($"5 0 obj\n<< /Length {textBytes.Length} >>\nstream");
            writer.Flush();
            ms.Write(textBytes, 0, textBytes.Length);
            writer.WriteLine("\nendstream\nendobj");
            writer.Flush();

            long xrefOffset = ms.Position;
            writer.WriteLine("xref");
            writer.WriteLine("0 6");
            writer.WriteLine("0000000000 65535 f ");
            writer.WriteLine($"{offset1:D10} 00000 n ");
            writer.WriteLine($"{offset2:D10} 00000 n ");
            writer.WriteLine($"{offset3:D10} 00000 n ");
            writer.WriteLine($"{offset4:D10} 00000 n ");
            writer.WriteLine($"{offset5:D10} 00000 n ");
            writer.WriteLine("trailer");
            writer.WriteLine("<< /Size 6 /Root 1 0 R >>");
            writer.WriteLine("startxref");
            writer.WriteLine(xrefOffset);
            writer.WriteLine("%%EOF");
            writer.Flush();

            return ms.ToArray();
        }

        public static string ExportToPrintableHtml(ScenarioExportModel exportModel)
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<!DOCTYPE html><html lang='vi'><head><meta charset='utf-8'><title>KnowLab Audit Report - " + exportModel.ScenarioInfo.Name + "</title>");
            sb.AppendLine("<style>");
            sb.AppendLine("body { font-family: 'Segoe UI', Arial, sans-serif; margin: 30px; background: #0d0d1a; color: #f0f0ff; }");
            sb.AppendLine(".report-card { background: #16162a; border: 1px solid #333; border-radius: 12px; padding: 24px; margin-bottom: 24px; }");
            sb.AppendLine(".tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; }");
            sb.AppendLine(".tag-fact { background: #10b981; color: #fff; }");
            sb.AppendLine(".tag-user { background: #3b82f6; color: #fff; }");
            sb.AppendLine(".tag-assumption { background: #f59e0b; color: #fff; }");
            sb.AppendLine(".tag-derived { background: #8b5cf6; color: #fff; }");
            sb.AppendLine("@media print { body { background: #fff; color: #000; } .report-card { background: #fff; border: 1px solid #ccc; } }");
            sb.AppendLine("</style></head><body>");

            sb.AppendLine("<div class='report-card'>");
            sb.AppendLine("<h2>KNOWLAB CROSS-DOMAIN SCENARIO AUDIT REPORT</h2>");
            sb.AppendLine("<p><strong>Export ID:</strong> " + exportModel.Metadata.ExportId + " | <strong>DataVersion:</strong> " + exportModel.Metadata.DataVersion + " | <strong>EngineVersion:</strong> " + exportModel.Metadata.EngineVersion + "</p>");
            sb.AppendLine("<p><strong>Tên Kịch Bản:</strong> " + exportModel.ScenarioInfo.Name + " | <strong>Thời gian xuất:</strong> " + exportModel.Metadata.ExportedAt + "</p>");
            sb.AppendLine("</div>");

            sb.AppendLine("<div class='report-card'>");
            sb.AppendLine("<h3>1. TÓM TẮT SỨC KHỎE TÀI CHÍNH CROSS-DOMAIN</h3>");
            sb.AppendLine("<p><strong>Điểm Sức Khỏe:</strong> " + exportModel.FinancialHealthSummary["HealthScore"] + "/100</p>");
            sb.AppendLine("<p><strong>Tổng Cam Kết Chi Trả:</strong> " + Convert.ToDouble(exportModel.FinancialHealthSummary["TotalMonthlyCommitment"]).ToString("N0") + " VNĐ/tháng</p>");
            sb.AppendLine("<p><strong>Tỷ Lệ DTI:</strong> " + exportModel.FinancialHealthSummary["CrossDomainDTI"] + "%</p>");
            sb.AppendLine("<p><strong>Dòng Tiền Dư Sinh Hoạt:</strong> " + Convert.ToDouble(exportModel.FinancialHealthSummary["RemainingDiscretionaryIncome"]).ToString("N0") + " VNĐ/tháng</p>");
            sb.AppendLine("<p><strong>Trạng Thái:</strong> " + exportModel.FinancialHealthSummary["StatusMessage"] + "</p>");
            sb.AppendLine("</div>");

            foreach (var grp in exportModel.DomainGroups)
            {
                sb.AppendLine("<div class='report-card'>");
                sb.AppendLine("<h3>" + grp.DomainName + "</h3>");
                sb.AppendLine("<h4>Đầu Vào (Inputs)</h4><ul>");
                foreach (var inp in grp.Inputs)
                {
                    sb.AppendLine("<li><strong>" + inp.Label + ":</strong> " + inp.ValueFormatted + " <span class='tag tag-user'>" + inp.Classification + "</span></li>");
                }
                sb.AppendLine("</ul><h4>Kết Quả Suy Ra (Derived Outputs)</h4><ul>");
                foreach (var outp in grp.Outputs)
                {
                    sb.AppendLine("<li><strong>" + outp.Label + ":</strong> " + outp.ValueFormatted + " <span class='tag tag-derived'>" + outp.Classification + "</span></li>");
                }
                sb.AppendLine("</ul></div>");
            }

            sb.AppendLine("</body></html>");
            return sb.ToString();
        }

        private static string SanitizePdfText(string input)
        {
            if (string.IsNullOrEmpty(input)) return "";
            // Replace non-ASCII / Vietnamese characters with clean ASCII representation for standard Helvetica PDF stream
            return input
                .Replace("á", "a").Replace("à", "a").Replace("ả", "a").Replace("ã", "a").Replace("ạ", "a")
                .Replace("ă", "a").Replace("ắ", "a").Replace("ằ", "a").Replace("ẳ", "a").Replace("ẵ", "a").Replace("ặ", "a")
                .Replace("â", "a").Replace("ấ", "a").Replace("ầ", "a").Replace("ẩ", "a").Replace("ẫ", "a").Replace("ậ", "a")
                .Replace("đ", "d").Replace("Đ", "D")
                .Replace("é", "e").Replace("è", "e").Replace("ẻ", "e").Replace("ẽ", "e").Replace("ẹ", "e")
                .Replace("ê", "e").Replace("ế", "e").Replace("ề", "e").Replace("ể", "e").Replace("ễ", "e").Replace("ệ", "e")
                .Replace("í", "i").Replace("ì", "i").Replace("ỉ", "i").Replace("ĩ", "i").Replace("ị", "i")
                .Replace("ó", "o").Replace("ò", "o").Replace("ỏ", "o").Replace("õ", "o").Replace("ọ", "o")
                .Replace("ô", "o").Replace("ố", "o").Replace("ồ", "o").Replace("ổ", "o").Replace("ỗ", "o").Replace("ộ", "o")
                .Replace("ơ", "o").Replace("ớ", "o").Replace("ờ", "o").Replace("ở", "o").Replace("ỡ", "o").Replace("ợ", "o")
                .Replace("ú", "u").Replace("ù", "u").Replace("ủ", "u").Replace("ũ", "u").Replace("ụ", "u")
                .Replace("ư", "u").Replace("ứ", "u").Replace("ừ", "u").Replace("ử", "u").Replace("ữ", "u").Replace("ự", "u")
                .Replace("ý", "y").Replace("ỳ", "y").Replace("ỷ", "y").Replace("ỹ", "y").Replace("ỵ", "y")
                .Replace("(", "[").Replace(")", "]");
        }
    }
}
