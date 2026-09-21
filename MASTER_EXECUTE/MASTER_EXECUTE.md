# MASTER_EXECUTE.md — KNOWLAB MASTER EXECUTION SPECIFICATION v2 — DOMAIN-FIRST

> **Vai trò của file này:** Đây là file duy nhất Antigravity cần đọc để hiểu, lập kế hoạch và triển khai toàn bộ KnowLab.
>
> **Nguyên tắc:** Không triển khai mù. Luôn audit repository → lập kế hoạch → implement theo phase → test → review → báo cáo → mới sang phase tiếp theo.

---

# 0. DOCUMENT ORCHESTRATION & SOURCE OF TRUTH

`MASTER_EXECUTE.md` is the **execution controller**, not a copy of all detailed specifications.

The detailed product and engineering specifications remain in the Markdown files under:

```text
antigravity-plan/
├── README.md
├── 00_MASTER_PROMPT.md
├── 01_PRODUCT_PLAN.md
├── 02_ARCHITECTURE.md
├── 03_KNOWLEDGE_ENGINE.md
├── 04_LAB_SIMULATION.md
├── 05_LEARNING_UX.md
├── 06_DATA_TRUST.md
├── 07_TECH_STACK.md
├── 08_ROADMAP.md
├── 09_ANTIGRAVITY_EXECUTION.md
├── 10_DOMAIN_MODULES.md
├── 11_FUTURE_IDEAS.md
├── 12_QA_CHECKLIST.md
└── 13_CONTENT_TEMPLATE.md
```

## 0.1. Mandatory rescan rule

**At the beginning of every new task, phase, feature, bug fix, or architectural change:**

1. Read `MASTER_EXECUTE.md`.
2. Rescan the entire `antigravity-plan/` directory.
3. Read all Markdown specification files that are relevant to the requested task.
4. If the task is broad, re-read all files under `antigravity-plan/`.
5. Compare the current specification with the existing implementation.
6. Identify specification changes since the previous implementation before coding.

Do **not** assume that the specification files are unchanged since the last task.

## 0.2. Specifications are live documents

The files under `antigravity-plan/` are **live specifications**.

When a specification file changes, the next relevant task must use the updated version.

Do not rely on a previous reading, cached interpretation, or earlier implementation plan.

Example:

```text
03_KNOWLEDGE_ENGINE.md
        ↓
User changes specification
        ↓
Next KnowLab task
        ↓
Re-read current file
        ↓
Reconcile with implementation
```

## 0.3. Separation of responsibilities

### MASTER_EXECUTE.md

Defines:

- execution protocol;
- phase order;
- phase gates;
- engineering rules;
- quality requirements;
- source-of-truth hierarchy;
- how Antigravity must inspect, implement, test, review, and report.

### `antigravity-plan/*.md`

Defines detailed:

- product requirements;
- domain requirements;
- architecture details;
- knowledge model;
- learning UX;
- lab/simulation behavior;
- data/trust rules;
- technology decisions;
- content templates;
- QA details;
- future ideas.

Therefore:

> **Do not duplicate detailed specifications into `MASTER_EXECUTE.md`.**

If a detailed requirement changes, update the relevant specification file rather than copying it into this file.

## 0.4. Source-of-truth priority

When sources disagree, use this order:

```text
1. MASTER_EXECUTE.md
   → execution protocol, phase order, quality gates, mandatory engineering behavior

2. Relevant current files under antigravity-plan/
   → detailed product and technical requirements

3. Existing repository implementation
   → current technical reality

4. Older plans, previous task reports, cached assumptions
   → lowest priority
```

If two current specification files conflict:

- detect the conflict;
- identify the exact files/sections;
- do not silently choose one;
- determine whether `MASTER_EXECUTE.md` resolves it;
- otherwise report the conflict before making a potentially destructive decision.

The goal is to **reconcile**, not blindly overwrite.

## 0.5. Specification change detection

For each task, determine whether relevant specifications have changed.

At minimum inspect:

- file names;
- modification status if available;
- relevant headings/sections;
- architecture decisions;
- data contracts;
- acceptance criteria;
- roadmap/phase requirements.

If a change affects existing code:

```text
Specification changed
        ↓
Impact analysis
        ↓
Update implementation
        ↓
Update tests
        ↓
Run validation
        ↓
Report migration/regression impact
```

Never assume that a specification edit is documentation-only.

## 0.6. No stale-plan implementation

Do not implement from an old plan that was created before the latest specification scan.

Before coding, produce a concise internal/current-task map:

```text
Current Specification
        ↓
Current Repository
        ↓
Gap
        ↓
Implementation Plan
```

The implementation plan must reflect the **current files**, not a previous conversation state.

## 0.7. Adding/removing specification files

The `antigravity-plan/` directory may evolve.

Do not hard-code the requirement that exactly 14 files always exist.

If new `.md` files are added:

- discover them;
- classify their purpose;
- read them when relevant;
- include them in the source-of-truth reconciliation.

If a specification file is removed or renamed:

- do not recreate it automatically;
- use the current repository state;
- report if a required specification appears to be missing.

## 0.8. Practical operating model

Use this model for every implementation task:

```text
                 MASTER_EXECUTE.md
                         │
                         ▼
              Execution / Quality Rules
                         │
                         ▼
              Scan antigravity-plan/
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
   Relevant specs                 Existing repository
          │                             │
          └──────────────┬──────────────┘
                         ▼
                   Gap analysis
                         │
                         ▼
                 Implementation plan
                         │
                         ▼
                    Implement
                         │
                         ▼
                      Test
                         │
                         ▼
                     Review
                         │
                         ▼
                      Report
```
# 0.9. LANGUAGE & LOCALIZATION — VIETNAMESE FIRST

KnowLab MVP uses **Vietnamese (vi-VN) as the default language**.

The detailed specifications under `antigravity-plan/` remain live documents.
This section defines the mandatory language/localization rules for implementation.

## Language rules

- Default UI language: **Tiếng Việt**.
- Default learning/content language: **Tiếng Việt**.
- English is not the primary user-facing language in MVP.
- Technical terms may include the English term in parentheses when useful.
- Terminology must remain consistent across UI, lessons, glossary, labs, comparison, validation, errors, charts, scenarios, and search.

