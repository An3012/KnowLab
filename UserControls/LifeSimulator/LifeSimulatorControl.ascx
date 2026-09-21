<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LifeSimulatorControl.ascx.cs" Inherits="KnowLab.UserControls.LifeSimulator.LifeSimulatorControl" %>

<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-layer-group text-purple me-2"></i>Cross-Domain Life Simulator (C# Sandbox)</h2>
        <p class="text-secondary mb-0">Mô phỏng tổng hợp tương tác giữa nhiều lĩnh vực: Tài chính BĐS + Phương tiện + Build PC + Sửa nhà.</p>
    </div>
    <span class="badge bg-purple-subtle text-purple fs-6 p-2 rounded-3">Engine v1.0.0 | Data 2026-01</span>
</div>

<div class="row g-4">
    <!-- INPUT FORM -->
    <div class="col-lg-5">
        <div class="gc p-4 border border-secondary-subtle rounded-4">
            <h4 class="fw-bold text-white mb-3"><i class="fa-solid fa-sliders text-info me-2"></i>Thông Số Thiết Lập Cuộc Sống</h4>
            
            <div class="lab-input-group">
                <label class="lab-label">Thu Nhập Ròng Hàng Tháng (VNĐ):</label>
                <asp:TextBox ID="txtSimIncome" runat="server" CssClass="lab-control" Text="45000000" TextMode="Number" />
            </div>

            <!-- HOUSING DOMAIN -->
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                <h6 class="fw-bold text-purple mb-2"><i class="fa-solid fa-building-user me-1"></i>Domain 1: Bất Động Sản (Vay Mua Nhà)</h6>
                <div class="row g-2">
                    <div class="col-7">
                        <label class="small text-secondary">Giá Căn Hộ (VNĐ):</label>
                        <asp:TextBox ID="txtSimHousePrice" runat="server" CssClass="lab-control" Text="2500000000" TextMode="Number" />
                    </div>
                    <div class="col-5">
                        <label class="small text-secondary">% Trả Trước:</label>
                        <asp:TextBox ID="txtSimHouseDown" runat="server" CssClass="lab-control" Text="30" TextMode="Number" />
                    </div>
                </div>
            </div>

            <!-- TRANSPORTATION DOMAIN -->
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                <h6 class="fw-bold text-success mb-2"><i class="fa-solid fa-car me-1"></i>Domain 2: Phương Tiện Đi Lại (TCO)</h6>
                <div class="row g-2">
                    <div class="col-6">
                        <label class="small text-secondary">Phương Tiện:</label>
                        <asp:DropDownList ID="ddlSimVehicle" runat="server" CssClass="form-select bg-dark text-white border-secondary-subtle">
                            <asp:ListItem Value="Car">Ô Tô Cá Nhân</asp:ListItem>
                            <asp:ListItem Value="Motorcycle">Xe Máy Tay Ga</asp:ListItem>
                            <asp:ListItem Value="None">Không Mua Xe</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="col-6">
                        <label class="small text-secondary">Giá Xe (VNĐ):</label>
                        <asp:TextBox ID="txtSimVehiclePrice" runat="server" CssClass="lab-control" Text="600000000" TextMode="Number" />
                    </div>
                </div>
            </div>

            <!-- PC & HOME DOMAINS -->
            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                <h6 class="fw-bold text-warning mb-2"><i class="fa-solid fa-microchip me-1"></i>Domain 3 &amp; 4: Build PC &amp; Sửa Nhà</h6>
                <div class="row g-2">
                    <div class="col-6">
                        <label class="small text-secondary">Ngân Sách PC (VNĐ):</label>
                        <asp:TextBox ID="txtSimPcBudget" runat="server" CssClass="lab-control" Text="25000000" TextMode="Number" />
                    </div>
                    <div class="col-6">
                        <label class="small text-secondary">Ngân Sách Sửa Nhà:</label>
                        <asp:TextBox ID="txtSimHomeBudget" runat="server" CssClass="lab-control" Text="100000000" TextMode="Number" />
                    </div>
                </div>
            </div>

            <asp:Button ID="btnRunLifeSim" runat="server" Text="Chạy Mô Phỏng Cross-Domain C#" CssClass="bgrd w-100 justify-content-center mt-2" OnClick="btnRunLifeSim_Click" />
        </div>
    </div>

    <!-- OUTPUT RESULTS & DEPENDENCY TREE -->
    <div class="col-lg-7">
        <div class="card bg-dark border-secondary-subtle p-4 rounded-4 mb-4">
            <h4 class="fw-bold text-white mb-3"><i class="fa-solid fa-chart-pie text-success me-2"></i>Kết Quả Mô Phỏng Tổng Thể (Explain Result)</h4>

            <div class="p-3 bg-dark-subtle rounded-3 border border-secondary-subtle mb-4">
                <asp:Literal ID="litSimStatus" runat="server">Nhấn "Chạy Mô Phỏng Cross-Domain C#" để bắt đầu.</asp:Literal>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-4">
                    <div class="p-3 bg-dark rounded-3 border border-secondary-subtle text-center">
                        <div class="small text-secondary">Tổng Cam Kết/Tháng:</div>
                        <div class="fw-bold text-warning fs-5">
                            <asp:Literal ID="litTotalCommitment" runat="server">0 VNĐ</asp:Literal>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-3 bg-dark rounded-3 border border-secondary-subtle text-center">
                        <div class="small text-secondary">Tỷ Lệ Cross-Domain DTI:</div>
                        <div class="fw-bold text-info fs-5">
                            <asp:Literal ID="litCrossDti" runat="server">0%</asp:Literal>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="p-3 bg-dark rounded-3 border border-secondary-subtle text-center">
                        <div class="small text-secondary">Dòng Tiền Dư Sinh Hoạt:</div>
                        <div class="fw-bold text-success fs-5">
                            <asp:Literal ID="litRemainingIncome" runat="server">0 VNĐ</asp:Literal>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DEPENDENCY TREE -->
            <div class="mb-4">
                <h6 class="fw-bold text-white mb-2"><i class="fa-solid fa-sitemap text-purple me-2"></i>Cây Phụ Thuộc Tác Động Chéo (Dependency Chain):</h6>
                <ul class="text-secondary small ps-3 mb-0">
                    <asp:Repeater ID="rptDependencyChain" runat="server">
                        <ItemTemplate>
                            <li class="mb-1"><%# Container.DataItem %></li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
            </div>

            <!-- CROSS-DOMAIN TRADEOFFS -->
            <div class="p-3 bg-dark rounded-3 border border-warning-subtle mb-4">
                <strong class="text-warning small"><i class="fa-solid fa-scale-balanced me-1"></i>Trade-offs Giữa Các Domain:</strong>
                <ul class="text-white-50 small ps-3 mb-0 mt-1">
                    <asp:Repeater ID="rptTradeoffs" runat="server">
                        <ItemTemplate>
                            <li><%# Container.DataItem %></li>
                        </ItemTemplate>
                    </asp:Repeater>
                </ul>
            </div>

            <div class="d-flex gap-2">
                <asp:Button ID="btnSaveCrossScenario" runat="server" Text="Lưu Kịch Bản Cross-Domain Vào Scenario C#" CssClass="boc flex-grow-1 justify-content-center" OnClick="btnSaveCrossScenario_Click" />
                <a href="Handlers/ExportHandler.ashx?type=json&id=scen-cross-01" target="_blank" class="btn btn-outline-info d-flex align-items-center"><i class="fa-solid fa-file-code me-1"></i>Xuất JSON</a>
                <a href="Handlers/ExportHandler.ashx?type=pdf&id=scen-cross-01" target="_blank" class="btn btn-outline-danger d-flex align-items-center"><i class="fa-solid fa-file-pdf me-1"></i>Xuất PDF</a>
            </div>
        </div>
    </div>
</div>
