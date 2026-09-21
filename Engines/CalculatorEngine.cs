﻿using System;
using System.Collections.Generic;

namespace KnowLab.Engines
{
    #region Data Contracts & Models

    public class MortgageInput
    {
        public double Price { get; set; }
        public double DownPaymentPercent { get; set; }
        public double InterestRatePercent { get; set; }
        public int TermYears { get; set; }
        public double MonthlyIncome { get; set; }

        public MortgageInput()
        {
            Price = 2500000000;
            DownPaymentPercent = 30;
            InterestRatePercent = 9.5;
            TermYears = 20;
            MonthlyIncome = 35000000;
        }
    }

    public class MortgageResult
    {
        public double DownPaymentAmount { get; set; }
        public double LoanAmount { get; set; }
        public double MonthlyPayment { get; set; }
        public double TotalPayment { get; set; }
        public double TotalInterest { get; set; }
        public double DebtToIncomeRatio { get; set; }
        public string FormulaUsed { get; set; }
        public List<string> Assumptions { get; set; }
        public List<string> Limitations { get; set; }

        public MortgageResult()
        {
            Assumptions = new List<string>();
            Limitations = new List<string>();
        }
    }

    public class PCPowerInput
    {
        public int CpuTdp { get; set; }
        public int GpuTdp { get; set; }
        public int PsuWattage { get; set; }

        public PCPowerInput()
        {
            CpuTdp = 65;
            GpuTdp = 220;
            PsuWattage = 650;
        }
    }

    public class PCPowerResult
    {
        public int EstimatedPeakWatts { get; set; }
        public int RecommendedPsuWatts { get; set; }
        public int PsuHeadroomPercent { get; set; }
        public bool IsPsuSafe { get; set; }
        public string StatusMessage { get; set; }
        public string FormulaUsed { get; set; }
        public List<string> Assumptions { get; set; }
        public List<string> Limitations { get; set; }

        public PCPowerResult()
        {
            Assumptions = new List<string>();
            Limitations = new List<string>();
        }
    }

    public class BottleneckInput
    {
        public string CpuTier { get; set; } // Low, Mid, High
        public string GpuTier { get; set; } // Low, Mid, High
        public string Resolution { get; set; } // 1080p, 1440p, 4K

        public BottleneckInput()
        {
            CpuTier = "Mid";
            GpuTier = "High";
            Resolution = "1080p";
        }
    }

    public class BottleneckResult
    {
        public int BottleneckPercent { get; set; }
        public string LimitingComponent { get; set; }
        public string StatusMessage { get; set; }
        public string Advice { get; set; }
        public List<string> Assumptions { get; set; }

        public BottleneckResult()
        {
            Assumptions = new List<string>();
        }
    }

    public class CarTCOInput
    {
        public double CarPrice { get; set; }
        public double KmPerYear { get; set; }
        public string EngineType { get; set; } // Petrol, Electric
        public int Years { get; set; }

        public CarTCOInput()
        {
            CarPrice = 600000000;
            KmPerYear = 15000;
            EngineType = "Petrol";
            Years = 5;
        }
    }

    public class CarTCOResult
    {
        public double Total5YearCost { get; set; }
        public double TotalFuelCost { get; set; }
        public double TotalMaintenanceCost { get; set; }
        public double TotalInsuranceCost { get; set; }
        public double DepreciationAmount { get; set; }
        public double MonthlyAverageCost { get; set; }
        public string ComparisonNote { get; set; }
        public List<string> Assumptions { get; set; }

        public CarTCOResult()
        {
            Assumptions = new List<string>();
        }
    }

    public class MotoTCOInput
    {
        public double DailyKm { get; set; }
        public double FuelConsumptionPer100Km { get; set; }
        public string MotoType { get; set; } // Scooter, Manual

        public MotoTCOInput()
        {
            DailyKm = 25;
            FuelConsumptionPer100Km = 2.2;
            MotoType = "Scooter";
        }
    }

    public class MotoTCOResult
    {
        public double MonthlyFuelCost { get; set; }
        public double AnnualMaintenanceCost { get; set; }
        public double TotalAnnualCost { get; set; }
        public List<string> MaintenanceItems { get; set; }
        public List<string> Assumptions { get; set; }

        public MotoTCOResult()
        {
            MaintenanceItems = new List<string>();
            Assumptions = new List<string>();
        }
    }

