/**
 * KnowLab — Comprehensive Structured Seed Data
 * Contains Domains, Concepts (L0-L4) with technical details,
 * Prerequisites, Glossary Dictionary, and Comparison Criteria.
 */

export const SeedData = {
  domains: [
    {
      id: "pc-building",
      name: "Build PC",
      slug: "pc-building",
      icon: "fa-microchip",
      color: "#3b82f6",
      tagline: "Nghiên cứu linh kiện, kiểm tra tương thích, công suất và hiệu năng",
      desc: "Smart PC Builder, kiểm tra tương thích Socket/RAM/Case/Nguồn, tính toán công suất dự phòng (Headroom 20-30%), phân tích nghẽn cổ chai và benchmark có nguồn.",
      levelCount: 5,
      conceptCount: 5
    },
    {
      id: "real-estate",
      name: "Bất Động Sản",
      slug: "real-estate",
      icon: "fa-building-user",
      color: "#8b5cf6",
      tagline: "Phân tích tài chính mua nhà, dòng tiền và kiểm tra độ nhạy lãi suất",
      desc: "Nghiên cứu tài sản, diện tích thông thủy vs tim tường, lãi suất thả nổi, tỷ lệ nợ DTI an toàn, tỷ suất cho thuê (Rental Yield) và độ nhạy dòng tiền.",
      levelCount: 5,
      conceptCount: 5
    },
    {
      id: "cars",
      name: "Ô Tô",
      slug: "cars",
      icon: "fa-car",
      color: "#34d399",
      tagline: "Khám phá thông số kỹ thuật, so sánh xe và tổng chi phí sở hữu TCO",
      desc: "Phân tích chi phí sở hữu 5 năm (TCO), so sánh chi phí năng lượng xe xăng (ICE) vs xe điện (EV), khấu hao, bảo dưỡng và công nghệ an toàn ADAS.",
      levelCount: 5,
      conceptCount: 5
    },
    {
      id: "motorcycles",
      name: "Xe Máy",
      slug: "motorcycles",
      icon: "fa-motorcycle",
      color: "#fbbf24",
      tagline: "Tối ưu hóa chi phí di chuyển đô thị và bảo dưỡng định kỳ",
      desc: "Tính toán chi phí xăng/điện hàng ngày, lịch trình thay thế phụ tùng định kỳ (dầu nhớt, dây curoa, nhông sên dĩa) và so sánh xe tay ga vs xe số.",
      levelCount: 5,
      conceptCount: 5
    },
    {
      id: "home",
      name: "Nhà Cửa & Xây Dựng",
      slug: "home",
      icon: "fa-house-hammer",
      color: "#f87171",
      tagline: "Lập dự toán xây sửa nhà, bóc tách vật liệu và tỷ lệ hao hụt",
      desc: "Quy đổi diện tích móng/sàn/mái, bóc tách chi phí phần thô và hoàn thiện, tính toán hệ số nhân công, tỷ lệ hao hụt vật tư và dự phòng trượt giá.",
      levelCount: 5,
      conceptCount: 5
    },
    {
      id: "feng-shui",
      name: "Phong Thủy & Vi Khí Hậu",
      slug: "feng-shui",
      icon: "fa-compass",
      color: "#a78bfa",
      tagline: "Tra cứu trường phái phong thủy dưới góc nhìn văn hóa và thông gió tự nhiên",
      desc: "Khám phá Bát Trạch, Huyền Không, Loan Đầu kết hợp nguyên lý đối lưu không khí, hướng gió mùa và bức xạ mặt trời. Minh bạch góc nhìn truyền thống.",
      levelCount: 5,
      conceptCount: 5
    }
  ],

  concepts: [
    // ==========================================
    // 1. BUILD PC CONCEPTS (L0 - L4)
    // ==========================================
    {
      id: "pc-l0-01",
      domainId: "pc-building",
      title: "TDP (Thermal Design Power) & Công Suất Thiết Kế",
      slug: "tdp-cpu-gpu",
      level: 0,
      summary: "Chỉ số công suất tỏa nhiệt thiết kế tối đa của CPU hoặc GPU tính bằng Watt.",
      explanation: "TDP (Thermal Design Power) là chỉ số do Intel, AMD hoặc NVIDIA công bố để chỉ định mức nhiệt năng tối đa mà hệ thống tản nhiệt cần giải phóng khi linh kiện hoạt động ở xung nhịp cơ bản. Cần lưu ý: điện năng tiêu thụ thực tế ở các mức tải Turbo Boost (PL2) có thể cao hơn đáng kể so với con số TDP gốc.",
      whyItMatters: "Giúp người dùng chọn bộ tản nhiệt phù hợp và tính toán công suất bộ nguồn (PSU) để tránh sập nguồn.",
      commonMistakes: "Hiểu nhầm TDP bằng chính xác 100% điện năng tiêu thụ thực tế ở mọi thời điểm tải.",
      realExample: "Intel Core i5-13600K có mức TDP công bố 125W, nhưng khi tải nặng chạy Turbo Boost tối đa có thể ăn tới 181W điện.",
      prerequisites: [],
      relatedConcepts: ["pc-l1-01", "pc-l2-01"],
      technicalDetails: "PL1 (Power Limit 1) thường tương đương TDP danh định; PL2 (Power Limit 2) là ngưỡng công suất đỉnh ngắn hạn (Tau thời gian).",
      source: "Intel & AMD Processor Architectural Whitepapers"
    },
    {
      id: "pc-l1-01",
      domainId: "pc-building",
      title: "Hiện Tượng Nghẽn Cổ Chai (Bottleneck) Trong Hệ Thống",
      slug: "bottleneck-pc",
      level: 1,
      summary: "Sự mất cân bằng hiệu năng khi một linh kiện yếu làm kìm hãm sức mạnh của linh kiện mạnh hơn.",
      explanation: "Nghẽn cổ chai xảy ra khi tốc độ xử lý của một thành phần (thường là CPU hoặc GPU) không đáp ứng kịp khối lượng dữ liệu yêu cầu từ thành phần còn lại. Ở độ phân giải thấp (1080p), tốc độ xử lý dựng khung hình phụ thuộc nặng vào CPU; trong khi ở 4K, gánh nặng phần lớn dồn vào GPU.",
      whyItMatters: "Tránh lãng phí tiền khi mua card màn hình cao cấp nhưng gắn với CPU thế hệ cũ, dẫn đến tình trạng drop FPS và giật hình.",
      commonMistakes: "Tin tưởng mù quáng vào các website tính % bottleneck tự động với một con số cố định cho mọi tựa game.",
      realExample: "Ghép card RTX 4080 với CPU Core i3 thế hệ 8 ở màn hình 1080p: CPU chạy 100% gây khựng giật, trong khi GPU chỉ tải 45%.",
      prerequisites: ["pc-l0-01"],
      relatedConcepts: ["pc-l2-01", "pc-l3-01"],
      technicalDetails: "Frame-time consistency (1% Low và 0.1% Low FPS) là thước đo chính xác hơn để nhận biết nghẽn CPU so với FPS trung bình.",
      source: "Gamers Nexus & TechSpot Hardware Analysis"
    },
    {
      id: "pc-l2-01",
      domainId: "pc-building",
      title: "Công Suất Nguồn PSU & Mức Dự Phòng An Toàn (Headroom 20-30%)",
      slug: "psu-wattage-headroom",
      level: 2,
      summary: "Mức chênh lệch an toàn giữa công suất tiêu thụ tối đa của dàn máy và công suất danh định của bộ nguồn.",
      explanation: "Hệ thống máy tính cần một mức công suất dự phòng (Headroom) an toàn từ 20% đến 30% so với tổng tải đỉnh dự kiến (Peak Load). Điều này giúp bộ nguồn hoạt động ở dải tải 50% - 70% có hiệu suất chuyển đổi điện năng cao nhất (chuẩn 80 Plus), quạt làm mát êm ái và triệt tiêu các đợt tăng vọt dòng điện bất ngờ (Transient Power Spikes) từ card đồ họa.",
      whyItMatters: "Bảo vệ các linh kiện đắt tiền (CPU, GPU, ổ cứng dữ liệu) không bị sốc điện hay sập nguồn khi chạy tác vụ nặng.",
      commonMistakes: "Chọn nguồn có công suất vừa khít với tổng TDP danh định hoặc mua nguồn giá rẻ không có chứng nhận chất lượng.",
      realExample: "Tổng tải dàn máy khoảng 520W. Chọn nguồn 750W sẽ tạo ra mức headroom 30.6%, đảm bảo an toàn tuyệt đối.",
      prerequisites: ["pc-l0-01", "pc-l1-01"],
      relatedConcepts: ["pc-l3-01"],
      technicalDetails: "Chuẩn nguồn ATX 3.0 với đầu cắm 12VHPWR có khả năng chịu xung tải tức thời lên đến 200% công suất danh định trong 100 microgiây.",
      source: "Cybernetics PSU Certification Database & Intel ATX 3.0 Standard"
    },
    {
      id: "pc-l3-01",
      domainId: "pc-building",
      title: "Nhiệt Học, VRM Thắt Cổ Chai & Hạ Xung Bảo Vệ (Thermal Throttling)",
      slug: "thermal-throttling-vrm",
      level: 3,
      summary: "Cơ chế tự hạ xung nhịp để chống cháy linh kiện khi nhiệt độ vượt quá giới hạn an toàn.",
      explanation: "Khi CPU, GPU hoặc cụm mạch cấp nguồn (VRM - Voltage Regulator Module) trên bo mạch chủ chạm ngưỡng nhiệt độ tới hạn (thường là 95°C - 105°C), mạch điều khiển sẽ tự động cắt giảm điện áp và xung nhịp hoạt động. Bo mạch chủ giá rẻ có phase cấp nguồn yếu và không có tản nhiệt nhôm cho mosfet sẽ gây hạ xung CPU dù tản nhiệt CPU rất xịn.",
      whyItMatters: "Hiểu vì sao máy tính bị khựng hoặc tụt hiệu năng đột ngột sau 15-30 phút chơi game hoặc render video liên tục.",
      commonMistakes: "Chỉ quan tâm đến nhiệt độ CPU mà quên kiểm tra nhiệt độ cụm VRM trên bo mạch chủ.",
      realExample: "Lắp CPU Core i7-14700K (ăn 250W) lên bo mạch chủ H610 giá rẻ: dàn VRM quá nhiệt 110°C làm CPU bị bóp xung còn 2.5 GHz.",
      prerequisites: ["pc-l0-01", "pc-l2-01"],
      relatedConcepts: ["pc-l4-01"],
      technicalDetails: "TJMax (Thermal Junction Maximum) là ngưỡng nhiệt tối đa nhà sản xuất cho phép trước khi kích hoạt ngắt mạch PROCHOT.",
      source: "Hardware Unboxed Motherboard VRM Testing Protocols"
    },
    {
      id: "pc-l4-01",
      domainId: "pc-building",
      title: "Kiến Trúc Bộ Nhớ Kênh Đôi (Dual-Channel), Băng Thông & Độ Trễ CAS",
      slug: "memory-architecture-dual-channel",
      level: 4,
      summary: "Tăng gấp đôi độ rộng bus truyền dữ liệu từ 64-bit lên 128-bit giữa RAM và CPU.",
      explanation: "Bộ điều khiển bộ nhớ (Integrated Memory Controller - IMC) trên CPU hỗ trợ nhiều kênh giao tiếp độc lập. Lắp 2 thanh RAM vào đúng khe kênh đôi (khe 2 và khe 4) sẽ kích hoạt bus 128-bit, tăng gấp đôi băng thông đọc ghi so với 1 thanh duy nhất (Single-Channel 64-bit). Đồng thời, hiệu năng thực tế phụ thuộc vào cả tốc độ xung (MHz/MTs) và độ trễ chu kỳ (CAS Latency - CL).",
      whyItMatters: "Kích hoạt Dual-Channel giúp cải thiện 15-30% FPS tối thiểu trong các tựa game esports và tăng tốc tác vụ nén/giải nén.",
      commonMistakes: "Mua 1 thanh RAM 32GB thay vì kit 2 thanh 16GB, hoặc cắm sai khe kề nhau trên bo mạch chủ 4 khe.",
      realExample: "DDR5-6000 CL30 có thời gian phản hồi thực tế là 10 nanogiây, nhanh hơn rõ rệt so với DDR5-6000 CL40 (13.33 nanogiây).",
      prerequisites: ["pc-l1-01", "pc-l2-01"],
      relatedConcepts: [],
      technicalDetails: "Độ trễ phản hồi thực tế (ns) = (CAS / Tần số MHz thực) * 1000 = (CL * 2000) / DataRate (MT/s).",
      source: "JEDEC Solid State Technology Association Standards"
    },

    // ==========================================
    // 2. REAL ESTATE CONCEPTS (L0 - L4)
    // ==========================================
    {
      id: "re-l0-01",
      domainId: "real-estate",
      title: "Diện Tích Thông Thủy vs Diện Tích Tim Tường",
      slug: "dientich-thongthuy-timtuong",
      level: 0,
      summary: "Diện tích thông thủy là phần diện tích sử dụng thực tế tính theo mép trong của tường bao căn hộ.",
      explanation: "Khi giao dịch mua bán căn hộ chung cư, diện tích thông thủy (Net Area / Carpet Area) là phần diện tích người mua có thể trải thảm, kê giường tủ sinh hoạt. Ngược lại, diện tích tim tường (Gross Area) tính từ tâm tường bao quanh căn hộ, bao gồm cả cột chịu lực bê tông cốt thép và hộp kỹ thuật.",
      whyItMatters: "Giá bán tính theo tim tường thường tạo cảm giác rẻ hơn, nhưng tổng số tiền bạn trả lại quyết định bởi diện tích sử dụng thật.",
      commonMistakes: "Tưởng rằng căn hộ 70m² tim tường sẽ có trọn vẹn 70m² để sắp xếp đồ đạc.",
      realExample: "Một căn hộ 70m² tim tường có thể chỉ có 64m² thông thủy thực tế (hao hụt ~8.5% diện tích).",
      prerequisites: [],
      relatedConcepts: ["re-l1-01"],
      technicalDetails: "Thông tư 03/2014/TT-BXD quy định bắt buộc phải ghi rõ cả 2 loại diện tích trong Hợp đồng mua bán căn hộ.",
      source: "Bộ Xây Dựng & Luật Nhà Ở Việt Nam"
    },
    {
      id: "re-l1-01",
      domainId: "real-estate",
      title: "Phương Thức Vay Dư Nợ Giảm Dần (Annuity)",
      slug: "vay-duno-giamdan",
      level: 1,
      summary: "Mỗi tháng trả khoản tiền gốc bằng nhau và tiền lãi giảm dần theo số dư nợ gốc thực tế còn lại.",
      explanation: "Trong phương thức dư nợ giảm dần, tiền gốc được chia đều cho tổng số tháng vay. Tiền lãi mỗi tháng được tính trên số tiền gốc bạn thực sự còn đang nợ ngân hàng. Nhờ đó, tổng số tiền phải nộp mỗi tháng sẽ có xu hướng giảm dần qua các năm.",
      whyItMatters: "Giúp người vay giảm dần áp lực tài chính ở các năm về sau và tiết kiệm tổng tiền lãi hơn so với phương thức tính lãi trên nợ gốc ban đầu.",
      commonMistakes: "Không dự trù khoản chi phí đội lên khi lãi suất được thả nổi sau thời hạn ưu đãi 12-24 tháng đầu.",
      realExample: "Vay 2 tỷ trong 20 năm, lãi 9%/năm: tháng thứ 1 trả 23.3 triệu, nhưng đến năm thứ 10 chỉ còn trả khoảng 15.8 triệu/tháng.",
      prerequisites: ["re-l0-01"],
      relatedConcepts: ["re-l2-01"],
      technicalDetails: "Công thức gốc tháng = Khoản vay / n; Lãi tháng t = Dư nợ còn lại (t-1) * (Lãi suất năm / 12).",
      source: "Hiệp Hội Ngân Hàng Việt Nam & Ngân Hàng Nhà Nước"
    },
    {
      id: "re-l2-01",
      domainId: "real-estate",
      title: "Tỷ Lệ Trọng Yếu DTI (Debt-to-Income) & Ngưỡng An Toàn Tài Chính",
      slug: "tyle-dti-nguong-an-toan",
      level: 2,
      summary: "Tỷ lệ phần trăm tổng số tiền trả nợ vay hàng tháng so với tổng thu nhập ròng của hộ gia đình.",
      explanation: "DTI (Debt-to-Income) là thước đo quan trọng nhất để đánh giá sức khỏe tài chính cá nhân trước khi quyết định vay mua nhà. Các chuyên gia tài chính khuyến nghị tỷ lệ DTI lý tưởng là dưới 35%, tối đa không nên vượt quá 40-45% để dự phòng cho các rủi ro ốm đau, mất việc hoặc lãi suất tăng cao.",
      whyItMatters: "Giúp bạn không rơi vào bẫy 'nô lệ của ngôi nhà' (House Poor) — có nhà đẹp nhưng không còn tiền cho sinh hoạt tối thiểu.",
      commonMistakes: "Cố vay đến hạn mức tối đa ngân hàng cho phép (70-80%) mà không tính quỹ khẩn cấp 6 tháng.",
      realExample: "Thu nhập 40 triệu/tháng, tiền trả góp ngân hàng 16 triệu &rarr; DTI = 40% (ngưỡng bắt đầu cần thận trọng).",
      prerequisites: ["re-l1-01"],
      relatedConcepts: ["re-l3-01"],
      technicalDetails: "Front-end DTI tính riêng khoản nợ nhà; Back-end DTI cộng dồn tất cả các khoản vay khác (thẻ tín dụng, trả góp xe).",
      source: "Nguyên Tắc Quản Trị Tài Chính Cá Nhân Quốc Tế"
    },
    {
      id: "re-l3-01",
      domainId: "real-estate",
      title: "Tỷ Suất Cho Thuê (Rental Yield) & Dòng Tiền Ròng (Net Cash Flow)",
      slug: "rental-yield-cash-flow",
      level: 3,
      summary: "Khả năng sinh dòng tiền đều đặn từ việc khai thác cho thuê bất động sản sau khi trừ toàn bộ chi phí vận hành.",
      explanation: "Gross Rental Yield = (Doanh thu cho thuê 1 năm / Giá mua nhà) * 100%. Net Rental Yield = (Doanh thu thực tế trừ phí quản lý, bảo trì, tỷ lệ phòng trống và thuế) / Tổng chi phí đầu tư. Bất động sản có dòng tiền ròng dương khi tiền thuê nhà hàng tháng lớn hơn tiền trả góp ngân hàng.",
      whyItMatters: "Phân biệt rõ giữa đầu tư tạo dòng tiền thụ động bền vững và đầu cơ thuần túy kỳ vọng vào tăng giá đất.",
      commonMistakes: "Không trừ tỷ lệ nhà để trống (Vacancy Rate trung bình 1 tháng/năm) và chi phí hao mòn nội thất.",
      realExample: "Căn hộ 3 tỷ cho thuê 12 triệu/tháng. Gross Yield = (12 * 12) / 3000 = 4.8%/năm. Trừ chi phí thực tế Net Yield chỉ còn khoảng 3.9%.",
      prerequisites: ["re-l1-01", "re-l2-01"],
      relatedConcepts: ["re-l4-01"],
      technicalDetails: "Net Operating Income (NOI) = Doanh thu tiềm năng - Thất thu phòng trống - Chi phí vận hành.",
      source: "Báo Cáo Nghiên Cứu Thị Trường BĐS CBRE & Savills"
    },
    {
      id: "re-l4-01",
      domainId: "real-estate",
      title: "Đòn Bẩy Tài Chính (Financial Leverage), Lãi Vay Thả Nổi & Phân Tích Độ Nhạy",
      slug: "don-bay-do-nhay-lai-suat",
      level: 4,
      summary: "Tác động khuếch đại lợi nhuận (và rủi ro vỡ nợ) khi dùng tiền vay kết hợp với biến động lãi suất thị trường.",
      explanation: "Đòn bẩy tài chính là con dao hai lưỡi. Khi thị trường tăng trưởng và biên độ lãi suất thấp hơn tỷ lệ tăng giá tài sản, đòn bẩy làm tăng vọt lợi nhuận trên vốn tự có (ROE). Tuy nhiên, khi lãi suất thả nổi thị trường tăng vọt 2-3% hoặc tính thanh khoản đóng băng, áp lực trả lãi có thể buộc nhà đầu tư phải bán cắt lỗ sâu.",
      whyItMatters: "Kỹ năng lập bảng kiểm tra độ nhạy (Sensitivity Analysis): nếu lãi suất tăng thêm 1%, 2%, 3% thì tiền trả tháng tăng thêm bao nhiêu và gia đình có chịu đựng nổi không.",
      commonMistakes: "Dùng đòn bẩy 70-80% trong giai đoạn lãi suất ưu đãi ngắn hạn mà không chuẩn bị kịch bản lãi suất tăng cao.",
      realExample: "Vay 2 tỷ thời hạn 20 năm: Khi lãi suất từ 8% tăng lên 11%, tiền trả mỗi tháng tăng thêm gần 4 triệu đồng (tương đương 48 triệu/năm).",
      prerequisites: ["re-l2-01", "re-l3-01"],
      relatedConcepts: [],
      technicalDetails: "Độ co giãn nghĩa vụ nợ theo lãi suất = delta(Monthly Payment) / delta(Interest Rate).",
      source: "Financial Risk Management Principles"
    },

    // ==========================================
    // 3. CARS CONCEPTS (L0 - L4)
    // ==========================================
    {
      id: "car-l0-01",
      domainId: "cars",
      title: "TCO (Total Cost of Ownership) — Chi Phí Sở Hữu Ô Tô 5 Năm",
      slug: "tco-chi-phi-so-huu-o-to",
      level: 0,
      summary: "Tổng toàn bộ ngân sách thực tế bạn phải chi trả từ ngày mua xe đến sau 5 năm sử dụng.",
      explanation: "Giá niêm yết trên giấy tờ chỉ là phần nổi của tảng băng chìm. TCO (Total Cost of Ownership) bao gồm: Giá lăn bánh (thuế trước bạ, biển số), chi phí nhiên liệu (xăng hoặc điện), phí bảo hiểm thân vỏ, bảo dưỡng định kỳ, phí cầu đường, gửi xe hàng tháng, và khoản chi phí vô hình lớn nhất: Khấu hao mất giá của chiếc xe.",
      whyItMatters: "Giúp người chuẩn bị mua xe tính đúng ngân sách hàng tháng để chiếc xe thực sự phục vụ cuộc sống chứ không trở thành gánh nặng nợ nần.",
      commonMistakes: "Chỉ gom đủ tiền mua xe mà không dự trù khoản chi phí cố định 'nuôi xe' từ 4 đến 8 triệu đồng mỗi tháng.",
      realExample: "Một chiếc xe hạng B giá 600 triệu sau 5 năm sử dụng thường tiêu tốn thêm khoảng 350 - 450 triệu đồng tổng chi phí vận hành và khấu hao.",
      prerequisites: [],
      relatedConcepts: ["car-l1-01"],
      technicalDetails: "TCO = Chi phí ban đầu + Chi phí vận hành (Nhiên liệu + Bảo dưỡng + Bảo hiểm + Bến bãi) - Giá trị thanh lý còn lại sau 5 năm.",
      source: "Hiệp Hội Các Nhà Sản Xuất Ô Tô Việt Nam (VAMA)"
    },
    {
      id: "car-l1-01",
      domainId: "cars",
      title: "Động Cơ Đốt Trong (ICE) vs Xe Điện (EV) — Chi Phí Năng Lượng",
      slug: "ice-vs-ev-energy-cost",
      level: 1,
      summary: "So sánh hiệu suất chuyển đổi năng lượng và bài toán kinh tế giữa đổ xăng truyền thống và sạc điện.",
      explanation: "Xe điện (EV) có hiệu suất chuyển đổi năng lượng từ pin sang động cơ đạt trên 85-90%, trong khi động cơ đốt trong (xăng/dầu) chỉ đạt khoảng 25-35% (phần lớn nhiệt lượng bị thất thoát qua ống xả và két nước). Do đó, chi phí điện cho 100km thường chỉ bằng 30-40% so với chi phí đổ xăng.",
      whyItMatters: "Giúp người mua xe căn cứ vào quãng đường di chuyển hàng năm để quyết định thời điểm xe điện bù đắp được chi phí mua ban đầu.",
      commonMistakes: "Không tính thời gian chờ đợi sạc pin khi đi xa hoặc chi phí lắp đặt trụ sạc tại nhà.",
      realExample: "Đi 1.500 km/tháng: Xe xăng tiêu tốn khoảng 2.3 triệu tiền xăng; Xe điện sạc pin chỉ tốn khoảng 850 nghìn đồng tiền điện.",
      prerequisites: ["car-l0-01"],
      relatedConcepts: ["car-l2-01"],
      technicalDetails: "1 Lít xăng tương đương năng lượng lý thuyết ~8.9 kWh, nhưng hiệu suất nhiệt thực tế làm tăng mức tiêu thụ thực tế.",
      source: "Bộ Giao Thông Vận Tải & Các Hãng Sản Xuất Ô Tô"
    },
    {
      id: "car-l2-01",
      domainId: "cars",
      title: "Đường Cong Khấu Hao Ô Tô (Vehicle Depreciation Curve)",
      slug: "khau-hao-o-to",
      level: 2,
      summary: "Tốc độ giảm giá trị của xe qua các năm: rơi giá mạnh nhất trong 2 năm đầu tiên.",
      explanation: "Một chiếc xe mới xuất xưởng sẽ mất giá ngay khoảng 10-15% giá trị ngay khi bấm biển số lăn bánh ra khỏi showroom. Năm thứ 1 mất khoảng 12-15%, các năm tiếp theo mất trung bình 8-10%/năm. Sau 5 năm, phần lớn các mẫu xe phổ thông giữ lại khoảng 50% - 60% giá trị ban đầu.",
      whyItMatters: "Hiểu đường cong khấu hao giúp bạn cân nhắc có nên mua xe lướt (1-2 năm tuổi) để tiết kiệm hàng trăm triệu đồng khấu hao ban đầu.",
      commonMistakes: "Tin rằng xe ô tô có thể 'giữ giá' như bất động sản hoặc vàng.",
      realExample: "Xe 800 triệu mới: sau năm 1 còn ~690 triệu; sau 3 năm còn ~560 triệu; sau 5 năm còn ~450 triệu.",
      prerequisites: ["car-l0-01", "car-l1-01"],
      relatedConcepts: ["car-l3-01"],
      technicalDetails: "Mô hình suy giảm số mũ: Giá trị năm t = Giá ban đầu * (1 - r)^t với r biến thiên theo phân khúc xe và thương hiệu.",
      source: "Kelley Blue Book & Thống Kê Thị Trường Xe Đã Qua Sử Dụng Việt Nam"
    },
    {
      id: "car-l3-01",
      domainId: "cars",
      title: "Hệ Thống Trợ Lái Nâng Cao (ADAS) & Giới Hạn Của Cảm Biến",
      slug: "adas-cam-bien-gioi-han",
      level: 3,
      summary: "Các công nghệ an toàn chủ động (phanh khẩn cấp, giữ làn, ga tự động thích ứng) và điều kiện hoạt động thực tế.",
      explanation: "Hệ thống ADAS (Advanced Driver Assistance Systems) sử dụng camera quang học, sóng radar milimet và cảm biến siêu âm để nhận diện chướng ngại vật. Dù hỗ trợ đắc lực cho người lái, hệ thống có thể bị vô hiệu hóa hoặc giảm độ chính xác trong điều kiện mưa to, sương mù dày đặc, nắng ngược chiếu thẳng vào camera kính lái hoặc vạch kẻ đường bị mờ.",
      whyItMatters: "Giúp người lái luôn làm chủ tay lái và không phụ thuộc mù quáng vào công nghệ trợ lái trên cao tốc.",
      commonMistakes: "Bỏ buông vô lăng hoặc phó mặc hoàn toàn cho hệ thống tự phanh trong điều kiện thời tiết xấu.",
      realExample: "Hệ thống phanh khẩn cấp tự động (AEB) có thể nhận diện muộn người đi bộ mặc áo mưa sẫm màu vào ban đêm khi trời mưa to.",
      prerequisites: ["car-l0-01"],
      relatedConcepts: ["car-l4-01"],
      technicalDetails: "Chuẩn SAE International phân loại tự hành từ Level 0 đến Level 5; các xe thương mại hiện nay phần lớn đạt Level 2.",
      source: "SAE International Standard J3016 & Euro NCAP Safety Testing"
    },
    {
      id: "car-l4-01",
      domainId: "cars",
      title: "Hệ Thống Quản Lý Nhiệt Pin (Thermal Management System) Trên Xe Điện",
      slug: "pin-xe-dien-quan-ly-nhiet",
      level: 4,
      summary: "Cơ chế làm mát và giữ ấm bộ pin để bảo toàn tuổi thọ cell pin và duy trì công suất sạc nhanh.",
      explanation: "Pin Lithium-ion (NMC hoặc LFP) hoạt động tối ưu trong dải nhiệt độ hẹp từ 20°C đến 35°C. Hệ thống quản lý nhiệt pin chủ động bằng chất lỏng (Liquid Cooling) sẽ bơm dung dịch làm mát quanh các module pin để giải tỏa nhiệt lượng cực lớn khi xe sạc nhanh DC (50kW - 250kW) hoặc khi xe tăng tốc liên tục ở tốc độ cao trên cao tốc.",
      whyItMatters: "Yếu tố quyết định độ bền của khối pin sau 8-10 năm sử dụng và tốc độ sạc tại các trạm sạc công cộng.",
      commonMistakes: "Nghĩ rằng pin xe điện chỉ bị chai do số lần sạc; trên thực tế nhiệt độ quá cao mới là thủ phạm chính gây suy giảm dung lượng (Degradation).",
      realExample: "Xe điện có hệ thống làm mát chất lỏng giữ pin ở mức 30°C khi sạc nhanh 150kW; xe làm mát gió thô sơ sẽ bị bóp công suất sạc còn 30kW để chống cháy nổ.",
      prerequisites: ["car-l1-01", "car-l2-01"],
      relatedConcepts: [],
      technicalDetails: "Nhiệt kế cell pin kết nối CAN-bus tới BMS (Battery Management System), tự động kích hoạt van điều nhiệt và bơm tuần hoàn.",
      source: "IEEE Transactions on Transportation Electrification"
    },

    // ==========================================
    // 4. MOTORCYCLES CONCEPTS (L0 - L4)
    // ==========================================
    {
      id: "moto-l0-01",
      domainId: "motorcycles",
      title: "Dung Tích Xi-Lanh (cc) & Các Dòng Xe Máy Phổ Thông",
      slug: "dung-tich-xi-lanh-phan-loai-xe",
      level: 0,
      summary: "Dung tích xi-lanh buồng đốt động cơ tính bằng cm³ (cc) và phân loại theo hệ truyền động.",
      explanation: "Dung tích xi-lanh phản ánh thể tích hòa khí tối đa mà piston có thể hút vào buồng đốt trong 1 chu kỳ. Thị trường xe máy phổ thông Việt Nam chia làm 3 nhóm chính: Xe số truyền thống (hộp số tròn 4 cấp, truyền động nhông sên dĩa), Xe tay ga (hộp số vô cấp CVT, truyền động dây curoa), và Xe máy điện (động cơ điện gắn trục bánh hoặc gắn giữa).",
      whyItMatters: "Giúp người mua lựa chọn đúng loại xe phù hợp với thể trạng, độ tiện dụng khi đi lại trong phố và mức tiêu thụ nhiên liệu.",
      commonMistakes: "Nghĩ rằng xe cc càng cao thì luôn luôn nhanh hơn và tốt hơn cho việc đi làm hàng ngày tắc đường.",
      realExample: "Một chiếc xe số 110cc chỉ tiêu thụ khoảng 1.7 Lít/100km, trong khi xe ga 150cc chạy phố tắc đường có thể tốn 2.5 - 2.8 Lít/100km.",
      prerequisites: [],
      relatedConcepts: ["moto-l1-01"],
      technicalDetails: "Dung tích xi lanh = (Pi * Đường kính piston² * Hành trình piston) / 4000.",
      source: "Cục Đăng Kiểm Việt Nam & Quy Chuẩn Kỹ Thuật Quốc Gia QCVN 14:2015/BGTVT"
    },
    {
      id: "moto-l1-01",
      domainId: "motorcycles",
      title: "Lịch Trình Bảo Dưỡng Định Kỳ: Dầu Nhớt Máy & Nhớt Láp",
      slug: "bao-duong-dinh-ky-dau-nhot",
      level: 1,
      summary: "Khoảng thời gian và chu kỳ quãng đường cần thiết để thay dầu nhớt và các chất lỏng bôi trơn xe máy.",
      explanation: "Dầu nhớt máy có nhiệm vụ bôi trơn, làm mát, làm sạch và bảo vệ piston xi lanh. Đối với xe tay ga, động cơ hoạt động ở vòng tua máy cao và nhiệt độ lớn hơn xe số, do đó cần thay nhớt máy mỗi 1.500 - 2.000 km. Đặc biệt, xe ga còn có hộp số vi sai bánh sau (bộ láp), cần thay nhớt láp định kỳ mỗi 3 lần thay nhớt máy (khoảng 5.000 - 6.000 km).",
      whyItMatters: "Quên thay nhớt láp là nguyên nhân hàng đầu khiến xe tay ga bị hú láp gầm rú và vỡ bánh răng hộp số.",
      commonMistakes: "Chỉ thay mỗi nhớt máy mà không hề biết đến sự tồn tại của nhớt hộp số (nhớt láp) ở bánh sau xe ga.",
      realExample: "Bỏ quên nhớt láp 2 năm khiến nước ngập lọt vào tạo thành bùn trắng, làm mòn nát toàn bộ bộ bánh răng truyền động sau (chi phí thay mới 1.8 - 2.5 triệu đồng).",
      prerequisites: ["moto-l0-01"],
      relatedConcepts: ["moto-l2-01"],
      technicalDetails: "Nhớt máy đạt chuẩn API SN, JASO MB (cho xe ga) hoặc JASO MA/MA2 (cho xe số chống trượt ly hợp).",
      source: "Hướng Dẫn Sử Dụng & Sổ Bảo Hành Chính Hãng Honda / Yamaha"
    },
    {
      id: "moto-l2-01",
      domainId: "motorcycles",
      title: "So Sánh Chi Phí Nuôi: Xe Tay Ga vs Xe Số vs Xe Máy Điện",
      slug: "so-sanh-tay-ga-xe-so-xe-dien",
      level: 2,
      summary: "Ma trận kinh tế tổng thể về chi phí nhiên liệu, vật tư hao mòn và độ tiện dụng khi di chuyển hàng ngày.",
      explanation: "Xe số có chi phí đầu tư ban đầu rẻ, ít tốn xăng và chi phí sửa chữa thay thế linh kiện cực kỳ thấp. Xe tay ga có cốp đựng đồ rộng, dễ lái, đi mưa sạch sẽ nhưng tiêu tốn nhiên liệu hơn 25-35% và chi phí bảo dưỡng cụm truyền động CVT đắt hơn. Xe máy điện có chi phí năng lượng rẻ nhất (chỉ bằng 1/4 tiền xăng) và không phải thay nhớt định kỳ, nhưng cần lưu ý về phạm vi di chuyển mỗi lần sạc.",
      whyItMatters: "Giúp người đi làm đô thị chọn đúng phương tiện tối ưu cho bài toán tài chính sinh hoạt của mình.",
      commonMistakes: "Bỏ qua chi phí thuê pin hoặc thay khối pin mới khi so sánh xe máy điện với xe xăng.",
      realExample: "Đi 30 km/ngày (900 km/tháng): Xe số tốn ~380k tiền xăng; Xe ga tốn ~520k tiền xăng; Xe điện tốn ~110k tiền điện.",
      prerequisites: ["moto-l0-01", "moto-l1-01"],
      relatedConcepts: ["moto-l3-01"],
      technicalDetails: "Khối lượng hao mòn vật tư: Xe số mòn nhông sên dĩa; Xe ga mòn dây curoa, bi nồi, bố ba càng; Xe điện mòn má phanh và lốp xe.",
      source: "Thống Kê Khảo Sát Chi Phí Tiêu Dùng Thực Tế Đô Thị Việt Nam"
    },
    {
      id: "moto-l3-01",
      domainId: "motorcycles",
      title: "Hệ Thống Phanh: Đĩa Thủy Lực, Phanh Kết Hợp (CBS) & Chống Bó Cứng (ABS)",
      slug: "he-thong-phanh-cbs-abs",
      level: 3,
      summary: "Sự khác biệt an toàn sống còn giữa phanh kết hợp cơ học và phanh điện tử chống trượt lốp.",
      explanation: "Phanh cơ tang trống (phanh đùm) dễ bị chai mòn và giảm lực phanh khi nóng. Phanh CBS (Combi Brake System) chỉ đơn thuần dùng dây cáp kéo cùng lúc cả phanh trước và phanh sau khi bóp phanh trái. Hệ thống chống bó cứng phanh ABS (Anti-lock Braking System) sử dụng cảm biến tốc độ bánh xe và bơm thủy lực điện tử để nhấp nhả má phanh hàng chục lần mỗi giây, ngăn chặn hoàn toàn hiện tượng khóa cứng bánh xe gây trượt ngã khi phanh gấp trên đường trơn ướt.",
      whyItMatters: "Trang bị ABS giảm thiểu đến 40% các vụ tai nạn té ngã xe máy do giật mình bóp cứng phanh trước.",
      commonMistakes: "Nhầm tưởng phanh CBS cũng có tính năng chống trượt bánh như phanh ABS.",
      realExample: "Chạy 60 km/h trời mưa gặp chướng ngại vật: Xe có ABS giữ vững thăng bằng dừng lại an toàn; Xe phanh đĩa thường không ABS dễ bị khóa bánh trước và quét đuôi ngã xòe.",
      prerequisites: ["moto-l0-01", "moto-l2-01"],
      relatedConcepts: ["moto-l4-01"],
      technicalDetails: "Cảm biến Hall trên đĩa đọc xung đo tốc độ góc bánh xe; ECU điều khiển van solenoid thủy lực.",
      source: "Bosch Motorcycle Safety Systems Research"
    },
    {
      id: "moto-l4-01",
      domainId: "motorcycles",
      title: "Bộ Truyền Động Vô Cấp CVT: Dây Curoa, Bi Nồi & Hiện Tượng Rung Đầu",
      slug: "truyen-dong-cvt-bi-noi-rung-dau",
      level: 4,
      summary: "Nguyên lý biến thiên tỷ số truyền theo lực ly tâm và nguyên nhân gây rung giật ở dải tốc độ thấp.",
      explanation: "Hộp số CVT trên xe ga sử dụng 2 puly (puly sơ cấp gắn cốt máy và puly thứ cấp gắn bánh sau) kết nối qua dây curoa cao su có sợi gia cường. Khi vòng tua máy tăng, các viên bi nồi văng ra ngoài theo lực ly tâm ép má puly đẩy dây curoa lên cao làm thay đổi tỷ số truyền. Hiện tượng rung đầu xe ga (khi vặn ga từ 0-20 km/h) xảy ra do bụi bẩn bám vào chuông nồi hoặc bề mặt bố ba càng bắt không đều gây trượt ly hợp.",
      whyItMatters: "Nhận biết sớm dấu hiệu mòn cụm nồi để vệ sinh bảo dưỡng, tránh đứt dây curoa giữa đường nguy hiểm.",
      commonMistakes: "Tự ý độ bi nồi quá nhẹ làm máy gào to nhưng xe không chạy, gây tốn xăng và nóng máy.",
      realExample: "Dây curoa xe ga cần thay mới sau mỗi 20.000 - 25.000 km; nếu không kiểm tra định kỳ, dây có thể nứt chân răng và đứt bất ngờ ở tốc độ cao.",
      prerequisites: ["moto-l1-01", "moto-l2-01"],
      relatedConcepts: [],
      technicalDetails: "Tỷ số truyền CVT thay đổi liên tục: R = r_primary / r_secondary tùy theo độ mở rãnh puly dưới tác động của lò xo đế nồi.",
      source: "Bando & Gates Automotive Transmission Belt Specifications"
    },

    // ==========================================
    // 5. HOME & CONSTRUCTION CONCEPTS (L0 - L4)
    // ==========================================
    {
      id: "home-l0-01",
      domainId: "home",
      title: "Dự Toán M² Xây Dựng & Diện Tích Sàn Quy Đổi",
      slug: "du-toan-m2-dien-tich-quy-doi",
      level: 0,
      summary: "Phương pháp ước tính tổng diện tích thi công bằng cách cộng các hệ số móng, mái và các tầng sàn.",
      explanation: "Trong xây dựng nhà ở dân dụng tại Việt Nam, diện tích tính đơn giá xây dựng không chỉ là diện tích mảnh đất nhân với số tầng. Đơn vị thi công sẽ quy đổi: Móng đơn (tính ~30% diện tích sàn), Móng cọc/Móng băng (tính ~40-50%), Mỗi tầng sàn (tính 100%), Mái tôn (tính ~30%), Mái bê tông cốt thép (tính ~50%), Mái ngói kèo sắt (tính ~70%).",
      whyItMatters: "Giúp chủ nhà tự tính được tổng diện tích xây dựng thực tế để không bị bất ngờ khi nhà thầu đưa ra con số cao hơn nhiều so với dự tính ban đầu.",
      commonMistakes: "Lấy diện tích đất 60m² nhân 2 tầng bằng 120m² rồi nhân đơn giá, bỏ quên hoàn toàn diện tích móng và mái (khiến dự toán thiếu hụt 25-30%).",
      realExample: "Đất 60m² xây 2 tầng mái bê tông: Diện tích tính tiền = 60m² móng (50%) + 60m² tầng 1 (100%) + 60m² tầng 2 (100%) + 60m² mái (50%) = 180m² quy đổi.",
      prerequisites: [],
      relatedConcepts: ["home-l1-01"],
      technicalDetails: "Định mức quy đổi diện tích theo thông lệ thi công xây dựng dân dụng tại các tỉnh thành Việt Nam.",
      source: "Viện Kinh Tế Xây Dựng — Bộ Xây Dựng"
    },
    {
      id: "home-l1-01",
      domainId: "home",
      title: "Bóc Tách: Phần Thô vs Nhân Công Hoàn Thiện vs Chìa Khóa Trao Tay",
      slug: "phan-tho-nhan-cong-chia-khoa-trao-tay",
      level: 1,
      summary: "Phân định rõ ranh giới trách nhiệm và vật tư giữa 3 hình thức giao khoán xây dựng phổ biến.",
      explanation: "1. Xây thô & Nhân công hoàn thiện: Nhà thầu cung cấp toàn bộ vật liệu thô (xi măng, cát, đá, sắt thép, gạch, ống nước, dây điện) và nhân công hoàn thiện (ốp lát, sơn bả). Chủ nhà tự mua gạch men, thiết bị vệ sinh, đèn, cửa. 2. Chìa khóa trao tay: Nhà thầu lo toàn bộ từ A đến Z, chủ nhà chỉ việc nghiệm thu dọn vào ở.",
      whyItMatters: "Giúp chủ nhà chọn hình thức giao khoán phù hợp với thời gian cá nhân và kiểm soát được chất lượng thiết bị hoàn thiện.",
      commonMistakes: "Khoán chìa khóa trao tay với đơn giá rẻ mà không có phụ lục hợp đồng ghi rõ mã model, thương hiệu từng thiết bị.",
      realExample: "Nếu không rành về kỹ thuật và không có thời gian giám sát mỗi ngày, giao khoán phần thô tiêu chuẩn kèm hợp đồng vật tư chi tiết là lựa chọn an toàn nhất.",
      prerequisites: ["home-l0-01"],
      relatedConcepts: ["home-l2-01"],
      technicalDetails: "Phần thô cấu thành bộ khung chịu lực bền vững của ngôi nhà (chiếm khoảng 50-60% tổng chi phí xây dựng cơ bản).",
      source: "Hiệp Hội Nhà Thầu Xây Dựng Việt Nam (VACC)"
    },
    {
      id: "home-l2-01",
      domainId: "home",
      title: "Tỷ Lệ Hao Hụt Vật Tư (Waste Rate) & Khoản Dự Phòng Phát Sinh 10%",
      slug: "hao-hut-vat-tu-du-phong-phat-sinh",
      level: 2,
      summary: "Định mức cắt gọt, vỡ vụn tự nhiên của gạch đá, sắt thép và ngân sách đệm dự phòng bắt buộc.",
      explanation: "Trong quá trình vận chuyển và thi công, vật liệu luôn bị hao hụt tự nhiên do việc cắt gạch lát chân tường, cắt sắt thép theo bản vẽ kết cấu, rơi vãi vữa hồ (tỷ lệ hao hụt trung bình 5% - 8%). Ngoài ra, chủ nhà thường phát sinh nhu cầu đổi vật liệu đẹp hơn hoặc bổ sung ổ cắm, đèn led trang trí, do đó bắt buộc phải dự phòng tối thiểu 10% ngân sách.",
      whyItMatters: "Tránh tình trạng công trình đang xây dựng dở dang thì hết tiền, phải vay mượn nóng với lãi suất cao.",
      commonMistakes: "Dự toán xây nhà bao nhiêu tiêu hết bấy nhiêu trong tài khoản, không có khoản đệm 10% phát sinh.",
      realExample: "Dự toán ban đầu 1 tỷ đồng: Cần chuẩn bị sẵn 1.1 tỷ để thanh toán các khoản phát sinh vật tư và chi phí hoàn thiện ngoài hợp đồng.",
      prerequisites: ["home-l0-01", "home-l1-01"],
      relatedConcepts: ["home-l3-01"],
      technicalDetails: "Thông tư 10/2019/TT-BXD quy định định mức hao hụt vật liệu trong thi công xây dựng dân dụng.",
      source: "Bộ Xây Dựng Định Mức Kinh Tế Kỹ Thuật"
    },
    {
      id: "home-l3-01",
      domainId: "home",
      title: "Hệ Thống Cơ Điện (MEP) & Kỹ Thuật Chống Thấm Sàn Vệ Sinh, Mái Sê-Nô",
      slug: "mep-chong-tham-san-ve-sinh",
      level: 3,
      summary: "Huyết mạch sinh hoạt của ngôi nhà: bố trí đường điện nước âm tường và xử lý triệt để nguy cơ rò rỉ nước.",
      explanation: "Hệ thống MEP (Mechanical, Electrical, Plumbing) chiếm khoảng 15-20% chi phí nhưng quyết định 80% độ tiện nghi khi sử dụng. Chống thấm là khâu kỹ thuật quan trọng bậc nhất: sàn vệ sinh, ban công và sê-nô mái bắt buộc phải bo cổ ống thoát sàn bằng vữa không co ngót (Grout), quét màng chống thấm polyme gốc xi măng tối thiểu 2 lớp và ngâm nước thử tải 24-48 giờ trước khi ốp lát.",
      whyItMatters: "Nhà thấm dột sau khi sơn hoàn thiện sẽ cực kỳ tốn kém để đục phá sửa chữa và phá hỏng thẩm mỹ toàn bộ ngôi nhà.",
      commonMistakes: "Tiết kiệm tiền dùng ống nước mỏng hoặc thợ bỏ qua bước ngâm thử nước kiểm tra chống thấm.",
      realExample: "Chi phí chống thấm chuẩn ngay từ đầu chỉ tốn 5-7 triệu đồng; nhưng nếu để bị thấm sang trần thạch cao tầng dưới, chi phí khắc phục lên tới 30-40 triệu đồng.",
      prerequisites: ["home-l1-01", "home-l2-01"],
      relatedConcepts: ["home-l4-01"],
      technicalDetails: "Tiêu chuẩn thi công và nghiệm thu màng chống thấm: TCVN 9345:2012 Kết cấu bê tông và bê tông cốt thép — Hướng dẫn kỹ thuật phòng chống nứt.",
      source: "Tiêu Chuẩn Quốc Gia TCVN & Sika Construction Solutions"
    },
    {
      id: "home-l4-01",
      domainId: "home",
      title: "Kết Cấu Chịu Lực: Bê Tông Cốt Thép, Mác Bê Tông & Chi Phí Vòng Đời",
      slug: "ket-cau-chiu-luc-mac-be-tong",
      level: 4,
      summary: "Sức chịu tải của móng, cột dầm sàn và bài toán chi phí bảo trì bền vững suốt 50 năm sử dụng.",
      explanation: "Mác bê tông (M200, M250, M300) thể hiện cường độ chịu nén tính bằng kg/cm² sau 28 ngày đông kết. Nhà dân dụng phổ biến dùng bê tông thương phẩm M250. Cốt thép phải được bố trí đúng lớp bê tông bảo vệ (tối thiểu 2-2.5cm) để ngăn chặn không khí và độ ẩm xâm thực làm gỉ sét cốt thép bên trong, đảm bảo tuổi thọ công trình trên 50 năm.",
      whyItMatters: "Đảm bảo tính mạng và sự an toàn tuyệt đối của toàn bộ thành viên gia đình trước các hiện tượng sụt lún, nứt dầm.",
      commonMistakes: "Tự ý đập bỏ tường chịu lực hoặc đục khoét dầm bê tông để luồn ống máy lạnh gây nứt sàn.",
      realExample: "Dùng bê tông tươi M250 tiêu chuẩn có độ sụt kiểm định tại chỗ giúp sàn nhà không bị nứt chân chim và giảm 50% nguy cơ thấm nước.",
      prerequisites: ["home-l2-01", "home-l3-01"],
      relatedConcepts: [],
      technicalDetails: "TCVN 5574:2018 Thiết kế kết cấu bê tông và bê tông cốt thép. Cường độ nén danh định tính theo mẫu lập phương 15x15x15 cm.",
      source: "Viện Khoa Học Công Nghệ Xây Dựng (IBST)"
    },

    // ==========================================
    // 6. FENG SHUI CONCEPTS (L0 - L4)
    // ==========================================
    {
      id: "fs-l0-01",
      domainId: "feng-shui",
      title: "Khái Niệm Phương Hướng & Bát Quái Trong Không Gian Nhà Ở",
      slug: "phuong-huong-bat-quai",
      level: 0,
      summary: "Tám phương vị cơ bản kết hợp với nguyên lý tiếp nhận ánh sáng tự nhiên và luồng khí trời.",
      explanation: "Phong thủy bắt nguồn từ nghệ thuật quan sát môi trường địa lý sống cổ xưa của người Á Đông ('Phong' là gió, 'Thủy' là nước). Tám phương vị gồm: 4 hướng chính (Đông, Tây, Nam, Bắc) và 4 hướng phụ (Đông Nam, Đông Bắc, Tây Nam, Tây Bắc). Việc xác định đúng tọa độ hướng nhà bằng la bàn là bước khởi đầu căn bản nhất.",
      whyItMatters: "Hiểu được cách người xưa mã hóa quy luật tự nhiên (ánh nắng mặt trời, hướng gió) vào các biểu tượng văn hóa.",
      commonMistakes: "Dùng ứng dụng la bàn điện thoại bị nhiễu sóng từ trường kim loại trong nhà dẫn đến đo sai lệch hướng nhà 10-20 độ.",
      realExample: "Nhà hướng Nam ở Việt Nam luôn mát mẻ vì đón trọn gió mùa hè và tránh được gió mùa Đông Bắc lạnh buốt.",
      prerequisites: [],
      relatedConcepts: ["fs-l1-01"],
      technicalDetails: "La bàn chia 360 độ thành 24 sơn hướng, mỗi sơn hướng chiếm góc 15 độ.",
      source: "Tài Liệu Nghiên Cứu Phong Thủy Kiến Trúc Phương Đông"
    },
    {
      id: "fs-l1-01",
      domainId: "feng-shui",
      title: "Trường Phái Bát Trạch: Đông Tứ Mệnh & Tây Tứ Mệnh",
      slug: "bat-trach-dong-tay-tu-menh",
      level: 1,
      summary: "Hệ thống phân chia cung mệnh người và phương hướng nhà thành hai nhóm hòa hợp.",
      explanation: "Trường phái Bát Trạch Minh Cảnh dựa trên năm sinh âm lịch để tính quái số (Càn, Khảm, Cấn, Chấn, Tốn, Ly, Khôn, Đoài). Nhóm Đông Tứ Mệnh hợp với các hướng Đông, Đông Nam, Nam, Bắc (hướng cát: Sinh Khí, Thiên Y, Diên Niên, Phục Vị). Nhóm Tây Tứ Mệnh hợp với các hướng Tây, Tây Bắc, Tây Nam, Đông Bắc.",
      whyItMatters: "Đây là trường phái phong thủy phổ biến và quen thuộc nhất trong tâm lý xây cất nhà cửa của người Việt Nam.",
      commonMistakes: "Quá câu nệ vào tuổi của một người mà bỏ qua các giải pháp kiến trúc thông gió và lấy sáng khoa học của ngôi nhà.",
      realExample: "Gia chủ Tây Tứ Mệnh nhưng mua nhà hướng Nam mát mẻ: Vẫn hoàn toàn an tâm ở vì có thể hóa giải bằng cách bố trí hướng ban thờ và hướng bếp quay về hướng Tây.",
      prerequisites: ["fs-l0-01"],
      relatedConcepts: ["fs-l2-01"],
      technicalDetails: "Bát Trạch chú trọng vào 'Môn, Táo, Chủ' (Cửa chính, Bếp nấu, Phòng ngủ gia chủ).",
      source: "Bát Trạch Minh Cảnh Cổ Bản & Khảo Cứu Văn Hóa Dân Gian"
    },
    {
      id: "fs-l2-01",
      domainId: "feng-shui",
      title: "Khoa Học Vi Khí Hậu: Bức Xạ Nhiệt & Đối Lưu Không Khí Tự Nhiên",
      slug: "khoa-hoc-vi-khi-hau-thong-gio",
      level: 2,
      summary: "Góc nhìn khoa học thực nghiệm đối chiếu với các quan niệm dân gian về 'tụ khí' và 'thoát khí'.",
      explanation: "Nhiều quan niệm phong thủy truyền thống thực chất là kinh nghiệm đúc kết từ khoa học vi khí hậu nhiệt đới. 'Tụ khí sinh tài' tương đồng với việc thiết kế luồng gió lưu thông tuần hoàn vừa phải, không để gió lùa thẳng từ cửa trước ra cửa sau tạo hiện tượng gió hút cực bộ gây cảm lạnh. Hướng Tây nắng nóng gay gắt buổi chiều làm tăng nhiệt độ tích tụ trong tường gạch, cần giải pháp lam che nắng và giếng trời.",
      whyItMatters: "Giúp bạn phân biệt được giá trị thực tế của việc bố trí không gian xanh, đón gió mát và ánh sáng tự nhiên với các yếu tố mê tín dị đoan.",
      commonMistakes: "Bịt kín cửa sổ hoặc che kín nhà để 'giữ khí', làm cho không gian ngột ngạt thiếu oxy và tích tụ khí độc formaldehyde.",
      realExample: "Bố trí giếng trời giữa nhà kết hợp cửa sau tạo hiệu ứng ống khói (Stack Effect), tự động hút khí nóng lên trên và kéo khí tươi mát vào nhà.",
      prerequisites: ["fs-l0-01", "fs-l1-01"],
      relatedConcepts: ["fs-l3-01"],
      technicalDetails: "Nguyên lý chênh lệch áp suất nhiệt độ (Thermal Buoyancy) và thông gió xuyên phòng (Cross Ventilation).",
      source: "Giáo Trình Vật Lý Kiến Trúc & Vi Khí Hậu — ĐH Kiến Trúc Hà Nội / TP.HCM"
    },
    {
      id: "fs-l3-01",
      domainId: "feng-shui",
      title: "Trường Phái Huyền Không Phi Tinh: Vận Thời & Sự Chuyển Động Của 9 Ngôi Sao",
      slug: "huyen-khong-phi-tinh-van-thoi",
      level: 3,
      summary: "Phương pháp xem phong thủy động theo thời gian: mỗi chu kỳ vận kéo dài 20 năm.",
      explanation: "Khác với Bát Trạch coi hướng nhà cố định cát hung theo tuổi, trường phái Huyền Không Phi Tinh coi cát hung của một ngôi nhà thay đổi theo chu kỳ thời gian (Tam Nguyên Cửu Vận, mỗi vận 20 năm). Từ năm 2024 đến năm 2043, thế giới bước vào Vận 9 (Cửu Tử Hỏa Tinh làm chủ đạo), các phương vị đón sao đương vượng số 9 sẽ mang lại vượng khí tốt nhất cho ngôi nhà.",
      whyItMatters: "Hiểu vì sao một ngôi nhà trước đây ở rất thuận lợi nhưng sau 20-30 năm lại có cảm giác sinh khí bị suy thoái.",
      commonMistakes: "Nghĩ rằng nhà xây xong phong thủy sẽ mãi mãi giữ nguyên không thay đổi qua các thế hệ.",
      realExample: "Lập tinh bàn 9 cung phi tinh dựa trên độ số đo chính xác bằng la bàn quân sự và năm hoàn thành công trình để bố trí không gian.",
      prerequisites: ["fs-l1-01", "fs-l2-01"],
      relatedConcepts: ["fs-l4-01"],
      technicalDetails: "Lạc Thư cửu cung, sao Sơn (quản nhân đinh, sức khỏe) và sao Hướng (quản tài lộc, thịnh vượng).",
      source: "Thẩm Thị Huyền Không Học & Khảo Cứu Phong Thủy Cổ"
    },
    {
      id: "fs-l4-01",
      domainId: "feng-shui",
      title: "Trường Phái Loan Đầu Hình Thế & Ranh Giới Phân Định Khoa Học vs Tín Ngưỡng",
      slug: "loan-dau-hinh-the-ranh-gioi-khoa-hoc",
      level: 4,
      summary: "Nghiên cứu hình thể môi trường xung quanh và tuyên bố minh bạch về bản chất văn hóa của phong thủy.",
      explanation: "Loan Đầu chú trọng vào hình thể thực tế xung quanh ngôi nhà: thế đất 'Tả Thanh Long, Hữu Bạch Hổ, Tiền Chu Tước, Hậu Huyền Vũ' tương ứng với việc có điểm tựa vững chãi phía sau, khoảng thoáng đãng đón sáng phía trước và 2 bên che chắn gió độc. TUYÊN BỐ QUAN TRỌNG: Phong thủy là một bộ môn kinh nghiệm văn hóa truyền thống và triết học nhân sinh, KnowLab không trình bày các diễn giải phong thủy như các định luật khoa học thực nghiệm đã được chứng minh.",
      whyItMatters: "Giúp người dùng giữ góc nhìn khách quan, khoa học, lấy sự tiện nghi, an toàn và tinh thần thoải mái của gia đình làm gốc.",
      commonMistakes: "Bỏ hàng trăm triệu mua vật phẩm phong thủy cầu tài lộc mà không chịu cải tạo hệ thống thông gió và chống ẩm mốc trong nhà.",
      realExample: "Thế 'đường đâm thẳng vào cửa' trong Loan Đầu thực chất là nguy cơ xe cộ mất phanh đâm vào nhà và bụi bặm, đèn pha ban đêm chiếu thẳng vào mắt; hóa giải khoa học nhất là trồng hàng rào cây xanh chắn bụi và giảm xung lực.",
      prerequisites: ["fs-l2-01", "fs-l3-01"],
      relatedConcepts: [],
      technicalDetails: "Hình thế học phong thủy cổ gắn liền với thuật chọn đất định cư của nền văn minh lúa nước Á Đông.",
      source: "Khảo Luận Văn Hóa & Kiến Trúc Cảnh Quan Dân Gian Việt Nam"
    }
  ],

  glossary: [
    {
      term: "TDP (Thermal Design Power)",
      domainId: "pc-building",
      shortDef: "Mức công suất nhiệt thiết kế của linh kiện CPU/GPU tính bằng Watt.",
      longDef: "Chỉ số do nhà sản xuất quy định để thiết kế bộ tản nhiệt phù hợp. Khi chạy tải nặng ở chế độ Turbo Boost, công suất điện thực tế có thể cao hơn đáng kể so với TDP danh định."
    },
    {
      term: "PSU Headroom (Độ dự phòng nguồn)",
      domainId: "pc-building",
      shortDef: "Khoảng công suất dôi dư an toàn của bộ nguồn so với tổng tải đỉnh của máy tính (khuyến nghị 20% - 30%).",
      longDef: "Giúp nguồn hoạt động ở dải tải hiệu suất cao nhất (80 Plus Gold), kéo dài tuổi thọ linh kiện và an toàn trước các đợt xung tải điện đột ngột (Transient Spikes)."
    },
    {
      term: "Clearance (Khoảng trống lắp đặt)",
      domainId: "pc-building",
      shortDef: "Kích thước giới hạn vật lý bên trong thùng máy (chiều dài card GPU, chiều cao tản khí CPU, kích cỡ radiator tản nước).",
      longDef: "Nếu kích thước linh kiện vượt quá thông số clearance của vỏ case, linh kiện sẽ bị cấn và không thể lắp đặt được."
    },
    {
      term: "12VHPWR (PCIe 5.0 16-Pin)",
      domainId: "pc-building",
      shortDef: "Đầu cắm nguồn 16-pin chuẩn mới có khả năng cấp tới 600W điện cho các card đồ họa RTX 4000 series.",
      longDef: "Chuẩn cắm mới của nguồn ATX 3.0, tích hợp 4 chân tín hiệu giao tiếp (sideband signals) để bộ nguồn và card đồ họa điều tiết dòng điện an toàn."
    },
    {
      term: "Diện tích thông thủy",
      domainId: "real-estate",
      shortDef: "Diện tích sử dụng thực tế tính theo mép trong của tường bao căn hộ.",
      longDef: "Là diện tích mà chủ nhà thực sự bước chân lên sinh hoạt và bố trí giường tủ. Được quy định bắt buộc ghi rõ trong hợp đồng mua bán căn hộ theo luật định."
    },
    {
      term: "DTI (Debt-to-Income)",
      domainId: "real-estate",
      shortDef: "Tỷ lệ phần trăm tổng tiền trả nợ hàng tháng so với tổng thu nhập ròng.",
      longDef: "Thước đo độ an toàn tài chính cá nhân. Ngưỡng an toàn khuyến nghị cho các khoản vay mua nhà là dưới 35% - 40% thu nhập."
    },
    {
      term: "TCO (Total Cost of Ownership)",
      domainId: "cars",
      shortDef: "Tổng chi phí thực tế sở hữu phương tiện trong suốt vòng đời sử dụng (mua xe, lăn bánh, nhiên liệu, bảo dưỡng, bảo hiểm, khấu hao).",
      longDef: "Khái niệm kinh tế giúp đánh giá toàn diện chiếc xe thay vì chỉ nhìn vào giá niêm yết ban đầu."
    },
    {
      term: "Hao hụt vật tư (Waste Rate)",
      domainId: "home",
      shortDef: "Tỷ lệ cắt gọt, vỡ vụn và rơi vãi tự nhiên của vật tư trong quá trình thi công xây dựng (thường 5% - 8%).",
      longDef: "Được tính vào đơn giá dự toán bóc tách công trình để chủ nhà chủ động mua đủ số lượng gạch, sắt thép, xi măng cần thiết."
    },
    {
      term: "Vi khí hậu (Microclimate)",
      domainId: "feng-shui",
      shortDef: "Điều kiện nhiệt độ, độ ẩm, hướng gió và bức xạ mặt trời cụ thể tại một khu vực không gian sống.",
      longDef: "Cơ sở khoa học hiện đại giải thích tính hiệu quả của các nguyên lý phong thủy truyền thống về đối lưu và đón sáng tự nhiên."
    }
  ]
};
