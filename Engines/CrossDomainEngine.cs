﻿using System;
using System.Collections.Generic;

namespace KnowLab.Engines
{
    public class DomainContract
    {
        public string DomainId { get; set; }
        public string DomainName { get; set; }
        public List<string> InputKeys { get; set; }
        public List<string> OutputKeys { get; set; }
        public List<string> Dependencies { get; set; }
        public List<string> Assumptions { get; set; }
        public string DataVersion { get; set; }
        public string EngineVersion { get; set; }

        public DomainContract()
        {
            InputKeys = new List<string>();
            OutputKeys = new List<string>();
            Dependencies = new List<string>();
            Assumptions = new List<string>();
            DataVersion = "2026-01";
            EngineVersion = "1.0.0";
        }
    }

    public class LifeSimulatorInput
    {
        public double MonthlyIncome { get; set; }
        public double HousePrice { get; set; }
        public double HouseDownPercent { get; set; }
        public double LoanInterestRate { get; set; }
        public int LoanTermYears { get; set; }

        public string VehicleType { get; set; } // Car, Motorcycle, None
        public double VehiclePrice { get; set; }
        public double AnnualKm { get; set; }

        public double PcBudget { get; set; }
        public double HomeRenovationBudget { get; set; }

        public LifeSimulatorInput()
        {
            MonthlyIncome = 45000000;
            HousePrice = 2500000000;
            HouseDownPercent = 30;
            LoanInterestRate = 9.5;
            LoanTermYears = 20;

            VehicleType = "Car";
            VehiclePrice = 600000000;
            AnnualKm = 15000;

            PcBudget = 25000000;
            HomeRenovationBudget = 100000000;
        }
    }

    public class LifeSimulatorResult
    {
        public double MonthlyIncome { get; set; }
        public double MonthlyHousingCost { get; set; }
        public double MonthlyVehicleCost { get; set; }
        public double MonthlyPcReserve { get; set; }
        public double MonthlyHomeReserve { get; set; }
        public double TotalMonthlyCommitment { get; set; }
        public double RemainingDiscretionaryIncome { get; set; }
        public double CrossDomainDTI { get; set; }
        public int FinancialHealthScore { get; set; }
        public string StatusMessage { get; set; }

        public List<string> DependencyChain { get; set; }
        public List<string> CrossDomainTradeOffs { get; set; }
        public List<string> Assumptions { get; set; }
        public List<string> Limitations { get; set; }

        public string EngineVersion { get; set; }
        public string DataVersion { get; set; }

        public LifeSimulatorResult()
        {
            DependencyChain = new List<string>();
            CrossDomainTradeOffs = new List<string>();
            Assumptions = new List<string>();
            Limitations = new List<string>();
            EngineVersion = "1.0.0";
            DataVersion = "2026-01";
        }
    }

    public static class CrossDomainEngine
    {
        public static List<DomainContract> GetDomainContracts()
        {
            return new List<DomainContract>
            {
                new DomainContract {
                    DomainId = "real-estate", DomainName = "Bất Động Sản",
                    InputKeys = new List<string> { "HousePrice", "HouseDownPercent", "LoanInterestRate", "LoanTermYears" },
                    OutputKeys = new List<string> { "MonthlyHousingCost", "LoanAmount", "DownPaymentAmount" },
                    Assumptions = new List<string> { "Lãi suất trả góp dư nợ giảm dần đều" }
                },
                new DomainContract {
                    DomainId = "cars", DomainName = "Ô Tô",
                    InputKeys = new List<string> { "VehiclePrice", "AnnualKm" },
                    OutputKeys = new List<string> { "MonthlyVehicleCost", "Depreciation" },
                    Dependencies = new List<string> { "MonthlyIncome" },
                    Assumptions = new List<string> { "TCO 5 năm bao gồm xăng, bảo dưỡng và bảo hiểm" }
                },
                new DomainContract {
                    DomainId = "pc-building", DomainName = "Build PC",
                    InputKeys = new List<string> { "PcBudget" },
                    OutputKeys = new List<string> { "MonthlyPcReserve" },
                    Assumptions = new List<string> { "Khấu hao PC trong 36 tháng (3 năm)" }
                },
                new DomainContract {
                    DomainId = "home", DomainName = "Nhà Cửa & Xây Dựng",
                    InputKeys = new List<string> { "HomeRenovationBudget" },
                    OutputKeys = new List<string> { "MonthlyHomeReserve" },
                    Assumptions = new List<string> { "Phân bổ ngân sách sửa nhà trong 60 tháng (5 năm)" }
                }
            };
        }

