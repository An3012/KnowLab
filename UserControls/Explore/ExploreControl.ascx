<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ExploreControl.ascx.cs" Inherits="KnowLab.UserControls.Explore.ExploreControl" %>

<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-book-open text-info me-2"></i>Thư Viện Concept &amp; Glossary (ASP.NET C#)</h2>
        <p class="text-secondary mb-0">Hệ thống từ điển thuật ngữ &amp; khái niệm từ Level 0 (Mới bắt đầu) đến Level 4 (Chuyên sâu).</p>
    </div>
    
    <div class="d-flex gap-2 align-items-center">
        <asp:TextBox ID="txtExploreSearch" runat="server" CssClass="form-control bg-dark text-white border-secondary-subtle" placeholder="Tìm thuật ngữ hoặc bài học..." OnTextChanged="btnSearch_Click" AutoPostBack="true" style="width:240px;" />
        <asp:Button ID="btnSearch" runat="server" Text="Tìm kiếm" CssClass="bgrd btn-sm" OnClick="btnSearch_Click" />
    </div>
</div>

<!-- DOMAIN SELECTOR TABS -->
<div class="d-flex gap-2 mb-4 overflow-auto pb-2">
    <asp:LinkButton ID="btnDomainAll" runat="server" CssClass="btn btn-sm btn-outline-purple active" OnClick="FilterDomain_Click" CommandArgument="">Tất Cả Domain</asp:LinkButton>
    <asp:LinkButton ID="btnDomainRe" runat="server" CssClass="btn btn-sm btn-outline-purple" OnClick="FilterDomain_Click" CommandArgument="real-estate">Bất Động Sản</asp:LinkButton>
    <asp:LinkButton ID="btnDomainPc" runat="server" CssClass="btn btn-sm btn-outline-purple" OnClick="FilterDomain_Click" CommandArgument="pc-building">Build PC</asp:LinkButton>
    <asp:LinkButton ID="btnDomainCar" runat="server" CssClass="btn btn-sm btn-outline-purple" OnClick="FilterDomain_Click" CommandArgument="cars">Ô Tô</asp:LinkButton>
    <asp:LinkButton ID="btnDomainMoto" runat="server" CssClass="btn btn-sm btn-outline-purple" OnClick="FilterDomain_Click" CommandArgument="motorcycles">Xe Máy</asp:LinkButton>
    <asp:LinkButton ID="btnDomainHome" runat="server" CssClass="btn btn-sm btn-outline-purple" OnClick="FilterDomain_Click" CommandArgument="home">Nhà Cửa</asp:LinkButton>
    <asp:LinkButton ID="btnDomainFs" runat="server" CssClass="btn btn-sm btn-outline-purple" OnClick="FilterDomain_Click" CommandArgument="feng-shui">Phong Thủy Vui</asp:LinkButton>
</div>

<!-- CONCEPTS GRID -->
<h4 class="fw-bold mb-3"><i class="fa-solid fa-layer-group text-primary me-2"></i>Danh Sách Khái Niệm</h4>
<div class="row g-4 mb-5">
    <asp:Repeater ID="rptConcepts" runat="server">
        <ItemTemplate>
            <div class="col-md-6">
                <div class="gc p-4 h-100 border border-secondary-subtle rounded-4 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <h5 class="fw-bold mb-0 text-white"><%# Eval("Title") %></h5>
                            <span class="badge bg-purple-subtle text-purple fs-7">Level <%# Eval("Level") %></span>
                        </div>
                        <p class="fw-semibold text-info small mb-3"><%# Eval("Summary") %></p>
                        <p class="text-secondary small mb-3"><%# Eval("Explanation") %></p>
                        
                        <div class="p-3 bg-dark rounded-3 mb-2 border border-secondary-subtle">
                            <strong class="text-warning small"><i class="fa-solid fa-circle-question me-1"></i>Tại sao quan trọng?</strong>
                            <p class="text-white-50 small mb-0 mt-1"><%# Eval("WhyItMatters") %></p>
                        </div>
                        <div class="p-3 bg-dark rounded-3 mb-3 border border-secondary-subtle">
                            <strong class="text-danger small"><i class="fa-solid fa-triangle-exclamation me-1"></i>Sai lầm phổ biến:</strong>
                            <p class="text-white-50 small mb-0 mt-1"><%# Eval("CommonMistakes") %></p>
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between pt-2 border-top border-secondary-subtle mt-3">
                        <span class="small text-secondary"><i class="fa-solid fa-lightbulb me-1"></i>Ví dụ: <%# Eval("RealExample") %></span>
                        <asp:LinkButton ID="btnMarkDone" runat="server" CssClass="btn btn-sm btn-outline-success" CommandName="Complete" CommandArgument='<%# Eval("Id") %>' OnClick="btnMarkDone_Click">
                            <i class="fa-solid fa-check me-1"></i>Đã Hiểu
                        </asp:LinkButton>
                    </div>
                </div>
            </div>
        </ItemTemplate>
    </asp:Repeater>
</div>

<!-- GLOSSARY SECTION -->
<div class="card bg-dark border-secondary-subtle p-4 rounded-4 mt-4">
    <h4 class="fw-bold mb-3"><i class="fa-solid fa-spell-check text-warning me-2"></i>Tra Cứu Từ Điển Glossary Phổ Biến</h4>
    <div class="table-responsive">
        <asp:GridView ID="grdGlossary" runat="server" AutoGenerateColumns="false" CssClass="table table-dark table-hover align-middle mb-0">
            <Columns>
                <asp:BoundField DataField="Term" HeaderText="Thuật Ngữ" HeaderStyle-CssClass="text-info fw-bold" ItemStyle-CssClass="fw-bold text-white" />
                <asp:BoundField DataField="ShortDefinition" HeaderText="Định Nghĩa 1 Cầu" HeaderStyle-CssClass="text-secondary" ItemStyle-CssClass="text-white-50" />
                <asp:BoundField DataField="DetailedExplanation" HeaderText="Giải Thích Chi Tiết" HeaderStyle-CssClass="text-secondary" ItemStyle-CssClass="text-secondary small" />
            </Columns>
        </asp:GridView>
    </div>
</div>
