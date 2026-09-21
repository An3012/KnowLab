<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LabControl.ascx.cs" Inherits="KnowLab.UserControls.Lab.LabControl" %>

<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-flask-vial text-warning me-2"></i>Universal Lab &amp; Simulation Engine (ASP.NET C#)</h2>
        <p class="text-secondary mb-0">Mô phỏng tính toán C# backend với đầy đủ giả định minh bạch theo quy chuẩn Explain Result Pattern.</p>
    </div>
    
    <!-- DOMAIN TABS FOR LAB ENGINE -->
    <div class="d-flex gap-1 flex-wrap">
        <asp:Button ID="btnLabRe" runat="server" Text="BĐS Mortgage" CssClass="boc active" OnClick="btnLabRe_Click" />
        <asp:Button ID="btnLabPc" runat="server" Text="Build PC" CssClass="boc" OnClick="btnLabPc_Click" />
        <asp:Button ID="btnLabCar" runat="server" Text="Ô Tô TCO" CssClass="boc" OnClick="btnLabCar_Click" />
        <asp:Button ID="btnLabMoto" runat="server" Text="Xe Máy Đô Thị" CssClass="boc" OnClick="btnLabMoto_Click" />
        <asp:Button ID="btnLabHome" runat="server" Text="Nhà Cửa" CssClass="boc" OnClick="btnLabHome_Click" />
        <asp:Button ID="btnLabFs" runat="server" Text="Phong Thủy Vui" CssClass="boc" OnClick="btnLabFs_Click" />
    </div>
</div>

