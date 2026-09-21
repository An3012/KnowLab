# SQL SERVER PERFORMANCE & INDEX RULES — KNOWLAB

**QUY TẮC SQL BẮT BUỘC:** Không được sử dụng `MERGE` cho các nghiệp vụ CRUD thông thường; khi cần tạo mới hoặc cập nhật dữ liệu, phải ưu tiên cách dễ đọc và dễ bảo trì là `INSERT` cho dữ liệu mới, `UPDATE` cho dữ liệu đã tồn tại, và `IF EXISTS`/kiểm tra tồn tại khi cần xác định record trước khi thực hiện `INSERT` hoặc `UPDATE`; tuyệt đối không dùng `MERGE` chỉ để rút gọn code hoặc thay thế `INSERT + UPDATE`.

**QUY TẮC PERFORMANCE BẮT BUỘC:** Không chỉ đảm bảo SQL chạy đúng; mọi query quan trọng phải được xem xét về execution plan, index, số lượng dữ liệu, `JOIN`, `WHERE`, `ORDER BY`, CPU, logical reads và thời gian thực thi; phải tránh index thừa/trùng, cân bằng read performance với chi phí `INSERT/UPDATE/DELETE`, và không được tuyên bố “đã tối ưu” nếu chưa có cơ sở kiểm chứng.

## 1. MỤC TIÊU

Mọi SQL của KnowLab phải đạt 4 yêu cầu:

```text
ĐÚNG DỮ LIỆU
+
AN TOÀN
+
DỄ ĐỌC / DỄ BẢO TRÌ
+
TỐI ƯU HIỆU NĂNG
```

Không được chỉ viết SQL chạy đúng mà bỏ qua performance.

---

# 2. BẮT BUỘC PHÂN TÍCH PERFORMANCE

Trước khi tạo hoặc sửa query quan trọng, phải xem xét:

* số lượng bản ghi;
* điều kiện `WHERE`;
* `JOIN`;
* `ORDER BY`;
* `GROUP BY`;
* `EXISTS`;
* `LIKE`;
* cột được SELECT;
* cột được lọc thường xuyên;
* cột được join thường xuyên;
* cột được sort thường xuyên;
* index hiện tại;
* khả năng sử dụng index;
* execution plan.

Không được tạo index chỉ vì "có query".

Index phải có lý do sử dụng thực tế.

---

# 3. INDEX-FIRST THINKING

Khi viết query:

```sql
SELECT ...
FROM KichBan
WHERE MaLinhVuc = @MaLinhVuc
ORDER BY NgayTao DESC;
```

phải xem xét index:

```sql
CREATE INDEX IX_KichBan_MaLinhVuc_NgayTao
ON KichBan(MaLinhVuc, NgayTao DESC);
```

Không mặc định tạo:

```sql
IX_KichBan_MaLinhVuc
IX_KichBan_NgayTao
```

nếu một composite index đã đáp ứng tốt query.

---

# 4. QUY TẮC TẠO INDEX

Ưu tiên index cho:

### 4.1 Primary Key

Primary Key phải có index phù hợp.

### 4.2 Foreign Key

Các cột Foreign Key thường được JOIN phải được xem xét index.

Ví dụ:

```text
MaKichBan
MaNguon
MaLinhVuc
```

### 4.3 WHERE

Nếu query thường xuyên:

```sql
WHERE MaLinhVuc = @MaLinhVuc
```

thì `MaLinhVuc` là ứng viên index.

### 4.4 JOIN

Nếu thường xuyên:

```sql
JOIN Nguon n
    ON k.MaNguon = n.MaNguon
```

thì phải xem xét index trên các cột join.

### 4.5 ORDER BY

Nếu thường xuyên:

```sql
ORDER BY NgayTao DESC
```

phải xem xét index phù hợp.

### 4.6 GROUP BY

Các query aggregate lớn cần được kiểm tra execution plan trước khi quyết định index.

---

# 5. COMPOSITE INDEX

Khi query có nhiều điều kiện:

```sql
WHERE MaLinhVuc = @MaLinhVuc
  AND TrangThai = @TrangThai
ORDER BY NgayTao DESC
```

có thể cần:

