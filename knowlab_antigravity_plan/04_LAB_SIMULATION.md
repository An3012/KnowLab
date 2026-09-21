# KnowLab — Lab & Simulation Specification

## 1. Mục tiêu

Lab là nơi người dùng **thực hành kiến thức domain bằng dữ liệu và biến số thật/giả định**.

## 2. Universal pattern

```text
Choose Tool
→ Input
→ Validate
→ Calculate / Simulate
→ Explain
→ What-if
→ Compare
→ Save Scenario
```

## 3. Explain Result

```text
Input
Formula / Rules
Variables
Result
Assumptions
Limitations
What-if
```

## 4. PC Lab — BẮT BUỘC

### 4.1 PC Builder

Người dùng chọn:

- CPU
- GPU
- motherboard
- RAM
- storage
- PSU
- case
- CPU cooler
- optional monitor/peripherals

### 4.2 Compatibility Checker

Phải tự động phát hiện ít nhất:

- CPU socket ↔ motherboard socket;
- CPU generation/support ↔ BIOS/support data nếu có;
- RAM DDR generation ↔ motherboard;
- RAM speed/capacity constraints;
- motherboard form factor ↔ case;
- PSU connectors ↔ GPU/CPU;
- storage interface ↔ motherboard;
- cooler socket support;
- cooler height ↔ case;
- GPU length ↔ case;
- GPU thickness/slot ↔ case;
- radiator size ↔ case.

UI phải:

- cảnh báo rõ;
- chỉ ra linh kiện liên quan;
- giải thích tại sao xung đột;
- đề xuất các thành phần cần kiểm tra/thay thế nếu có dữ liệu;
- không tự đổi linh kiện mà không cho người dùng biết.

Có thể filter/ẩn option không hợp lệ, nhưng phải có cách xem lý do.

### 4.3 Clearance Check

Tính toán:

```text
GPU length ≤ case GPU clearance
Cooler height ≤ case CPU cooler clearance
Radiator size ≤ supported radiator space
```

Nếu thiếu data thì:

```text
Unknown / Chưa đủ dữ liệu
```

Không giả định là compatible.

### 4.4 Wattage Calculator

Tính:

```text
Estimated system load
→ Safety headroom
→ Recommended PSU range
```

Mặc định có thể dùng headroom 20–30% theo cấu hình/quy tắc được định nghĩa, nhưng phải ghi rõ assumption.

Không biến wattage estimate thành mức điện năng thực tế tuyệt đối.

### 4.5 Budget / Sticky Cart

Khi thêm/xóa/thay linh kiện:

- tổng tiền cập nhật ngay;
- sticky trên desktop;
- mobile dùng bottom summary/card;
- cho phép budget target;
- cảnh báo vượt ngân sách.

### 4.6 Advanced PC Filters

Mainboard:

- socket;
- chipset;
- form factor;
- RAM type;
- RAM slots;
- M.2;
- SATA;
- Wi-Fi;
- LAN;
- PCIe;
- VRM/feature fields nếu data có.

GPU:

- VRAM;
- length;
- slot;
- power connector;
- TDP/TBP;
- outputs.

CPU:

- socket;
- cores/threads;
- base/boost;
- TDP;
- generation;
- iGPU.

PSU:

- wattage;
- efficiency;
- connectors;
- form factor.

### 4.7 Benchmark Integration

Nếu có benchmark data:

- hiển thị source;
- test conditions;
- resolution;
- graphics preset;
- CPU/GPU;
- driver/date nếu có.

Nếu không có benchmark phù hợp:

```text
Chưa có dữ liệu benchmark phù hợp
```

Không bịa FPS.

### 4.8 Normalized Specs

Side-by-side phải chuẩn hóa:

```text
field
value
unit
source
lastUpdated
```

### 4.9 Save / Print / Share

Architecture phải hỗ trợ:

- save build;
- shortlink;
- readonly share;
- export image/report;
- share text/summary.

## 5. BĐS Lab

- affordability;
- mortgage;
- cash flow;
- rental yield;
- ownership cost;
- property comparison;
- sensitivity.

## 6. Ô tô Lab

- TCO;
- fuel/energy cost;
- financing simulation;
- annual/monthly cost;
- ownership scenarios;
- EV vs ICE scenario nếu đủ data.

## 7. Xe máy Lab

- commuting cost;
- fuel;
- maintenance;
- tires;
- annual distance;
- ownership scenario.

## 8. Nhà cửa Lab

- renovation budget;
- quantity/area assumptions;
- material scenario;
- room planning;
- maintenance;
- energy/use scenario.

## 9. Phong thủy Lab

Chỉ cho phép:

- nhập các thông tin theo trường phái;
- trình bày cách diễn giải;
- so sánh trường phái;
- ghi lại scenario.

Không tạo công thức "chứng minh" hiệu quả siêu nhiên.

## 10. Scenario Engine

Scenario lưu:

- inputs;
- assumptions;
- outputs;
- engineVersion;
- dataVersion;
- source versions;
- createdAt;
- updatedAt.
