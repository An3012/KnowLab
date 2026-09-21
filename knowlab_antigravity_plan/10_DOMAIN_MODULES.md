# KnowLab — Domain Plan Index

Các domain đã được **tách thành file độc lập**. Không gộp requirement chi tiết của các domain vào file này.

| Domain | File |
|---|---|
| Build PC | `DOMAIN_PC.md` |
| Bất động sản | `DOMAIN_REAL_ESTATE.md` |
| Ô tô | `DOMAIN_CARS.md` |
| Xe máy | `DOMAIN_MOTORCYCLES.md` |
| Nhà cửa & Xây dựng | `DOMAIN_HOME_CONSTRUCTION.md` |
| Phong thủy | `DOMAIN_FENG_SHUI.md` |

## Rule

Antigravity phải đọc file domain tương ứng trước khi thực hiện task.

Ví dụ:

```text
PC task
→ 00_MASTER_PROMPT.md
→ 02_ARCHITECTURE.md
→ 03_KNOWLEDGE_ENGINE.md
→ 04_LAB_SIMULATION.md
→ DOMAIN_PC.md
→ relevant QA
```

Không dùng requirement của domain A để suy diễn cho domain B.

Core engine chỉ là shared infrastructure.