Example:

> Bộ xử lý trung tâm (CPU — Central Processing Unit)

## i18n

Do not hard-code user-facing strings throughout components.

Prefer:

UI Component
→ Translation Key
→ vi-VN locale

Keep translation content separate from:

- calculation logic;
- domain rules;
- validation logic;
- database identifiers;
- internal enum values.

Internal identifiers must remain language-neutral.

## Locale

Use Vietnamese locale for:

- numbers;
- dates;
- times;
- currency;
- percentages;
- measurements.

Use locale-aware formatters instead of manually constructing formatted strings.

This structure intentionally keeps `MASTER_EXECUTE.md` stable while allowing detailed specifications to evolve independently.

## 0.9. LANGUAGE & LOCALIZATION — VIETNAMESE FIRST

KnowLab MVP uses **Vietnamese (`vi-VN`) as the default user-facing language**.

These rules are mandatory implementation rules and do not replace the detailed specifications under `antigravity-plan/`.

### UI language

- Default UI language for MVP: **Tiếng Việt (`vi-VN`)**.
- Architecture must remain **i18n-ready** for future languages.
- Do not hard-code user-facing strings directly inside components when they should be localized.
- Prefer:
  `Component → Translation Key → Locale Resource`.
- Keep user-facing translation content separate from calculation logic, domain rules, validation logic, database identifiers, and internal enum values.
- Internal identifiers must remain language-neutral.
- Technical terms may show Vietnamese + English when useful.
- Buttons must use clear Vietnamese actions.
- Test realistic long Vietnamese strings, especially on mobile.
- Vietnamese labels must remain accessible and must not be truncated in a way that removes meaning.

### Content language

- MVP learning content is Vietnamese-first.
- Vietnamese must be natural, clear, beginner-friendly, and domain-consistent.
- Do not use literal machine translation as the final user-facing copy.
- Maintain a canonical terminology/glossary system.
- Use one canonical Vietnamese term consistently across UI, lessons, glossary, labs, comparison, validation, charts, scenarios, and search.
- When a technical term is important, introduce it progressively:
  `Giải thích dễ hiểu → Ví dụ → Thuật ngữ kỹ thuật → Giải thích chi tiết → Technical details`.

### Locale formatting

Use locale-aware formatting for presentation:

- numbers;
- dates;
- times;
- currency;
- percentages;
- measurements.

Canonical data must remain locale-neutral and machine-readable. See the dedicated data-format rules later in this document.

# 1. MASTER DIRECTIVE

KnowLab là một **nền tảng đào sâu kiến thức + dữ liệu có cấu trúc + công cụ phân tích/tính toán/mô phỏng** dành cho các lĩnh vực được định sẵn.

**Không được triển khai KnowLab như một LMS, blog, website bài viết hoặc chatbot hỏi đáp chung.**

## 1.1. Product center

Core của KnowLab:

```text
DOMAIN
  ↓
TOPIC / ENTITY
  ↓
KNOWLEDGE
  ↓
STRUCTURED DATA
  ↓
DOMAIN TOOL
  ↓
VALIDATION / CALCULATION / SIMULATION
  ↓
COMPARE / WHAT-IF
  ↓
SCENARIO
  ↓
DEEPER KNOWLEDGE
```

Learning Engine là lớp hỗ trợ, không phải trung tâm duy nhất.

## 1.2. Sáu domain MVP

1. Bất động sản
2. Build PC
3. Ô tô
4. Xe máy
5. Nhà cửa & Xây dựng
6. Phong thủy

Mỗi domain phải có **plan, data model, knowledge model, tool set, comparison rules và scenario rules riêng**.

## 1.3. Homepage

Homepage phải giúp người dùng chọn lĩnh vực và đi thẳng tới:

- topic;
- tool;
- compare;
- advanced knowledge;
- scenario;
- glossary;
- search.

Không biến homepage thành dashboard học tập với progress/quiz làm trung tâm.

## 1.4. Domain landing

Mỗi domain có:

```text
Overview
Topics
Tools
Compare
Scenarios
Glossary
Advanced
Sources
```

## 1.5. Advanced-first

L0-L4 là độ sâu kiến thức:

- L0: nền tảng;
- L1: cấu trúc/quan hệ;
- L2: ứng dụng;
- L3: trade-off/edge cases;
- L4: technical/deep reasoning.

Người dùng có thể truy cập L3-L4 trực tiếp.

## 1.6. Domain-specific implementation

Đọc `10_DOMAIN_MODULES.md` trước khi triển khai domain.

Không ép:

- PC;
- BĐS;
- ô tô;
- xe máy;
- nhà;
- phong thủy

dùng cùng field/UI/calculator.

Core engine cung cấp contract; domain module cung cấp business rules.

## 1.7. Build PC là domain có yêu cầu tool cao

PC MVP phải có plan riêng cho:

- PC Builder;
- Compatibility Checker;
- Clearance Check;
- Wattage Calculator;
- Advanced Filters;
- Sticky Budget;
- Normalized Specs;
- Benchmark integration nếu có data;
- Save / Print / Share.

Chi tiết bắt buộc nằm trong `10_DOMAIN_MODULES.md` và `04_LAB_SIMULATION.md`.

## 1.8. Anti-pattern

Nếu implementation tạo ra:

```text
Home
→ generic lesson cards
→ generic quiz
→ generic progress
```

nhưng không có domain tools/data/analysis, thì **không đạt yêu cầu sản phẩm**.

# 2. NON-NEGOTIABLE PRODUCT PRINCIPLES

## 2.1. Zero-knowledge first

Không được giả định người dùng biết thuật ngữ.

Mỗi khái niệm mới phải có ít nhất một trong:

- giải thích ngắn;
- tooltip;
- glossary;
- ví dụ;
- “tại sao điều này quan trọng?”;
- liên kết tới prerequisite.

Ví dụ:

Không chỉ viết:

> CPU có TDP 125W.

Mà phải giúp người mới hiểu:

> TDP là chỉ số liên quan đến mức công suất/nhiệt thiết kế của CPU. Nó không nhất thiết bằng điện năng thực tế trong mọi tải.

