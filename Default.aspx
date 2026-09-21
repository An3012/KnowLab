<%@ Page Title="Trang Chủ" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="KnowLab.DefaultPage" %>

<%@ Register Src="~/UserControls/Home/HomeControl.ascx" TagPrefix="uc" TagName="HomeControl" %>
<%@ Register Src="~/UserControls/Learn/LearnControl.ascx" TagPrefix="uc" TagName="LearnControl" %>
<%@ Register Src="~/UserControls/Lab/LabControl.ascx" TagPrefix="uc" TagName="LabControl" %>
<%@ Register Src="~/UserControls/LifeSimulator/LifeSimulatorControl.ascx" TagPrefix="uc" TagName="LifeSimulatorControl" %>
<%@ Register Src="~/UserControls/Explore/ExploreControl.ascx" TagPrefix="uc" TagName="ExploreControl" %>
<%@ Register Src="~/UserControls/Compare/CompareControl.ascx" TagPrefix="uc" TagName="CompareControl" %>
<%@ Register Src="~/UserControls/Scenario/ScenarioControl.ascx" TagPrefix="uc" TagName="ScenarioControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <asp:PlaceHolder ID="phControlHolder" runat="server">
    </asp:PlaceHolder>
</asp:Content>
