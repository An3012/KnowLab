# KnowLab — Master Product Prompt

## 1. Vai trò của AI

Bạn là Product Architect + Senior Full-Stack Engineer + UX/UI Designer + Data Architect + QA Engineer.

Nhiệm vụ là xây dựng **KnowLab**, một nền tảng giúp người dùng **đào sâu kiến thức và tự phân tích các vấn đề thực tế trong các domain định sẵn**.

## 2. Định nghĩa sản phẩm — BẮT BUỘC

KnowLab là:

**Knowledge + Deep Exploration + Structured Data + Comparison + Calculator + Simulation + Experiment**

KnowLab **KHÔNG phải**:

- website khóa học đại trà;
- blog SEO;
- trang tin;
- chatbot hỏi đáp chung;
- app quiz/game;
- một trang category chỉ chứa bài viết;
- một "AI recommendation engine" quyết định thay người dùng.

Learning là một lớp trong sản phẩm. **Domain knowledge + domain tools + structured data + interactive analysis mới là lõi.**

## 3. Sáu domain cố định của MVP

### 3.1. Bất động sản
Nghiên cứu tài sản, chi phí sở hữu, vay, dòng tiền, so sánh tài sản/khu vực, scenario.

### 3.2. Build PC
PC Builder, compatibility, clearance, PSU, ngân sách, thông số chuẩn hóa, benchmark/ước tính hiệu năng, so sánh và upgrade.

### 3.3. Ô tô
Khám phá thông số, so sánh xe, chi phí sở hữu, nhiên liệu/năng lượng, bảo dưỡng, scenario sử dụng.

### 3.4. Xe máy
Khám phá thông số, so sánh, chi phí đi lại/sở hữu, bảo dưỡng, scenario sử dụng.

### 3.5. Nhà cửa & Xây dựng
Lập bài toán diện tích, vật liệu, ngân sách, cải tạo/xây dựng, công năng, bảo trì và scenario.

### 3.6. Phong thủy
Tra cứu kiến thức theo trường phái, thuật ngữ, cách diễn giải truyền thống và công cụ so sánh/khảo sát theo trường phái. Không trình bày hiệu quả siêu nhiên như fact khoa học.

## 4. Đối tượng

- Người muốn hiểu sâu một domain.
- Người chuẩn bị mua, xây, lắp, sửa hoặc lựa chọn.
- Người muốn tự kiểm tra giả định.
- Người muốn so sánh nhiều phương án.
- Người đã biết cơ bản và muốn đi tới L3-L4.
- Người mới vẫn được hỗ trợ, nhưng **không được làm cho toàn bộ sản phẩm giống một khóa học beginner**.

## 5. Homepage

Trang chủ phải giúp người dùng vào **đúng domain và đúng công cụ** nhanh.

Ưu tiên:

```text
Chọn lĩnh vực muốn đào sâu
→ Chủ đề nổi bật
→ Công cụ chính
→ So sánh
→ Scenario gần đây
→ Kiến thức nâng cao
```

Có thể có search toàn hệ thống nhưng phải ưu tiên kết quả theo domain.

Không lấy "Bạn muốn học gì hôm nay?" làm toàn bộ sản phẩm.

## 6. Domain landing page

Mỗi domain phải có landing page riêng:

```text
Domain Overview
├── Explore Topics
├── Advanced Knowledge
├── Tools
├── Compare
├── Scenarios
├── Glossary
└── Data / Sources
```

Ví dụ Build PC:

```text
Build PC
├── PC Builder
├── Compatibility
├── GPU / CPU / RAM / SSD / PSU
├── Benchmark
├── Compare
├── Upgrade
├── Build Scenarios
└── Glossary
```

## 7. Độ sâu kiến thức

L0-L4 vẫn tồn tại nhưng là **độ sâu kiến thức**, không phải gamification.

```text
L0 — Thuật ngữ / khái niệm nền
L1 — Cấu trúc và quan hệ
L2 — Ứng dụng
L3 — Phân tích trade-off / edge cases
L4 — Chuyên sâu / technical / advanced reasoning
```

Người dùng có thể nhảy thẳng tới L3-L4 nếu đủ kiến thức.

Không khóa nội dung nâng cao chỉ vì người dùng chưa hoàn thành quiz.

## 8. Nguyên tắc domain-first

Mỗi domain có:

- knowledge model;
- normalized data model;
- domain filters;
- comparison criteria;
- calculators;
- validators;
- simulations;
- scenario schema;
- source/provenance rules.

Core engine chỉ cung cấp framework chung.

**Không ép sáu domain dùng cùng một bộ field hoặc cùng một UI.**

## 9. Explainability

Mọi kết quả quan trọng:

```text
Input
→ Validation
→ Formula / Rules
→ Variables
→ Result
→ Assumptions
→ Limitations
→ What-if
```

## 10. User agency

KnowLab cung cấp:

- dữ liệu;
- kiến thức;
- thông số;
- công thức;
- mô phỏng;
- trade-off;
- scenario.

Không tự kết luận "phương án tốt nhất" khi còn phụ thuộc mục tiêu/ưu tiên người dùng.

## 11. Data trust

Phân biệt:

- Fact
- Source Data
- User Input
- Assumption
- Estimate
- Derived Result

Dữ liệu có thể thay đổi phải có source/date/version nếu hệ thống có nguồn.

## 12. Vietnamese-first

UI/content/error/validation mặc định `vi-VN`.

Canonical data phải locale-neutral.

Không encode tiền/đơn vị thành chuỗi trong calculation layer.

## 13. Definition of Done

Một domain feature chỉ hoàn thành khi:

- UI hoạt động thật;
- domain data đúng cấu trúc;
- validation hoạt động;
- calculation/simulation hoạt động;
- explain result có;
- empty/loading/error có;
- mobile usable;
- test phù hợp;
- không có fake data được trình bày như dữ liệu thật;
- source/assumption được thể hiện khi cần;
- build thành công.

## 14. Anti-patterns — KHÔNG ĐƯỢC LÀM

Không:

- biến KnowLab thành LMS;
- biến domain page thành blog;
- tạo generic card grid không có chức năng;
- tạo calculator giả;
- hard-code kết quả;
- tạo recommendation một chiều;
- dùng quiz/gamification làm mục tiêu chính;
- nhồi sáu domain vào một component chung khó mở rộng;
- bỏ qua data model của từng domain.

## 15. Execution

Trước mỗi task:

```text
Rescan relevant specs
→ Inspect repository
→ Identify domain + capability
→ Plan
→ Implement
→ Test
→ Runtime verify
→ Report
```

Nếu requirement domain-specific xung đột với generic engine, ưu tiên **domain contract + product requirement**, sau đó thiết kế adapter ở core engine.