## 2.2. Progressive disclosure

Thông tin hiển thị theo tầng:

**Dễ hiểu → Chi tiết → Kỹ thuật → Chuyên sâu**

Người mới không bị ngợp.

Người dùng nâng cao vẫn có thể mở rộng.

## 2.3. Explain WHY

Không chỉ trả kết quả.

Phải giải thích:

- kết quả là gì;
- vì sao ra kết quả đó;
- biến nào ảnh hưởng;
- giả định nào được sử dụng;
- thay đổi biến nào sẽ làm kết quả thay đổi.

## 2.4. User agency

KnowLab cung cấp:

- dữ liệu;
- kiến thức;
- công thức;
- mô phỏng;
- trade-off;
- scenario.

Không tự quyết định thay người dùng.

Không ép một phương án là “tốt nhất” nếu kết quả phụ thuộc mục tiêu và ưu tiên cá nhân.

## 2.5. Fact / Assumption / Estimate / Input / Derived Result

Luôn phân biệt rõ:

- **Fact** — dữ kiện;
- **Assumption** — giả định;
- **Estimate** — ước tính;
- **User Input** — dữ liệu người dùng nhập;
- **Derived Result** — kết quả được tính/suy ra.

## 2.6. Auditability

Một kết quả tính toán quan trọng phải có khả năng truy ngược:

- input;
- unit;
- formula;
- assumptions;
- engine version;
- timestamp;
- source/data version nếu có.

---

# 3. PRODUCT LOOP

Đây là vòng lặp trung tâm của KnowLab:

```text
Choose Goal
   ↓
Learn
   ↓
Understand
   ↓
Experiment
   ↓
Change Variable
   ↓
Compare Result
   ↓
Save Scenario
   ↓
Reflect
   ↓
Learn Next
```

MVP phải chứng minh vòng lặp này hoạt động tốt.

---

# 4. USER LEVELS

Hệ thống học có 5 level:

### Level 0 — Chưa biết gì
- thuật ngữ cơ bản;
- khái niệm nền;
- ví dụ đời thường.

### Level 1 — Cơ bản
- hiểu thành phần;
- hiểu quan hệ giữa các khái niệm;
- quiz đơn giản.

### Level 2 — Thực hành
- giải bài toán;
- dùng calculator;
- làm lab;
- so sánh.

### Level 3 — Nâng cao
- trade-off;
- sensitivity;
- scenario;
- edge cases.

### Level 4 — Chuyên sâu
- mô hình;
- giới hạn;
- dữ liệu;
- phương pháp;
- technical details.

---

# 5. CORE PRODUCT MODULES

## 5.1. Home

Trang chủ phải trả lời:

> “Bạn muốn hiểu điều gì?”

Có các entry point:

- Tôi muốn mua nhà
- Tôi muốn build PC
- Tôi muốn hiểu ô tô
- Tôi muốn tìm hiểu xe máy
- Tôi muốn hiểu xây/sửa nhà
- Tôi muốn tìm hiểu phong thủy
- Tôi không biết bắt đầu từ đâu

Ngoài ra:

- search;
- continue learning;
- beginner roadmap;
- popular experiments;
- compare;
- glossary.

---

## 5.2. Learn

Bao gồm:

- Roadmap;
- Lesson;
- Chapter;
- Quiz;
- Progress;
- Prerequisite;
- Recommended next lesson;
- Weak concepts.

Lesson structure:

```text
Why this matters
↓
Concept
↓
Simple example
↓
Visual / diagram nếu hữu ích
↓
Common mistakes
↓
Mini quiz
↓
Practical challenge
↓
Lab / Experiment
↓
Next concept
```

---

## 5.3. Explore

Cho phép khám phá:

- concepts;
- glossary;
- related knowledge;
- prerequisite;
- next knowledge;
- common confusion;
- knowledge graph.

---

## 5.4. Compare

So sánh 2–4 đối tượng.

Ví dụ:

- CPU A vs CPU B;
- GPU A vs GPU B;
- xe A vs xe B;
- nhà A vs nhà B;
- phương án vay A vs B.

Compare phải hiển thị:

- criteria;
- value;
- explanation;
- trade-off;
- assumptions;
- source/data date nếu có.

Không ép một “winner” khi không có tiêu chí khách quan duy nhất.

---

## 5.5. Lab

Mô hình chuẩn:

```text
Input
↓
Validation
↓
Assumptions
↓
Calculation / Simulation
↓
Result
↓
Explanation
↓
What-if
↓
Scenario
```

Lab phải cho phép:

- chỉnh input;
- reset;
- undo;
- what-if;
- compare scenario;
- save scenario.

---

## 5.6. Scenario

Một scenario cần lưu:

```text
id
name
domain
goal
inputs
units
assumptions
results
engineVersion
dataVersion
createdAt
updatedAt
```

Scenario A/B/C phải có thể so sánh.

---

## 5.7. Decision Journal

Cho phép người dùng ghi:

- Goal;
- Context;
- Assumptions;
- Data;
- Results;
- Decision;
- What to verify;
- Lessons learned.

Mục tiêu không phải đưa lời khuyên quyết định mà giúp người dùng **ra quyết định có cơ sở và có thể xem lại**.

---

# 6. KNOWLEDGE ENGINE

Core entity:

```text
Domain
Concept
Lesson
Experiment
Scenario
Comparison
```

Concept nên hỗ trợ:

```text
id
domain
title
slug
shortDefinition
longExplanation
level
prerequisites[]
relatedConcepts[]
commonConfusions[]
examples[]
tags[]
sources[]
```

Quan hệ kiến thức:

```text
prerequisite
related
part-of
causes
affects
contrasts-with
common-confusion
next
```

Kiến trúc phải hướng tới Knowledge Graph.

---

# 7. LEARNING ENGINE

Learning Engine chịu trách nhiệm:

- prerequisite checking;
- progress;
- completion;
- quiz;
- weak concepts;
- next lesson;
- roadmap;
- recommendations.

Không hard-code logic học trong UI.

Ví dụ:

```text
Learning UI
    ↓
Learning Service
    ↓
Knowledge Graph
    ↓
Progress Repository
```

---

# 8. COMPARISON ENGINE