        public static LifeSimulatorResult CalculateLifeSimulation(LifeSimulatorInput input)
        {
            // 1. Real Estate Domain Engine
            var mortgageInput = new MortgageInput
            {
                Price = input.HousePrice,
                DownPaymentPercent = input.HouseDownPercent,
                InterestRatePercent = input.LoanInterestRate,
                TermYears = input.LoanTermYears,
                MonthlyIncome = input.MonthlyIncome
            };
            var mortgageResult = CalculatorEngine.CalculateMortgage(mortgageInput);
            double monthlyHousing = mortgageResult.MonthlyPayment;

            // 2. Transportation Domain Engine (Car or Moto)
            double monthlyVehicle = 0;
            if (input.VehicleType == "Car")
            {
                var carInput = new CarTCOInput { CarPrice = input.VehiclePrice, KmPerYear = input.AnnualKm, EngineType = "Petrol", Years = 5 };
                var carResult = CalculatorEngine.CalculateCarTCO(carInput);
                monthlyVehicle = carResult.MonthlyAverageCost;
            }
            else if (input.VehicleType == "Motorcycle")
            {
                var motoInput = new MotoTCOInput { DailyKm = input.AnnualKm / 365.0, FuelConsumptionPer100Km = 2.2, MotoType = "Scooter" };
                var motoResult = CalculatorEngine.CalculateMotoTCO(motoInput);
                monthlyVehicle = motoResult.MonthlyFuelCost + (motoResult.AnnualMaintenanceCost / 12.0);
            }

            // 3. PC Building Domain Engine (3-Year Depreciation Reserve)
            double monthlyPc = input.PcBudget > 0 ? Math.Round(input.PcBudget / 36.0) : 0;

            // 4. Home Renovation Domain Engine (5-Year Reserve)
            double monthlyHome = input.HomeRenovationBudget > 0 ? Math.Round(input.HomeRenovationBudget / 60.0) : 0;

            // 5. Cross-domain aggregation & Financial Health Index
            double totalCommitment = monthlyHousing + monthlyVehicle + monthlyPc + monthlyHome;
            double remainingIncome = Math.Max(0, input.MonthlyIncome - totalCommitment);
            double dti = input.MonthlyIncome > 0 ? Math.Round((totalCommitment / input.MonthlyIncome) * 100.0, 1) : 0;

            int healthScore = 100;
            if (dti > 60) healthScore = 35;
            else if (dti > 45) healthScore = 60;
            else if (dti > 30) healthScore = 80;

            LifeSimulatorResult res = new LifeSimulatorResult();
            res.MonthlyIncome = input.MonthlyIncome;
            res.MonthlyHousingCost = monthlyHousing;
            res.MonthlyVehicleCost = monthlyVehicle;
            res.MonthlyPcReserve = monthlyPc;
            res.MonthlyHomeReserve = monthlyHome;
            res.TotalMonthlyCommitment = Math.Round(totalCommitment);
            res.RemainingDiscretionaryIncome = Math.Round(remainingIncome);
            res.CrossDomainDTI = dti;
            res.FinancialHealthScore = healthScore;

            if (dti > 50)
            {
                res.StatusMessage = "CẢNH BÁO TÀI CHÍNH: Tổng cam kết chi trả vượt quá 50% thu nhập ròng! Rủi ro áp lực tài chính cao.";
            }
            else if (dti > 35)
            {
                res.StatusMessage = "CÂN BẰNG VỪA PHẢI: Ngân sách tài chính ở mức chấp nhận được, nên ưu tiên tích lũy quỹ dự phòng 6 tháng.";
            }
            else
            {
                res.StatusMessage = "TÀI CHÍNH AN TOÀN: Tỷ lệ cam kết chi trả ở mức lý tưởng (<35%). Bạn có dòng tiền dư dả tích lũy.";
            }

            // Dependency chain explanation
            res.DependencyChain.Add($"1. Thu Nhập Đầu Vào: {input.MonthlyIncome:N0} VNĐ/tháng.");
            res.DependencyChain.Add($"2. Khoản Trả Vay BĐS (Annuity): {monthlyHousing:N0} VNĐ/tháng (Chiếm {Math.Round((monthlyHousing/input.MonthlyIncome)*100,1)}% thu nhập).");
            res.DependencyChain.Add($"3. Chi Phí Vận Hành Xe ({input.VehicleType}): {monthlyVehicle:N0} VNĐ/tháng.");
            res.DependencyChain.Add($"4. Trích Lập Khấu Hao PC & Trích Lập Ngân Sách Sửa Nhà: {monthlyPc + monthlyHome:N0} VNĐ/tháng.");
            res.DependencyChain.Add($"5. Dòng Tiền Dư Sinh Hoạt Còn Lại: {remainingIncome:N0} VNĐ/tháng.");

            res.CrossDomainTradeOffs.Add("Nếu hạ ngân sách xe hoặc đi xe máy, bạn có thể tăng tỷ lệ trả trước BĐS để giảm gốc vay.");
            res.CrossDomainTradeOffs.Add("Trích lập ngân sách PC và sửa nhà giúp bạn chủ động tài chính không phải vay tiêu dùng cá nhân lãi cao.");

            res.Assumptions.Add("Lãi suất ngân hàng tính cố định trong suốt chu kỳ vay.");
            res.Assumptions.Add("Chi phí xe ô tô TCO tính trung bình đã bao gồm xăng, bảo dưỡng và bảo hiểm thân vỏ.");
            res.Limitations.Add("Chưa tính đến các biến cố lạm phát bất ngờ hoặc tăng giá nhiên liệu đột biến.");

            return res;
        }
    }
}