```sql
CREATE INDEX IX_KichBan_LinhVuc_TrangThai_NgayTao
ON KichBan
(
    MaLinhVuc,
    TrangThai,
    NgayTao DESC
);
```

Thứ tự column trong composite index phải dựa trên query thực tế, không chọn tùy tiện.

---

# 6. COVERING INDEX

Nếu một query đọc một số cột cố định và chạy rất thường xuyên, có thể dùng `INCLUDE`.

Ví dụ:

```sql
CREATE INDEX IX_KichBan_LinhVuc_NgayTao
ON KichBan
(
    MaLinhVuc,
    NgayTao DESC
)
INCLUDE
(
    TieuDe,
    MucTieu
);
```

Không được lạm dụng `INCLUDE`.

Phải cân nhắc:

```text
Read performance
vs
Index size
vs
INSERT/UPDATE overhead
```

---

# 7. KHÔNG TẠO INDEX THỪA

Trước khi tạo index:

```text
1. Kiểm tra index hiện tại.
2. Kiểm tra column order.
3. Kiểm tra index có thể sử dụng lại không.
4. Kiểm tra index trùng/lồng nhau.
5. Kiểm tra query thực tế.
6. Kiểm tra execution plan.
```

Không tạo:

```text
IX_A
IX_B
IX_C
IX_D
```

chỉ vì muốn "cho nhanh".

Mỗi index đều có chi phí:

```text
INSERT
UPDATE
DELETE
Disk
Memory
Maintenance
```

---

# 8. INSERT / UPDATE / DELETE CŨNG BỊ ẢNH HƯỞNG BỞI INDEX

Nhiều index không phải lúc nào cũng tốt.

Khi:

```sql
INSERT
```

SQL Server phải cập nhật các index liên quan.

Khi:

```sql
UPDATE
```

nếu cập nhật column nằm trong index, index có thể phải được cập nhật.

Khi:

```sql
DELETE
```

các index liên quan cũng phải được cập nhật.

Vì vậy phải cân bằng:

```text
READ PERFORMANCE
+
WRITE PERFORMANCE
```

---

# 9. KHÔNG DÙNG MERGE CHO CRUD THÔNG THƯỜNG

**KnowLab không sử dụng `MERGE` cho các nghiệp vụ CRUD thông thường.**

Không viết:

```sql
MERGE INTO ...
```

trừ khi có một lý do kỹ thuật đặc biệt đã được xác định và document rõ ràng.

Lý do:

* khó đọc với người mới;
* khó debug;
* logic phức tạp;
* dễ gây nhầm giữa INSERT và UPDATE;
* khó theo dõi lịch sử thay đổi.

Ưu tiên:

```text
IF EXISTS
    → UPDATE
ELSE
    → INSERT
```

hoặc tách thành:

```text
SELECT/EXISTS
→ UPDATE
```

và:

```text
INSERT
```

---

# 10. UPDATE THAY CHO MERGE

Ví dụ cần cập nhật cấu hình:

```sql
UPDATE CauHinhMayTinh
SET
    TenCauHinh = @TenCauHinh,
    TongGia = @TongGia,
    CongSuatDinhMucW = @CongSuatDinhMucW,
    PhanTramDuPhongNguon = @PhanTramDuPhongNguon,
    TuongThich = @TuongThich,
    NgayCapNhat = SYSDATETIME()
WHERE MaCauHinh = @MaCauHinh;
```

Sau đó kiểm tra:

```csharp
if (cmd.ExecuteNonQuery() == 0)
{
    // Không tìm thấy dữ liệu cần cập nhật
}
```

---

# 11. INSERT

Khi tạo mới:

```sql
INSERT INTO CauHinhMayTinh
(
    TenCauHinh,
    TongGia,
    CongSuatDinhMucW,
    PhanTramDuPhongNguon,
    TuongThich,
    NgayTao
)
VALUES
(
    @TenCauHinh,
    @TongGia,
    @CongSuatDinhMucW,
    @PhanTramDuPhongNguon,
    @TuongThich,
    SYSDATETIME()
);
```

Sau INSERT lấy ID:

```sql
SELECT CAST(SCOPE_IDENTITY() AS INT);
```

---

# 12. UPDATE CÓ ĐIỀU KIỆN

Không được UPDATE toàn bảng nếu nghiệp vụ chỉ yêu cầu một record.