Comparison Engine phải tách khỏi UI.

Input:

```text
items[]
criteria[]
context
```

Output:

```text
normalized values
differences
tradeoffs
explanations
assumptions
```

Không hard-code “best item”.

---

# 9. CALCULATION / SIMULATION ENGINE

Tất cả calculation/simulation quan trọng phải:

- pure;
- deterministic khi input giống nhau;
- testable;
- độc lập UI;
- có units;
- có validation;
- có assumptions;
- có formula;
- có error handling.

Ví dụ interface:

```text
calculate(input) -> result
simulate(input) -> result
explain(input, result) -> explanation
```

Không để công thức quan trọng nằm trực tiếp trong component UI.

---

# 10. DOMAIN REQUIREMENTS

Chi tiết implementation độc lập nằm trong `antigravity-plan/10_DOMAIN_MODULES.md`.

## 10.1. Bất động sản

Phải có knowledge + structured property data + tools cho:

- property analysis;
- mortgage;
- affordability;
- cash flow;
- rental yield;
- comparison;
- sensitivity.

Output phải phân biệt fact/input/assumption/estimate.

## 10.2. Build PC — NON-NEGOTIABLE

### PC Builder

Chọn CPU/GPU/mainboard/RAM/storage/PSU/case/cooling.

### Compatibility

Kiểm tra:

- CPU socket;
- CPU support/BIOS nếu có data;
- RAM generation;
- RAM constraints;
- PSU connectors;
- storage interface;
- cooler support;
- form factor.

### Clearance

Kiểm tra:

- GPU length;
- GPU thickness/slot;
- CPU cooler height;
- radiator clearance;
- case constraints.

### Power

Tính estimated system load + headroom và đưa ra PSU range theo rule/assumption.

### Advanced filters

Mainboard/CPU/GPU/PSU phải có normalized filters phù hợp.

### Budget

Sticky cart + target budget + realtime total.

### Benchmark

Chỉ hiển thị benchmark/FPS estimate khi có source và test conditions.

### Normalized specs

Side-by-side dùng field/value/unit/source/lastUpdated.

### Share

Save + shortlink/readonly + export/report architecture.

## 10.3. Ô tô

Phải có:

- normalized specs;
- comparison;
- fuel/energy;
- TCO;
- ownership scenario;
- maintenance assumptions.

## 10.4. Xe máy

Phải có:

- normalized specs;
- commuting;
- fuel;
- maintenance;
- ownership scenario.

## 10.5. Nhà cửa & Xây dựng

Phải có:

- area;
- quantity;
- material;
- unit cost;
- labor;
- waste/assumption;
- renovation/build scenario;
- maintenance.

## 10.6. Phong thủy

Phải có:

- knowledge by school;
- terminology;
- interpretation;
- school comparison;
- scenario.

Luôn ghi rõ trường phái/cách diễn giải. Không trình bày hiệu quả siêu nhiên như fact khoa học.

# 11. TRUST / DATA / SOURCING

Mỗi dữ liệu có tính thay đổi nên có:

- source;
- retrieved/updated date;
- data version;
- unit;
- geography;
- scope;
- limitations.

Không trộn:

```text
Fact
Estimate
Assumption
Derived Result
```

Formula display nên cho người dùng xem:

```text
Formula
Variables
Units
Input values
Result
Rounding
Limitations
```

---

# 12. UX RULES

## Vietnamese-first UI

All primary user-facing UI in MVP must be Vietnamese:

- navigation;
- buttons;
- forms;
- labels;
- tooltips;
- dialogs;
- loading states;
- empty states;
- error states;
- quiz;
- lab;
- comparison;
- scenario;
- onboarding.

Write for users who may know nothing about the domain.

Prefer:

> Khoản trả trước (Down payment)

with a clear explanation before exposing technical terminology.

Buttons should use clear Vietnamese actions:

- Tính toán
- Chạy mô phỏng
- Thử thay đổi
- Lưu scenario
- So sánh
- Đặt lại
- Xem giải thích

Vietnamese text can be longer than English, so responsive layouts must be tested with realistic Vietnamese strings.

## 12.1. Luôn hiển thị đơn vị

Không có:

```text
500
```

nếu cần:

```text
500 triệu VNĐ
500 kg
500 km
500 W
```

## 12.2. Validation thân thiện

Không:

> Invalid input.

Nên:

> Khoản trả trước không thể lớn hơn giá mua. Hãy nhập giá trị nhỏ hơn hoặc bằng giá mua.

## 12.3. Empty states

Mỗi module phải có empty state hữu ích.

Ví dụ:

> Chưa có scenario. Hãy chạy thử một mô phỏng để tạo scenario đầu tiên.

## 12.4. Explainable results

Mỗi kết quả quan trọng phải có:

- result;
- “vì sao?”;
- variables;
- assumptions.

---

## 12.5. Vietnamese-first implementation checklist

For every new or modified user-facing flow, verify:

- [ ] Vietnamese is the default MVP language.
- [ ] User-facing strings use translation keys where localization is applicable.
- [ ] No unnecessary hard-coded UI strings.
- [ ] i18n architecture is preserved.
- [ ] Canonical Vietnamese terminology is consistent.
- [ ] Buttons/actions are clear in Vietnamese.
- [ ] Long Vietnamese labels and messages work on mobile.
- [ ] Labels remain accessible.
- [ ] Loading, empty, validation, and error states are also Vietnamese.

# 13. ARCHITECTURE

Ưu tiên kiến trúc:

```text
UI
↓
Application Services
↓
Domain Modules
↓
Calculation / Simulation Engines
↓
Repositories / Data
```

Gợi ý structure:

```text
src/
  app/
  components/
    ui/
    learning/
    lab/
    comparison/
    charts/
  domains/
    real-estate/
    pc-building/
    cars/
    motorcycles/
    home/
    feng-shui/
  engines/
    knowledge/
    learning/
    comparison/
    calculator/
    simulation/
    scenario/
  data/
  services/
  hooks/
  utils/
  tests/
```

Có thể điều chỉnh theo repository hiện tại nếu framework yêu cầu.

**Không được áp đặt structure này một cách mù quáng.**

Trước tiên phải audit codebase.

---

