# KnowLab — Antigravity Specification Pack v2

## Mục đích

KnowLab là một **nền tảng tra cứu, học sâu, phân tích, tính toán, mô phỏng và thử nghiệm kiến thức theo các lĩnh vực được định sẵn**.

KnowLab **không phải** một website khóa học tổng quát, blog SEO, chatbot hỏi đáp chung hoặc ứng dụng gamification.

Sáu domain MVP:

1. Bất động sản
2. Build PC
3. Ô tô
4. Xe máy
5. Nhà cửa & Xây dựng
6. Phong thủy

## Cách dùng

Antigravity phải đọc:

```text
MASTER_EXECUTE.md
antigravity-plan/README.md
toàn bộ antigravity-plan/*.md
```

`MASTER_EXECUTE.md` là execution controller.

Các file trong `antigravity-plan/` là specification chi tiết và phải được đọc lại trước task/feature/phase liên quan.

## Tư duy sản phẩm

Người dùng vào một **domain cụ thể**, chọn một chủ đề hoặc bài toán, sau đó:

```text
Chọn lĩnh vực
→ Chọn chủ đề / mục tiêu
→ Tra cứu kiến thức
→ Học sâu
→ Xem thông số / dữ liệu
→ Tính toán / kiểm tra
→ Thử biến số
→ So sánh
→ Lưu cấu hình / scenario
→ Quay lại đào sâu
```

Không ép mọi domain phải dùng cùng một UI hoặc cùng một calculator.

## Thứ tự đọc

```text
00_MASTER_PROMPT
01_PRODUCT_PLAN
02_ARCHITECTURE
03_KNOWLEDGE_ENGINE
04_LAB_SIMULATION
05_LEARNING_UX
06_DATA_TRUST
07_TECH_STACK
08_ROADMAP
09_ANTIGRAVITY_EXECUTION
10_DOMAIN_MODULES
11_FUTURE_IDEAS
12_QA_CHECKLIST
13_CONTENT_TEMPLATE
```

## Quy tắc quan trọng

- Domain là trung tâm sản phẩm.
- Core engine dùng chung; trải nghiệm và dữ liệu phải phù hợp từng domain.
- Không tạo một "learning app" chung rồi nhét sáu category vào.
- Không dùng nội dung chung chung thay cho công cụ chuyên ngành.
- Không tạo chức năng giả.
- Không hard-code dữ liệu thay đổi thường xuyên.
- Không biến estimate thành fact.
- Không tự quyết định thay người dùng.
- Tiếng Việt là ngôn ngữ mặc định.
- Ưu tiên giao diện desktop nhưng phải usable trên mobile.
- Tính năng chuyên sâu phải có đường đi rõ từ kiến thức → công cụ → kết quả.

## MVP

MVP phải chứng minh được ít nhất một luồng hoàn chỉnh trong từng domain:

```text
Domain
→ Topic
→ Knowledge
→ Domain Tool
→ Input
→ Calculation / Validation / Simulation
→ Explain Result
→ Compare hoặc What-if
→ Save
```

Không coi việc có vài trang text và vài nút điều hướng là hoàn thành domain.


## Domain plans — TÁCH RIÊNG

Các yêu cầu chuyên ngành được tách riêng:

- `DOMAIN_PC.md`
- `DOMAIN_REAL_ESTATE.md`
- `DOMAIN_CARS.md`
- `DOMAIN_MOTORCYCLES.md`
- `DOMAIN_HOME_CONSTRUCTION.md`
- `DOMAIN_FENG_SHUI.md`

`10_DOMAIN_MODULES.md` chỉ là index và quy tắc chọn domain file, không phải nơi chứa toàn bộ requirement.
