using System;
using System.Collections.Generic;
using System.Linq;

namespace KnowLab.Engines
{
    public class PCBuildConfiguration
    {
        public string CpuId { get; set; }
        public string CpuName { get; set; }
        public string CpuSocket { get; set; }
        public int CpuTdpWatts { get; set; }
        public int CpuPeakTdpWatts { get; set; }

        public string MotherboardId { get; set; }
        public string MotherboardName { get; set; }
        public string MotherboardSocket { get; set; }
        public string MotherboardFormFactor { get; set; } // ATX, Micro-ATX, Mini-ITX
        public string MotherboardRamType { get; set; } // DDR4, DDR5
        public int MotherboardRamSlots { get; set; }

        public string RamId { get; set; }
        public string RamName { get; set; }
        public string RamGeneration { get; set; } // DDR4, DDR5
        public int RamModules { get; set; }

        public string GpuId { get; set; }
        public string GpuName { get; set; }
        public int GpuTdpWatts { get; set; }
        public int GpuLengthMm { get; set; }
        public bool GpuRequires12Vhpwr { get; set; }
        public int GpuPcie8PinCount { get; set; }

        public string CaseId { get; set; }
        public string CaseName { get; set; }
        public List<string> CaseSupportedFormFactors { get; set; }
        public int CaseMaxGpuLengthMm { get; set; }
        public int CaseMaxCoolerHeightMm { get; set; }
        public List<int> CaseSupportedRadiatorSizesMm { get; set; }

        public string CoolerId { get; set; }
        public string CoolerName { get; set; }
        public string CoolerType { get; set; } // Air Cooler, AIO Liquid Cooler
        public int CoolerHeightMm { get; set; }
        public int CoolerRadiatorSizeMm { get; set; }
        public List<string> CoolerSupportedSockets { get; set; }

        public string PsuId { get; set; }
        public string PsuName { get; set; }
        public int PsuWattageWatts { get; set; }
        public bool PsuHas12Vhpwr { get; set; }
        public int PsuPcie8PinCount { get; set; }

        public PCBuildConfiguration()
        {
            CaseSupportedFormFactors = new List<string>();
            CaseSupportedRadiatorSizesMm = new List<int>();
            CoolerSupportedSockets = new List<string>();
        }
    }

    public class CompatibilityIssue
    {
        public string Severity { get; set; } // error, warning, info
        public string IssueType { get; set; }
        public string Component { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Explanation { get; set; }
        public string Recommendation { get; set; }
    }

    public class CompatibilityReport
    {
        public bool IsCompatible { get; set; }
        public string Status { get; set; } // COMPATIBLE, WARNING, INCOMPATIBLE
        public string StatusSummary { get; set; }
        public List<CompatibilityIssue> Issues { get; set; }
        public int TotalPeakWatts { get; set; }
        public int RecommendedPsuWatts { get; set; }
        public int PsuHeadroomPercent { get; set; }

        public CompatibilityReport()
        {
            Issues = new List<CompatibilityIssue>();
        }
    }

    public static class CompatibilityEngine
    {
        public static CompatibilityReport Check(PCBuildConfiguration build)
        {
            var report = new CompatibilityReport();

            // 1. CPU & Motherboard Socket
            if (!string.IsNullOrEmpty(build.CpuSocket) && !string.IsNullOrEmpty(build.MotherboardSocket))
            {
                if (!build.CpuSocket.Equals(build.MotherboardSocket, StringComparison.OrdinalIgnoreCase))
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "SOCKET_MISMATCH",
                        Component = "CPU / Motherboard",
                        Title = "Xung đột chân cắm (Socket Mismatch)",
                        Message = $"CPU {build.CpuName} ({build.CpuSocket}) không khớp với bo mạch chủ {build.MotherboardName} ({build.MotherboardSocket}).",
                        Explanation = "Chân cắm vật lý hoàn toàn khác nhau. Không thể lắp đặt.",
                        Recommendation = $"Chọn bo mạch chủ socket {build.CpuSocket} hoặc đổi CPU socket {build.MotherboardSocket}."
                    });
                }
            }