# 14. TECHNICAL RULES

## 14.1. Existing repository first

Trước khi tạo/sửa code:

1. inspect package manager;
2. inspect framework;
3. inspect source tree;
4. inspect existing routes;
5. inspect components;
6. inspect state management;
7. inspect data layer;
8. inspect tests;
9. inspect lint/typecheck/build;
10. inspect README/config;
11. tìm code đã có thể tái sử dụng.

Không rewrite toàn bộ project chỉ vì thích architecture khác.

## 14.2. Reuse before replace

Ưu tiên:

```text
Reuse
→ Refactor
→ Extend
→ Replace only when justified
```

## 14.3. Domain-first

Business logic không được phụ thuộc presentation.

## 14.4. Type safety

Nếu stack hỗ trợ TypeScript:

- bật strict mode nếu khả thi;
- tránh `any`;
- định nghĩa domain types;
- validate external data.

## 14.5. Testing

Ưu tiên test:

1. calculation;
2. simulation;
3. compatibility;
4. comparison normalization;
5. learning prerequisites;
6. scenario serialization;
7. critical UI flows.

---

# 15. ACCESSIBILITY

Phải hỗ trợ:

- keyboard navigation;
- visible focus;
- semantic HTML;
- accessible labels;
- sufficient contrast;
- error messages;
- responsive layout;
- reduced-motion consideration;
- screen-reader-friendly controls.

Không dùng màu sắc là tín hiệu duy nhất.

---

# 16. PERFORMANCE

Tránh:

- calculation nặng trong render;
- unnecessary re-render;
- duplicate data fetch;
- giant components;
- giant state objects;
- blocking UI.

Các simulation nặng có thể chạy worker/background nếu cần.

---

# 17. SECURITY / PRIVACY

Thu thập dữ liệu tối thiểu.

Không lưu dữ liệu nhạy cảm nếu không cần.

Scenario phải tránh chứa thông tin cá nhân không cần thiết.

Validate mọi external/user input.

Không tin tưởng client-side validation là lớp bảo mật duy nhất.

---

# 17.1. PRODUCT DIRECTION GUARDRAILS

Antigravity phải tự kiểm tra trước khi hoàn tất bất kỳ phase nào:

- [ ] Đây là sản phẩm **domain-first**, không phải LMS.
- [ ] Mỗi domain có knowledge + structured data + tool riêng.
- [ ] User có thể đi thẳng vào advanced knowledge.
- [ ] Tool tạo ra kết quả thật, không phải UI giả.
- [ ] PC Builder có compatibility/clearance/power/filter/budget.
- [ ] Compare dùng normalized data.
- [ ] Scenario lưu input/assumption/result/version.
- [ ] Không có generic feature nào che mất yêu cầu domain-specific.
- [ ] Không bịa price/benchmark/compatibility/live data.
- [ ] Vietnamese encoding là UTF-8 từ source đến browser.

# 18. ROADMAP — EXECUTION PHASES

## PHASE 0 — Repository Audit

Chưa build feature lớn.

Thực hiện:

- inspect repository;
- framework;
- dependencies;
- current architecture;
- routes;
- components;
- state;
- data;
- tests;
- build;
- lint;
- typecheck;
- existing technical debt.

Output bắt buộc:

```text
Repository Summary
Existing Architecture
Reusable Assets
Risks
Conflicts with KnowLab Spec
Recommended Implementation Strategy
```

**Dừng sau Phase 0 và báo cáo.**

---

## PHASE 1 — Foundation

Build:

- app shell;
- routing;
- design system/base UI;
- responsive layout;
- navigation;
- domain selection;
- Home skeleton;
- error boundary;
- loading states;
- empty states.

Acceptance:

- app chạy;
- navigation hoạt động;
- responsive;
- không phá feature cũ.

---

## PHASE 2 — Knowledge Engine

Build:

- Domain;
- Concept;
- Lesson;
- relationships;
- glossary;
- prerequisite;
- related knowledge;
- knowledge graph data model.

Acceptance:

- concept detail hoạt động;
- prerequisite hoạt động;
- related concepts hoạt động;
- data-driven, không hard-code UI.

---

## PHASE 3 — Learning

Build:

- roadmap;
- lesson flow;
- progress;
- quiz;
- completion;
- next lesson;
- weak concepts;
- continue learning.

Acceptance:

```text
Start
→ Learn
→ Quiz
→ Complete
→ Progress
→ Next
```

---

## PHASE 4 — Compare

Build:

- compare UI;
- 2–4 items;
- criteria;
- normalization;
- trade-offs;
- explanation;
- assumptions.

Acceptance:

Có thể compare ít nhất một use case hoàn chỉnh trong từng domain đã có dữ liệu.

---

## PHASE 5 — Lab / Calculator / Simulation

Build lab framework chung.

Flow:

```text
Inputs
→ Validation
→ Assumptions
→ Engine
→ Result
→ Explanation
→ What-if
```

Bắt đầu bằng một số lab đại diện, sau đó mở rộng.

Acceptance:

- calculation test;
- input validation;
- result explanation;
- what-if;
- reset;
- units.

---

## PHASE 6 — Scenario

Build:

- save;
- rename;
- duplicate;
- delete;
- load;
- compare scenarios;
- scenario metadata;
- engine version.

Acceptance:

```text
Run Lab
→ Save Scenario A
→ Change Inputs
→ Save Scenario B
→ Compare A/B
```

---

## PHASE 7 — Search / Discovery

Build:

- global search;
- concept search;
- lesson search;
- experiment search;
- glossary;
- related discovery.

Ưu tiên search theo:

```text
Title
Alias
Tags
Definition
Domain
```

---

## PHASE 8 — UX / Polish

Review:

- mobile;
- desktop;
- accessibility;
- loading;
- empty;
- error;
- tooltips;
- animations;
- visual hierarchy;
- onboarding.

---

## PHASE 9 — QA

Chạy:

- unit tests;
- integration tests;
- e2e nếu có;
- lint;
- typecheck;
- build.

Manual test:

```text
Home
→ Domain
→ Learn
→ Lesson
→ Quiz
→ Lab
→ What-if
→ Compare
→ Save Scenario
→ Reload
→ Search
```

---

