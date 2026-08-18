# AI AUDIT REPORT

- Student name: Dương Gia Huy
- Student ID: 23127052

---

## AI-generated Artifact

Em đã sử dụng AI cho những task sau đây:

### Artifact 1: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 19:36 18/08/2026
- **Prompt:** Hãy giúp tôi tạo một mảng JSON data-driven chứa dữ liệu cho các test case của FR-04 như tôi đã ghi trong Test_Case_FR.md, kết quả tạo ra sẽ bao gồm: `testId`, `description`, `inputData`, `expectedResult`. Sau đó bạn hãy copy và đưa JSON đó bỏ vào thư mục file `eshop-automation\test-data\fr04-profile.json`

**2. AI Output:** Đã tạo mảng JSON chứa 12 test cases cho chức năng Quản lý hồ sơ cá nhân (FR-04) và lưu vào file `fr04-profile.json` để phục vụ data-driven testing.

### Artifact 2: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 20:43 18/08/2026
- **Prompt:** Đây là đoạn mã HTML giao diện `html/frontend-web-fr04.html` của chức năng phần Profile của trang web mục tiêu. Hãy dựa vào file JSON data ở trên, viết script Playwright bằng TypeScript sử dụng vòng lặp để test. Đảm bảo dùng các locator tối ưu nhất và có 3 loại assertion khác nhau. Sau đó đưa đoạn script đó vào file `eshop-automation\tests\fr04-profile.spec.ts`

**2. AI Output:** Đã đọc mã HTML DOM từ `frontend-web-fr04.html` và sinh mã kiểm thử tự động Playwright (vòng lặp Data-Driven) cho FR-04, lưu vào `fr04-profile.spec.ts` với các locator tối ưu.

### Artifact 3: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 00:34 19/08/2026
- **Prompt:** Tôi muốn bạn điều chỉnh phần beforeEach của mỗi testcase của fr04-profile.spec.ts. Hiện tại đang là getByPlaceholder(...), tôi nghĩ là mình nên dùng thẳng tag <input n-th> 0 và 1 để locator luôn. Vì nó không có ID hay gì cả. Đồng thời, sau khi ấn nút Sign In (type submit) thì hãy chờ khoảng chừng 1s, rồi mới chuyển sang trang profile

**2. AI Output:** Đã cập nhật file `fr04-profile.spec.ts` ở phần `beforeEach`, thay đổi locator đăng nhập sang sử dụng `.nth()` index thay vì dựa vào placeholder, đồng thời thêm `page.waitForTimeout(1000)` sau khi submit form đăng nhập trước khi chuyển sang trang profile.

### Artifact 4: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**


**2. AI Output:**

### Artifact 5: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**


**2. AI Output:**

### Artifact 6: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**


**2. AI Output:**

### Artifact 7: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**


**2. AI Output:**

### Artifact 8: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**


**2. AI Output:**