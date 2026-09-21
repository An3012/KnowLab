# KnowLab — Technical Direction

## 1. Principle

Ưu tiên stack hiện tại của repository.

Không rewrite framework chỉ để áp dụng stack yêu thích.

## 2. Characteristics

- typed;
- modular;
- testable;
- maintainable;
- observable;
- responsive;
- secure.

## 3. Domain modules

Mỗi domain nên có module riêng.

## 4. PC module

Không nhét PC compatibility/calculation vào page code.

Tách:

```text
Catalog
Filters
Compatibility
Clearance
Power
Benchmark
Build
Scenario
Share
```

## 5. Pure engines

Calculation/simulation nên pure khi có thể.

## 6. Validation

Validation ở domain/application layer.

UI chỉ hiển thị validation result.

## 7. Units

Luôn có unit trong model hoặc schema.

## 8. Testing priority

Ưu tiên:

1. domain rules;
2. compatibility;
3. calculation;
4. scenario versioning;
5. comparison normalization;
6. UI integration.

## 9. Performance

- lazy-load domain-heavy data;
- virtualization cho list lớn;
- debounce filter/search;
- cache stable data;
- không tính simulation nặng trong UI thread nếu không cần.

## 10. Data update

Data thay đổi thường xuyên phải có version/update strategy.

## 11. Encoding

Toàn project dùng UTF-8 nhất quán.

Vietnamese phải render đúng ở source → server → browser.

Không chấp nhận mojibake như:

```text
Báº¡n
muá»‘n
Ä‘iá»�
```