## PHASE 10 — Release Readiness

Kiểm tra:

- environment variables;
- production build;
- error handling;
- data consistency;
- accessibility;
- performance;
- security;
- documentation.

Không đánh dấu release-ready nếu còn lỗi critical.

---

# 19. ANTIGRAVITY EXECUTION PROTOCOL

Khi được giao task:

## Bước 1 — Read

Đọc file này toàn bộ.

## Bước 2 — Inspect

Kiểm tra repository thực tế.

## Bước 3 — Map

Map:

```text
Current State
vs
Target State
```

## Bước 4 — Plan

Viết implementation plan ngắn:

```text
Files to change
Files to create
Architecture impact
Tests needed
Risks
```

## Bước 5 — Implement

Implement incremental.

Không thay đổi ngoài scope nếu không cần thiết.

## Bước 6 — Test

Sau mỗi thay đổi đáng kể:

- lint;
- typecheck;
- unit tests;
- build khi phù hợp.

## Bước 7 — Review

Tự kiểm tra:

- correctness;
- architecture;
- UX;
- accessibility;
- edge cases;
- regression.

## Bước 8 — Report

Báo cáo:

```text
Completed
Changed
Tests
Known Limitations
Risks
Next Step
```

---

# 20. PHASE GATE

Không tự động nhảy qua phase.

Mỗi phase phải đạt:

```text
Feature works
+
Tests pass
+
No critical regression
+
Architecture remains maintainable
+
UX is usable
```

Nếu chưa đạt:

```text
Fix
→ Test
→ Re-review
```

rồi mới tiếp tục.

---

# 21. DEFINITION OF DONE

Một feature chỉ được coi là Done khi:

- functionality hoạt động;
- loading state có;
- empty state có;
- error state có;
- validation có;
- responsive;
- accessibility cơ bản;
- tests phù hợp;
- typecheck pass;
- lint pass;
- build pass nếu applicable;
- không hard-code business logic vào UI;
- documentation được cập nhật nếu cần.

---

# 22. CONTENT MODEL

Lesson template:

```text
Title
Level
Goal
Prerequisites
Why it matters
Concept explanation
Simple example
Detailed explanation
Visual
Common mistakes
Quiz
Practical challenge
Experiment
Related concepts
Next lesson
Sources
```

Experiment template:

```text
Title
Domain
Goal
Inputs
Units
Validation
Assumptions
Formula / Model
Calculation
Result
Explanation
What-if
Limitations
Sources
```
## Vietnamese-first content

MVP content must be written in natural, clear Vietnamese.

Avoid literal machine translation.

Maintain a canonical glossary:

```text
termId
viLabel
englishLabel
shortDefinition
detailedDefinition
aliases
domain
level

```

---

### Vietnamese-first beginner lesson requirements

For beginner-facing content, answer at minimum:

1. **Đây là gì?**
2. **Tại sao cần biết?**
3. **Ví dụ thực tế là gì?**
4. **Liên quan đến khái niệm nào?**
5. **Sai lầm thường gặp là gì?**
6. **Có thể thử hoặc tính gì?**
7. **Nên học gì tiếp theo?**

Technical depth should progress from simple language to technical detail rather than exposing advanced terminology immediately.

## 22.1. DATA FORMAT & LOCALE RULES

Canonical stored data must be locale-neutral. Never store locale-formatted strings as the canonical numeric value.

Bad:

```text
"125.000.000 ₫"
```

Good:

```text
amount: 125000000
currency: VND
```

Rules:

- `VND` is the canonical currency code for the Vietnam MVP where Vietnamese currency is required.
- Never silently convert currencies.
- If currency conversion is performed, store the exchange-rate assumption, source, and date/version used.
- Numeric values remain numeric internally.
- Locale-aware formatting happens only at the presentation layer.
- Dates/times are stored in machine-readable form, such as ISO timestamps, and displayed using `vi-VN`.
- Units must be explicit, for example:
  `value: 150`, `unit: "km/h"`.
- Keep one consistent internal percentage convention. Recommended:
  `0.15 = 15%`.
- A compact display such as `1,5 triệu đồng` is presentation only; the underlying value remains `1500000`.
- Charts and tables must show units, appropriate precision, locale-aware formatting, and source/date where relevant.

Do not mix display formatting with calculation/business logic.

# 23. DATA VERSIONING

Calculation engine phải có version.

Ví dụ:

```text
engineVersion: "1.0.0"
dataVersion: "2026-01"
```

Khi formula thay đổi đáng kể:

- version tăng;
- scenario cũ vẫn phải đọc được;
- kết quả cũ không được âm thầm thay đổi.

---

# 24. ERROR HANDLING

Lỗi phải phân loại:

```text
ValidationError
CalculationError
DataError
NetworkError
UnexpectedError
```

Thông báo cho người dùng phải dễ hiểu.

Developer log phải đủ context nhưng không log dữ liệu nhạy cảm không cần thiết.

---

## 24.1. Vietnamese-first validation and error rules

User-facing validation and error messages must be written in clear Vietnamese.

A useful message should explain:

- **Có gì sai?**
- **Vì sao sai?**
- **Cần làm gì để sửa?**

Validation logic must remain language-neutral. Prefer a structured result such as:

```text
ValidationResult {
  code
  field
  params
  severity
}
```

The UI maps validation codes to the active locale.

Minimum error categories:

```text
InvalidInput
MissingData
ContradictoryData
InsufficientData
SourceUnavailable
SystemError
```

Do not expose stack traces, database errors, internal identifiers, or raw developer error messages to ordinary users.

Developer logs may retain technical context subject to the security/privacy rules.

# 25. MOBILE-FIRST THINKING

Mọi interaction quan trọng phải usable trên mobile:

- sliders;
- input;
- tables;
- compare;
- charts;
- tooltip;
- navigation;
- scenario controls.

Bảng comparison trên mobile phải có strategy rõ ràng:

- horizontal scroll;
- stacked comparison;
- hoặc responsive cards.

---

# 26. CHARTS / VISUALIZATION

Charts dùng khi giúp hiểu quan hệ.

Ví dụ:

- sensitivity;
- cost breakdown;
- monthly payment;
- TCO;
- power;
- scenario difference.

