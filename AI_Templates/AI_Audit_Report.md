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
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 14:19 19/08/2026
- **Prompt:** Tôi nghĩ là cần phải chỉnh lại các Locator trong phần sau ở fr04-profile.spec.ts. Các email, họ tên, số điện thoại không được bọc trong 1 label nên không thể dùng getByLabel được, thay vào đó bạn cũng hãy dùng n-th như <input> lúc trước, note là phần địa chỉ là <textarea> chứ không phải <input>

**2. AI Output:** Đã cập nhật file `fr04-profile.spec.ts`, thay đổi các locator sử dụng `getByLabel` và `getByPlaceholder` thành `page.locator('input').nth(i)` và `page.locator('textarea')` theo cấu trúc HTML thực tế.

### Artifact 5: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 14:29 19/08/2026
- **Prompt:** Tại sao quá trình tôi kiểm tra lại thử fr04 trong --ui, nó không xuất hiện dialog localhost:5173 says nhỉ?

**2. AI Output:** Đã giải thích cho người dùng về cơ chế tự động dismiss native dialog (alert/confirm) của Playwright. Đồng thời cập nhật lại code trong `fr04-profile.spec.ts` để sử dụng `page.once('dialog', ...)` nhằm bắt thông báo từ alert thay vì tìm trong DOM.

### Artifact 6: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 14:47 19/08/2026
- **Prompt:** Có cách nào kiểm tra lại việc UI bị "vỡ" không? Như là Layout thay đổi do tên User quá dài (do không có truncate)?

**2. AI Output:** Đã hướng dẫn người dùng 3 phương pháp kiểm tra giao diện (UI) bị vỡ bằng Playwright: Visual Regression Testing (chụp ảnh màn hình so sánh), Bounding Box (kiểm tra tọa độ/kích thước) và kiểm tra thuộc tính CSS/DOM (scrollWidth > clientWidth).

### Artifact 7: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 14:53 19/08/2026
- **Prompt:** Tôi nghĩ là chọn cách 1 để đơn giản nhất có thể, có thể thêm cả script để lấy layout header khi vừa bắt đầu test luôn không?

**2. AI Output:** Đã cập nhật file `fr04-profile.spec.ts` để thêm tính năng Visual Regression Testing (chụp và so sánh ảnh Screenshot của Header) theo Cách 1. Giải thích thêm cho người dùng về lệnh `--update-snapshots`.

### Artifact 8: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 15:08 19/08/2026
- **Prompt:** Tôi tự hỏi là việc --update-snapshots hoạt động kiểu gì? Tại bây giờ before/after snapshot đang bị lẫn lộn lên hết, tôi làm chụp màn hình manual luôn thì sao nhỉ?

**2. AI Output:** Đã giải thích cho người dùng lý do snapshots bị lẫn lộn (do lưu trùng tên trong vòng lặp) và đồng tình với giải pháp chụp ảnh manual (`.screenshot()`). Đã sửa lại code `fr04-profile.spec.ts` để lưu ảnh thủ công theo mã `testId` kết hợp kiểm tra `boundingBox` để tự động báo Fail khi vỡ UI.

### Artifact 10: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 16:20 19/08/2026
- **Prompt:** Ở test case FR-06, nếu như tôi muốn test nó phải bắt buộc CHỈ có message là: "Số điện thoại không hợp lệ." thì sao? Vì do hiện tại SUT EShop trả về chỉ là 1 câu, không phân biệt các context lỗi là: "Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."

**2. AI Output:** Đã hướng dẫn người dùng sử dụng cờ `exactMatch` trong file JSON data-driven và cập nhật lại script `fr04-profile.spec.ts` dùng hàm `toBe()` thay vì `toContain()` để bắt buộc so sánh chính xác tuyệt đối (exact match) message trả về.

### Artifact 11: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 16:38 19/08/2026
- **Prompt:** Tôi vừa mới điều chỉnh lại luồng thực thi script để test case FR-11 không ảnh hưởng test case ở sau nó... Nên bây giờ bạn hãy kiểm tra lại toàn bộ file fr04-profile.spec.ts

**2. AI Output:** Đã review file `fr04-profile.spec.ts` của user. Chỉ ra lỗ hổng logic: các lệnh `expect` ở trên (như kiểm tra dialog) nếu fail vẫn sẽ chặn việc reset data. Đã giải thích cho user hiểu cơ chế "luôn luôn chạy" của `test.afterEach` (như khối `finally`) và khuyên user nên dùng lại `afterEach` để code clean và an toàn hơn.

### Artifact 12: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 16:40 19/08/2026
- **Prompt:** Bạn hãy ghi đè đi

**2. AI Output:** Đã ghi đè file `fr04-profile.spec.ts` để phục hồi lại block `test.afterEach` (đảm bảo reset data thành công trong mọi trường hợp) và chuẩn hóa logic kiểm tra vỡ UI bằng chiều cao của `header`.

### Artifact 13: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 14:21 20/08/2026
- **Prompt:** Bạn hãy viết cho tôi test script cho phần FR-07: Giỏ hàng (Shopping Cart). Dựa vào 13 test case đã có sẵn trong file Test_Case_FR.md...

**2. AI Output:** Đã đọc 13 test cases cho FR-07, phân tích DOM từ 2 file HTML giao diện, sau đó tạo file data `fr07-cart.json` và mã kiểm thử `fr07-cart.spec.ts`.

### Artifact 14: 
**1. Prompt + Tool**
- **Tool:** Antigravity IDE / Gemini 3.1 Pro
- **Timestamp:** 16:25 20/08/2026
- **Prompt:** Hình như bạn đã quên, việc thực hiện reload (refresh) hay chuyển trang bằng url là sẽ xóa hết toàn bộ sản phẩm trong cart, nên tôi nghĩ thay vì chuyển trang bằng url, bạn hãy chuyển thành bấm vào dòng chữ "Giỏ hàng" có trên thanh HeaDER

**2. AI Output:** Đã sửa lại script `fr07-cart.spec.ts`. Thay vì dùng `page.goto()` (gây tải lại toàn bộ trang làm bay mất React State), script giờ sử dụng `page.getByRole('link', { name: 'Giỏ hàng' }).click()` để điều hướng Client-side thông qua React Router, giúp giữ nguyên sản phẩm trong giỏ để tiếp tục thực hiện Assertion.

### Artifact 15: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**

**2. AI Output:**

### Artifact 16: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**

**2. AI Output:**

### Artifact 17: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**

**2. AI Output:**

### Artifact 18: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**

**2. AI Output:**

### Artifact 19: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**

**2. AI Output:**

### Artifact 20: 
**1. Prompt + Tool**
- **Tool:** 
- **Timestamp:** 
- **Prompt:**

**2. AI Output:**