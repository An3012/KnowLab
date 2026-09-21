# Hướng Dẫn & Prompt Chuẩn: Lưu Dữ Liệu SQL Server Cho KnowLab

Tài liệu này đóng vai trò là **Specification & Prompt Reference** chuẩn để thiết lập, kết nối và thực thi lưu trữ dữ liệu từ ứng dụng **KnowLab** vào hệ quản trị cơ sở dữ liệu **Microsoft SQL Server**.

---

## 1. Thông Tin Kết Nối (Connection String)

Chuỗi kết nối chính thức được cấu hình cho dự án:

```text
Server=WIN-NT0F62URHT9\ANND;Database=WED_KnowLab;Integrated Security=True;Encrypt=True;TrustServerCertificate=True
```

### Giải Thích Các Tham Số:
* **`Server=WIN-NT0F62URHT9\ANND`**: Tên máy chủ và instance SQL Server của hệ thống.
* **`Database=WED_KnowLab`**: Tên cơ sở dữ liệu lưu trữ toàn bộ dữ liệu KnowLab (Scenarios, Decision Journals, PC Builds).
* **`Integrated Security=True`**: Sử dụng xác thực Windows Authentication (an toàn, không cần để lộ tài khoản/mật khẩu).
* **`Encrypt=True`**: Kích hoạt mã hóa SSL/TLS cho toàn bộ luồng truyền dữ liệu giữa ứng dụng và SQL Server.
* **`TrustServerCertificate=True`**: Chấp nhận chứng chỉ tự ký (Self-signed Certificate) của SQL Server cục bộ.

---

## 2. Cấu Hình Trong `Web.config`