Mỗi chart cần:

- title;
- axis labels;
- units;
- legend nếu cần;
- accessible fallback/table nếu cần.

Không dùng chart chỉ để trang trí.

---

# 27. EXPLAIN RESULT PATTERN

Mọi simulation quan trọng nên có phần:

### Kết quả
Giá trị chính.

### Vì sao?
Các biến chính.

### Giả định
Các assumption.

### Nếu thay đổi...
What-if.

### Cần lưu ý
Limitations.

Ví dụ:

```text
Chi phí sở hữu 5 năm ước tính: X

Vì sao:
- quãng đường hàng năm: A
- giá nhiên liệu: B
- bảo dưỡng: C
- khấu hao giả định: D

Nếu giá nhiên liệu tăng 20%:
→ kết quả thay đổi thành Y

Lưu ý:
Đây là mô phỏng dựa trên input, không phải chi phí thực tế đảm bảo.
```

---

# 28. FUTURE BACKLOG — DO NOT BUILD AUTOMATICALLY

Các ý tưởng tương lai:

## Scenario Playground

> “Nếu… thì sao?”

## Reverse Learning

Người dùng đưa một bài toán.

KnowLab phát hiện:

- kiến thức cần có;
- kiến thức còn thiếu;
- roadmap đề xuất.

## Knowledge Gap

Theo dõi:

- concept yếu;
- prerequisite thiếu;
- lỗi quiz;
- lab mistakes.

## Explain My Result

AI giải thích kết quả dựa trên calculation engine.

## Mistake Simulator

Cho người dùng cố tình nhập sai để học.

## Counterfactual Mode

```text
Nếu X không đổi
Nếu Y tăng 20%
Nếu Z giảm 10%
```

## Reality Check

Phân loại:

```text
Known Fact
Assumption
Estimate
Unknown
```

## Beginner vs Expert Mode

Cùng một concept nhưng khác độ sâu.

## Challenge Mode

Đưa bài toán thực tế.

## Knowledge Graph Explorer

Cho phép visual exploration.

## AI Tutor

AI chỉ trả lời dựa trên Knowledge Engine/data được phép.

## Community Scenarios

Scenario có thể chia sẻ.

## Versioned Calculations

Theo dõi thay đổi formula/data.

## Data Sources

Quản lý source và freshness.

## Cross-domain Life Simulator

Ví dụ:

```text
Income
↓
Housing
↓
Transportation
↓
PC
↓
Home
↓
Budget
```

**Không build các tính năng này trong MVP nếu chưa có yêu cầu riêng.**

---

# 29. MVP DEFINITION

MVP không cần toàn bộ content.

MVP phải chứng minh:

```text
Choose Goal
→ Learn
→ Understand
→ Experiment
→ Change Variable
→ Compare Result
→ Save Scenario
```

Nếu loop này chưa tốt, ưu tiên cải thiện loop thay vì thêm feature.

---

# 30. QUALITY CHECKLIST

## Product

- [ ] Người mới hiểu được.
- [ ] Không phụ thuộc kiến thức nền chưa giải thích.
- [ ] Có progressive disclosure.
- [ ] Có “why”.
- [ ] Có what-if.
- [ ] Có scenario.
- [ ] Có learning loop.

## Engineering

- [ ] Domain logic tách UI.
- [ ] Calculation engine testable.
- [ ] Types rõ.
- [ ] Validation.
- [ ] Error handling.
- [ ] Tests.
- [ ] No critical regression.

## UX

- [ ] Responsive.
- [ ] Mobile usable.
- [ ] Loading.
- [ ] Empty.
- [ ] Error.
- [ ] Accessibility.
- [ ] Clear units.

### Vietnamese-first UX checks

- [ ] Vietnamese is the default MVP UI language.
- [ ] No unnecessary hard-coded user-facing strings.
- [ ] i18n remains possible.
- [ ] Vietnamese terminology is consistent.
- [ ] Long Vietnamese text works on mobile.
- [ ] Validation and error messages are clear Vietnamese.

## Data

- [ ] Fact/Assumption/Estimate/Input/Derived phân biệt.
- [ ] Source khi cần.
- [ ] Timestamp khi cần.
- [ ] Formula visible khi phù hợp.
- [ ] Versioned calculations.

### Locale/data-format checks

- [ ] Canonical numeric values are locale-neutral.
- [ ] Currency is explicit using an ISO currency code.
- [ ] Units are explicit.
- [ ] Dates/times are machine-readable.
- [ ] Locale formatting happens only at presentation.
- [ ] Percentage representation is consistent.

## Trust

- [ ] Không overclaim.
- [ ] Không biến estimate thành fact.
- [ ] Không biến simulation thành guarantee.
- [ ] Feng shui được contextualize như kiến thức truyền thống/văn hóa.
- [ ] User remains decision maker.

---

# 31. FIRST COMMAND TO ANTIGRAVITY

Khi bắt đầu project, hãy thực hiện chính xác quy trình sau:

```text
Read MASTER_EXECUTE.md completely.

Then rescan the entire antigravity-plan/ directory.

Read all current Markdown specification files under antigravity-plan/.
Do not assume the previous versions of these files are still current.

Treat:
- MASTER_EXECUTE.md as the execution controller;
- the current antigravity-plan/*.md files as detailed specifications;
- the existing repository as the implementation reality.

Then inspect the existing repository before modifying anything.

Do not implement Phase 1 yet.

Execute PHASE 0 — Repository Audit.

Return:

1. Specification files discovered
2. Specification summary
3. Specification conflicts, if any
4. Repository Summary
5. Existing Architecture
6. Current Stack
7. Existing Routes
8. Existing Components
9. Existing State/Data Layer
10. Existing Tests
11. Existing Build/Lint/Typecheck Commands
12. Reusable Assets
13. Technical Debt / Risks
14. Conflicts between specification and implementation
15. Recommended implementation strategy
16. Phase 1 implementation plan

Do not make destructive changes.
Do not rewrite the project.
Do not install unnecessary dependencies.

Stop after the audit and wait for approval before implementing Phase 1.
```

---

# 32. SUBSEQUENT PHASE COMMAND

Sau khi một phase được duyệt:

