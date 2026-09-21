using System;
using System.Web.UI;
using KnowLab.Engines;

namespace KnowLab.UserControls.Scenario
{
    public partial class ScenarioControl : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindScenarios();
                BindJournals();
            }
        }

        private void BindScenarios()
        {
            var list = ScenarioEngine.GetScenarios();
            rptScenarios.DataSource = list;
            rptScenarios.DataBind();
        }

        private void BindJournals()
        {
            var list = ScenarioEngine.GetJournals();
            rptJournals.DataSource = list;
            rptJournals.DataBind();
        }

        protected void btnSaveJournal_Click(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(txtGoal.Text))
            {
                ScenarioEngine.AddJournal(new DecisionJournalModel
                {
                    Goal = txtGoal.Text.Trim(),
                    Assumptions = txtAssumptions.Text.Trim(),
                    Decision = txtDecision.Text.Trim()
                });

                txtGoal.Text = "";
                txtAssumptions.Text = "";
                txtDecision.Text = "";

                BindJournals();
            }
        }

        protected void btnCompareScenarios_Click(object sender, EventArgs e)
        {
            var list = ScenarioEngine.GetScenarios();
            if (list.Count >= 2)
            {
                var diff = ScenarioEngine.CompareScenarios(list[0].Id, list[1].Id);
                rptDiffList.DataSource = diff.KeyDifferences;
                rptDiffList.DataBind();

                litDiffRec.Text = diff.RecommendationSummary;
                pnlDiffResult.Visible = true;
            }
            else
            {
                pnlDiffResult.Visible = true;
                litDiffRec.Text = "Cần ít nhất 2 scenario được lưu để chạy so sánh đối chiếu.";
            }
        }
    }
}
