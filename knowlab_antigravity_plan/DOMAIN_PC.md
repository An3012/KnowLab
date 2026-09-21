# KnowLab — DOMAIN PLAN: BUILD PC

> Đây là **domain specification độc lập**. Khi Antigravity làm bất kỳ task nào liên quan Build PC, phải đọc file này cùng các core specs.

## Product role

Build PC là một domain chuyên sâu, tập trung vào nghiên cứu linh kiện, xây cấu hình, kiểm tra tương thích, kích thước, công suất, hiệu năng, ngân sách và nâng cấp.

## Primary user journeys

```text
Explore PC knowledge
→ Select components
→ Filter
→ Build configuration
→ Validate compatibility
→ Check clearance
→ Estimate power
→ Compare
→ What-if / Upgrade
→ Save / Share
```

## 1. PC Builder — bắt buộc

Linh kiện:
- CPU
- GPU
- Motherboard
- RAM
- Storage
- PSU
- Case
- CPU Cooler
- Optional monitor/peripherals

### Compatibility Checker

Rules:
- CPU socket ↔ motherboard socket
- CPU generation/support/BIOS khi có dữ liệu
- RAM DDR generation ↔ motherboard
- RAM capacity/slot constraints
- motherboard form factor ↔ case
- PSU connectors ↔ CPU/GPU
- storage interface ↔ motherboard
- cooler socket support

Không xác nhận compatible nếu thiếu dữ liệu quan trọng.

### Clearance

Kiểm tra:
- GPU length ≤ case GPU clearance
- GPU thickness/slot
- CPU cooler height ≤ case cooler clearance
- radiator size/support

### Power

```text
Estimated component/system load
→ safety headroom
→ recommended PSU range
```

Headroom mặc định có thể 20–30% nếu rule/spec cho phép; phải hiển thị assumption.

### Budget / Sticky Cart

- realtime total
- target budget
- over-budget warning
- desktop sticky summary
- mobile bottom summary

### Advanced filters

Motherboard:
- socket
- chipset
- form factor
- RAM type
- RAM slots
- Wi-Fi
- M.2
- SATA
- PCIe
- LAN

CPU:
- socket
- generation
- cores/threads
- base/boost
- TDP
- iGPU

GPU:
- VRAM
- length
- thickness/slot
- power connector
- TDP/TBP
- outputs

PSU:
- wattage
- efficiency
- connectors
- form factor

### Benchmark

Chỉ hiển thị khi có dữ liệu nguồn:
- game
- resolution
- preset
- CPU
- GPU
- driver/date
- source

Không bịa FPS.

### Normalized specifications

```text
field
value
unit
source
lastUpdated
```

### Save / Print / Share

Architecture phải hỗ trợ:
- save build
- shortlink
- readonly share
- export image/report
- share summary

## 2. Knowledge depth

L0: linh kiện là gì  
L1: thông số và quan hệ  
L2: build theo workload/budget  
L3: bottleneck, thermals, power, upgrade trade-offs  
L4: architecture, memory, PCIe, VRM, thermal/power behavior, benchmark methodology

## 3. Advanced topics

- CPU architecture
- GPU architecture
- memory subsystem
- PCIe
- storage
- VRM
- cooling
- acoustics
- PSU topology
- bottleneck methodology
- benchmark methodology
- upgrade planning
- failure modes

## 4. Data trust

Không coi:
- giá mẫu là giá live
- benchmark không nguồn là fact
- compatibility suy đoán là fact

Thiếu dữ liệu → `Chưa đủ dữ liệu để xác nhận`.

## 5. QA

Mọi PC Builder change phải test:
- socket
- RAM
- form factor
- PSU connector
- power
- GPU clearance
- cooler clearance
- storage
- filters
- budget
- benchmark provenance
- mobile
- save/share