```text
Re-read MASTER_EXECUTE.md.

Rescan the current antigravity-plan/ directory.

Re-read all specification files relevant to the approved phase.
If the phase is broad, re-read all specification files.

Compare the current specification against:
- the current implementation;
- the previous phase output;
- existing tests;
- existing contracts.

Detect specification changes before coding.

Implement the next approved phase only.

Before coding:
- identify files to create/change;
- identify specification sections driving the change;
- identify architecture impact;
- identify tests;
- identify migrations/regressions;
- identify risks.

Then:
- implement incrementally;
- preserve existing contracts unless the current specification requires a change;
- reuse existing code where possible;
- keep domain logic separate from UI;
- add/update tests;
- run lint/typecheck/tests/build as applicable.

After implementation report:

Specifications scanned:
Specification changes detected:
Completed:
Changed:
Created:
Tests:
Build:
Regressions checked:
Known limitations:
Risks:
Next phase:
```

---

# 33. IMPORTANT BEHAVIOR RULES FOR ANTIGRAVITY

1. **Không đoán repository.** Hãy inspect.
2. **Không rewrite toàn bộ app** nếu không có lý do.
3. **Không tạo abstraction quá sớm.**
4. **Không hard-code domain logic vào UI.**
5. **Không hard-code calculation trong component.**
6. **Không thêm dependency nếu native/existing dependency đã đủ.**
7. **Không xây future backlog trước MVP loop.**
8. **Không đánh dấu Done khi chưa test.**
9. **Không che giấu limitation của simulation.**
10. **Không biến assumption thành fact.**
11. **Không biến estimate thành guarantee.**
12. **Không để UI quyết định business logic.**
13. **Không làm mất khả năng reset/what-if.**
14. **Không làm mất traceability của scenario.**
15. **Không tiếp tục phase nếu phase gate chưa đạt.**

---

# 33. RECURRING TASK PROTOCOL

For any later request — feature, bug fix, refactor, content change, calculation change, UX change, or domain expansion — use:

```text
1. Read MASTER_EXECUTE.md
2. Rescan antigravity-plan/
3. Identify relevant specification files
4. Read their current content
5. Inspect affected repository code
6. Compare specification vs implementation
7. Detect conflicts / stale assumptions
8. Create a scoped implementation plan
9. Implement
10. Test
11. Review
12. Report
```

### Special rule for specification edits

If the user asks to modify a specification file:

```text
Modify the requested specification
        ↓
Check whether the change affects architecture,
data contracts, calculations, UX, tests, or roadmap
        ↓
Report impacted areas
        ↓
Do not silently modify unrelated implementation
```

If the user asks to implement a feature described in a specification:

```text
Read the latest specification first.
Do not use an older implementation interpretation.
```

### Special rule for calculation/simulation changes

If a specification change affects formulas, assumptions, units, or simulation behavior:

- identify affected engine(s);
- identify affected scenarios;
- update tests;
- consider engine/data versioning;
- check backward compatibility;
- explicitly report whether old saved scenarios remain reproducible.

## 33.1. LANGUAGE / LOCALE EXECUTION CHECK

For every implementation task that changes user-facing UI, content, validation, errors, charts, tables, or numeric display:

1. Read the relevant current specifications under `antigravity-plan/`.
2. Check the implementation against the Vietnamese-first rules in this file.
3. Keep canonical data locale-neutral.
4. Keep domain/calculation/validation logic independent from presentation language.
5. Add or update translation keys/resources instead of introducing unnecessary hard-coded user-facing strings.
6. Test Vietnamese copy at realistic lengths on responsive layouts.
7. Include localization/data-format findings in the task report when relevant.

A feature is not complete if its core behavior works but its Vietnamese-first or locale/data-format requirements are broken.

# 34. FINAL NORTH STAR

KnowLab phải tạo ra trải nghiệm:

> **“Tôi không biết gì → Tôi hiểu nó → Tôi biết cách tính → Tôi thử được → Tôi thấy điều gì xảy ra khi thay đổi → Tôi hiểu trade-off → Tôi tự đưa ra quyết định có cơ sở.”**

Nếu phải lựa chọn giữa:

```text
More Features
vs
Better Understanding
```

ưu tiên:

**Better Understanding.**

Nếu phải lựa chọn giữa:

```text
More Content
vs
Better Learning Loop
```

ưu tiên:

**Better Learning Loop.**

Nếu phải lựa chọn giữa:

```text
Faster Implementation
vs
Auditable Correctness
```

đối với calculation/simulation quan trọng, ưu tiên:

**Auditable Correctness.**

---

# 35. MASTER SUCCESS CRITERIA

KnowLab thành công khi một người hoàn toàn mới có thể:

1. Chọn một chủ đề.
2. Hiểu thuật ngữ cơ bản.
3. Đi theo roadmap.
4. Học một concept.
5. Làm quiz.
6. Mở experiment.
7. Nhập dữ liệu.
8. Hiểu assumptions.
9. Chạy calculation/simulation.
10. Hiểu kết quả.
11. Thay đổi một biến.
12. Quan sát kết quả thay đổi.
13. So sánh hai scenario.
14. Lưu scenario.
15. Biết mình nên học gì tiếp theo.

**Đó là tiêu chuẩn cốt lõi của KnowLab.**


## DOMAIN PLAN ROUTING — BẮT BUỘC

Các yêu cầu chuyên ngành **không được gộp vào một file domain chung**.

Trước task domain, phải đọc đúng file:

```text
Build PC              → DOMAIN_PC.md
Bất động sản          → DOMAIN_REAL_ESTATE.md
Ô tô                  → DOMAIN_CARS.md
Xe máy                → DOMAIN_MOTORCYCLES.md
Nhà cửa & Xây dựng    → DOMAIN_HOME_CONSTRUCTION.md
Phong thủy             → DOMAIN_FENG_SHUI.md
```

`10_DOMAIN_MODULES.md` chỉ là index/routing.

Nếu task cross-domain:
1. đọc core specs;
2. đọc tất cả domain files liên quan;
3. không suy diễn requirement của domain này sang domain khác.

Một domain feature chỉ được coi là complete khi domain-specific plan + core plan + QA đều được đáp ứng.
