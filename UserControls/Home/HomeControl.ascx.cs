using System;
using System.Web.UI;
using KnowLab.Engines;

namespace KnowLab.UserControls.Home
{
    public partial class HomeControl : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindDomains();
                BindUserProgress();
            }
        }

        private void BindDomains()
        {
            rptDomains.DataSource = KnowledgeEngine.GetDomains();
            rptDomains.DataBind();
        }

        private void BindUserProgress()
        {
            var progress = LearningEngine.GetUserProgress();
            litUserLevelNumber.Text = progress.CurrentLevel.ToString();
            
            switch (progress.CurrentLevel)
            {
                case 4:
                    litUserLevelTitle.Text = "Level 4 — Chuyên Sâu Mô Hình";
                    break;
                case 3:
                    litUserLevelTitle.Text = "Level 3 — Nâng Cao & Scenario";
                    break;
                case 2:
                    litUserLevelTitle.Text = "Level 2 — Thực Hành Tính Toán";
                    break;
                case 1:
                    litUserLevelTitle.Text = "Level 1 — Hiểu Khái Niệm Cơ Bản";
                    break;
                case 0:
                default:
                    litUserLevelTitle.Text = "Level 0 — Chưa biết gì (Bắt đầu học)";
                    break;
            }

            litProgressSummary.Text = $"Đã học {progress.CompletedConcepts.Count} khái niệm. Trình độ hiện tại phù hợp để thử nghiệm các Lab mô phỏng.";
        }

        protected void txtHomeSearch_TextChanged(object sender, EventArgs e)
        {
            if (!string.IsNullOrWhiteSpace(txtHomeSearch.Text))
            {
                Response.Redirect("Default.aspx?view=explore&q=" + Server.UrlEncode(txtHomeSearch.Text.Trim()));
            }
        }
    }
}
