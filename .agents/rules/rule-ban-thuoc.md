# Rule App Bán Thuốc (Long Châu Clone)

**Mọi thay đổi & bổ sung code trong dự án React Native đều phải tuân theo tập rule này.**

---

## 1. Kiến Trúc và Tech Stack

- **Framework:** React Native + Expo.
- **Backend (Có Sẵn):** Go (REST / gRPC). Mobile App fetch data thông qua Axios.
- **State Management:**
  - **Server State:** Dùng `React Query` (để caching, offline cache, handle retry logic).
  - **Local State:** Dùng `Zustand`.
  - **Cart State:** Dùng `Zustand` kết hợp `Zustand persist` để lưu trong storage.
  - **Authentication:** `Context API` + `SecureStore` (Expo) lưu trữ secure tokens (JWT/Refresh Token).

## 2. Cấu Trúc Thư Mục (Folder Structure)

Mọi component, hook, utility đều phải nằm ở trong thư mục `src/`.
Phân chia Project dựa theo mô hình features-based:

```
src/
├── api/             # Cấu hình Axios, interceptors, central error handlers
├── components/      # UI components dùng chung toàn cục (Buttons, Inputs, Cards...)
├── features/        # Các Domains xử lý business logic riêng tư
│     ├── auth/      # Login, Register, OTP Verify
│     ├── product/   # Tra cứu thuốc, Detail, Màn hình Home, Category
│     ├── cart/      # Giỏ hàng, Select Address, Checkout
│     ├── order/     # Order Tracking (Pending, Shipping, v.v)
│     └── profile/   # Thông tin cá nhân, My Prescriptions, Điểm tích luỹ
├── hooks/           # Custom hooks dùng chung (như useAuth, useDebounce)
├── navigation/      # Cấu hình React Navigation (Stacks, Tabs)
├── store/           # Cấu hình các Store Global (Zustand, Auth provider)
└── utils/           # Các hàm helpers (format date, money formatter, validations)
```

## 3. Navigation Scheme (React Navigation)

Tách rõ ràng `RootStack` thành các nhánh:

```
RootStack
 ├── AuthStack
 └── MainTabs
       ├── HomeStack
       ├── CategoryStack
       ├── CartStack
       ├── OrderStack
       └── ProfileStack
```

**Luồng Auth:**
Splash -> Login / Register -> OTP verify -> Home.
Xử lý Deep Linking cho các case redirect từ Payment Apps (MoMo/VNPAY).

## 4. UI/UX & Responsive

- Thiết kế phải **Responsive** với đa số thiết bị mobile bằng:
  - Flexbox, SafeAreaView chuẩn mực.
  - Chia kích cỡ font text linh hoạt, sử dụng tỉ lệ phần trăm màn hình nếu cần.
- **Xử Lí Loading:** App cần hiển thị `Skeleton Loading` cho các API request thay cho các ActivityIndicator truyền thống.
- **Trạng Thái Mạng:** Có cảnh báo Offline Cache / Cảnh báo mất internet.
- **Quy tắc riêng lĩnh vực Dược phẩm:**
  - `Modal Cảnh Báo "Sản phẩm cần tư vấn"` đối với các sản phẩm thuốc hạn chế / cần kê toa trước phần Add to Cart.
  - `Upload Toa Thuốc`: Hỗ trợ luồng upload ảnh Toa thuốc hoặc chụp ảnh, lưu trữ vào backend chờ duyệt. Giao dịch mua thuốc kê đơn chỉ xác nhận khi duyệt xong.

## 5. Hiệu Suất (Performance)

1. **Danh sách nhiều phần tử:**
   - Hạn chế sử dụng `FlatList` mặc định cho lượng item có số lượng lớn, ưu tiên dùng `FlashList` (Shopify).
   - Phải cung cấp `keyExtractor` đúng cho tất cả List components (không tận dụng index).
2. **Quản lý Hình Ảnh:** Tối ưu hóa render image. Sử dụng `expo-image` để dễ dàng cache và preload image.
3. **Tìm Kiếm Thuốc:** Input text Tìm Kiếm phải có `debounce (~300ms)` nhằm giảm thiểu số lượng API.
4. **Pagination:** Việc request sản phẩm, transactions phải được thực hiện bằng chiến lược Pagination / Infinite Scrolling.

## 6. Logic Bắt Lỗi & Bảo Mật

- Implement hệ thống `Retry Logic` đối với các API bị crash do gián đoạn mạng đột ngột.
- Dựng `Central Error Handler` bắt các Network Errors và render Toast thân thiện với user thay vì alert crash app.
- **Bảo Mật Local Data:** 100% Token và Profile Data User nhạy cảm lưu xuống Storage phải được mã hóa thông qua `SecureStore`.
- Bắt buộc gọi `Version check API` / Update screen khi init App để Force Update.
