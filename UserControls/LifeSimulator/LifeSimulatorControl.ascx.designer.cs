namespace KnowLab.UserControls.LifeSimulator {
    public partial class LifeSimulatorControl {
        protected global::System.Web.UI.WebControls.TextBox txtSimIncome;
        protected global::System.Web.UI.WebControls.TextBox txtSimHousePrice;
        protected global::System.Web.UI.WebControls.TextBox txtSimHouseDown;
        protected global::System.Web.UI.WebControls.DropDownList ddlSimVehicle;
        protected global::System.Web.UI.WebControls.TextBox txtSimVehiclePrice;
        protected global::System.Web.UI.WebControls.TextBox txtSimPcBudget;
        protected global::System.Web.UI.WebControls.TextBox txtSimHomeBudget;
        protected global::System.Web.UI.WebControls.Button btnRunLifeSim;
        
        protected global::System.Web.UI.WebControls.Literal litSimStatus;
        protected global::System.Web.UI.WebControls.Literal litTotalCommitment;
        protected global::System.Web.UI.WebControls.Literal litCrossDti;
        protected global::System.Web.UI.WebControls.Literal litRemainingIncome;
        protected global::System.Web.UI.WebControls.Repeater rptDependencyChain;
        protected global::System.Web.UI.WebControls.Repeater rptTradeoffs;
        protected global::System.Web.UI.WebControls.Button btnSaveCrossScenario;
    }
}