    public class HomeRenovationInput
    {
        public double LandArea { get; set; }
        public int Floors { get; set; }
        public string PackageType { get; set; } // Basic, Medium, Premium

        public HomeRenovationInput()
        {
            LandArea = 60;
            Floors = 2;
            PackageType = "Medium";
        }
    }

    public class HomeRenovationResult
    {
        public double TotalBuildArea { get; set; }
        public double UnitPricePerM2 { get; set; }
        public double TotalEstimatedCost { get; set; }
        public double ContingencyCost { get; set; }
        public List<string> Assumptions { get; set; }

        public HomeRenovationResult()
        {
            Assumptions = new List<string>();
        }
    }

    public class FengShuiInput
    {
        public string HouseFacingDirection { get; set; } // Dong, Tay, Nam, Bac, DongNam, DongBac, TayNam, TayBac
        public string MainDoorAlignment { get; set; }

        public FengShuiInput()
        {
            HouseFacingDirection = "Nam";
            MainDoorAlignment = "ThangBien";
        }
    }

    public class FengShuiResult
    {
        public string DirectionEvaluation { get; set; }
        public string VentilationScore { get; set; }
        public string SpatialRecommendation { get; set; }
        public string CulturalDisclaimer { get; set; }
        public List<string> CulturalNotes { get; set; }

        public FengShuiResult()
        {
            CulturalNotes = new List<string>();
        }
    }

    #endregion

    public static class CalculatorEngine
    {
        #region Real Estate Calculators

        public static MortgageResult CalculateMortgage(MortgageInput input)
        {
            double downAmount = input.Price * (input.DownPaymentPercent / 100.0);
            double loanAmount = Math.Max(0, input.Price - downAmount);
            double r = (input.InterestRatePercent / 100.0) / 12.0;
            int n = input.TermYears * 12;

            double monthlyPayment = 0;
            if (loanAmount > 0 && r > 0)
            {
                monthlyPayment = (loanAmount * r * Math.Pow(1 + r, n)) / (Math.Pow(1 + r, n) - 1);
            }
            else if (loanAmount > 0)
            {
                monthlyPayment = loanAmount / n;
            }

            double totalPayment = monthlyPayment * n;
            double totalInterest = Math.Max(0, totalPayment - loanAmount);
            double dti = input.MonthlyIncome > 0 ? Math.Round((monthlyPayment / input.MonthlyIncome) * 100.0, 1) : 0;

            MortgageResult res = new MortgageResult();
            res.DownPaymentAmount = downAmount;
            res.LoanAmount = loanAmount;
            res.MonthlyPayment = Math.Round(monthlyPayment);
            res.TotalPayment = Math.Round(totalPayment);
            res.TotalInterest = Math.Round(totalInterest);
            res.DebtToIncomeRatio = dti;
            res.FormulaUsed = "PMT = [P x r x (1+r)^n] / [(1+r)^n - 1]";
            res.Assumptions.Add("Lãi suất giả định cố định suốt kỳ vay (thực tế ngân hàng thả nổi sau 12-24 tháng).");
            res.Assumptions.Add("Phương thức trả nợ dư nợ giảm dần đều (Annuity).");
            res.Limitations.Add("Chưa bao gồm phí phạt trả nợ trước hạn (thường từ 1-3% trong 3 năm đầu).");
            res.Limitations.Add("Chưa tính bảo hiểm cháy nổ và bảo hiểm khoản vay.");

            return res;
        }

        #endregion

        #region PC Building Calculators