            // 2. RAM DDR Generation
            if (!string.IsNullOrEmpty(build.RamGeneration) && !string.IsNullOrEmpty(build.MotherboardRamType))
            {
                if (!build.RamGeneration.Equals(build.MotherboardRamType, StringComparison.OrdinalIgnoreCase))
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "RAM_GENERATION_MISMATCH",
                        Component = "RAM / Motherboard",
                        Title = "Xung đột thế hệ RAM (DDR Generation Mismatch)",
                        Message = $"RAM {build.RamName} ({build.RamGeneration}) không cắm vừa bo mạch chủ {build.MotherboardName} (chỉ hỗ trợ {build.MotherboardRamType}).",
                        Explanation = "Rãnh khuyết chân cắm và điện áp khác nhau giữa các thế hệ DDR.",
                        Recommendation = $"Chọn kit RAM {build.MotherboardRamType} hoặc đổi bo mạch chủ."
                    });
                }

                if (build.RamModules > build.MotherboardRamSlots && build.MotherboardRamSlots > 0)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "RAM_SLOTS_EXCEEDED",
                        Component = "RAM / Motherboard",
                        Title = "Vượt quá số khe cắm RAM",
                        Message = $"Bộ RAM có {build.RamModules} thanh, nhưng bo mạch chủ chỉ có {build.MotherboardRamSlots} khe cắm.",
                        Explanation = "Không đủ khe cắm vật lý để gắn toàn bộ RAM.",
                        Recommendation = "Chọn kit RAM ít thanh hơn hoặc đổi bo mạch chủ 4 khe."
                    });
                }
            }

            // 3. Motherboard Form Factor vs Case
            if (!string.IsNullOrEmpty(build.MotherboardFormFactor) && build.CaseSupportedFormFactors != null && build.CaseSupportedFormFactors.Count > 0)
            {
                bool supported = build.CaseSupportedFormFactors.Any(f => f.Equals(build.MotherboardFormFactor, StringComparison.OrdinalIgnoreCase));
                if (!supported)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "FORM_FACTOR_MISMATCH",
                        Component = "Motherboard / Case",
                        Title = "Kích thước bo mạch chủ không vừa vỏ Case",
                        Message = $"Bo mạch chủ {build.MotherboardFormFactor} không vừa case {build.CaseName} (hỗ trợ: {string.Join(", ", build.CaseSupportedFormFactors)}).",
                        Explanation = "Không đủ khoảng trống và vị trí ốc cố định trong case.",
                        Recommendation = "Chọn vỏ case chuẩn ATX/Mid-Tower hoặc đổi bo mạch chủ nhỏ hơn."
                    });
                }
            }

            // 4. GPU Length Clearance
            if (build.GpuLengthMm > 0 && build.CaseMaxGpuLengthMm > 0)
            {
                if (build.GpuLengthMm > build.CaseMaxGpuLengthMm)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "GPU_CLEARANCE_EXCEEDED",
                        Component = "GPU / Case",
                        Title = "Card đồ họa vượt quá chiều dài cho phép của Case (Clearance)",
                        Message = $"GPU dài {build.GpuLengthMm}mm, nhưng case {build.CaseName} chỉ cho phép tối đa {build.CaseMaxGpuLengthMm}mm.",
                        Explanation = "Card đồ họa sẽ bị cấn vào quạt trước hoặc thành thùng máy.",
                        Recommendation = "Chọn vỏ case rộng hơn hoặc card đồ họa ngắn hơn."
                    });
                }
                else if (build.CaseMaxGpuLengthMm - build.GpuLengthMm < 15)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "warning",
                        IssueType = "GPU_CLEARANCE_TIGHT",
                        Component = "GPU / Case",
                        Title = "Khoảng trống lắp Card đồ họa rất sát",
                        Message = $"GPU dài {build.GpuLengthMm}mm, case tối đa {build.CaseMaxGpuLengthMm}mm (còn dư {build.CaseMaxGpuLengthMm - build.GpuLengthMm}mm).",
                        Explanation = "Khoảng cách hẹp có thể gây khó luồn dây nguồn hoặc lắp tản nước phía trước.",
                        Recommendation = "Kiểm tra kỹ độ dày radiator nếu lắp phía trước."
                    });
                }
            }

            // 5. CPU Cooler Height Clearance
            if (build.CoolerHeightMm > 0 && build.CaseMaxCoolerHeightMm > 0 && build.CoolerType == "Air Cooler")
            {
                if (build.CoolerHeightMm > build.CaseMaxCoolerHeightMm)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "COOLER_CLEARANCE_EXCEEDED",
                        Component = "Cooler / Case",
                        Title = "Chiều cao tản nhiệt vượt quá nắp hông Case",
                        Message = $"Tản khí cao {build.CoolerHeightMm}mm, nhưng case {build.CaseName} chỉ cho phép tối đa {build.CaseMaxCoolerHeightMm}mm.",
                        Explanation = "Không thể đóng nắp kính thùng máy vì ống đồng tản nhiệt bị cấn.",
                        Recommendation = "Chọn tản nhiệt khí thấp hơn hoặc case bề ngang rộng hơn."
                    });
                }
            }

            // 6. Cooler Socket Support
            if (!string.IsNullOrEmpty(build.CpuSocket) && build.CoolerSupportedSockets != null && build.CoolerSupportedSockets.Count > 0)
            {
                bool socketOk = build.CoolerSupportedSockets.Any(s => s.Equals(build.CpuSocket, StringComparison.OrdinalIgnoreCase));
                if (!socketOk)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "COOLER_SOCKET_MISMATCH",
                        Component = "Cooler / CPU",
                        Title = "Tản nhiệt không hỗ trợ ngàm Socket của CPU",
                        Message = $"Tản nhiệt {build.CoolerName} không có ngàm cho socket {build.CpuSocket}.",
                        Explanation = "Không thể bắt ốc cố định tản nhiệt vào CPU.",
                        Recommendation = $"Chọn tản nhiệt hỗ trợ sẵn ngàm {build.CpuSocket}."
                    });
                }
            }

            // 7. Power Calculation & Headroom
            int cpuWatts = build.CpuPeakTdpWatts > 0 ? build.CpuPeakTdpWatts : (build.CpuTdpWatts > 0 ? build.CpuTdpWatts : 65);
            int gpuWatts = build.GpuTdpWatts > 0 ? build.GpuTdpWatts : 0;
            int baseSystemWatts = 75;

            report.TotalPeakWatts = cpuWatts + gpuWatts + baseSystemWatts;
            report.RecommendedPsuWatts = (int)(Math.Ceiling((report.TotalPeakWatts * 1.30) / 50.0) * 50);

            if (build.PsuWattageWatts > 0)
            {
                report.PsuHeadroomPercent = (int)Math.Round(((double)(build.PsuWattageWatts - report.TotalPeakWatts) / build.PsuWattageWatts) * 100.0);

                if (build.PsuWattageWatts < report.TotalPeakWatts * 1.15)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "error",
                        IssueType = "PSU_INSUFFICIENT_POWER",
                        Component = "PSU",
                        Title = "Bộ nguồn thiếu công suất an toàn (Power Overload)",
                        Message = $"Nguồn {build.PsuWattageWatts}W thấp hơn mức tối thiểu yêu cầu ({Math.Round(report.TotalPeakWatts * 1.15)}W) của cấu hình.",
                        Explanation = $"Tải đỉnh của hệ thống đạt {report.TotalPeakWatts}W. Cần tối thiểu 15% headroom để tránh sập nguồn khi tải nặng.",
                        Recommendation = $"Nâng cấp nguồn lên từ {report.RecommendedPsuWatts}W (Headroom 30%)."
                    });
                }
                else if (report.PsuHeadroomPercent < 20)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "warning",
                        IssueType = "PSU_LOW_HEADROOM",
                        Component = "PSU",
                        Title = "Độ dự phòng công suất nguồn (Headroom) ở mức thấp",
                        Message = $"Bộ nguồn có mức headroom {report.PsuHeadroomPercent}% (Dưới ngưỡng khuyến nghị 20% - 30%).",
                        Explanation = "Nguồn hoạt động gần mức công suất tối đa sẽ ồn và nóng hơn.",
                        Recommendation = $"Nâng nguồn lên {report.RecommendedPsuWatts}W để đạt hiệu suất tối ưu."
                    });
                }

                if (build.GpuRequires12Vhpwr && !build.PsuHas12Vhpwr)
                {
                    report.Issues.Add(new CompatibilityIssue
                    {
                        Severity = "warning",
                        IssueType = "PSU_CONNECTOR_12VHPWR_ADAPTER",
                        Component = "PSU / GPU",
                        Title = "Nguồn không có sẵn dây 12VHPWR PCIe 5.0",
                        Message = "Card đồ họa dùng cổng 16-pin 12VHPWR, nguồn sẽ cần dùng cáp chuyển đổi (adapter).",
                        Explanation = "Phải sử dụng adapter chuyển đổi từ đầu cắm 8-pin truyền thống.",
                        Recommendation = "Nên ưu tiên chọn nguồn chuẩn ATX 3.0 có sẵn cổng 12VHPWR."
                    });
                }
            }

            bool hasErrors = report.Issues.Any(i => i.Severity == "error");
            bool hasWarnings = report.Issues.Any(i => i.Severity == "warning");

            if (hasErrors)
            {
                report.IsCompatible = false;
                report.Status = "INCOMPATIBLE";
                report.StatusSummary = "Phát hiện xung đột phần cứng nghiêm trọng. Cần điều chỉnh linh kiện trước khi lắp ráp.";
            }
            else if (hasWarnings)
            {
                report.IsCompatible = true;
                report.Status = "WARNING";
                report.StatusSummary = "Cấu hình có thể lắp đặt nhưng cần lưu ý một số cảnh báo kích thước hoặc công suất nguồn.";
            }
            else
            {
                report.IsCompatible = true;
                report.Status = "COMPATIBLE";
                report.StatusSummary = "Tất cả linh kiện đã chọn tương thích hoàn toàn về điện áp, kích thước và chân cắm.";
            }

            return report;
        }
    }
}
