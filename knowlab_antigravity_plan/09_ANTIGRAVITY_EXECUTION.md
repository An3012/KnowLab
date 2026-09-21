# KnowLab — Antigravity Execution Rules

## Startup

Mỗi task:

1. Đọc `MASTER_EXECUTE.md`.
2. Đọc relevant plan files.
3. Nếu task thuộc domain, đọc `10_DOMAIN_MODULES.md` phần domain đó.
4. Inspect repository.
5. Xác định phase/capability.
6. Plan.
7. Implement.
8. Test.
9. Runtime verify.

## Domain task protocol

```text
Domain
→ Requirement
→ Data contract
→ UI
→ Domain logic
→ Validation
→ Calculation/Simulation
→ Explain Result
→ Compare/Scenario
→ Test
```

## Không được suy diễn

Nếu requirement chưa rõ:

- tìm trong spec;
- kiểm tra existing implementation;
- không tự biến một ý tưởng thành requirement bắt buộc.

## During coding

- reuse;
- không duplicate;
- không calculation trong UI;
- không fake API;
- không fake data;
- không hard-code volatile data;
- không phá contract.

## PC đặc biệt

Mọi thay đổi PC Builder phải kiểm tra:

- compatibility;
- clearance;
- power;
- filters;
- budget;
- mobile;
- normalized specs.

## After coding

Chạy:

- build;
- test;
- lint/typecheck nếu có;
- runtime verification.

## Khi fail

```text
Detect
→ Root cause
→ Fix
→ Test
→ Regression
```

## Dừng khi

- framework/database contract cần phá;
- thiếu external credential;
- requirement mâu thuẫn;
- thiếu dữ liệu khiến calculation không xác định;
- có destructive migration cần xác nhận.

## Never

Không:

- invent prices;
- invent benchmarks;
- claim live data;
- claim unsupported compatibility;
- hide errors;
- silently change requirements;
- biến KnowLab thành generic LMS.

## Final report

```text
PHASE:
DOMAIN:
STATUS:

Requirements implemented:
...

Files created:
...

Files modified:
...

Runtime:
...

Tests:
...

Build:
...

Data/source:
...

Known limitations:
...

Next:
...
```