Không được:

```sql
UPDATE CauHinhMayTinh
SET TenCauHinh = @TenCauHinh;
```

nếu không có chủ đích update toàn bộ.

Phải có:

```sql
WHERE MaCauHinh = @MaCauHinh;
```

---

# 13. DELETE

DELETE phải có điều kiện rõ ràng:

```sql
DELETE FROM CauHinhMayTinh
WHERE MaCauHinh = @MaCauHinh;
```

Không được tự ý:

```sql
DELETE FROM CauHinhMayTinh;
```

Nếu xóa nhiều dữ liệu là nghiệp vụ hợp lệ, phải document rõ lý do và phạm vi.

---

# 14. EXISTS

Khi cần kiểm tra tồn tại, ưu tiên:

```sql
IF EXISTS
(
    SELECT 1
    FROM CauHinhMayTinh
    WHERE MaCauHinh = @MaCauHinh
)
BEGIN
    UPDATE ...
END
ELSE
BEGIN
    INSERT ...
END
```

Nếu query chỉ cần biết "có tồn tại hay không", không dùng:

```sql
SELECT COUNT(*)
```

một cách không cần thiết.

Ưu tiên:

```sql
IF EXISTS (...)
```

---

# 15. SARGABLE QUERY

Không viết điều kiện khiến SQL Server khó sử dụng index.

Không ưu tiên:

```sql
WHERE YEAR(NgayTao) = @Nam
```

nếu cần lọc theo năm trên bảng lớn.

Ưu tiên:

```sql
WHERE NgayTao >= @NgayBatDau
  AND NgayTao < @NgayKetThuc
```

Tương tự, tránh bọc column trong function nếu có thể.

---

# 16. TRÁNH SELECT *

Không dùng:

```sql
SELECT *
FROM KichBan;
```

Trong production query phải chỉ rõ column:

```sql
SELECT
    MaKichBan,
    MaLinhVuc,
    TieuDe,
    MucTieu,
    NgayTao
FROM KichBan;
```

Lợi ích:

* giảm dữ liệu truyền;
* giảm phụ thuộc schema;
* dễ bảo trì;
* dễ tối ưu;
* có thể giúp covering index.

---

# 17. PAGINATION

Không lấy toàn bộ dữ liệu nếu bảng có thể lớn.

Thay vì:

```sql
SELECT ...
FROM KichBan
ORDER BY NgayTao DESC;
```

dùng pagination:

```sql
SELECT
    MaKichBan,
    MaLinhVuc,
    TieuDe,
    MucTieu,
    NgayTao
FROM KichBan
ORDER BY NgayTao DESC
OFFSET @SoLuongBoQua ROWS
FETCH NEXT @KichThuocTrang ROWS ONLY;
```

Pagination phải có `ORDER BY` ổn định.

---

# 18. LIKE / SEARCH

Không dùng:

```sql
WHERE TieuDe LIKE N'%PC%'
```

một cách mặc định trên bảng lớn nếu yêu cầu search có thể được giải quyết bằng Full-Text Search hoặc search engine.

Nếu cần tìm prefix:

```sql
WHERE TieuDe LIKE @TuKhoa + N'%'
```

có khả năng tận dụng index tốt hơn trong một số trường hợp.

Phải kiểm tra execution plan trước khi quyết định.

---

# 19. JOIN

Chỉ JOIN các bảng thực sự cần thiết.

Không JOIN hàng loạt bảng rồi mới lọc ở application.

Điều kiện JOIN phải rõ:

```sql
JOIN Nguon AS n
    ON k.MaNguon = n.MaNguon
```

Các column JOIN thường xuyên phải được xem xét index.

---

# 20. TRANSACTION PERFORMANCE

Transaction phải ngắn nhất có thể.

Không giữ transaction trong khi:

```text
Gọi API bên ngoài
Chờ user
Xử lý file lớn
Thực hiện tác vụ không liên quan database
```

Transaction chỉ bao quanh phần database cần atomicity.

---

# 21. QUERY TIMEOUT

Không tăng timeout một cách mù quáng để che giấu query chậm.

Nếu query timeout:

```text
1. Kiểm tra execution plan.
2. Kiểm tra index.
3. Kiểm tra JOIN.
4. Kiểm tra WHERE.
5. Kiểm tra số lượng dữ liệu.
6. Kiểm tra blocking/lock.
7. Tối ưu query.
8. Sau đó mới xem xét timeout.
```

Không giải quyết:

```text
Query chậm
→ tăng timeout
→ coi như xong
```

---

# 22. EXECUTION PLAN

Với query quan trọng hoặc query chậm, phải kiểm tra:

```text
Actual Execution Plan
```

Chú ý:

* Table Scan
* Index Scan
* Index Seek
* Key Lookup
* Sort
* Hash Match
* Nested Loops
* Missing Index suggestion
* Estimated Rows vs Actual Rows.

Không tạo index chỉ vì SQL Server hiện "Missing Index".

Phải đánh giá tổng thể workload trước.

---

# 23. PERFORMANCE TEST

Sau khi thêm/sửa index phải kiểm tra:

```text
Before
↓
Execution Plan
↓
Query Duration
↓
Logical Reads
↓
CPU Time

After
↓
Execution Plan
↓
Query Duration
↓
Logical Reads
↓
CPU Time
```

Nếu không thể benchmark chính xác, phải ghi rõ:

```text
Performance verification limited because production-sized data is unavailable.
```

Không được tự tuyên bố query "đã tối ưu" nếu chưa có cơ sở.

---

# 24. SQL CHANGE LOG PHẢI GHI INDEX

Nếu thay đổi liên quan performance, README ngày phải ghi:

```markdown
## Performance

Query:
...

Vấn đề:
...

Index cũ:
...

Index mới:
...

Lý do:
...

Execution Plan trước:
...

Execution Plan sau:
...

Ảnh hưởng INSERT/UPDATE/DELETE:
...

Kết quả:
...
```

---

# 25. INDEX NAMING

Index:

```text
IX_<TênBảng>_<Cột>
```

Ví dụ:

```text
IX_KichBan_MaLinhVuc
IX_KichBan_MaLinhVuc_NgayTao
IX_NhatKyQuyetDinh_NgayTao
IX_CauHinhMayTinh_NgayTao
```

Không đặt:

```text
Index1
Index2
FastIndex
NewIndex
```

---

# 26. QUY TRÌNH SQL PERFORMANCE CHUẨN

Mọi query quan trọng:

```text
Viết query
    ↓
Kiểm tra dữ liệu
    ↓
Kiểm tra index hiện tại
    ↓
Chạy query
    ↓
Actual Execution Plan
    ↓
Đo CPU / Reads / Duration
    ↓
Xác định bottleneck
    ↓
Thiết kế index/query
    ↓
Test lại
    ↓
So sánh Before / After
    ↓
Ghi vào SQL Change Log
```

---

# 27. QUY TẮC CHO ANTIGRAVITY

Khi Antigravity tạo hoặc sửa SQL:

```text
BẮT BUỘC:

✓ SQL Server
✓ Parameterized Query
✓ NVARCHAR cho tiếng Việt
✓ UPDATE cho cập nhật
✓ INSERT cho tạo mới
✓ IF EXISTS khi cần kiểm tra tồn tại
✓ Không dùng MERGE cho CRUD thông thường
✓ Có WHERE rõ ràng khi UPDATE/DELETE
✓ Không SELECT *
✓ Pagination khi dữ liệu lớn
✓ Kiểm tra index
✓ Không tạo index trùng
✓ Kiểm tra execution plan với query quan trọng
✓ Cân nhắc INSERT/UPDATE/DELETE overhead của index
✓ Transaction ngắn
✓ Không tăng timeout để che query chậm
✓ Ghi performance change vào README
```

---

# 28. FINAL RULE

KnowLab không chạy theo nguyên tắc:

```text
"SQL chạy được = SQL tốt"
```

Mà phải:

```text
SQL chạy đúng
+
SQL an toàn
+
SQL dễ hiểu
+
SQL dễ bảo trì
+
SQL có index phù hợp
+
SQL có khả năng scale
+
SQL có lịch sử thay đổi
```

Đặc biệt:

```text
INSERT → tạo mới
UPDATE → cập nhật
DELETE → xóa
IF EXISTS → kiểm tra tồn tại
```

**Không sử dụng `MERGE` cho CRUD thông thường.**
