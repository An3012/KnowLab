# KnowLab — Data, Trust & Safety

## 1. Data classification

Mỗi dữ liệu quan trọng phải xác định:

- Fact;
- Source Data;
- User Input;
- Assumption;
- Estimate;
- Derived Result.

## 2. Provenance

Data có source nên lưu:

```text
source
sourceType
retrievedAt
publishedAt
lastVerifiedAt
version
```

## 3. PC data

Đặc biệt với PC:

- socket;
- RAM type;
- chipset;
- physical dimensions;
- connectors;
- power;
- compatibility;
- benchmark.

Không tự suy ra compatibility khi thiếu dữ liệu quan trọng.

Nếu chưa đủ:

`Chưa đủ dữ liệu để xác nhận tương thích.`

## 4. Price data

Giá thay đổi theo thời gian.

Không hard-code giá live như fact.

Nếu chưa có live source:

- ghi rõ sample/estimate;
- timestamp;
- nguồn nếu có.

## 5. Calculations

Calculation phải lưu assumptions.

## 6. BĐS / tài chính

Outputs là simulation/estimate, không phải cam kết hay tư vấn tài chính cá nhân.

## 7. Ô tô / xe máy / nhà

Phân biệt:

- thông số nhà sản xuất;
- dữ liệu thực tế;
- assumption;
- estimate.

## 8. Phong thủy

Trình bày là:

- kiến thức văn hóa/truyền thống;
- theo trường phái;
- có thể có cách diễn giải khác nhau.

Không trình bày claim siêu nhiên như fact khoa học.

## 9. User agency

Không dùng dữ liệu để ép người dùng chọn phương án.

Hiển thị trade-off và assumptions.

## 10. Locale-neutral storage

Ví dụ đúng:

```json
{
  "amount": 125000000,
  "currency": "VND"
}
```

Không lưu:

```text
125.000.000 ₫
```

## 11. Privacy

Không lưu dữ liệu cá nhân không cần thiết.

Scenario share phải có quyền readonly/editor phù hợp.
