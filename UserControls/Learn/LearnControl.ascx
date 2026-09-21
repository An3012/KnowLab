<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LearnControl.ascx.cs" Inherits="KnowLab.UserControls.Learn.LearnControl" %>

<div class="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
    <div>
        <h2 class="fw-bold mb-1"><i class="fa-solid fa-graduation-cap text-purple me-2"></i>Lộ Trình Học Tập Level 0 &rarr; L4 (ASP.NET C#)</h2>
        <p class="text-secondary mb-0">Học theo quy trình chuẩn: Khái niệm &rarr; Ví dụ thực tế &rarr; Mini-Quiz &rarr; Thực hành Lab.</p>
    </div>
    
    <div class="badge bg-purple-subtle text-purple fs-6 p-2 rounded-3">
        Tiến Độ: <asp:Literal ID="litProgressText" runat="server">0 Khái Niệm Đã Học</asp:Literal>
    </div>
</div>

<div class="row g-4">
    <!-- LESSON READER -->
    <div class="col-lg-8">
        <div class="card bg-dark border-secondary-subtle p-4 rounded-4 mb-4">
            <span class="badge bg-primary text-white mb-2 align-self-start fs-7">
                Level <asp:Literal ID="litLessonLevel" runat="server">0</asp:Literal>
            </span>
            <h3 class="fw-bold text-white mb-2"><asp:Literal ID="litLessonTitle" runat="server">Chọn một bài học để bắt đầu</asp:Literal></h3>
            <p class="text-info fw-semibold mb-3"><asp:Literal ID="litLessonSummary" runat="server"></asp:Literal></p>
            
            <div class="p-3 bg-dark-subtle rounded-3 border border-secondary-subtle text-white-50 mb-4">
                <asp:Literal ID="litLessonExplanation" runat="server">Vui lòng chọn bài học bên danh sách bên phải.</asp:Literal>
            </div>

            <!-- MINI QUIZ CARD -->
            <asp:Panel ID="pnlQuiz" runat="server" Visible="false" CssClass="p-4 bg-dark rounded-4 border border-warning-subtle">
                <h5 class="fw-bold text-warning mb-3"><i class="fa-solid fa-circle-question me-2"></i>Mini-Quiz Kiểm Tra Nhanh</h5>
                <p class="text-white fw-semibold mb-3"><asp:Literal ID="litQuizQuestion" runat="server"></asp:Literal></p>
                
                <asp:RadioButtonList ID="rblQuizOptions" runat="server" CssClass="text-secondary mb-3 radio-options" style="line-height:2rem;"></asp:RadioButtonList>
                
                <asp:Button ID="btnSubmitQuiz" runat="server" Text="Nộp Bài Kiểm Tra C#" CssClass="bgrd btn-sm" OnClick="btnSubmitQuiz_Click" />
                
                <asp:Panel ID="pnlQuizFeedback" runat="server" Visible="false" CssClass="mt-3 p-3 rounded-3">
                    <asp:Literal ID="litQuizFeedback" runat="server"></asp:Literal>
                </asp:Panel>
            </asp:Panel>
        </div>
    </div>

    <!-- ROADMAP LESSONS LIST -->
    <div class="col-lg-4">
        <div class="gc p-4 border border-secondary-subtle rounded-4">
            <h5 class="fw-bold mb-3"><i class="fa-solid fa-list-check text-success me-2"></i>Lộ Trình Các Bài Học</h5>
            
            <asp:Repeater ID="rptRoadmapLessons" runat="server">
                <ItemTemplate>
                    <div class="p-3 bg-dark rounded-3 border border-secondary-subtle mb-2 d-flex align-items-center justify-content-between">
                        <div>
                            <span class="badge bg-secondary text-white fs-8">L<%# Eval("Level") %></span>
                            <strong class="text-white small ms-1"><%# Eval("Title") %></strong>
                        </div>
                        <asp:LinkButton ID="btnSelectLesson" runat="server" CssClass="btn btn-sm btn-outline-purple" CommandArgument='<%# Eval("Id") %>' OnClick="btnSelectLesson_Click">
                            Học ngay &rarr;
                        </asp:LinkButton>
                    </div>
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </div>
</div>
