import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Đọc dữ liệu JSON
const dataPath = path.join(__dirname, '../test-data/fr04-profile.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-04: Quản lý hồ sơ cá nhân', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.locator('input').nth(0).fill('test@eshop.com');
    await page.locator('input').nth(1).fill('Test1234!');
    await page.locator('button[type="submit"]').click();
    
    await page.waitForTimeout(1000);
    
    await page.goto('http://localhost:5173/profile');
  });

  // Reset lại dữ liệu chuẩn sau mỗi test case
  // afterEach đảm bảo LUN LUÔN CHẠY dù bài test có Pass hay Fail
  test.afterEach(async ({ page }) => {
    try {
      await page.goto('http://localhost:5173/profile');
      await page.locator('input').nth(1).fill('Test User');
      await page.locator('input').nth(2).fill('1234567890');
      await page.locator('textarea').fill("");
      page.once('dialog', dialog => dialog.accept());
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);
    } catch (e) {
      // Do nothing
    }
  });

  for (const data of testData) {
    test(`[${data.testId}] ${data.description}`, async ({ page }) => {
      console.log(`Running test: ${data.testId}`);

      if (data.inputData.checkReadonly === 'email') {
        const emailInput = page.locator('input').nth(0);
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
      
      const headerBoxBefore = await page.locator('header').boundingBox();

      if (name !== undefined) {
        await page.locator('input').nth(1).fill(name);
      }
      if (phone !== undefined) {
        await page.locator('input').nth(2).fill(phone);
      }
      if (address !== undefined) {
        await page.locator('textarea').fill(address);
      }

      let dialogMessage = '';
      page.once('dialog', async dialog => {
        dialogMessage = dialog.message();
        await dialog.accept();
      });

      // Submit form
      await page.locator('button[type="submit"]').click();
      
      // Chờ JS kịp bắn ra alert
      await page.waitForTimeout(500);

      await page.reload();

      // Pattern Assertion 2: Kiểm tra nội dung của native alert dialog
      if (data.exactMatch) {
          expect(dialogMessage, 'Lỗi SUT: Thông báo không khớp hoàn toàn với mong đợi!').toBe(data.expectedResult);
      } else {
          expect(dialogMessage).toContain(data.expectedResult);
      }

      // Pattern Assertion 3: toHaveValue() - Kiểm tra lại giá trị đã điền có giữ đúng không
      if (name !== undefined) {
        await expect(page.locator('input').nth(1)).toHaveValue(name);
      }

      const headerBoxAfter = await page.locator('header').boundingBox();
      if (headerBoxBefore && headerBoxAfter && data.inputData.checkUI) {
        expect(headerBoxAfter.height, 'Lỗi UI: Header bị giãn chiều cao (vỡ layout)').toBeLessThanOrEqual(headerBoxBefore.height + 5);
      }

      // Case riêng để check luồng State Management (Bug TC_FR04_12)
      if (data.inputData.checkState) {
          await page.getByRole('link', { name: 'EShop' }).click();
          await page.getByRole('link', { name: /Chào,/ }).click();
          
          await expect(page.locator('textarea')).toHaveValue(address);
      }
    });
  }
});
