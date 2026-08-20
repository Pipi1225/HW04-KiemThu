# HW04: Automation Testing

## Các Feature (FR) đã chọn ở HW02:
- FR-04: Quản lý hồ sơ cá nhân
- FR-07: Giỏ hàng (Shopping Cart)
- FR-15: Product management (CRUD)

## FR-04: Quản lý hồ sơ cá nhân
- AI tự hallucinate ra nội dung password (`password123`) mặc dù em không cung cấp, em phải tự sửa lại để có thể thực hiện việc đăng nhập tự động để vào trang profile.
- Em phải tự sửa phần kiểm tra nội dung dialog alert xuất hiện (`expected result` trong data JSON), do AI không rõ context của UI nên đã generate ra các expected result chung chung.
- Vì chỉ nhờ test case do em đã tạo ở HW02, nên AI cũng không biết (thiếu context) là phải nhập số điện thoại không bắt đầu bằng số 0 mới có thể cập nhập được tài khoản (lỗi ở đã báo cáo ở SUT EShop), nên cũng phải sửa lại ở test case `TC_FR04_11` và `TC_FR04_12`.
- Trong quá trình chạy test Playwright, em để ý là nếu như cùng trình duyệt thì nếu đã cập nhập thành công profile ở test case phía trước, test case phía sau cũng sẽ bị ảnh hưởng, mặc dù đã yêu cầu AI sửa lại script để có thể chạy `TC_FR04_12` sau `TC_FR04_11` (do test case này nhập vào tên biến rất dài, gây ảnh hưởng tới UI), nhưng AI không thể sửa dứt điểm được nên em phải tự sửa tay.

## FR-07: Giỏ hàng (Shopping Cart)
- AI mặc dù generate test script khá hoàn thiện, nhưng đồng thời nó cũng overwrite luôn phần đăng nhập vào trang EShop mà em đã để sẵn ở đầu mỗi test script, khiến cho toàn bộ script không thể chạy được.
- AI mặc dù có chỉ ra lỗi do test case `TC_FR07_12` nếu reload trang hay chuyển URL thì sẽ mất hết toàn bộ sản phẩm trong giỏ hàng. Nhưng trong một số test script `empty_cart` và `table_columns`... lại dùng goto, khiến cho việc các test script bị chạy sai, không dò ra lỗi đúng.
- Do các test script sinh ra vẫn chưa hoàn toàn là data-driven mà chỉ dạng hybrid, nên em đã tự điều chỉnh JSON để có thể hoàn toàn biến test script thành data-driven.
- Ở test case `TC_FR07_13` khi generate ra test script, AI đã flag là nó không thể thực hiện được, điều này có vẻ là do AI thiếu context về trang chi tiết của sản phẩm (trang có thể thêm sản phẩm ở số lượng âm), nên em đã cung cấp các context cần thiết và prompt lại để AI generate ra.
- AI cũng không biết về việc phải double-click vào nút "Thêm sản phẩm" thì mới có thể thêm sản phẩm vào giỏ hàng được. Nên em đã thêm 1 lần bấm nữa với timeout so với lần trước chỉ 100ms để mô phỏng double-click.

## FR-15: Product management (CRUD)