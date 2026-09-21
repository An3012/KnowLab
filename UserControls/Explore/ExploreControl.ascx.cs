using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using KnowLab.Engines;

namespace KnowLab.UserControls.Explore
{
    public partial class ExploreControl : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string query = Request.QueryString["q"];
                string domain = Request.QueryString["domain"];
                
                if (!string.IsNullOrEmpty(query))
                {
                    txtExploreSearch.Text = query;
                }
                
                BindData(domain, query);
            }
        }

        private void BindData(string domainId = null, string query = null)
        {
            var concepts = KnowledgeEngine.GetConcepts(domainId, null, query);
            rptConcepts.DataSource = concepts;
            rptConcepts.DataBind();

            var glossary = KnowledgeEngine.GetGlossary(domainId, query);
            grdGlossary.DataSource = glossary;
            grdGlossary.DataBind();
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            BindData(null, txtExploreSearch.Text.Trim());
        }

        protected void FilterDomain_Click(object sender, EventArgs e)
        {
            LinkButton btn = (LinkButton)sender;
            string domainId = btn.CommandArgument;
            txtExploreSearch.Text = "";
            BindData(domainId, null);
        }

        protected void btnMarkDone_Click(object sender, EventArgs e)
        {
            LinkButton btn = (LinkButton)sender;
            string conceptId = btn.CommandArgument;
            LearningEngine.CompleteConcept(conceptId);
            Response.Redirect("Default.aspx?view=explore");
        }
    }
}
