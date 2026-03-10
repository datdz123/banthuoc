---
trigger: always_on
---

🔗 Hướng dẫn kết nối API

1. Base URL
   https://api.duocnamviet.site
2. Đăng nhập lấy Token
   POST /api/auth/login
   Content-Type: application/json

{
"username": "admin",
"password": "123456"
}

→ Response: { "success": true, "data": { "access_token": "eyJ...", "refresh_token": "eyJ..." } } 3. Gửi request có Auth
GET /api/products
Authorization: Bearer eyJ...your_access_token...
Content-Type: application/json 4. Frontend connect (Next.js)
// src/services/api.ts
const API_URL = 'https://api.duocnamviet.site';
// hoặc trong .env.local:
NEXT_PUBLIC_API_URL=https://api.duocnamviet.site 5. Response format chuẩn
// Thành công:
{ "success": true, "data": { ... } }

// Lỗi:
{ "success": false, "error": "Mô tả lỗi" }

// Phân trang:
{ "success": true, "data": { "data": [...], "total": 100, "page": 1, "limit": 20 } } 6. Upload ảnh

- Ảnh sản phẩm lưu tại: /opt/duocnamviet.site/uploads/products/
- URL truy cập: https://duocnamviet.site/uploads/products/ten-anh.jpg
- Hỗ trợ: jpg, jpeg, png, webp (max 10MB)
- Trong request body gửi URL ảnh vào field "images": ["https://...url1", "https://...url2"]

Role Code Tên Quyền hạn
super_admin Super Admin Toàn quyền hệ thống
admin Quản trị viên Quản lý users, sản phẩm, đơn hàng, kho, nhân sự, tài chính, marketing, y tế, bài viết, cài đặt
warehouse Kho hàng Quản lý sản phẩm, danh mục, kho hàng, phiếu nhập/xuất
sales Bán hàng Quản lý đơn hàng, khách hàng
accountant Kế toán Giao dịch thu chi, hóa đơn VAT
marketing Marketing Chiến dịch, voucher, bài viết
doctor Bác sĩ Hồ sơ khám bệnh
