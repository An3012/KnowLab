<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ScenarioControl.ascx.cs" Inherits="KnowLab.UserControls.Scenario.ScenarioControl" %>

<div class="mb-4">
    <h2 class="fw-bold mb-1"><i class="fa-solid fa-bookmark text-primary me-2"></i>Scenario &amp; Decision Journal (ASP.NET C#)</h2>
    <p class="text-secondary mb-0">Quản lý nhật ký ra quyết định có cơ sở và so sánh các kịch bản thử nghiệm C# backend.</p>
</div>

<div class="row g-4">
    <!-- SAVED SCENARIOS LIST -->
    <div class="col-lg-7">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="fw-bold mb-0"><i class="fa-solid fa-box-archive text-info me-2"></i>Kịch Bản Scenarios C# Đã Lưu</h5>
            <span class="badge bg-secondary-subtle text-white">Engine v1.0.0</span>
        </div>

        <asp:Repeater ID="rptScenarios" runat="server">
            <ItemTemplate>
                <div class="gc p-4 mb-3 border border-secondary-subtle rounded-4">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                        <h5 class="fw-bold mb-0 text-white"><%# Eval("Name") %></h5>
                        <span class="badge bg-purple-subtle text-purple"><%# Eval("DomainId") %></span>
                    </div>
                    <div class="small text-secondary mb-2">
                        Tạo lúc: <%# Eval("CreatedAt", "{0:dd/MM/yyyy HH:mm}") %> | Engine: <%# Eval("EngineVersion") %>
                    </div>
                    <div class="p-3 bg-dark rounded-3 small text-info mb-2">
                        <%# Eval("SummaryResults") %>
                    </div>
                    <asp:PlaceHolder ID="phNotes" runat="server" Visible='<%# !string.IsNullOrEmpty((string)Eval("UserNotes")) %>'>
                        <p class="small text-white-50 mb-2"><em>Ghi chú: <%# Eval("UserNotes") %></em></p>
                    </asp:PlaceHolder>
                    <div class="d-flex gap-2 mt-2 pt-2 border-top border-secondary-subtle">
                        <a href="Handlers/ExportHandler.ashx?type=json&id=<%# Eval("Id") %>" target="_blank" class="btn btn-sm btn-outline-info"><i class="fa-solid fa-file-code me-1"></i>Xuất JSON</a>
                        <a href="Handlers/ExportHandler.ashx?type=pdf&id=<%# Eval("Id") %>" target="_blank" class="btn btn-sm btn-outline-danger"><i class="fa-solid fa-file-pdf me-1"></i>Xuất PDF</a>
                        <a href="Handlers/ExportHandler.ashx?type=print&id=<%# Eval("Id") %>" target="_blank" class="btn btn-sm btn-outline-secondary"><i class="fa-solid fa-print me-1"></i>In Audit Report</a>
                    </div>
                </div>
            </ItemTemplate>
        </asp:Repeater>

        <!-- SCENARIO COMPARISON (DIFF A vs B) -->
        <div class="card bg-dark border-primary-subtle p-4 rounded-4 mt-4">
            <h5 class="fw-bold text-primary mb-3"><i class="fa-solid fa-code-compare me-2"></i>So Sánh 2 Kịch Bản (Scenario A vs B)</h5>
            <asp:Button ID="btnCompareScenarios" runat="server" Text="Chạy Phân Tích Khác Biệt Scenario" CssClass="bgrd w-100 justify-content-center" OnClick="btnCompareScenarios_Click" />
            
            <asp:Panel ID="pnlDiffResult" runat="server" Visible="false" CssClass="mt-3 p-3 bg-dark-subtle rounded-3 border border-secondary-subtle">
                <h6 class="fw-bold text-white mb-2">Kết Quả Phân Tích Khác Biệt:</h6>
                <ul class="text-secondary small ps-3 mb-2">
                    <asp:Repeater ID="rptDiffList" runat="server">
                        <ItemTemplate>
                            <li><%# Container.DataItem %></li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
                <p class="text-info small mb-0"><asp:Literal ID="litDiffRec" runat="server"></asp:Literal></p>
            </asp:Panel>
        </div>
    </div>

    <!-- DECISION JOURNAL -->
    <div class="col-lg-5">
        <div class="gc p-4 border border-secondary-subtle rounded-4 mb-4">
            <h5 class="fw-bold mb-3"><i class="fa-solid fa-pen-to-square text-warning me-2"></i>Ghi Decision Journal</h5>
            <div class="lab-input-group">
                <label class="lab-label">Mục tiêu của bạn:</label>
                <asp:TextBox ID="txtGoal" runat="server" CssClass="lab-control" placeholder="Vd: Mua nhà 2.5 tỷ hay đi thuê 3 năm tới?" />
            </div>
            <div class="lab-input-group">
                <label class="lab-label">Giả định chính:</label>
                <asp:TextBox ID="txtAssumptions" runat="server" CssClass="lab-control" TextMode="MultiLine" Rows="2" placeholder="Vd: Lãi suất thả nổi 10.5%, giá nhà tăng 5%/năm..." />
            </div>
            <div class="lab-input-group">
                <label class="lab-label">Quyết định của tôi:</label>
                <asp:TextBox ID="txtDecision" runat="server" CssClass="lab-control" TextMode="MultiLine" Rows="2" placeholder="Vd: Quyết định thuê nhà thêm 2 năm để tích đủ 40% vốn tự có..." />
            </div>
            <asp:Button ID="btnSaveJournal" runat="server" Text="Lưu Vào Decision Journal C#" CssClass="bgrd w-100 justify-content-center" OnClick="btnSaveJournal_Click" />
        </div>

        <!-- JOURNAL HISTORY -->
        <h5 class="fw-bold mb-3"><i class="fa-solid fa-book text-success me-2"></i>Nhật Ký Đã Ghi</h5>
        <asp:Repeater ID="rptJournals" runat="server">
            <ItemTemplate>
                <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                    <h6 class="fw-bold text-white mb-1"><%# Eval("Goal") %></h6>
                    <div class="small text-secondary mb-2">Tạo ngày: <%# Eval("CreatedAt", "{0:dd/MM/yyyy}") %></div>
                    <p class="small text-warning mb-1"><strong>Giả định:</strong> <%# Eval("Assumptions") %></p>
                    <p class="small text-success mb-0"><strong>Quyết định:</strong> <%# Eval("Decision") %></p>
                </div>
            </ItemTemplate>
        </asp:Repeater>
    </div>
</div>
