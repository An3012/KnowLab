﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace KnowLab.Engines
{
    public class DomainModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Color { get; set; }
        public string Desc { get; set; }
        public int LevelsCount { get; set; }
    }

    public class ConceptModel
    {
        public string Id { get; set; }
        public string DomainId { get; set; }
        public string Title { get; set; }
        public int Level { get; set; } // 0: Chưa biết gì, 1: Cơ bản, 2: Thực hành, 3: Nâng cao, 4: Chuyên sâu
        public string Summary { get; set; }
        public string Explanation { get; set; }
        public string WhyItMatters { get; set; }
        public string CommonMistakes { get; set; }
        public string RealExample { get; set; }
        public List<string> Prerequisites { get; set; }
        public List<string> RelatedConceptIds { get; set; }

        public ConceptModel()
        {
            Prerequisites = new List<string>();
            RelatedConceptIds = new List<string>();
        }
    }

    public class GlossaryItemModel
    {
        public string Term { get; set; }
        public string DomainId { get; set; }
        public string ShortDefinition { get; set; }
        public string DetailedExplanation { get; set; }
        public string ConceptId { get; set; }
    }

    public class QuizQuestionModel
    {
        public string Id { get; set; }
        public string ConceptId { get; set; }
        public string QuestionText { get; set; }
        public List<string> Options { get; set; }
        public int CorrectOptionIndex { get; set; }
        public string Explanation { get; set; }

        public QuizQuestionModel()
        {
            Options = new List<string>();
        }
    }

    public static class KnowledgeEngine
    {
        private static readonly List<DomainModel> _domains;
        private static readonly List<ConceptModel> _concepts;
        private static readonly List<GlossaryItemModel> _glossary;
        private static readonly List<QuizQuestionModel> _quizzes;

        static KnowledgeEngine()
        {
            _domains = new List<DomainModel>
            {
                new DomainModel { Id = "real-estate", Name = "Bất Động Sản", Icon = "fa-building-user", Color = "#8b5cf6", Desc = "Vay mua nhà, dòng tiền tài chính & phân tích rủi ro lãi suất.", LevelsCount = 5 },
                new DomainModel { Id = "pc-building", Name = "Build PC", Icon = "fa-microchip", Color = "#3b82f6", Desc = "Tương thích linh kiện CPU/GPU/RAM/PSU, nguồn điện & Nghẽn cổ chai.", LevelsCount = 5 },
                new DomainModel { Id = "cars", Name = "Ô Tô", Icon = "fa-car", Color = "#34d399", Desc = "Tổng chi phí sở hữu 5 năm (TCO), khấu hao xe & Xăng vs Điện.", LevelsCount = 5 },
                new DomainModel { Id = "motorcycles", Name = "Xe Máy", Icon = "fa-motorcycle", Color = "#fbbf24", Desc = "Chi phí đi lại đô thị, bảo dưỡng định kỳ & truyền động tay ga/số.", LevelsCount = 5 },
                new DomainModel { Id = "home", Name = "Nhà Cửa & Xây Dựng", Icon = "fa-house-hammer", Color = "#f87171", Desc = "Dự toán ngân sách xây/sửa nhà, vật liệu & chi phí phát sinh.", LevelsCount = 5 },
                new DomainModel { Id = "feng-shui", Name = "Phong Thủy Vui", Icon = "fa-compass", Color = "#a78bfa", Desc = "Góc nhìn văn hóa truyền thống, hướng nhà & bố trí không gian hài hòa.", LevelsCount = 5 }
            };

            _concepts = new List<ConceptModel>
            {
                // ==========================================
                // REAL ESTATE (BẤT ĐỘNG SẢN) - L0 to L4
                // ==========================================
                new ConceptModel {
                    Id = "re-l0-01", DomainId = "real-estate", Title = "Diện Tích Thông Thủy vs Tim Tường", Level = 0,
                    Summary = "Diện tích thông thủy là diện tích bước chân sử dụng thực tế trong căn hộ.",
                    Explanation = "Diện tích thông thủy (Net Area) được tính theo mép trong tường bao, bao gồm cả diện tích tường ngăn phòng bên trong. Tim tường (Gross Area) bao gồm cả cột chịu lực và hộp kỹ thuật.",
                    WhyItMatters = "Giá bán tính theo diện tích tim tường thường rẻ hơn trên m², nhưng tổng số tiền thực trả lại dựa trên diện tích sử dụng thật.",
                    CommonMistakes = "Nhầm tưởng mua căn hộ 70m² tim tường sẽ có đủ 70m² kê đồ đạc sinh hoạt.",
                    RealExample = "Căn hộ 70m² tim tường chỉ có khoảng 64.5m² diện tích thông thủy thực tế."
                },
                new ConceptModel {
                    Id = "re-l1-01", DomainId = "real-estate", Title = "Phương Thức Dư Nợ Giảm Dần (Annuity)", Level = 1,
                    Summary = "Mỗi tháng trả khoản tiền gốc bằng nhau và tiền lãi giảm dần theo dư nợ thực tế còn lại.",
                    Explanation = "Tiền gốc tháng = Tổng tiền vay / Số tháng vay. Tiền lãi tháng = Dư nợ còn lại x (Lãi suất năm / 12). Tổng trả hàng tháng sẽ giảm dần theo thời gian.",
                    WhyItMatters = "Giúp giảm áp lực tài chính ở các năm về sau khi tổng số dư nợ đã được tất toán bớt.",
                    CommonMistakes = "Không tính tới khả năng lãi suất thả nổi gia tăng sau thời gian ưu đãi 1-2 năm đầu.",
                    RealExample = "Vay 1 tỷ trong 10 năm với lãi 10%: tháng 1 trả 16.6 triệu, nhưng tháng cuối chỉ trả 8.4 triệu."
                },
                new ConceptModel {
                    Id = "re-l2-01", DomainId = "real-estate", Title = "Tỷ Lệ DTI (Debt-to-Income Ratio)", Level = 2,
                    Summary = "Tỷ lệ giữa tổng tiền trả nợ hàng tháng so với tổng thu nhập ròng hàng tháng.",
                    Explanation = "DTI = (Tổng tiền nợ phải trả hàng tháng / Thu nhập hàng tháng) x 100%. Các chuyên gia tài chính khuyến cáo DTI an toàn là dưới 40%.",
                    WhyItMatters = "Nếu DTI vượt quá 50%, bạn dễ vướng rủi ro vỡ nợ khi xảy ra biến cố sức khỏe hoặc gián đoạn công việc.",
                    CommonMistakes = "Dùng toàn bộ thu nhập để trả nợ vay mua nhà mà không chừa ngân sách sinh hoạt cố định.",
                    RealExample = "Thu nhập 30 triệu/tháng, tiền vay gốc lãi 12 triệu/tháng -> DTI = 40% (mức an toàn)."
                },
                new ConceptModel {
                    Id = "re-l3-01", DomainId = "real-estate", Title = "Dòng Tiền Net Cash Flow & Cap Rate Cho Thuê", Level = 3,
                    Summary = "Tỷ suất sinh lời thực tế từ việc cho thuê sau khi trừ toàn bộ phí quản lý, bảo trì và lãi vay.",
                    Explanation = "Cap Rate (%) = (Thu Nhập Cho Thuê Hàng Năm - Phí Vận Hành) / Tổng Giá Trị BĐS. Nếu Cap Rate thấp hơn lãi suất tiền gửi ngân hàng, việc vay mua BĐS chỉ để cho thuê sẽ bị âm dòng tiền.",
                    WhyItMatters = "Giúp đánh giá rủi ro đòn bẩy tài chính trước khi mua BĐS nhằm mục đích kinh doanh cho thuê.",
                    CommonMistakes = "Chỉ tính tổng tiền thuê thu về mà bỏ qua chi phí môi giới, trống phòng (vacancy) và sửa chữa định kỳ.",
                    RealExample = "Căn hộ 3 tỷ cho thuê 12 triệu/tháng (144 triệu/năm), trừ 20 triệu phí vận hành -> Cap Rate = 4.13%/năm."
                },
                new ConceptModel {
                    Id = "re-l4-01", DomainId = "real-estate", Title = "Độ Nhạy Lãi Suất (Interest Rate Sensitivity Model)", Level = 4,
                    Summary = "Mô hình toán học đo lường mức độ biến động của tiền trả hàng tháng khi lãi suất ngân hàng tăng từ 1% đến 3%.",
                    Explanation = "Khi hết thời gian ưu đãi 8%/năm, lãi suất thả nổi có thể lên 11.5%/năm. Sự chênh lệch 3.5% lãi suất làm khoản trả hàng tháng tăng thêm từ 25% - 40% tùy thuộc thời hạn vay.",
                    WhyItMatters = "Giúp chủ nhà chuẩn bị quỹ dự phòng rủi ro tài chính hoặc chọn gói vay cố định lãi suất dài hạn.",
                    CommonMistakes = "Lập kế hoạch ngân sách mua nhà dựa trên mức lãi suất ưu đãi 12 tháng đầu tiên.",
                    RealExample = "Khoản vay 2 tỷ trong 20 năm: lãi 8% trả 16.7 triệu/tháng, nhưng lãi 11.5% trả 21.3 triệu/tháng (tăng 4.6 triệu/tháng)."
                },

                // ==========================================
                // BUILD PC - L0 to L4
                // ==========================================
                new ConceptModel {
                    Id = "pc-l0-01", DomainId = "pc-building", Title = "TDP (Thermal Design Power) Lớp Công Suất", Level = 0,
                    Summary = "Chỉ số công suất tỏa nhiệt tối đa tiêu chuẩn của CPU hoặc GPU tính bằng Watt.",
                    Explanation = "TDP phản ánh mức nhiệt lượng mà hệ thống tản nhiệt cần phải giải phóng khi linh kiện hoạt động ở tải mặc định.",
                    WhyItMatters = "Giúp bạn lựa chọn tản nhiệt khí/nước thích hợp và chọn công suất nguồn PSU có đủ headroom an toàn.",
                    CommonMistakes = "Coi TDP là mức điện năng tiêu thụ tối đa thực tế. Tải Turbo Boost peak của CPU có thể gấp 1.5 - 2 lần TDP.",
                    RealExample = "CPU Intel i5-13600K có TDP 125W nhưng có thể ăn tới 181W ở chế độ PL2 Turbo."
                },
                new ConceptModel {
                    Id = "pc-l1-01", DomainId = "pc-building", Title = "Hiện Tượng Nghẽn Cổ Chai (Bottleneck)", Level = 1,
                    Summary = "Khi một linh kiện quá yếu giới hạn tối đa hiệu năng của linh kiện mạnh hơn.",
                    Explanation = "Ví dụ nếu CPU xử lý quá chậm không kịp dựng khung hình cho GPU cao cấp rendering, GPU sẽ phải nằm chờ CPU.",
                    WhyItMatters = "Tránh lãng phí ngân sách mua VGA quá đắt tiền trong khi CPU đời cũ không đáp ứng nổi.",
                    CommonMistakes = "Đổ hết tiền mua RTX 4080 nhưng chạy chung với CPU i3 gen 8 và RAM 8GB.",
                    RealExample = "Game bị giật lag khựng hình (stuttering) dù FPS trung bình nhìn có vẻ cao."
                },
                new ConceptModel {
                    Id = "pc-l2-01", DomainId = "pc-building", Title = "Công Suất Peak Spikes & Dòng Ngắt PSU", Level = 2,
                    Summary = "Các đỉnh tăng vọt công suất tức thời trong vài mili-giây của GPU kiến trúc mới.",
                    Explanation = "Card đồ họa như RTX 3080/4080 có thể vọt công suất gấp 1.5 - 2 lần mức trung bình trong 1-10ms. Nếu PSU không đạt chuẩn an toàn, mạch bảo vệ OCP/OPP sẽ ngắt nguồn gây sập máy.",
                    WhyItMatters = "Giải thích lý do tại sao bộ nguồn 650W chuẩn Gold vẫn bị sập máy dù công suất tính toán trung bình chỉ 500W.",
                    CommonMistakes = "Chọn nguồn sát mức công suất tiêu thụ trung bình mà không cộng thêm 20-30% headroom dư dả.",
                    RealExample = "GPU 320W vọt peak spike 550W trong 2ms làm nguồn 650W dỏm ngắt điện lập tức."
                },
                new ConceptModel {
                    Id = "pc-l3-01", DomainId = "pc-building", Title = "Thermal Throttling & Giới Hạn Nhiệt TJMax", Level = 3,
                    Summary = "Cơ chế tự động hạ xung nhịp CPU/GPU khi nhiệt độ chạm ngưỡng giới hạn an toàn (100°C).",
                    Explanation = "Khi nhiệt độ vượt TJMax, vi xử lý sẽ giảm xung từ 5.0GHz xuống 3.0GHz để bảo vệ mạch điện bán dẫn, dẫn đến hiện tượng trụt FPS nghiêm trọng.",
                    WhyItMatters = "Tản nhiệt kém làm giảm 20-30% hiệu năng thực tế của linh kiện đắt tiền.",
                    CommonMistakes = "Mua CPU cao cấp nhưng dùng tản nhiệt khí giá rẻ 200k kèm theo.",
                    RealExample = "CPU chạy 100°C hạ xung từ 5.1GHz xuống 3.2GHz, rendering video tốn gấp đôi thời gian."
                },
                new ConceptModel {
                    Id = "pc-l4-01", DomainId = "pc-building", Title = "Băng Thông PCIe Lanes & Kênh Đôi RAM Dual-Channel", Level = 4,
                    Summary = "Kiến trúc băng thông truyền dữ liệu nội bộ giữa CPU, NVMe SSD và PCIe x16 Graphics Slot.",
                    Explanation = "Chạy RAM Dual-Channel nhân đôi băng thông RAM từ 64-bit lên 128-bit bus width. Phân bổ PCIe lanes hợp lý giúp SSD NVMe Gen 4 và GPU đạt tối đa 64 GB/s throughput mà không bị chia sẻ dải tần với chipset.",
                    WhyItMatters = "Tối ưu hóa 100% tiềm năng phần cứng ở các ứng dụng mô phỏng nặng và máy trạm Workstation.",
                    CommonMistakes = "Lắp 1 thanh RAM 16GB thay vì 2 thanh 8GB, khiến RAM chạy Single-Channel giảm 15-20% FPS game.",
                    RealExample = "Gắn NVMe vào khe M2_2 chia sẻ làn PCIe với slot VGA làm card chạy x8 thay vì x16 full speed."
                },

                // ==========================================
                // CARS (Ô TÔ) - L0 to L4
                // ==========================================
                new ConceptModel {
                    Id = "car-l0-01", DomainId = "cars", Title = "TCO (Total Cost of Ownership) 5 Năm", Level = 0,
                    Summary = "Tổng toàn bộ chi phí mua, vận hành, bảo hiểm, dưỡng và khấu hao xe trong 5 năm.",
                    Explanation = "TCO bao gồm: Giá xe + Chi phí lăn bánh + Tiền xăng/điện + Bảo hiểm thân vỏ + Khấu hao mất giá + Phí gửi xe & bảo dưỡng.",
                    WhyItMatters = "Giá niêm yết xe chỉ chiếm khoảng 50-60% tổng số tiền bạn phải bỏ ra trong 5 năm sở hữu.",
                    CommonMistakes = "Chỉ tích đủ tiền mua xe mà không tính đến chi phí nuôi xe hàng tháng từ 5-10 triệu đồng.",
                    RealExample = "Xe hạng B giá 500 triệu nhưng sau 5 năm tổng chi phí sử dụng thực tế có thể lên tới 850 triệu."
                },
                new ConceptModel {
                    Id = "car-l1-01", DomainId = "cars", Title = "Đồ Thị Khấu Hao Xe Ô Tô (Depreciation Curve)", Level = 1,
                    Summary = "Mức giảm giá trị của xe qua từng năm sử dụng, dốc nhất trong 3 năm đầu tiên.",
                    Explanation = "Xe mới mất giá khoảng 15-20% ngay trong năm đầu tiên lăn bánh, và giảm tiếp 10%/năm ở các năm tiếp theo.",
                    WhyItMatters = "Hiểu biểu đồ khấu hao giúp người mua cân nhắc giữa việc mua xe mới 100% hay xe lướt 1-2 năm tuổi.",
                    CommonMistakes = "Coi xe ô tô cá nhân là tài sản đầu tư có khả năng sinh lời.",
                    RealExample = "Xe mới lăn bánh 1 tỷ, sau 3 năm bán lại chỉ còn khoảng 700 triệu (mất giá 300 triệu)."
                },
                new ConceptModel {
                    Id = "car-l2-01", DomainId = "cars", Title = "Chi Phí Nhiên Liệu Xăng vs Điện (EV vs ICE)", Level = 2,
                    Summary = "So sánh chi phí năng lượng trên mỗi 1,000 km di chuyển giữa xe động cơ đốt trong và xe điện.",
                    Explanation = "Xe điện tiêu thụ trung bình 15 kWh/100km (~48.000 VNĐ), trong khi xe xăng tiêu thụ 7.5 lít/100km (~172.500 VNĐ). Xe điện tiết kiệm khoảng 70% chi phí nhiên liệu.",
                    WhyItMatters = "Nếu bạn chạy dịch vụ hoặc di chuyển nhiều (>20,000 km/năm), xe điện rút ngắn thời gian hòa vốn nhanh chóng.",
                    CommonMistakes = "Bỏ qua chi phí thuê pin hoặc khấu hao pin khi tính toán hiệu quả kinh tế xe điện.",
                    RealExample = "Chạy 2,000 km/tháng: xe xăng tốn 3.45 triệu tiền xăng, xe điện tốn 960k tiền điện sạc."
                },
                new ConceptModel {
                    Id = "car-l3-01", DomainId = "cars", Title = "Chi Phí Cơ Hội Vốn (Opportunity Cost of Capital)", Level = 3,
                    Summary = "Khoản lợi nhuận bị bỏ lỡ khi dùng tiền mặt mua xe ô tô thay vì đem đi đầu tư hoặc gửi tiết kiệm.",
                    Explanation = "Nếu bỏ 1 tỷ tiền mặt mua xe thay vì gửi tiết kiệm lãi suất 6%/năm, chi phí cơ hội là 60 triệu/năm.",
                    WhyItMatters = "Giúp chủ doanh nghiệp cân nhắc mua xe trả góp giữ lại vốn lưu động kinh doanh.",
                    CommonMistakes = "Dùng toàn bộ vốn lưu động kinh doanh để mua xe trả thẳng.",
                    RealExample = "Giữ 700 triệu đi kinh doanh tạo lợi nhuận 15%/năm tốt hơn bỏ hết vào mua xe tiêu sản."
                },
                new ConceptModel {
                    Id = "car-l4-01", DomainId = "cars", Title = "Hiệu Suất Động Cơ Bán Dẫn (State of Health SoH)", Level = 4,
                    Summary = "Đánh giá mức độ thoái hóa dung lượng dung lượng pin Lithium-ion xe điện và hiệu suất nhiệt động lực học.",
                    Explanation = "Pin EV giảm dung lượng khoảng 1-2% mỗi năm (SoH). Động cơ xăng chỉ đạt hiệu suất nhiệt 35-40% (60% thất thoát qua nhiệt), trong khi động cơ điện đạt hiệu suất 90-95%.",
                    WhyItMatters = "Dự báo chính xác chi phí thay thế pack pin sau 8-10 năm vận hành.",
                    CommonMistakes = "Sạc nhanh DC 100% liên tục làm đẩy nhanh tốc độ chai pin xe điện.",
                    RealExample = "Pin chai SoH còn 80% sau 150,000 km làm quãng đường di chuyển tối đa giảm từ 400km xuống 320km."
                },

                // ==========================================
                // MOTORCYCLES (XE MÁY) - L0 to L4
                // ==========================================
                new ConceptModel {
                    Id = "moto-l0-01", DomainId = "motorcycles", Title = "Bảo Dưỡng Định Kỳ & Chi Phí Vận Hành", Level = 0,
                    Summary = "Lịch thay nhớt máy, nhớt lap, dây curoa và má phanh giúp duy trì tuổi thọ xe.",
                    Explanation = "Xe máy cần thay nhớt sau mỗi 1,500 - 2,000km, thay dây curoa/nông sên dĩa sau 15,000km để tránh đứt dây giữa đường.",
                    WhyItMatters = "Chi phí bảo dưỡng định kỳ đúng hạn rẻ hơn rất nhiều so với chi phí sửa chữa khi máy bị lột dên hoặc cháy nồi.",
                    CommonMistakes = "Chỉ đổ xăng chạy mà không bao giờ thay nhớt hoặc kiểm tra áp suất lốp xe.",
                    RealExample = "Bỏ qua thay nhớt 300k khiến động cơ bị xước xilanh, tốn 4 triệu đồng làm lại máy."
                },
                new ConceptModel {
                    Id = "moto-l1-01", DomainId = "motorcycles", Title = "Chênh Lệch Chi Phí Tay Ga vs Xe Số/Xe Côn", Level = 1,
                    Summary = "So sánh chi phí tiêu thụ nhiên liệu và phụ tùng thay thế giữa xe tay ga và xe số.",
                    Explanation = "Xe tay ga ngốn xăng hơn 20-30%, bảo dưỡng bộ nồi vô cấp CVT phức tạp hơn so với bộ nhông sên dĩa của xe số.",
                    WhyItMatters = "Giúp học sinh, sinh viên chọn dòng xe tiết kiệm chi phí đi lại đô thị.",
                    CommonMistakes = "Mua xe tay ga đắt tiền nhưng không có ngân sách bảo dưỡng định kỳ bộ nồi.",
                    RealExample = "Xe số chạy 1.6L/100km; xe tay ga chạy 2.3L/100km -> mỗi năm lệch nhau khoảng 1.5 triệu tiền xăng."
                },
                new ConceptModel {
                    Id = "moto-l2-01", DomainId = "motorcycles", Title = "Áp Suất Lốp & Ma Sát Lăn Nhiên Liệu", Level = 2,
                    Summary = "Tác động của áp suất lốp xe đến độ bám đường, độ bền vỏ xe và mức hao xăng.",
                    Explanation = "Lốp xe bị mềm (thiếu 0.5 kg/cm²) làm tăng diện tích tiếp xúc ma sát lăn, khiến xe hao xăng hơn 10% và lốp mau mòn đảo bánh.",
                    WhyItMatters = "Thao tác bơm lốp đúng chuẩn 2.2 - 2.5 kg/cm² đơn giản giúp tiết kiệm tiền xăng hàng tháng.",
                    CommonMistakes = "Để lốp quá mềm chạy thời gian dài làm nứt hông vỏ xe.",
                    RealExample = "Bơm lốp đúng chuẩn giúp xe đi nhẹ máy hơn và tiết kiệm 100k tiền xăng mỗi tháng."
                },
                new ConceptModel {
                    Id = "moto-l3-01", DomainId = "motorcycles", Title = "Tỷ Số Nén Động Cơ & Chuẩn Xăng A95 vs A92", Level = 3,
                    Summary = "Mối quan hệ giữa tỷ số nén xilanh và chỉ số Octan của xăng để tránh hiện tượng kích nổ.",
                    Explanation = "Động cơ có tỷ số nén >= 10:1 (như SH, NVX, Winner) bắt buộc dùng xăng A95 để tránh xăng tự kích nổ sớm gây hư piston.",
                    WhyItMatters = "Chọn đúng loại xăng giúp động cơ phát huy tối đa công suất và kéo dài tuổi thọ xilanh.",
                    CommonMistakes = "Đổ xăng A92 giá rẻ cho xe có tỷ số nén cao 11:1 làm xe bị gõ máy (knocking).",
                    RealExample = "Xe tay ga nén 11.5:1 đổ A92 chạy bị nóng máy rần ga, chuyển sang A95 máy êm hẳn."
                },
                new ConceptModel {
                    Id = "moto-l4-01", DomainId = "motorcycles", Title = "Hao Hụt Công Suất Drivetrain Loss (HP tại Bánh)", Level = 4,
                    Summary = "Độ chênh lệch giữa công suất trục khuỷu động cơ (Crankshaft HP) và công suất thực tế tại bánh xe (Wheel HP).",
                    Explanation = "Truyền động vô cấp CVT tay ga mất khoảng 20-25% công suất qua ma sát dây curoa & puly, trong khi nhông sên dĩa chỉ mất 10-12%.",
                    WhyItMatters = "Giải thích tại sao xe số 110cc đề ba bốc hơn xe tay ga 110cc dù công suất động cơ công bố bằng nhau.",
                    CommonMistakes = "Chỉ nhìn thông số Horsepower của nhà sản xuất công bố mà không tính tổn hao qua bộ truyền động.",
                    RealExample = "Động cơ 15 HP qua bộ nồi tay ga chỉ còn 11.5 HP thực tế tại bánh xe."
                },

                // ==========================================
                // HOME (NHÀ CỬA & XÂY DỰNG) - L0 to L4
                // ==========================================
                new ConceptModel {
                    Id = "home-l0-01", DomainId = "home", Title = "Đơn Giá Xây Dựng Theo m² Sàn", Level = 0,
                    Summary = "Ước tính chi phí xây nhà bằng cách nhân đơn giá thị trường với tổng diện tích các sàn.",
                    Explanation = "Tổng diện tích xây dựng = Diện tích móng (% quy đổi) + Trệt + Các tầng lầu + Mái (% quy đổi). Nhân với đơn giá trọn gói/m².",
                    WhyItMatters = "Phương pháp nhanh nhất để ước tính ngân sách ban đầu trước khi có bản vẽ thiết kế chi tiết.",
                    CommonMistakes = "Quên cộng diện tích móng, mái và ban công dẫn đến hụt ngân sách xây dựng 20-30%.",
                    RealExample = "Nhà 50m² xây 1 trệt 2 lầu (tổng 150m² sàn) x đơn giá 6.5 triệu/m² = khoảng 975 triệu đồng."
                },
                new ConceptModel {
                    Id = "home-l1-01", DomainId = "home", Title = "Hạng Mục Dự Phòng Chi Phí Phát Sinh (10-15%)", Level = 1,
                    Summary = "Khoản ngân sách dự phòng bắt buộc cho các thay đổi vật liệu, đào móng sâu hoặc giá vật tư tăng.",
                    Explanation = "Trong quá trình thi công xây dựng thực tế luôn xảy ra phát sinh do địa chất móng yếu, thay đổi gạch ốp lát hoặc bổ sung thiết bị.",
                    WhyItMatters = "Tránh tình trạng hết tiền dở dang khi nhà mới xây xong phần thô chưa có hoàn thiện nội thất.",
                    CommonMistakes = "Dùng hết 100% số tiền có trong tay để chốt hợp đồng thô ban đầu.",
                    RealExample = "Ngân sách 1 tỷ -> chỉ nên ký hợp đồng 850-900 triệu, giữ lại 100-150 triệu làm dự phòng."
                },
                new ConceptModel {
                    Id = "home-l2-01", DomainId = "home", Title = "Hoàn Thiện Thô vs Hoàn Thiện Trọn Gói", Level = 2,
                    Summary = "Phân biệt ranh giới công việc giữa gói thi công phần thô và gói hoàn thiện chìa khóa trao tay.",
                    Explanation = "Phần thô bao gồm móng, khung cột, sàn bê tông, tường gạch và đường ống âm. Phần hoàn thiện bao gồm gạch lát, sơn nước, trần thạch cao và thiết bị vệ sinh.",
                    WhyItMatters = "Giúp chủ nhà kiểm soát vật tư hoàn thiện theo sở thích cá nhân mà không vướng tranh chấp với thầu.",
                    CommonMistakes = "Nhầm tưởng gói xây thô đã bao gồm sơn nước, cửa và thiết bị đèn chiếu sáng.",
                    RealExample = "Đơn giá thô 3.8 triệu/m²; đơn giá hoàn thiện trọn gói 6.8 triệu/m²."
                },
                new ConceptModel {
                    Id = "home-l3-01", DomainId = "home", Title = "Chống Thấm Sàn Mái & Sàn Nhà Vệ Sinh", Level = 3,
                    Summary = "Kỹ thuật thi công màng chống thấm Polyurethane / Sika bảo vệ kết cấu bê tông khỏi hiện tượng ngấm nước.",
                    Explanation = "Chống thấm kém làm nước thẩm thấu vào bê tông gỉ sắt thép chịu lực, gây bong tróc trần nhà và ẩm mốc hư hỏng đồ nội thất.",
                    WhyItMatters = "Chi phí chống thấm lúc xây mới chỉ chiếm 1% tổng nhà, nhưng chi phí sửa chữa thấm sau này tốn gấp 10 lần.",
                    CommonMistakes = "Bỏ qua bước ngâm thử nước 48h kiểm tra sàn nhà vệ sinh trước khi cán vữa lát gạch.",
                    RealExample = "Tốn 3 triệu chống thấm ban đầu tránh được vụ sửa thấm trần lầu dưới mất 35 triệu."
                },
                new ConceptModel {
                    Id = "home-l4-01", DomainId = "home", Title = "Hệ Số Truyền Nhiệt U-Value & Tiết Kiệm Năng Lượng", Level = 4,
                    Summary = "Chỉ số đo lường mức độ thất thoát nhiệt qua tường gạch, kính và mái nhà (W/m²K).",
                    Explanation = "Tường gạch 2 lớp cách nhiệt hoặc kính Low-E có hệ số U-Value thấp giúp giảm 30-40% công suất điều hòa nhiệt độ mùa hè.",
                    WhyItMatters = "Tối ưu hóa thiết kế công trình xanh giúp giảm chi phí tiền điện vận hành nhà lâu dài.",
                    CommonMistakes = "Lắp toàn bộ kính cường lực thông thường hướng Tây làm căn nhà thành lò nung mùa hè.",
                    RealExample = "Dùng gạch nhẹ AAC cách nhiệt giúp nhiệt độ phòng giảm 4°C, tiết kiệm 500k tiền điện điều hòa/tháng."
                },

                // ==========================================
                // FENG SHUI (PHONG THỦY VUI) - L0 to L4
                // ==========================================
                new ConceptModel {
                    Id = "fs-l0-01", DomainId = "feng-shui", Title = "Bố Trí Không Gian & Hướng Nắng/Gió", Level = 0,
                    Summary = "Ứng dụng phong thủy khoa học vào việc lấy ánh sáng tự nhiên và đối lưu không khí.",
                    Explanation = "Phong thủy truyền thống thực chất nhấn mạnh vào khí quyển, nguồn ánh sáng mặt trời và sự thông thoáng nhà cửa.",
                    WhyItMatters = "Căn nhà đủ ánh sáng và không khí tươi giúp tăng cường sức khỏe và tinh thần minh mẫn cho các thành viên.",
                    CommonMistakes = "Coi phong thủy là bùa chú thần bí, bỏ qua việc thiết kế cửa sổ đón gió và hệ thống thoát nước sạch sẽ.",
                    RealExample = "Đặt bếp cạnh nhà vệ sinh gây mất vệ sinh thực phẩm và ám mùi khó chịu trong sinh hoạt."
                },
                new ConceptModel {
                    Id = "fs-l1-01", DomainId = "feng-shui", Title = "Nguyên Lý Tam Yếu (Môn - Táo - Chủ)", Level = 1,
                    Summary = "Ba vị trí quan trọng nhất trong ngôi nhà: Cửa chính (Môn), Bếp nấu (Táo) và Phòng ngủ chủ nhà (Chủ).",
                    Explanation = "Cửa chính nạp khí, Bếp giữ lửa ấm gia đình, Phòng ngủ tái tạo năng lượng sức khỏe.",
                    WhyItMatters = "Tập trung tối ưu hóa 3 khu vực trọng yếu này thay vì sa đà vào các chi tiết trang trí nhỏ nhặt.",
                    CommonMistakes = "Để cửa chính thẳng hàng nối thông với cửa sau (xuyên tâm sát) làm luồng khí chạy tuột ra ngoài.",
                    RealExample = "Bố trí bình phong ngăn cách giữa cửa chính và phòng khách tạo sự riêng tư và điều hòa luồng gió."
                },
                new ConceptModel {
                    Id = "fs-l2-01", DomainId = "feng-shui", Title = "Hiệu Ứng Gió Xoáy Đô Thị (Urban Wind Tunnel)", Level = 2,
                    Summary = "Tác động của luồng gió hút giữa các tòa nhà cao tầng xung quanh đến sinh hoạt căn nhà.",
                    Explanation = "Khi nhà nằm giữa hai tòa cao ốc, gió bị nén lại tạo ra luồng hút giật mạnh (Phong sát), làm bụi bẩn và tiếng ồn gia tăng.",
                    WhyItMatters = "Giúp chủ nhà chọn giải pháp trồng cây xanh che chắn hoặc dùng cửa kính cách âm phù hợp.",
                    CommonMistakes = "Mở hết cửa sổ ở khu vực gió lùa quá mạnh làm hư hỏng cửa và mất an toàn.",
                    RealExample = "Lắp đặt hệ thống cửa sổ lật mở an toàn tránh gió giật mạnh ở căn hộ tầng cao."
                },
                new ConceptModel {
                    Id = "fs-l3-01", DomainId = "feng-shui", Title = "Vi Khí Hậu Công Trình (Microclimate Science)", Level = 3,
                    Summary = "Nghiên cứu sự tương tác giữa nhiệt độ, độ ẩm, gió và bóng râm trong khuôn viên đất xây dựng.",
                    Explanation = "Sử dụng hồ nước, cây bóng mát và khoảng sân trong (Giếng trời) để tự động cân bằng nhiệt độ môi trường sinh thái quanh nhà.",
                    WhyItMatters = "Tạo môi trường sống trong lành tự nhiên mà không phụ thuộc hoàn toàn vào điều hòa nhân tạo.",
                    CommonMistakes = "Bê tông hóa toàn bộ sân vườn làm tăng bức xạ nhiệt mặt trời vào buổi chiều.",
                    RealExample = "Thiết kế giếng trời giữa nhà hút khí nóng bốc lên mái, kéo gió mát từ cửa trước vào."
                },
                new ConceptModel {
                    Id = "fs-l4-01", DomainId = "feng-shui", Title = "Đảo Nhiệt Đô Thị (Urban Heat Island Impact)", Level = 4,
                    Summary = "Hiện tượng khu vực đô thị có nhiệt độ cao hơn đáng kể so với nông thôn do mật độ bê tông và nhựa đường.",
                    Explanation = "Phong thủy hiện đại ứng dụng vật liệu phản xạ nhiệt, mái nhà xanh (Green Roof) để giảm tích tụ năng lượng nhiệt mặt trời tỏa vào nhà.",
                    WhyItMatters = "Giải quyết tận gốc nguyên nhân gây oi nóng không gian sống trong các khu đô thị nén.",
                    CommonMistakes = "Dùng màu sơn ngoại thất quá tối làm hấp thụ bức xạ nhiệt mạnh hơn.",
                    RealExample = "Sơn mái nhà màu sáng phản xạ 80% tia hồng ngoại, giảm 3°C nhiệt độ trần tầng trên cùng."
                }
            };

            _glossary = new List<GlossaryItemModel>
            {
                new GlossaryItemModel { Term = "TDP", DomainId = "pc-building", ShortDefinition = "Thermal Design Power - Công suất tỏa nhiệt tiêu chuẩn (Watt).", DetailedExplanation = "Mức nhiệt năng tối đa hệ thống tản nhiệt cần giải phóng.", ConceptId = "pc-l0-01" },
                new GlossaryItemModel { Term = "DTI", DomainId = "real-estate", ShortDefinition = "Debt-to-Income Ratio - Tỷ lệ nợ trên thu nhập (%).", DetailedExplanation = "Tỷ lệ phần trăm thu nhập dùng trả nợ hàng tháng.", ConceptId = "re-l2-01" },
                new GlossaryItemModel { Term = "TCO", DomainId = "cars", ShortDefinition = "Total Cost of Ownership - Tổng chi phí sở hữu thực tế.", DetailedExplanation = "Bao gồm giá mua + vận hành + bảo dưỡng + khấu hao qua nhiều năm.", ConceptId = "car-l0-01" },
                new GlossaryItemModel { Term = "Thông Thủy", DomainId = "real-estate", ShortDefinition = "Diện tích sử dụng thực tế bên trong căn hộ.", DetailedExplanation = "Được tính từ mép trong tường bao, không bao gồm tim tường.", ConceptId = "re-l0-01" },
                new GlossaryItemModel { Term = "Bottleneck", DomainId = "pc-building", ShortDefinition = "Nghẽn cổ chai hiệu năng linh kiện máy tính.", DetailedExplanation = "Sự chênh lệch hiệu năng làm giảm công suất toàn bộ PC.", ConceptId = "pc-l1-01" },
                new GlossaryItemModel { Term = "Cap Rate", DomainId = "real-estate", ShortDefinition = "Capitalization Rate - Tỷ suất sinh lời cho thuê hàng năm.", DetailedExplanation = "Tỷ lệ giữa lợi nhuận hoạt động thuần và giá trị tài sản.", ConceptId = "re-l3-01" },
                new GlossaryItemModel { Term = "Dual-Channel", DomainId = "pc-building", ShortDefinition = "Kênh đôi bộ nhớ RAM nhân đôi băng thông bus.", DetailedExplanation = "Mở rộng chiều rộng bus truyền dữ liệu từ 64-bit lên 128-bit.", ConceptId = "pc-l4-01" },
                new GlossaryItemModel { Term = "U-Value", DomainId = "home", ShortDefinition = "Hệ số truyền nhiệt của vật liệu bao che công trình.", DetailedExplanation = "Chỉ số U-Value càng thấp thì khả năng cách nhiệt của tường/kính càng tốt.", ConceptId = "home-l4-01" }
            };

            _quizzes = new List<QuizQuestionModel>
            {
                new QuizQuestionModel {
                    Id = "q-re-01", ConceptId = "re-l0-01",
                    QuestionText = "Diện tích thông thủy khác diện tích tim tường như thế nào?",
                    Options = new List<string> {
                        "A. Diện tích thông thủy tính cả cột chịu lực và hộp kỹ thuật.",
                        "B. Diện tích thông thủy là diện tích sử dụng thực tế tính theo mép trong tường bao.",
                        "C. Diện tích tim tường luôn nhỏ hơn diện tích thông thủy.",
                        "D. Hai diện tích này hoàn toàn bằng nhau."
                    },
                    CorrectOptionIndex = 1,
                    Explanation = "Chính xác! Diện tích thông thủy đo lường phần không gian thực tế bạn bước chân lên và kê đồ đạc được."
                },
                new QuizQuestionModel {
                    Id = "q-re-04", ConceptId = "re-l4-01",
                    QuestionText = "Khi lãi suất ngân hàng tăng từ 8%/năm lên 11.5%/năm, khoản tiền trả hàng tháng biến động như thế nào?",
                    Options = new List<string> {
                        "A. Không thay đổi vì ngân hàng giữ cố định suốt kỳ vay.",
                        "B. Tăng khoảng 25% - 40% tùy thuộc vào thời hạn khoản vay.",
                        "C. Giảm xuống do nợ gốc đã được trả bớt.",
                        "D. Chỉ tăng thêm đúng 3.5% số tiền trả."
                    },
                    CorrectOptionIndex = 1,
                    Explanation = "Chính xác! Do tính trên dư nợ và công thức Annuity, mức tăng lãi suất thả nổi 3.5% sẽ khiến tổng tiền trả hàng tháng vọt tăng từ 25% đến 40%."
                },
                new QuizQuestionModel {
                    Id = "q-pc-01", ConceptId = "pc-l0-01",
                    QuestionText = "Chỉ số TDP trên CPU đại diện cho điều gì?",
                    Options = new List<string> {
                        "A. Dung lượng bộ nhớ đệm Cache.",
                        "B. Công suất tỏa nhiệt thiết kế tối đa tiêu chuẩn (Watt).",
                        "C. Tốc độ xung nhịp GHz tối đa.",
                        "D. Số nhân xử lý của CPU."
                    },
                    CorrectOptionIndex = 1,
                    Explanation = "Đúng rồi! TDP (Thermal Design Power) cho biết lượng nhiệt tiêu chuẩn mà tản nhiệt cần giải phóng."
                },
                new QuizQuestionModel {
                    Id = "q-pc-04", ConceptId = "pc-l4-01",
                    QuestionText = "Lắp RAM ở chế độ Dual-Channel (2 thanh) mang lại lợi ích gì so với Single-Channel (1 thanh)?",
                    Options = new List<string> {
                        "A. Nhân đôi dung lượng lưu trữ của ổ cứng SSD.",
                        "B. Nhân đôi chiều rộng bus truyền dữ liệu từ 64-bit lên 128-bit.",
                        "C. Giảm nhiệt độ tỏa ra của bộ nguồn PSU.",
                        "D. Giúp card màn hình không bị nổ."
                    },
                    CorrectOptionIndex = 1,
                    Explanation = "Chính xác! Chạy 2 thanh RAM cùng dung lượng giúp kích hoạt chế độ 128-bit Dual-Channel, tăng gấp đôi băng thông giao tiếp với CPU."
                }
            };
        }

        public static List<DomainModel> GetDomains() => _domains;

        public static DomainModel GetDomainById(string domainId)
        {
            return _domains.FirstOrDefault(d => d.Id.Equals(domainId, StringComparison.OrdinalIgnoreCase)) ?? _domains.First();
        }

        public static List<ConceptModel> GetConcepts(string domainId = null, int? level = null, string query = null)
        {
            var res = _concepts.AsEnumerable();
            if (!string.IsNullOrEmpty(domainId))
                res = res.Where(c => c.DomainId.Equals(domainId, StringComparison.OrdinalIgnoreCase));
            if (level.HasValue)
                res = res.Where(c => c.Level == level.Value);
            if (!string.IsNullOrEmpty(query))
            {
                string q = query.ToLower();
                res = res.Where(c => c.Title.ToLower().Contains(q) || c.Summary.ToLower().Contains(q) || c.Explanation.ToLower().Contains(q));
            }
            return res.ToList();
        }

        public static List<ConceptModel> GetConceptsByDomain(string domainId)
        {
            return GetConcepts(domainId);
        }

        public static ConceptModel GetConceptById(string conceptId)
        {
            return _concepts.FirstOrDefault(c => c.Id.Equals(conceptId, StringComparison.OrdinalIgnoreCase));
        }

        public static List<GlossaryItemModel> GetGlossary(string domainId = null, string query = null)
        {
            var res = _glossary.AsEnumerable();
            if (!string.IsNullOrEmpty(domainId))
                res = res.Where(g => g.DomainId.Equals(domainId, StringComparison.OrdinalIgnoreCase));
            if (!string.IsNullOrEmpty(query))
            {
                string q = query.ToLower();
                res = res.Where(g => g.Term.ToLower().Contains(q) || g.ShortDefinition.ToLower().Contains(q));
            }
            return res.ToList();
        }

        public static List<QuizQuestionModel> GetQuizzesByConcept(string conceptId)
        {
            return _quizzes.Where(q => q.ConceptId.Equals(conceptId, StringComparison.OrdinalIgnoreCase)).ToList();
        }
    }
}
