import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Đọc dữ liệu từ file JSON
const dataPath = path.join(__dirname, '../test-data/fr15-product-management.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-15: Product management (CRUD)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin login page and authenticate
    // await page.goto('http://localhost:3000/admin/login');
    // await page.fill('input[name="username"]', 'admin');
    // await page.fill('input[name="password"]', 'admin123');
    // await page.click('button[type="submit"]');
    // await page.goto('http://localhost:3000/admin/products');
  });

  // Data-Driven Testing
  for (const data of testData) {
    test(`[${data.testId}] ${data.description}`, async ({ page }) => {
      // 1. Thực hiện các hành động trên trang
      // await page.click('text=Thêm sản phẩm');
      // await page.fill('input[name="productName"]', data.productName);
      // await page.fill('input[name="price"]', data.price);
      // await page.click('button[type="submit"]');

      // 2. Các mẫu Assertions
      // Mẫu: Kiểm tra text hiển thị
      // await expect(page.locator('.toast-message')).toHaveText(data.expectedStatus);
      
      console.log(`Running test for product ${data.productName} with price: ${data.price}`);
    });
  }
});
