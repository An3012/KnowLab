using System;
using System.Web.UI;
using KnowLab.Engines;

namespace KnowLab.UserControls.Lab
{
    public partial class LabControl : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string tab = Request.QueryString["tab"];
                if (!string.IsNullOrEmpty(tab))
                {
                    SwitchTab(tab);
                }
                else
                {
                    RunMortgageCalc();
                }
            }
        }

        private void ResetButtonStyles()
        {
            btnLabRe.CssClass = "boc";
            btnLabPc.CssClass = "boc";
            btnLabCar.CssClass = "boc";
            btnLabMoto.CssClass = "boc";
            btnLabHome.CssClass = "boc";
            btnLabFs.CssClass = "boc";
        }

        private void SwitchTab(string tabName)
        {
            ResetButtonStyles();
            switch (tabName.ToLower())
            {
                case "pc":
                    mvLab.ActiveViewIndex = 1;
                    btnLabPc.CssClass = "boc active";
                    RunPcCalc();
                    break;
                case "car":
                    mvLab.ActiveViewIndex = 2;
                    btnLabCar.CssClass = "boc active";
                    RunCarCalc();
                    break;
                case "moto":
                    mvLab.ActiveViewIndex = 3;
                    btnLabMoto.CssClass = "boc active";
                    RunMotoCalc();
                    break;
                case "home":
                    mvLab.ActiveViewIndex = 4;
                    btnLabHome.CssClass = "boc active";
                    RunHomeCalc();
                    break;
                case "fengshui":
                    mvLab.ActiveViewIndex = 5;
                    btnLabFs.CssClass = "boc active";
                    RunFengShuiCalc();
                    break;
                case "mortgage":
                default:
                    mvLab.ActiveViewIndex = 0;
                    btnLabRe.CssClass = "boc active";
                    RunMortgageCalc();
                    break;
            }
        }

        #region Tab Clicks

        protected void btnLabRe_Click(object sender, EventArgs e) => SwitchTab("mortgage");
        protected void btnLabPc_Click(object sender, EventArgs e) => SwitchTab("pc");
        protected void btnLabCar_Click(object sender, EventArgs e) => SwitchTab("car");
        protected void btnLabMoto_Click(object sender, EventArgs e) => SwitchTab("moto");
        protected void btnLabHome_Click(object sender, EventArgs e) => SwitchTab("home");
        protected void btnLabFs_Click(object sender, EventArgs e) => SwitchTab("fengshui");

        #endregion

        #region Calculation Triggers

        protected void btnCalcMortgage_Click(object sender, EventArgs e) => RunMortgageCalc();
        protected void btnCalcPc_Click(object sender, EventArgs e) => RunPcCalc();
        protected void btnCalcCar_Click(object sender, EventArgs e) => RunCarCalc();
        protected void btnCalcMoto_Click(object sender, EventArgs e) => RunMotoCalc();
        protected void btnCalcHome_Click(object sender, EventArgs e) => RunHomeCalc();
        protected void btnCalcFengShui_Click(object sender, EventArgs e) => RunFengShuiCalc();

        #endregion

        #region Calculation Logic

        private void RunMortgageCalc()
        {
            double price = Convert.ToDouble(txtPrice.Text);
            double down = Convert.ToDouble(txtDownPercent.Text);
            double rate = Convert.ToDouble(txtRate.Text);
            int term = Convert.ToInt32(txtTerm.Text);
            double income = Convert.ToDouble(txtIncome.Text);

            var res = CalculatorEngine.CalculateMortgage(new MortgageInput
            {
                Price = price,
                DownPaymentPercent = down,
                InterestRatePercent = rate,
                TermYears = term,
                MonthlyIncome = income
            });

            litMonthlyPayment.Text = res.MonthlyPayment.ToString("N0") + " VNĐ/tháng";
            litDti.Text = "Tỷ lệ DTI: " + res.DebtToIncomeRatio + "%";
            litDownAmount.Text = res.DownPaymentAmount.ToString("N0") + " VNĐ";
            litTotalInterest.Text = res.TotalInterest.ToString("N0") + " VNĐ";

            rptMortgageAssumptions.DataSource = res.Assumptions;
            rptMortgageAssumptions.DataBind();
        }

        private void RunPcCalc()
        {
            int cpu = Convert.ToInt32(txtCpuTdp.Text);
            int gpu = Convert.ToInt32(txtGpuTdp.Text);
            int psu = Convert.ToInt32(txtPsuWatt.Text);

            var res = CalculatorEngine.CalculatePCPower(new PCPowerInput
            {
                CpuTdp = cpu,
                GpuTdp = gpu,
                PsuWattage = psu
            });

            litPeakWatts.Text = res.EstimatedPeakWatts + " W Peak";
            litPcStatus.Text = res.StatusMessage;
            litRecPsu.Text = res.RecommendedPsuWatts + " W";
        }

        private void RunCarCalc()
        {
            double price = Convert.ToDouble(txtCarPrice.Text);
            double km = Convert.ToDouble(txtCarKm.Text);
            string engine = ddlCarEngine.SelectedValue;

            var res = CalculatorEngine.CalculateCarTCO(new CarTCOInput
            {
                CarPrice = price,
                KmPerYear = km,
                EngineType = engine,
                Years = 5
            });

            litCarTco.Text = res.Total5YearCost.ToString("N0") + " VNĐ";
            litCarMonthly.Text = "Trung bình: " + res.MonthlyAverageCost.ToString("N0") + " VNĐ/tháng";
            litCarNote.Text = res.ComparisonNote;
        }

        private void RunMotoCalc()
        {
            double dailyKm = Convert.ToDouble(txtMotoKm.Text);
            double fuelRate = Convert.ToDouble(txtMotoFuelRate.Text);

            var res = CalculatorEngine.CalculateMotoTCO(new MotoTCOInput
            {
                DailyKm = dailyKm,
                FuelConsumptionPer100Km = fuelRate,
                MotoType = "Scooter"
            });

            litMotoMonthly.Text = res.MonthlyFuelCost.ToString("N0") + " VNĐ/tháng";
            litMotoAnnual.Text = "Tổng chi phí vận hành 1 năm: " + res.TotalAnnualCost.ToString("N0") + " VNĐ";
        }

        private void RunHomeCalc()
        {
            double land = Convert.ToDouble(txtHomeLandArea.Text);
            int floors = Convert.ToInt32(txtHomeFloors.Text);

            var res = CalculatorEngine.CalculateHomeRenovation(new HomeRenovationInput
            {
                LandArea = land,
                Floors = floors,
                PackageType = "Medium"
            });

            litHomeTotal.Text = res.TotalEstimatedCost.ToString("N0") + " VNĐ";
            litHomeArea.Text = "Tổng diện tích sàn quy đổi: " + res.TotalBuildArea + " m²";
        }

        private void RunFengShuiCalc()
        {
            string dir = ddlFsDirection.SelectedValue;
            var res = CalculatorEngine.CalculateFengShuiLayout(new FengShuiInput
            {
                HouseFacingDirection = dir
            });

            litFsEval.Text = res.DirectionEvaluation;
            litFsDisclaimer.Text = res.CulturalDisclaimer;
        }

        #endregion

        #region Save Scenario Handlers

        protected void btnSaveMortgageScenario_Click(object sender, EventArgs e)
        {
            double price = Convert.ToDouble(txtPrice.Text);
            var res = CalculatorEngine.CalculateMortgage(new MortgageInput { Price = price });

            ScenarioEngine.AddScenario(new ScenarioModel
            {
                Name = "Vay BĐS " + (price / 1000000000.0).ToString("N1") + " Tỷ (C#)",
                DomainId = "real-estate",
                SummaryResults = "Trả gốc lãi tháng: " + res.MonthlyPayment.ToString("N0") + " VNĐ | DTI: " + res.DebtToIncomeRatio + "%"
            });

            Response.Redirect("Default.aspx?view=scenarios");
        }

        protected void btnSavePcScenario_Click(object sender, EventArgs e)
        {
            int psu = Convert.ToInt32(txtPsuWatt.Text);
            var res = CalculatorEngine.CalculatePCPower(new PCPowerInput { PsuWattage = psu });

            ScenarioEngine.AddScenario(new ScenarioModel
            {
                Name = "Cấu Hình PC (Nguồn " + psu + "W)",
                DomainId = "pc-building",
                SummaryResults = "Peak Watts: " + res.EstimatedPeakWatts + " W | Nguồn khuyên dùng: " + res.RecommendedPsuWatts + " W"
            });

            Response.Redirect("Default.aspx?view=scenarios");
        }

        #endregion
    }
}
