using System;
using System.Web.UI;
using KnowLab.Engines;

namespace KnowLab.UserControls.LifeSimulator
{
    public partial class LifeSimulatorControl : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                RunSimulation();
            }
        }

        protected void btnRunLifeSim_Click(object sender, EventArgs e)
        {
            RunSimulation();
        }

        private void RunSimulation()
        {
            double income = Convert.ToDouble(txtSimIncome.Text);
            double housePrice = Convert.ToDouble(txtSimHousePrice.Text);
            double houseDown = Convert.ToDouble(txtSimHouseDown.Text);
            string vehicleType = ddlSimVehicle.SelectedValue;
            double vehiclePrice = Convert.ToDouble(txtSimVehiclePrice.Text);
            double pcBudget = Convert.ToDouble(txtSimPcBudget.Text);
            double homeBudget = Convert.ToDouble(txtSimHomeBudget.Text);

            var input = new LifeSimulatorInput
            {
                MonthlyIncome = income,
                HousePrice = housePrice,
                HouseDownPercent = houseDown,
                VehicleType = vehicleType,
                VehiclePrice = vehiclePrice,
                PcBudget = pcBudget,
                HomeRenovationBudget = homeBudget
            };

            var res = CrossDomainEngine.CalculateLifeSimulation(input);

            litSimStatus.Text = res.StatusMessage;
            litTotalCommitment.Text = res.TotalMonthlyCommitment.ToString("N0") + " VNĐ/tháng";
            litCrossDti.Text = res.CrossDomainDTI + "%";
            litRemainingIncome.Text = res.RemainingDiscretionaryIncome.ToString("N0") + " VNĐ/tháng";

            rptDependencyChain.DataSource = res.DependencyChain;
            rptDependencyChain.DataBind();

            rptTradeoffs.DataSource = res.CrossDomainTradeOffs;
            rptTradeoffs.DataBind();
        }

        protected void btnSaveCrossScenario_Click(object sender, EventArgs e)
        {
            double income = Convert.ToDouble(txtSimIncome.Text);
            double housePrice = Convert.ToDouble(txtSimHousePrice.Text);
            var input = new LifeSimulatorInput { MonthlyIncome = income, HousePrice = housePrice };
            var res = CrossDomainEngine.CalculateLifeSimulation(input);

            ScenarioEngine.AddScenario(new ScenarioModel
            {
                Name = "Cross-Domain Life Setup (Thu nhập " + (income / 1000000.0).ToString("N0") + "Tr/tháng)",
                DomainId = "life-simulator",
                SummaryResults = "Tổng cam kết: " + res.TotalMonthlyCommitment.ToString("N0") + " VNĐ/tháng | DTI: " + res.CrossDomainDTI + "% | Điểm sức khỏe: " + res.FinancialHealthScore + "/100"
            });

            Response.Redirect("Default.aspx?view=scenarios");
        }
    }
}