        public static PCPowerResult CalculatePCPower(PCPowerInput input)
        {
            int baseSystemWatts = 50;
            int estimatedPeak = input.CpuTdp + input.GpuTdp + baseSystemWatts;
            int recommendedPsu = (int)(Math.Ceiling((estimatedPeak * 1.3) / 50.0) * 50);
            int headroom = input.PsuWattage > 0 ? (int)Math.Round(((input.PsuWattage - estimatedPeak) / (double)input.PsuWattage) * 100.0) : 0;
            bool isSafe = input.PsuWattage >= estimatedPeak;

            PCPowerResult res = new PCPowerResult();
            res.EstimatedPeakWatts = estimatedPeak;
            res.RecommendedPsuWatts = recommendedPsu;
            res.PsuHeadroomPercent = headroom;
            res.IsPsuSafe = isSafe;
            res.StatusMessage = isSafe 
                ? (headroom >= 20 ? "Nguồn đủ công suất và có headroom an toàn (>=20%)." : "Nguồn đủ tải nhưng headroom thấp (<20%). Khuyên nâng cấp nguồn lớn hơn.")
                : "CẢNH BÁO: Công suất nguồn không đủ tải peak tối đa! Nguy cơ sập nguồn khi chơi game heavy.";
            res.FormulaUsed = "Peak Watts = CPU_TDP + GPU_TDP + 50W (Mainboard + Fans + RAM + SSD)";
            res.Assumptions.Add("TDP tiêu chuẩn tỏa nhiệt; dòng điện ngắt transient spikes của GPU mới có thể cao hơn 15-20%.");
            res.Limitations.Add("Chưa tính trường hợp ép xung Overclock quá mức vCore.");

            return res;
        }

        public static BottleneckResult CalculateBottleneck(BottleneckInput input)
        {
            BottleneckResult res = new BottleneckResult();
            int score = 0;

            if (input.CpuTier == "Low" && input.GpuTier == "High")
            {
                score = input.Resolution == "1080p" ? 38 : 22;
                res.LimitingComponent = "CPU (Bộ xử lý trung tâm quá yếu)";
                res.StatusMessage = "Nghẽn cổ chai CPU nặng ở độ phân giải Full HD 1080p.";
                res.Advice = "Nâng cấp CPU lên tầm Trung (Core i5 / Ryzen 5) để tận dụng hết công suất card đồ họa.";
            }
            else if (input.CpuTier == "High" && input.GpuTier == "Low")
            {
                score = 30;
                res.LimitingComponent = "GPU (Card màn hình yếu)";
                res.StatusMessage = "GPU không đủ sức đáp ứng xử lý đồ họa nặng.";
                res.Advice = "Nâng cấp GPU để nâng cao số khung hình FPS khi chơi game.";
            }
            else
            {
                score = 8;
                res.LimitingComponent = "Hệ thống cân bằng tốt";
                res.StatusMessage = "Cấu hình cân đối hoàn hảo, không bị nghẽn cổ chai đáng kể.";
                res.Advice = "Hệ thống chạy mượt mà ở các tác vụ thông thường và chơi game.";
            }

            res.BottleneckPercent = score;
            res.Assumptions.Add("Mô phỏng dựa trên tải trung bình các tựa game AAA hiện nay.");
            return res;
        }

        #endregion

        #region Automotive & Motorcycle Calculators

        public static CarTCOResult CalculateCarTCO(CarTCOInput input)
        {
            double fuelPricePerLiter = 23000;
            double electricityPricePerKwh = 3200;

            double fuelCost = 0;
            if (input.EngineType == "Electric")
            {
                double kwhPer100Km = 15;
                fuelCost = (input.KmPerYear / 100.0) * kwhPer100Km * electricityPricePerKwh * input.Years;
            }
            else
            {
                double litersPer100Km = 7.5;
                fuelCost = (input.KmPerYear / 100.0) * litersPer100Km * fuelPricePerLiter * input.Years;
            }

            double maintenanceCost = (input.EngineType == "Electric" ? 15000000 : 35000000) * (input.Years / 5.0);
            double insuranceCost = input.CarPrice * 0.013 * input.Years;
            double depreciation = input.CarPrice * 0.35; // 35% khấu hao sau 5 năm

            double totalTco = input.CarPrice + fuelCost + maintenanceCost + insuranceCost + depreciation - (input.CarPrice - depreciation);

            CarTCOResult res = new CarTCOResult();
            res.Total5YearCost = Math.Round(totalTco);
            res.TotalFuelCost = Math.Round(fuelCost);
            res.TotalMaintenanceCost = Math.Round(maintenanceCost);
            res.TotalInsuranceCost = Math.Round(insuranceCost);
            res.DepreciationAmount = Math.Round(depreciation);
            res.MonthlyAverageCost = Math.Round((totalTco - input.CarPrice) / (input.Years * 12.0));
            res.ComparisonNote = input.EngineType == "Electric" 
                ? "Xe điện giúp tiết kiệm khoảng 60-70% chi phí nhiên liệu và bảo dưỡng so với xe xăng."
                : "Xe xăng có chi phí nhiên liệu cao hơn nhưng sẵn có mạng lưới cây xăng tiện lợi.";
            res.Assumptions.Add("Quãng đường di chuyển giả định cố định mỗi năm.");
            res.Assumptions.Add("Khấu hao xe trung bình khoảng 35% sau 5 năm sử dụng.");

            return res;
        }