<asp:MultiView ID="mvLab" runat="server" ActiveViewIndex="0">
    <!-- VIEW 0: REAL ESTATE MORTGAGE -->
    <asp:View ID="vwMortgage" runat="server">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-sliders text-purple me-2"></i>Thông Số Đầu Vào Vay Mua BĐS</h4>
                    
                    <div class="lab-input-group">
                        <label class="lab-label">Giá Trị Bất Động Sản (VNĐ):</label>
                        <asp:TextBox ID="txtPrice" runat="server" CssClass="lab-control" Text="2500000000" TextMode="Number" />
                    </div>

                    <div class="row g-3">
                        <div class="col-6">
                            <div class="lab-input-group">
                                <label class="lab-label">% Trả Trước (%):</label>
                                <asp:TextBox ID="txtDownPercent" runat="server" CssClass="lab-control" Text="30" TextMode="Number" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="lab-input-group">
                                <label class="lab-label">Lãi Suất Vay (%/năm):</label>
                                <asp:TextBox ID="txtRate" runat="server" CssClass="lab-control" Text="9.5" />
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-6">
                            <div class="lab-input-group">
                                <label class="lab-label">Thời Hạn Vay (Năm):</label>
                                <asp:TextBox ID="txtTerm" runat="server" CssClass="lab-control" Text="20" TextMode="Number" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="lab-input-group">
                                <label class="lab-label">Thu Nhập Hàng Tháng (VNĐ):</label>
                                <asp:TextBox ID="txtIncome" runat="server" CssClass="lab-control" Text="35000000" TextMode="Number" />
                            </div>
                        </div>
                    </div>

                    <asp:Button ID="btnCalcMortgage" runat="server" Text="Chạy Mô Phỏng C#" CssClass="bgrd w-100 justify-content-center mt-3" OnClick="btnCalcMortgage_Click" />
                </div>
            </div>

            <div class="col-lg-6">
                <div class="lab-card bg-dark-subtle border-primary-subtle">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-chart-pie text-success me-2"></i>Kết Quả Mô Phỏng C# (Explain Result)</h4>
                    
                    <div class="mb-4">
                        <span class="text-secondary small">Gốc &amp; Lãi Trả Hàng Tháng (Tháng 1):</span>
                        <div class="output-hero-val text-success">
                            <asp:Literal ID="litMonthlyPayment" runat="server">0 VNĐ/tháng</asp:Literal>
                        </div>
                        <div class="d-flex align-items-center gap-2 mt-1">
                            <span class="data-tag tag-estimate">Mô Phỏng C#</span>
                            <span class="small text-secondary">
                                <asp:Literal ID="litDti" runat="server">Tỷ lệ DTI: 0%</asp:Literal>
                            </span>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-6">
                            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle">
                                <div class="small text-secondary">Số Tiền Trả Trước:</div>
                                <div class="fw-bold text-white fs-6">
                                    <asp:Literal ID="litDownAmount" runat="server">0 VNĐ</asp:Literal>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="p-3 bg-dark rounded-3 border border-secondary-subtle">
                                <div class="small text-secondary">Tổng Tiền Lãi Phải Trả:</div>
                                <div class="fw-bold text-warning fs-6">
                                    <asp:Literal ID="litTotalInterest" runat="server">0 VNĐ</asp:Literal>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <strong class="small text-white">Giả Định &amp; Công Thức C#:</strong>
                        <ul class="small text-secondary mb-0 ps-3 mt-1">
                            <asp:Repeater ID="rptMortgageAssumptions" runat="server">
                                <ItemTemplate>
                                    <li><%# Container.DataItem %></li>
                                </ItemTemplate>
                            </asp:Repeater>
                        </ul>
                    </div>

                    <asp:Button ID="btnSaveMortgageScenario" runat="server" Text="Lưu Kịch Bản Scenario C#" CssClass="boc w-100 justify-content-center mt-2" OnClick="btnSaveMortgageScenario_Click" />
                </div>
            </div>
        </div>
    </asp:View>

    <!-- VIEW 1: PC POWER & BOTTLENECK -->
    <asp:View ID="vwPCPower" runat="server">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-bolt text-info me-2"></i>Thông Số Nguồn &amp; Nghẽn PC</h4>
                    
                    <div class="lab-input-group">
                        <label class="lab-label">Mức Thỏa Nhiệt CPU TDP (Watt):</label>
                        <asp:TextBox ID="txtCpuTdp" runat="server" CssClass="lab-control" Text="125" TextMode="Number" />
                    </div>
                    <div class="lab-input-group">
                        <label class="lab-label">Công Suất GPU TDP (Watt):</label>
                        <asp:TextBox ID="txtGpuTdp" runat="server" CssClass="lab-control" Text="220" TextMode="Number" />
                    </div>
                    <div class="lab-input-group">
                        <label class="lab-label">Công Suất Nguồn PSU (Watt):</label>
                        <asp:TextBox ID="txtPsuWatt" runat="server" CssClass="lab-control" Text="750" TextMode="Number" />
                    </div>

                    <asp:Button ID="btnCalcPc" runat="server" Text="Tính Toán Nguồn C#" CssClass="bgrd w-100 justify-content-center mt-3" OnClick="btnCalcPc_Click" />
                </div>
            </div>

            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-microchip text-primary me-2"></i>Kết Quả An Toàn Nguồn &amp; Headroom</h4>
                    <div class="output-hero-val text-info">
                        <asp:Literal ID="litPeakWatts" runat="server">0 W Peak</asp:Literal>
                    </div>
                    <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                        <asp:Literal ID="litPcStatus" runat="server">Nhấn "Tính Toán Nguồn C#" để bắt đầu.</asp:Literal>
                    </div>
                    <div class="small text-secondary mb-3">
                        * Nguồn đề xuất an toàn: <strong class="text-white"><asp:Literal ID="litRecPsu" runat="server">0 W</asp:Literal></strong>
                    </div>
                    <asp:Button ID="btnSavePcScenario" runat="server" Text="Lưu Kịch Bản PC Scenario C#" CssClass="boc w-100 justify-content-center mt-2" OnClick="btnSavePcScenario_Click" />
                </div>
            </div>
        </div>
    </asp:View>

    <!-- VIEW 2: CARS TCO -->
    <asp:View ID="vwCar" runat="server">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-car text-success me-2"></i>Thông Số Chi Phí Ô Tô 5 Năm</h4>
                    <div class="lab-input-group">
                        <label class="lab-label">Giá Xe Niêm Yết (VNĐ):</label>
                        <asp:TextBox ID="txtCarPrice" runat="server" CssClass="lab-control" Text="600000000" TextMode="Number" />
                    </div>
                    <div class="lab-input-group">
                        <label class="lab-label">Quãng Đường Đi Hàng Năm (km):</label>
                        <asp:TextBox ID="txtCarKm" runat="server" CssClass="lab-control" Text="15000" TextMode="Number" />
                    </div>
                    <div class="lab-input-group">
                        <label class="lab-label">Loại Động Cơ:</label>
                        <asp:DropDownList ID="ddlCarEngine" runat="server" CssClass="form-select bg-dark text-white border-secondary-subtle">
                            <asp:ListItem Value="Petrol">Xe Xăng (ICE)</asp:ListItem>
                            <asp:ListItem Value="Electric">Xe Điện (EV)</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <asp:Button ID="btnCalcCar" runat="server" Text="Tính Chi Phí TCO Ô Tô" CssClass="bgrd w-100 justify-content-center mt-3" OnClick="btnCalcCar_Click" />
                </div>
            </div>
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-chart-line text-success me-2"></i>Tổng Chi Phí Sử Dụng (TCO 5 Năm)</h4>
                    <div class="output-hero-val text-success">
                        <asp:Literal ID="litCarTco" runat="server">0 VNĐ</asp:Literal>
                    </div>
                    <p class="text-secondary small"><asp:Literal ID="litCarMonthly" runat="server">Trung bình: 0 VNĐ/tháng</asp:Literal></p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-3">
                        <asp:Literal ID="litCarNote" runat="server">Kết quả so sánh nhiên liệu &amp; khấu hao C#.</asp:Literal>
                    </div>
                </div>
            </div>
        </div>
    </asp:View>

    <!-- VIEW 3: MOTORCYCLES -->
    <asp:View ID="vwMoto" runat="server">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-motorcycle text-warning me-2"></i>Chi Phí Xe Máy Đi Lại Đô Thị</h4>
                    <div class="lab-input-group">
                        <label class="lab-label">Quãng Đường Đi Hàng Ngày (km):</label>
                        <asp:TextBox ID="txtMotoKm" runat="server" CssClass="lab-control" Text="25" TextMode="Number" />
                    </div>
                    <div class="lab-input-group">
                        <label class="lab-label">Mức Tiêu Thụ Nhiên Liệu (lít/100km):</label>
                        <asp:TextBox ID="txtMotoFuelRate" runat="server" CssClass="lab-control" Text="2.2" />
                    </div>
                    <asp:Button ID="btnCalcMoto" runat="server" Text="Tính Phí Xe Máy C#" CssClass="bgrd w-100 justify-content-center mt-3" OnClick="btnCalcMoto_Click" />
                </div>
            </div>
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-coins text-warning me-2"></i>Kết Quả Nuôi Xe Máy Hàng Tháng</h4>
                    <div class="output-hero-val text-warning">
                        <asp:Literal ID="litMotoMonthly" runat="server">0 VNĐ/tháng</asp:Literal>
                    </div>
                    <p class="text-secondary small"><asp:Literal ID="litMotoAnnual" runat="server">Tổng năm: 0 VNĐ</asp:Literal></p>
                </div>
            </div>
        </div>
    </asp:View>

    <!-- VIEW 4: HOME RENOVATION -->
    <asp:View ID="vwHome" runat="server">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-house-hammer text-danger me-2"></i>Dự Toán Ngân Sách Xây/Sửa Nhà</h4>
                    <div class="lab-input-group">
                        <label class="lab-label">Diện Tích Đất (m²):</label>
                        <asp:TextBox ID="txtHomeLandArea" runat="server" CssClass="lab-control" Text="60" TextMode="Number" />
                    </div>
                    <div class="lab-input-group">
                        <label class="lab-label">Số Tầng Sàn:</label>
                        <asp:TextBox ID="txtHomeFloors" runat="server" CssClass="lab-control" Text="2" TextMode="Number" />
                    </div>
                    <asp:Button ID="btnCalcHome" runat="server" Text="Tính Ngân Sách Xây Nhà C#" CssClass="bgrd w-100 justify-content-center mt-3" OnClick="btnCalcHome_Click" />
                </div>
            </div>
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-calculator text-danger me-2"></i>Ước Tính Tổng Ngân Sách</h4>
                    <div class="output-hero-val text-danger">
                        <asp:Literal ID="litHomeTotal" runat="server">0 VNĐ</asp:Literal>
                    </div>
                    <p class="text-secondary small"><asp:Literal ID="litHomeArea" runat="server">Tổng diện tích quy đổi: 0 m²</asp:Literal></p>
                </div>
            </div>
        </div>
    </asp:View>

    <!-- VIEW 5: FENG SHUI -->
    <asp:View ID="vwFengShui" runat="server">
        <div class="row g-4">
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-compass text-purple me-2"></i>Mô Phỏng Hướng &amp; Không Gian Nhà Cửa</h4>
                    <div class="lab-input-group">
                        <label class="lab-label">Hướng Nhà Chính:</label>
                        <asp:DropDownList ID="ddlFsDirection" runat="server" CssClass="form-select bg-dark text-white border-secondary-subtle">
                            <asp:ListItem Value="Nam">Hướng Nam (Đón gió mát)</asp:ListItem>
                            <asp:ListItem Value="DongNam">Hướng Đông Nam (Khí hậu ôn hòa)</asp:ListItem>
                            <asp:ListItem Value="Tay">Hướng Tây (Nắng chiều)</asp:ListItem>
                            <asp:ListItem Value="Bac">Hướng Bắc (Gió lạnh mùa đông)</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <asp:Button ID="btnCalcFengShui" runat="server" Text="Xem Phân Tích Không Gian C#" CssClass="bgrd w-100 justify-content-center mt-3" OnClick="btnCalcFengShui_Click" />
                </div>
            </div>
            <div class="col-lg-6">
                <div class="lab-card">
                    <h4 class="fw-bold mb-3"><i class="fa-solid fa-sun text-purple me-2"></i>Đánh Giá Đối Lưu &amp; Ánh Sáng</h4>
                    <p class="fw-bold text-white fs-6"><asp:Literal ID="litFsEval" runat="server">Chọn hướng nhà để xem phân tích.</asp:Literal></p>
                    <div class="p-3 bg-dark rounded-3 border border-secondary-subtle text-secondary small">
                        <asp:Literal ID="litFsDisclaimer" runat="server">Mọi phân tích phong thủy được contextualize dưới góc nhìn khoa học bố trí ánh sáng tự nhiên &amp; thông gió.</asp:Literal>
                    </div>
                </div>
            </div>
        </div>
    </asp:View>
</asp:MultiView>
