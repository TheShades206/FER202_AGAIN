# FER202 Exercise 20–22

Ứng dụng React tổng hợp ba bài tập về React Router 6.

## Chạy dự án

```powershell
cd "D:\NODEJS FER202 AGAIN\Exercise 20-22\ex20-22"
npm.cmd install
npm.cmd start
```

## Nội dung bài tập

- **Bài 20:** mảng `routes` và hàm `renderRoutes()` trong `src/routes.js`; `App.js` lắp navbar và các route.
- **Bài 21:** dữ liệu 5 người dùng và 4 món ăn theo đề. Bấm tên/ảnh để mở chi tiết theo ID. ID bắt đầu từ 0: `/users/2` hiển thị John Smith, 30 tuổi.
- **Bài 22:** navbar tối màu bằng Reactstrap, điều hướng bằng `Link`/`NavLink`, có menu thu gọn trên điện thoại. `/users/:userId?` và `/profile/:userId?` nhận cả URL có và không có ID.

| URL | Nội dung |
| --- | --- |
| `/` | Home Component và danh sách món ăn |
| `/products` | Products Page |
| `/about` | About Component |
| `/contact` | Contact Component |
| `/users` | Danh sách người dùng |
| `/users/0` … `/users/4` | Chi tiết người dùng |
| `/dishes` | Danh sách món ăn |
| `/dishes/0` … `/dishes/3` | Chi tiết món ăn |
| `/profile` | Profile Component, chưa chọn người dùng |
| `/profile/2` | Profile Component và thông tin John Smith |

ID sai hiển thị thông báo và liên kết quay lại; URL không tồn tại hiển thị trang 404.

## Ghi chú

Code mẫu bài 20 trộn cú pháp React Router cũ và mới. Bản này dùng `element={<Component />}` và `useParams()` theo React Router 6, bỏ `exact`.

Ảnh món ăn được lưu ở `public/images`, từ tài nguyên học tập [conFusion-React](https://github.com/jmuppala/conFusion-React/tree/master/public/assets/images).
Tài liệu API: [React Router 6 Route](https://reactrouter.com/6.30.1/route/route).

## Kiểm tra

```powershell
npm.cmd run build
$env:CI='true'; npm.cmd test -- --watchAll=false --runInBand
```
