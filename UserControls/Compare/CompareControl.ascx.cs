using System;
using System.Data;
using System.Web.UI;
using KnowLab.Engines;

namespace KnowLab.UserControls.Compare
{
    public partial class CompareControl : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindComparison();
            }
        }

        protected void ddlDomain_SelectedIndexChanged(object sender, EventArgs e)
        {
            BindComparison();
        }

        private void BindComparison()
        {
            string domainId = ddlDomain.SelectedValue;
            var res = ComparisonEngine.CompareDomainItems(domainId);

            DataTable dt = new DataTable();
            dt.Columns.Add("Tiêu Chí So Sánh");

            foreach (var item in res.Items)
            {
                dt.Columns.Add(item.Name);
            }

            foreach (var crit in res.Criteria)
            {
                DataRow dr = dt.NewRow();
                dr["Tiêu Chí So Sánh"] = crit.Label;

                foreach (var item in res.Items)
                {
                    if (item.Attributes.ContainsKey(crit.Key))
                    {
                        dr[item.Name] = item.Attributes[crit.Key];
                    }
                    else
                    {
                        dr[item.Name] = "-";
                    }
                }
                dt.Rows.Add(dr);
            }

            grdCompare.DataSource = dt;
            grdCompare.DataBind();

            rptTradeOffs.DataSource = res.TradeOffs;
            rptTradeOffs.DataBind();

            rptAssumptions.DataSource = res.Assumptions;
            rptAssumptions.DataBind();
        }

        protected void btnSaveComparisonScenario_Click(object sender, EventArgs e)
        {
            string domainId = ddlDomain.SelectedValue;
            string domainName = ddlDomain.SelectedItem.Text;

            ScenarioEngine.AddScenario(new ScenarioModel
            {
                Name = "So Sánh: " + domainName,
                DomainId = domainId,
                SummaryResults = "Đã lưu bản ma trận so sánh các phương án " + domainName + " vào Scenario journal."
            });

            Response.Redirect("Default.aspx?view=scenarios");
        }
    }
}
