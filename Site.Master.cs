﻿using System;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace KnowLab
{
    public partial class SiteMaster : MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                HighlightActiveNav();
            }
        }

        private void HighlightActiveNav()
        {
            string view = (Request.QueryString["view"] ?? "home").ToLower();

            lnkHome.CssClass = "nav-link-custom" + (view == "home" ? " active" : "");
            lnkLearn.CssClass = "nav-link-custom" + (view == "learn" ? " active" : "");
            lnkExplore.CssClass = "nav-link-custom" + (view == "explore" ? " active" : "");
            lnkCompare.CssClass = "nav-link-custom" + (view == "compare" ? " active" : "");
            lnkLab.CssClass = "nav-link-custom" + (view == "lab" ? " active" : "");
            lnkLifeSim.CssClass = "nav-link-custom" + (view == "lifesim" ? " active" : "");
            lnkScenarios.CssClass = "nav-link-custom" + (view == "scenarios" ? " active" : "");
        }
    }
}