Chuỗi kết nối được khai báo tập trung trong tệp [`Web.config`](file:///d:/NDA/NEW/Tool_Web_KnowLab/Web.config) dưới thẻ `<connectionStrings>`:

```xml
<configuration>
  <connectionStrings>
    <add name="KnowLabDb"
         connectionString="Server=WIN-NT0F62URHT9\ANND;Database=WED_KnowLab;Integrated Security=True;Encrypt=True;TrustServerCertificate=True"
         providerName="System.Data.SqlClient" />
  </connectionStrings>
  
  <system.web>
    <!-- ... -->
  </system.web>
</configuration>
```

---

## 3. Cấu Trúc Bảng (Database Schema DDL)

Cơ sở dữ liệu `WED_KnowLab` được chuẩn hóa với các bảng sau:

```sql
-- 1. Bảng lưu trữ Kịch bản thử nghiệm (Scenarios) của tất cả 6 domain
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Scenarios')
BEGIN
    CREATE TABLE Scenarios (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        DomainId NVARCHAR(50) NOT NULL,            -- pc-building, real-estate, cars, motorcycles, home, feng-shui
        Title NVARCHAR(255) NOT NULL,              -- Tên kịch bản (ví dụ: 'Build PC Gaming 25tr')
        Goal NVARCHAR(500) NULL,                   -- Mục tiêu sử dụng
        PayloadJson NVARCHAR(MAX) NOT NULL,        -- Dữ liệu JSON chi tiết của kịch bản
        EngineVersion NVARCHAR(50) DEFAULT '1.0.0',
        DataVersion NVARCHAR(50) DEFAULT '2026-01',
        CreatedAt DATETIME DEFAULT GETDATE(),
        UpdatedAt DATETIME DEFAULT GETDATE()
    );
    CREATE INDEX IX_Scenarios_DomainId ON Scenarios(DomainId);
END;

-- 2. Bảng lưu Nhật ký ra quyết định (Decision Journals)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DecisionJournals')
BEGIN
    CREATE TABLE DecisionJournals (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Goal NVARCHAR(500) NOT NULL,               -- Mục tiêu phân tích (ví dụ: 'Mua nhà hay đi thuê?')
        Assumptions NVARCHAR(MAX) NULL,            -- Giả định chính đã đưa ra
        Decision NVARCHAR(MAX) NOT NULL,           -- Quyết định cuối cùng
        CreatedAt DATETIME DEFAULT GETDATE()
    );
END;

-- 3. Bảng chuyên biệt lưu cấu hình PC (PCConfigurations)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PCConfigurations')
BEGIN
    CREATE TABLE PCConfigurations (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        BuildName NVARCHAR(255) NOT NULL,
        TotalPrice DECIMAL(18,2) NOT NULL,
        PeakWatts INT NOT NULL,
        PsuHeadroomPercent DECIMAL(5,2) NOT NULL,
        IsCompatible BIT NOT NULL,
        CpuId NVARCHAR(100) NULL,
        MotherboardId NVARCHAR(100) NULL,
        RamId NVARCHAR(100) NULL,
        GpuId NVARCHAR(100) NULL,
        PsuId NVARCHAR(100) NULL,
        CaseId NVARCHAR(100) NULL,
        CoolerId NVARCHAR(100) NULL,
        StorageId NVARCHAR(100) NULL,
        CreatedAt DATETIME DEFAULT GETDATE()
    );
END;
```

---

## 4. Các Yêu Cầu Kỹ Thuật Bắt Buộc Khi Lưu SQL (Strict SQL Rules)

Mọi đoạn mã thao tác với cơ sở dữ liệu trong KnowLab **bắt buộc** tuân thủ các nguyên tắc sau:

1. **Phòng Chống Tuyệt Đối SQL Injection**:
   * **Nghiêm cấm** ghép chuỗi câu lệnh SQL (không dùng `string.Format`, toán tử `+`, hoặc nội suy `$""` cho các giá trị tham số).
   * **Bắt buộc** dùng `SqlCommand.Parameters.Add("@ParamName", SqlDbType.Type).Value = ...`.
2. **Quản Lý Kết Nối & Giải Phóng Tài Nguyên (Deterministic Disposal)**:
   * Tất cả các đối tượng `SqlConnection`, `SqlCommand`, `SqlDataReader`, `SqlTransaction` phải được bọc trong khối `using (...)` để tự động đóng kết nối ngay khi hoàn thành, tránh rò rỉ Connection Pool.
3. **Hỗ Trợ Tiếng Việt Unicode Hoàn Hảo**:
   * Mọi cột chứa văn bản tiếng Việt phải dùng kiểu `NVARCHAR`.
   * Truy vấn SQL có chứa hằng số chuỗi tiếng Việt phải có tiền tố `N` (ví dụ `N'Kịch bản mua nhà'`).
4. **Xử Lý Lỗi Ngoại Lệ & Giao Tác (Error Handling & Transactions)**:
   * Bọc trong khối `try...catch (SqlException ex)` và ghi nhận rõ mã lỗi `ex.Number`, `ex.Message`.
   * Sử dụng `SqlTransaction` khi lưu nhiều bảng liên quan để đảm bảo tính toàn vẹn dữ liệu (Atomicity).
5. **Không Hard-code Thông Tin Nhạy Cảm**:
   * Chuỗi kết nối lấy qua `ConfigurationManager.ConnectionStrings["KnowLabDb"].ConnectionString`.

---

## 5. Prompt Mẫu Chuẩn Khi Cần AI Viết/Sửa Logic SQL

Khi yêu cầu AI hỗ trợ thêm hoặc cập nhật các hàm lưu SQL cho KnowLab, hãy sao chép đoạn prompt dưới đây:

````markdown
Bạn là lập trình viên backend C# .NET và SQL Server cho dự án KnowLab.
Hãy viết hoặc cập nhật mã nguồn thực hiện thao tác cơ sở dữ liệu với các yêu cầu sau:

1. **Chuỗi kết nối**:
   `Server=WIN-NT0F62URHT9\ANND;Database=WED_KnowLab;Integrated Security=True;Encrypt=True;TrustServerCertificate=True`
   (Lấy từ Web.config qua ConfigurationManager.ConnectionStrings["KnowLabDb"]).

2. **Yêu cầu kỹ thuật**:
   - Sử dụng ADO.NET với `System.Data.SqlClient`.
   - Bắt buộc dùng `using (var conn = ...)` và `using (var cmd = ...)`.
   - Bắt buộc 100% Parameterized Queries, tuyệt đối không nối chuỗi SQL để chống SQL Injection.
   - Các trường chuỗi tiếng Việt dùng `SqlDbType.NVarChar`.
   - Bắt `SqlException` và trả về kết quả rõ ràng (Success, Message, Data/Id).
   - Tương thích hoàn toàn với .NET Framework 4.8.

3. **Nghiệp vụ cần thực hiện**:
   [Mô tả nghiệp vụ cụ thể ở đây: ví dụ Lưu Scenario, Lấy lịch sử Decision Journal, Cập nhật thông số Build PC...]
````

---

## 6. Hiện Trạng Triển Khai Trong Dự Án

* **Database Helper C#**: Đã tạo tại [`Engines/SqlDatabaseHelper.cs`](file:///d:/NDA/NEW/Tool_Web_KnowLab/Engines/SqlDatabaseHelper.cs) chứa các phương thức:
  * `TestConnection(out string message)`: Kiểm tra kết nối nhanh tới SQL Server.
  * `SaveScenario(domainId, title, goal, payloadJson, ...)`: Lưu kịch bản tính toán / build PC.
  * `GetScenarios(domainId)`: Truy vấn danh sách kịch bản đã lưu theo domain.
  * `SaveDecisionJournal(goal, assumptions, decision)`: Lưu nhật ký ra quyết định.
  * `GetDecisionJournals()`: Lấy lịch sử nhật ký.
* **API Handler**: Đã tích hợp các hành động API tại [`Handlers/Action.ashx`](file:///d:/NDA/NEW/Tool_Web_KnowLab/Handlers/Action.ashx):
  * `action=sql_test`: Kiểm tra trạng thái database `WED_KnowLab`.
  * `action=save_scenario_sql`: Lưu kịch bản trực tiếp từ frontend.
  * `action=get_scenarios_sql`: Lấy danh sách kịch bản.
  * `action=save_journal_sql`: Lưu nhật ký quyết định.
  * `action=get_journals_sql`: Lấy danh sách nhật ký.
