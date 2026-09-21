﻿using System;
using System.Web.UI;

namespace KnowLab
{
    public partial class DefaultPage : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string view = Request.QueryString["view"] ?? "home";
            LoadUserControl(view);
        }

        private void LoadUserControl(string viewName)
        {
            string controlPath = "~/UserControls/Home/HomeControl.ascx";

            switch (viewName.ToLower())
            {
                case "learn":
                    controlPath = "~/UserControls/Learn/LearnControl.ascx";
                    break;
                case "explore":
                    controlPath = "~/UserControls/Explore/ExploreControl.ascx";
                    break;
                case "compare":
                    controlPath = "~/UserControls/Compare/CompareControl.ascx";
                    break;
                case "lab":
                    controlPath = "~/UserControls/Lab/LabControl.ascx";
                    break;
                case "lifesim":
                    controlPath = "~/UserControls/LifeSimulator/LifeSimulatorControl.ascx";
                    break;
                case "scenarios":
                    controlPath = "~/UserControls/Scenario/ScenarioControl.ascx";
                    break;
                case "home":
                default:
                    controlPath = "~/UserControls/Home/HomeControl.ascx";
                    break;
            }

            Control uc = LoadControl(controlPath);
            phControlHolder.Controls.Clear();
            phControlHolder.Controls.Add(uc);
        }
    }
}
