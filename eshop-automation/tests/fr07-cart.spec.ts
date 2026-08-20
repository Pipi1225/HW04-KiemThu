import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Đọc dữ liệu JSON
const dataPath = path.join(__dirname, '../test-data/fr07-cart.json');
const testData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

test.describe('FR-07: Giỏ hàng (Shopping Cart)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.locator('input').nth(0).fill('test@eshop.com');
    await page.locator('input').nth(1).fill('Test1234!');
    await page.locator('button[type="submit"]').click();
    
    await page.waitForTimeout(1000);    
  });

  // Thêm sản phẩm vào giỏ
  const addProductToCart = async (page) => {
    const url = page.url();
    if (!url.endsWith('5173/')) {
      await page.getByRole('link', { name: 'EShop' }).click();
      await page.waitForTimeout(500);
    }
    
    // Bấm nút "Thêm vào giỏ" của sản phẩm đầu tiên
    await page.locator('button:has-text("Thêm vào giỏ")').first().click();

    await page.waitForTimeout(700);
  };

  test.afterEach(async ({ page }) => {
    // Vì lỗi mất state mà em tìm thấy ở TC_FR07_12, thay vì xóa localStorage, ta chỉ cần F5 để dọn dẹp sạch sẽ giỏ hàng
    await page.reload();
    await page.waitForTimeout(1000);
  });

  for (const data of testData) {
    if (data.type === 'skip') {
      test.skip(`[${data.testId}] ${data.description}`, async () => {
        // Test bị skip vì giao diện thực tế thiếu nút [+] và [-]
      });
      continue;
    }

    test(`[${data.testId}] ${data.description}`, async ({ page }) => {
      console.log(`Running test: ${data.testId}`);

      switch (data.type) {
        case 'empty_cart': {
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          // Phải hiển thị chữ "Giỏ hàng của bạn đang trống"
          await expect(page.getByText(data.expectedText)).toBeVisible();
          
          // Fail: Không có hình minh họa (img) nào thể hiện giỏ hàng trống trên màn hình
          const images = page.locator('main img');
          expect(await images.count(), 'Lỗi UI: Không có hình minh họa giỏ hàng trống').toBeGreaterThan(0);
          break;
        }

        case 'table_columns': {
          await addProductToCart(page);
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          // Kiểm tra các cột hiển thị
          for (const text of data.expectedVariable.expectedText) {
            await expect(page.getByText(text, { exact: true })).toBeVisible();
          }
          
          // Fail: Giao diện không có nút + và - để chỉnh sửa số lượng
          for (const btnText of data.expectedVariable.expectedButton) {
            await expect(page.getByRole('button', { name: btnText })).toBeVisible();
          }

          break;
        }

        case 'total_label': {
          await addProductToCart(page);
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          // Fail: Giao diện hiện "Tổng tạm tính" thay vì "Tổng cộng"
          const totalLabel = page.getByText(data.expectedText);
          await expect(totalLabel, 'Lỗi UI: Sai nhãn Tổng cộng').toBeVisible();
          break;
        }

        case 'add_same_product': {
          await addProductToCart(page);
          await addProductToCart(page);
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          // Fail: Thay vì tăng số lượng, hệ thống tạo thêm dòng mới cho cùng 1 sản phẩm
          const rows = page.locator('table tbody tr');
          expect(await rows.count(), 'Lỗi Logic: Trùng sản phẩm nhưng hệ thống tạo ra 2 dòng khác nhau').toBe(1);
          break;
        }

        case 'delete_cancel': {
          await addProductToCart(page);
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          let dialogAppeared = false;
          page.once('dialog', async dialog => {
            dialogAppeared = true;
            await dialog.dismiss();
          });

          await page.getByRole('button', { name: 'Xóa' }).first().click();
          await page.waitForTimeout(500);

          // Fail: Không hiện Dialog xác nhận mà xóa luôn
          expect(dialogAppeared, 'Lỗi Logic: Không hiện Dialog xác nhận khi bấm Xóa').toBeTruthy();
          break;
        }

        case 'delete_confirm': {
          await addProductToCart(page);
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          let dialogAppeared = false;
          page.once('dialog', async dialog => {
            dialogAppeared = true;
            await dialog.accept();
          });

          await page.getByRole('button', { name: 'Xóa' }).first().click();
          await page.waitForTimeout(500);

          // Fail: Không hiện Dialog xác nhận mà xóa luôn
          expect(dialogAppeared, 'Lỗi Logic: Không hiện Dialog xác nhận khi bấm Xóa').toBeTruthy();
          break;
        }

        case 'continue_shopping_empty': {
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          await page.getByRole('link', { name: 'Tiếp tục mua sắm' }).click();
          
          // Pass: Trở về trang chủ
          await expect(page).toHaveURL('http://localhost:5173/');
          break;
        }

        case 'continue_shopping_full': {
          await addProductToCart(page);
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          // Nút có thể là "← Mua tiếp" hoặc "Tiếp tục mua sắm" tùy giao diện thực tế
          // Sử dụng Regex để bắt 1 trong 2
          await page.getByRole('link', { name: /Mua tiếp|Tiếp tục mua sắm/i }).click();
          
          // Pass: Trở về trang chủ
          await expect(page).toHaveURL('http://localhost:5173/');
          break;
        }

        case 'state_consistency': {
          await addProductToCart(page);
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);
          
          const rowsBefore = await page.locator('table tbody tr').count();
          await page.reload();
          await page.waitForTimeout(1000);

          const rowsAfter = await page.locator('table tbody tr').count();
          
          // Fail: Giỏ hàng bị reset mất hết sản phẩm sau khi F5
          expect(rowsAfter, 'Lỗi State: Giỏ hàng mất hết sản phẩm sau khi Refresh (F5)').toBe(rowsBefore);
          break;
        }

        case 'negative_quantity': {
          const url = page.url();
          if (!url.endsWith('5173/')) {
            await page.getByRole('link', { name: 'EShop' }).click();
            await page.waitForTimeout(500);
          }

          // Bấm "Xem chi tiết" của sản phẩm đầu tiên
          await page.getByRole('link', { name: 'Xem chi tiết' }).first().click();
          await page.waitForTimeout(500);

          // Tìm ô input Số lượng và điền số âm
          const qtyInput = page.locator('input[type="number"]');
          await qtyInput.fill('-5');

          // Bấm Thêm vào giỏ hàng
          await page.getByRole('button', { name: 'Thêm vào giỏ hàng' }).click();
          await page.waitForTimeout(100);
          await page.getByRole('button', { name: 'Thêm vào giỏ hàng' }).click();
          await page.waitForTimeout(500);

          // Sang trang giỏ hàng để kiểm tra hậu quả
          await page.getByRole('link', { name: 'Giỏ hàng' }).click();
          await page.waitForTimeout(500);

          const rowCount = await page.locator('table tbody tr').count();
          if (rowCount > 0) {
             const rowText = await page.locator('table tbody tr').first().innerText();
             // Fail: Hệ thống không chặn số lượng âm, dẫn đến Cột số lượng/Thành tiền hiển thị số âm
             expect(rowText, 'Lỗi Logic: Hệ thống chấp nhận đưa số lượng âm vào Giỏ hàng').not.toContain('-');
          } else {
             // Pass: Nếu không có dòng nào, nghĩa là hệ thống đã chặn thành công việc thêm số âm
             expect(rowCount).toBe(0);
          }
          break;
        }
      }
    });
  }
});
