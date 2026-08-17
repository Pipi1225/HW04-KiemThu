import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Đọc dữ liệu từ file JSON
const dataPath = path.join(__dirname, '../test-data/fr04-profile.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-04: Quản lý hồ sơ cá nhân', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page and authenticate before testing profile features
    // Bạn cần sửa lại URL và các locator tương ứng với dự án eshop-sut của mình
    // await page.goto('http://localhost:3000/login');
    // await page.fill('input[name="username"]', 'testuser');
    // await page.fill('input[name="password"]', 'password123');
    // await page.click('button[type="submit"]');
    // await page.goto('http://localhost:3000/profile');
  });

  // Data-Driven Testing
  for (const data of testData) {
    test(`[${data.testId}] ${data.description}`, async ({ page }) => {
      // 1. Thực hiện các hành động trên trang
      // await page.fill('input[name="name"]', data.name);
      // await page.fill('input[name="phone"]', data.phone);
      // await page.click('button[type="submit"]');

      // 2. Các mẫu Assertions (Ít nhất 3 mẫu khác nhau trong toàn bộ bài tập)
      // Mẫu 1: Kiểm tra nội dung text
      // await expect(page.locator('.message')).toHaveText(data.expectedMessage);
      
      // Mẫu 2: Kiểm tra phần tử hiển thị (Visible)
      // await expect(page.locator('.success-alert')).toBeVisible();

      // Mẫu 3: Kiểm tra URL
      // await expect(page).toHaveURL(/.*profile/);
      
      console.log(`Running test for ${data.name} with expected message: ${data.expectedMessage}`);
    });
  }
});
