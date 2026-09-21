namespace KnowLab.UserControls.Lab {
    public partial class LabControl {
        protected global::System.Web.UI.WebControls.Button btnLabRe;
        protected global::System.Web.UI.WebControls.Button btnLabPc;
        protected global::System.Web.UI.WebControls.Button btnLabCar;
        protected global::System.Web.UI.WebControls.Button btnLabMoto;
        protected global::System.Web.UI.WebControls.Button btnLabHome;
        protected global::System.Web.UI.WebControls.Button btnLabFs;
        protected global::System.Web.UI.WebControls.MultiView mvLab;
        
        // View 0: Mortgage
        protected global::System.Web.UI.WebControls.View vwMortgage;
        protected global::System.Web.UI.WebControls.TextBox txtPrice;
        protected global::System.Web.UI.WebControls.TextBox txtDownPercent;
        protected global::System.Web.UI.WebControls.TextBox txtRate;
        protected global::System.Web.UI.WebControls.TextBox txtTerm;
        protected global::System.Web.UI.WebControls.TextBox txtIncome;
        protected global::System.Web.UI.WebControls.Button btnCalcMortgage;
        protected global::System.Web.UI.WebControls.Literal litMonthlyPayment;
        protected global::System.Web.UI.WebControls.Literal litDti;
        protected global::System.Web.UI.WebControls.Literal litDownAmount;
        protected global::System.Web.UI.WebControls.Literal litTotalInterest;
        protected global::System.Web.UI.WebControls.Repeater rptMortgageAssumptions;
        protected global::System.Web.UI.WebControls.Button btnSaveMortgageScenario;

        // View 1: PC
        protected global::System.Web.UI.WebControls.View vwPCPower;
        protected global::System.Web.UI.WebControls.TextBox txtCpuTdp;
        protected global::System.Web.UI.WebControls.TextBox txtGpuTdp;
        protected global::System.Web.UI.WebControls.TextBox txtPsuWatt;
        protected global::System.Web.UI.WebControls.Button btnCalcPc;
        protected global::System.Web.UI.WebControls.Literal litPeakWatts;
        protected global::System.Web.UI.WebControls.Literal litPcStatus;
        protected global::System.Web.UI.WebControls.Literal litRecPsu;
        protected global::System.Web.UI.WebControls.Button btnSavePcScenario;

        // View 2: Car
        protected global::System.Web.UI.WebControls.View vwCar;
        protected global::System.Web.UI.WebControls.TextBox txtCarPrice;
        protected global::System.Web.UI.WebControls.TextBox txtCarKm;
        protected global::System.Web.UI.WebControls.DropDownList ddlCarEngine;
        protected global::System.Web.UI.WebControls.Button btnCalcCar;
        protected global::System.Web.UI.WebControls.Literal litCarTco;
        protected global::System.Web.UI.WebControls.Literal litCarMonthly;
        protected global::System.Web.UI.WebControls.Literal litCarNote;

        // View 3: Moto
        protected global::System.Web.UI.WebControls.View vwMoto;
        protected global::System.Web.UI.WebControls.TextBox txtMotoKm;
        protected global::System.Web.UI.WebControls.TextBox txtMotoFuelRate;
        protected global::System.Web.UI.WebControls.Button btnCalcMoto;
        protected global::System.Web.UI.WebControls.Literal litMotoMonthly;
        protected global::System.Web.UI.WebControls.Literal litMotoAnnual;

        // View 4: Home
        protected global::System.Web.UI.WebControls.View vwHome;
        protected global::System.Web.UI.WebControls.TextBox txtHomeLandArea;
        protected global::System.Web.UI.WebControls.TextBox txtHomeFloors;
        protected global::System.Web.UI.WebControls.Button btnCalcHome;
        protected global::System.Web.UI.WebControls.Literal litHomeTotal;
        protected global::System.Web.UI.WebControls.Literal litHomeArea;

        // View 5: FengShui
        protected global::System.Web.UI.WebControls.View vwFengShui;
        protected global::System.Web.UI.WebControls.DropDownList ddlFsDirection;
        protected global::System.Web.UI.WebControls.Button btnCalcFengShui;
        protected global::System.Web.UI.WebControls.Literal litFsEval;
        protected global::System.Web.UI.WebControls.Literal litFsDisclaimer;
    }
}
