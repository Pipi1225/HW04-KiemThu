import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Đọc dữ liệu JSON
const dataPath = path.join(__dirname, '../test-data/fr04-profile.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-04: Quản lý hồ sơ cá nhân', () => {

  test.beforeEach(async ({ page }) => {
    // Giả lập trạng thái đã đăng nhập vào Profile
    // Trong thực tế, bạn có thể gọi API login hoặc điền form login trước
    await page.goto('http://localhost:5173/profile');
    
    // Nếu ứng dụng yêu cầu đăng nhập thực sự, hãy bỏ comment phần dưới và sửa locator:
    // await page.getByPlaceholder('Email').fill('test@eshop.com');
    // await page.getByPlaceholder('Password').fill('password123');
    // await page.getByRole('button', { name: 'Đăng nhập' }).click();
    // await page.waitForURL('**/profile');
  });

  for (const data of testData) {
    test(`[${data.testId}] ${data.description}`, async ({ page }) => {
      console.log(`Running test: ${data.testId}`);

      // Xử lý các case API/Edge case đặc biệt
      if (data.inputData.checkReadonly === 'email') {
        const emailInput = page.getByLabel('Email (Không đổi)');
        // Pattern Assertion 1: toBeDisabled() - Kiểm tra trạng thái UI element
        await expect(emailInput).toBeDisabled();
        return; 
      }
      if (data.inputData.apiPayload) {
        test.skip(true, 'Các test API sẽ được kiểm tra bằng request context riêng biệt.');
        return;
      }

      // Xử lý các test case thông thường (UI Form)
      const { name, phone, address } = data.inputData;
      
      // Sử dụng getByLabel là locator tối ưu nhất về mặt Accessibility (A11y)
      if (name !== undefined) {
        await page.getByLabel('Họ Tên').fill(name);
      }
      if (phone !== undefined) {
        await page.getByLabel('Số điện thoại').fill(phone);
      }
      if (address !== undefined) {
        // Có thể dùng getByPlaceholder hoặc getByLabel
        await page.getByPlaceholder('Nhập địa chỉ của bạn').fill(address);
      }

      // Submit form
      await page.getByRole('button', { name: 'Cập nhật' }).click();

      // Kiểm tra Expected Result
      // Tùy theo SUT hiển thị Toast hay Error Message ngay dưới input, ta bắt text đó
      // Pattern Assertion 2: toBeVisible() - Kiểm tra thông báo xuất hiện trên màn hình
      const expectedMessage = page.getByText(data.expectedResult);
      await expect(expectedMessage).toBeVisible();

      // Pattern Assertion 3: toHaveValue() - Kiểm tra lại giá trị đã điền có giữ đúng không (sau khi validation fail hoặc thành công)
      if (name !== undefined) {
          await expect(page.getByLabel('Họ Tên')).toHaveValue(name);
      }

      // Case riêng để check luồng State Management (Bug TC_FR04_12)
      if (data.inputData.checkState) {
          // Bấm về trang chủ
          await page.getByRole('link', { name: 'EShop' }).click();
          // Bấm vô lại profile
          await page.getByRole('link', { name: /Chào,/ }).click();
          
          // Kiểm tra xem dữ liệu có phải là address mới không
          // (Với bug hiện tại, assertion này sẽ FAIL như kỳ vọng)
          await expect(page.getByPlaceholder('Nhập địa chỉ của bạn')).toHaveValue(address);
      }
    });
  }
});
