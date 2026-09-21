<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HomeControl.ascx.cs" Inherits="KnowLab.UserControls.Home.HomeControl" %>

<!-- HERO INTENT SECTION -->
<div class="intent-hero">
    <div class="intent-badge"><i class="fa-solid fa-sparkles text-warning me-1"></i> Zero-Knowledge First Platform</div>
    <h1 class="intent-title">Bạn muốn <span class="gt">hiểu &amp; tính toán điều gì</span> hôm nay?</h1>
    <p class="text-secondary mx-auto mb-4" style="max-width: 650px; font-size: 1.05rem;">
        Biến người hoàn toàn chưa biết gì thành người có thể <strong>hiểu &rarr; học &rarr; thử &rarr; tính toán &rarr; mô phỏng &rarr; so sánh &rarr; ra quyết định</strong> có cơ sở.
    </p>

    <!-- INTENT WIZARD SHORTCUTS -->
    <div class="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-4">
        <a href="Default.aspx?view=lab&tab=mortgage" class="btn btn-outline-primary rounded-pill btn-sm"><i class="fa-solid fa-building-user me-1"></i> Vay Mua Nhà</a>
        <a href="Default.aspx?view=lab&tab=pc" class="btn btn-outline-info rounded-pill btn-sm"><i class="fa-solid fa-microchip me-1"></i> Build PC 25 Tr</a>
        <a href="Default.aspx?view=lab&tab=car" class="btn btn-outline-success rounded-pill btn-sm"><i class="fa-solid fa-car me-1"></i> Nuôi Ô Tô 5 Năm</a>
        <a href="Default.aspx?view=lab&tab=moto" class="btn btn-outline-warning rounded-pill btn-sm"><i class="fa-solid fa-motorcycle me-1"></i> Phí Xe Máy Đô Thị</a>
        <a href="Default.aspx?view=lab&tab=home" class="btn btn-outline-danger rounded-pill btn-sm"><i class="fa-solid fa-house-hammer me-1"></i> Ngân Sách Xây Nhà</a>
        <a href="Default.aspx?view=lab&tab=fengshui" class="btn btn-outline-secondary rounded-pill btn-sm"><i class="fa-solid fa-compass me-1"></i> Phong Thủy Không Gian</a>
    </div>

    <!-- SEARCH BOX -->
    <div class="intent-search-box">
        <i class="fa-solid fa-magnifying-glass intent-search-icon"></i>
        <asp:TextBox ID="txtHomeSearch" runat="server" CssClass="intent-search-input" placeholder="Nhập từ khóa (vd: TDP, DTI, Vay mua nhà, Bottleneck, TCO ô tô...)" OnTextChanged="txtHomeSearch_TextChanged" AutoPostBack="true" />
    </div>
</div>

<!-- USER PROGRESS & LEVEL CARD -->
<div class="card bg-dark border-secondary-subtle p-3 mb-4 rounded-4">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div class="d-flex align-items-center gap-3">
            <div class="rounded-circle bg-purple-subtle text-purple d-flex align-items-center justify-content-center fw-bold fs-4" style="width:50px;height:50px;">
                L<asp:Literal ID="litUserLevelNumber" runat="server">0</asp:Literal>
            </div>
            <div>
                <h5 class="fw-bold text-white mb-0">Cấp Độ Học Tập: <asp:Literal ID="litUserLevelTitle" runat="server">Level 0 — Chưa biết gì</asp:Literal></h5>
                <p class="text-secondary small mb-0"><asp:Literal ID="litProgressSummary" runat="server">Đã hoàn thành 0 khái niệm. Đang học lộ trình cơ bản.</asp:Literal></p>
            </div>
        </div>
        <div>
            <a href="Default.aspx?view=explore" class="bgrd btn-sm text-decoration-none"><i class="fa-solid fa-graduation-cap me-1"></i> Học Bài Tiếp Theo</a>
        </div>
    </div>
</div>

<!-- 6 DOMAINS GRID -->
<div class="d-flex align-items-center justify-content-between mb-3">
    <div>
        <h3 class="fw-bold mb-1">6 Lĩnh Vực Kiến Thức &amp; Mô Phỏng</h3>
        <p class="text-secondary small mb-0">Chọn một lĩnh vực để bắt đầu học lộ trình từ L0 đến L4 hoặc chạy ngay công cụ mô phỏng C#.</p>
    </div>
</div>

<div class="domain-grid">
    <asp:Repeater ID="rptDomains" runat="server">
        <ItemTemplate>
            <div class="domain-card" onclick="location.href='Default.aspx?view=explore&domain=<%# Eval("Id") %>'">
                <div class="domain-icon-wrapper" style="color: <%# Eval("Color") %>">
                    <i class="fa-solid <%# Eval("Icon") %>"></i>
                </div>
                <h4 class="domain-title"><%# Eval("Name") %></h4>
                <p class="domain-desc"><%# Eval("Desc") %></p>
                <div class="domain-meta">
                    <span><i class="fa-solid fa-layer-group me-1"></i> <%# Eval("LevelsCount") %> Cấp Độ (L0-L4)</span>
                    <span class="fw-bold" style="color: <%# Eval("Color") %>">Khám phá &rarr;</span>
                </div>
            </div>
        </ItemTemplate>
    </asp:Repeater>
</div>

<!-- POPULAR EXPERIMENTS -->
<div class="mt-5">
    <h4 class="fw-bold mb-3"><i class="fa-solid fa-flask-vial text-warning me-2"></i>Thử Nghiệm Mô Phỏng Phổ Biến (C# Universal Lab)</h4>
    <div class="row g-3">
        <div class="col-md-4">
            <div class="gc p-3 h-100">
                <h6 class="fw-bold text-primary mb-2"><i class="fa-solid fa-calculator me-1"></i> Tính Toán Nợ Vay BĐS (DTI)</h6>
                <p class="text-secondary small mb-3">Nhập thu nhập &amp; giá nhà để kiểm tra tỷ lệ nợ DTI an toàn dưới 40%.</p>
                <a href="Default.aspx?view=lab&tab=mortgage" class="btn btn-sm btn-outline-primary w-100">Chạy Mô Phỏng Nợ Vay</a>
            </div>
        </div>
        <div class="col-md-4">
            <div class="gc p-3 h-100">
                <h6 class="fw-bold text-info mb-2"><i class="fa-solid fa-bolt me-1"></i> Kiểm Tra Nguồn PC &amp; Headroom</h6>
                <p class="text-secondary small mb-3">Tính công suất nguồn PSU cần thiết cho TDP của CPU &amp; GPU.</p>
                <a href="Default.aspx?view=lab&tab=pc" class="btn btn-sm btn-outline-info w-100">Tính Nguồn PC ngay</a>
            </div>
        </div>
        <div class="col-md-4">
            <div class="gc p-3 h-100">
                <h6 class="fw-bold text-success mb-2"><i class="fa-solid fa-car me-1"></i> So Sánh Chi Phí Ô Tô Xăng vs Điện</h6>
                <p class="text-secondary small mb-3">Tính tổng chi phí sở hữu TCO 5 năm bao gồm khấu hao &amp; bảo dưỡng.</p>
                <a href="Default.aspx?view=lab&tab=car" class="btn btn-sm btn-outline-success w-100">So Sánh TCO 5 Năm</a>
            </div>
        </div>
    </div>
</div>
