import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Đọc dữ liệu từ file JSON
const dataPath = path.join(__dirname, '../test-data/fr07-cart.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-07: Giỏ hàng (Shopping Cart)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.locator('input').nth(0).fill('test@eshop.com');
    await page.locator('input').nth(1).fill('Test1234!');
    await page.locator('button[type="submit"]').click();
    
    await page.waitForTimeout(1000);
    
    await page.goto('http://localhost:5173/profile');
  });

  // Data-Driven Testing
  for (const data of testData) {
    test(`[${data.testId}] ${data.description}`, async ({ page }) => {
      // 1. Thực hiện các hành động trên trang
      // Chọn sản phẩm dựa theo productId và số lượng
      // await page.click(`button[data-product-id="${data.productId}"]`);
      
      // Navigate to cart
      // await page.goto('http://localhost:3000/cart');

      // 2. Các mẫu Assertions
      // await expect(page.locator('.cart-item-count')).toHaveText(data.expectedItemCount.toString());
      
      console.log(`Running test for adding ${data.quantity} of ${data.productId} to cart`);
    });
  }
});
