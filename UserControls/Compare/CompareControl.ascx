<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompareControl.ascx.cs" Inherits="KnowLab.UserControls.Compare.CompareControl" %>

<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-code-compare text-primary me-2"></i>Ma Trận So Sánh Da Lĩnh Vực (ASP.NET C#)</h2>
        <p class="text-secondary mb-0">So sánh các đối tượng theo tiêu chí chuẩn hóa, hiển thị trade-off minh bạch không ép một winner duy nhất.</p>
    </div>
    
    <div class="d-flex gap-2">
        <asp:DropDownList ID="ddlDomain" runat="server" CssClass="form-select bg-dark text-white border-secondary-subtle" AutoPostBack="true" OnSelectedIndexChanged="ddlDomain_SelectedIndexChanged">
            <asp:ListItem Value="pc-building">Build PC (CPU i5-13600K vs Ryzen 7600X)</asp:ListItem>
            <asp:ListItem Value="cars">Ô Tô (Xe Điện EV vs Xe Xăng ICE)</asp:ListItem>
            <asp:ListItem Value="real-estate">Bất Động Sản (Dư Nợ Giảm Dần vs Trả Cố Định)</asp:ListItem>
        </asp:DropDownList>
    </div>
</div>

<div class="card bg-dark border-secondary-subtle p-4 rounded-4 mb-4">
    <h4 class="fw-bold text-white mb-3"><i class="fa-solid fa-table text-purple me-2"></i>Bảng Tiêu Chí So Sánh</h4>
    
    <div class="table-responsive">
        <asp:GridView ID="grdCompare" runat="server" AutoGenerateColumns="true" CssClass="table table-dark table-striped table-bordered align-middle mb-0">
            <HeaderStyle CssClass="table-purple-header" />
        </asp:GridView>
    </div>
</div>

<!-- TRADE-OFFS & ASSUMPTIONS -->
<div class="row g-4">
    <div class="col-md-6">
        <div class="gc p-4 h-100 border border-primary-subtle rounded-4">
            <h5 class="fw-bold text-primary mb-3"><i class="fa-solid fa-scale-balanced me-2"></i>Phân Tích Trade-Off (Được &amp; Mất)</h5>
            <ul class="text-secondary mb-0 ps-3">
                <asp:Repeater ID="rptTradeOffs" runat="server">
                    <ItemTemplate>
                        <li class="mb-2"><%# Container.DataItem %></li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
        </div>
    </div>
    
    <div class="col-md-6">
        <div class="gc p-4 h-100 border border-warning-subtle rounded-4">
            <h5 class="fw-bold text-warning mb-3"><i class="fa-solid fa-clipboard-check me-2"></i>Giả Định &amp; Điều Kiện Tính Toán</h5>
            <ul class="text-secondary mb-0 ps-3">
                <asp:Repeater ID="rptAssumptions" runat="server">
                    <ItemTemplate>
                        <li class="mb-2"><%# Container.DataItem %></li>
                    </ItemTemplate>
                </asp:Repeater>
            </ul>
        </div>
    </div>
</div>

<div class="mt-4 text-end">
    <asp:Button ID="btnSaveComparisonScenario" runat="server" Text="Lưu So Sánh Vào Scenario C#" CssClass="bgrd" OnClick="btnSaveComparisonScenario_Click" />
</div>
