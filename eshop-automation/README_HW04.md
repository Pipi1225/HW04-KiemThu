# Hướng dẫn hoàn thành bài tập HW04

Bạn đã có sẵn bộ khung (scaffolding) Playwright cho 3 chức năng đã chọn:
1. **FR-04**: Quản lý hồ sơ cá nhân (`tests/fr04-profile.spec.ts`)
2. **FR-07**: Giỏ hàng (`tests/fr07-cart.spec.ts`)
3. **FR-15**: Product management (`tests/fr15-product-management.spec.ts`)

Mã số sinh viên của bạn (**23127052**) đã được cấu hình trong `playwright.config.ts` để hiển thị trên HTML Report theo đúng yêu cầu bài tập.

## Các bước tiếp theo bạn cần làm:

### 1. Bổ sung Test Cases
- Mở thư mục `test-data/`, bạn sẽ thấy 3 file JSON tương ứng với 3 chức năng.
- Hiện tại mỗi file chỉ mới có 2 test cases mẫu. Bạn cần bổ sung thêm sao cho **mỗi file có ít nhất 12 test cases**.

### 2. Hoàn thiện Test Script
- Mở các file trong thư mục `tests/`.
- Sửa lại các đoạn code comment (bỏ comment và thay đổi `locator`, `url`) cho khớp với source code của ứng dụng `eshop-sut` mà bạn cài đặt trên máy.
- Hãy đảm bảo bạn dùng ít nhất **3 mẫu assertions khác nhau** (ví dụ: `toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveValue`...)

### 3. Cài đặt và Chạy ứng dụng SUT
- Bạn cần clone repo `https://github.com/ttbhanh/eshop-sut` và chạy ứng dụng này ở máy tính (local) của bạn.
- Đảm bảo URL trong các test scripts trỏ đúng tới địa chỉ local của SUT (thường là `http://localhost:3000` hoặc tương tự).

### 4. Chạy Test và Xuất Báo Cáo
- Mở Terminal tại thư mục `eshop-automation`.
- Chạy lệnh sau để Playwright thực thi test trên cả 3 trình duyệt (Chromium, Firefox, WebKit):
  ```bash
  npx playwright test
  ```
- Sau khi chạy xong, Playwright sẽ tự động xuất HTML Report. Chạy lệnh sau để xem:
  ```bash
  npx playwright show-report
  ```

### 5. Git Commit & GitHub
- Khởi tạo Git repo trong thư mục này (nếu chưa có) và thực hiện các commit (ít nhất 8 commits thay đổi các file `.spec.ts`).
- Push lên GitHub public repository.

### 6. Video Demo & AI Audit Report
- Đừng quên quay video 5 phút trình bày và làm các báo cáo (AI Audit Report, Bug Report, AI Critique) theo mẫu PDF hoặc Markdown để nộp nhé.

Chúc bạn hoàn thành tốt bài tập!