        public static MotoTCOResult CalculateMotoTCO(MotoTCOInput input)
        {
            double annualKm = input.DailyKm * 365;
            double fuelLiterPrice = 23000;
            double annualFuel = (annualKm / 100.0) * input.FuelConsumptionPer100Km * fuelLiterPrice;
            double maintenance = input.MotoType == "Scooter" ? 1800000 : 1200000;

            MotoTCOResult res = new MotoTCOResult();
            res.MonthlyFuelCost = Math.Round(annualFuel / 12.0);
            res.AnnualMaintenanceCost = maintenance;
            res.TotalAnnualCost = Math.Round(annualFuel + maintenance);
            res.MaintenanceItems.Add("Thay nhớt máy định kỳ sau mỗi 2,000 km.");
            res.MaintenanceItems.Add("Thay nhớt lap (xe tay ga) sau mỗi 3 lần thay nhớt máy.");
            res.MaintenanceItems.Add("Kiểm tra vế phanh, dây curoa/nhông sên dĩa mỗi 10,000 km.");
            res.Assumptions.Add("Giá xăng ước tính 23.000 VNĐ/lít.");

            return res;
        }

        #endregion

        #region Home Construction & Feng Shui Calculators

        public static HomeRenovationResult CalculateHomeRenovation(HomeRenovationInput input)
        {
            double totalArea = input.LandArea * input.Floors * 1.25; // 1.25 tính thêm móng + mái
            double unitPrice = 6000000; // Medium package
            if (input.PackageType == "Basic") unitPrice = 4800000;
            else if (input.PackageType == "Premium") unitPrice = 8500000;

            double buildCost = totalArea * unitPrice;
            double contingency = buildCost * 0.10; // 10% chi phí phát sinh dự phòng

            HomeRenovationResult res = new HomeRenovationResult();
            res.TotalBuildArea = Math.Round(totalArea, 1);
            res.UnitPricePerM2 = unitPrice;
            res.TotalEstimatedCost = Math.Round(buildCost + contingency);
            res.ContingencyCost = Math.Round(contingency);
            res.Assumptions.Add("Quy đổi diện tích móng & mái chiếm khoảng 25% tổng diện tích sàn.");
            res.Assumptions.Add("Dự phòng 10% ngân sách cho vật liệu phát sinh hoặc điều chỉnh bản vẽ.");

            return res;
        }

        public static FengShuiResult CalculateFengShuiLayout(FengShuiInput input)
        {
            FengShuiResult res = new FengShuiResult();
            if (input.HouseFacingDirection == "Nam" || input.HouseFacingDirection == "DongNam")
            {
                res.DirectionEvaluation = "Hướng Nam / Đông Nam: Rất tốt về mặt khí hậu (Đón gió mát mùa hè, tránh gió bắc mùa đông).";
                res.VentilationScore = "95/100 (Thông thoáng tự nhiên cao)";
                res.SpatialRecommendation = "Bố trí phòng khách phía trước đón ánh sáng tự nhiên. Tránh đặt nhà bếp đối diện trực tiếp cửa chính.";
            }
            else
            {
                res.DirectionEvaluation = "Hướng Tây / Tây Bắc: Nắng chiếu gắt vào buổi chiều.";
                res.VentilationScore = "70/100 (Cần giải pháp chống nóng)";
                res.SpatialRecommendation = "Nên bố trí lam chắn nắng, trồng cây xanh hoặc dùng kính cách nhiệt phía mặt tiền.";
            }

            res.CulturalDisclaimer = "LƯU Ý VĂN HÓA: Phong thủy kiến trúc thực chất là khoa học bố trí không gian, ánh sáng và thông gió tự nhiên. Kết quả mang tính tham khảo hài hòa cuộc sống, không mang ý nghĩa tâm linh siêu nhiên.";
            res.CulturalNotes.Add("Ưu tiên đối lưu không khí tươi vào các phòng sinh hoạt.");
            res.CulturalNotes.Add("Giữ cho khu vực lối vào và phòng khách luôn gọn gàng, đủ ánh sáng.");

            return res;
        }

        #endregion
    }
}
