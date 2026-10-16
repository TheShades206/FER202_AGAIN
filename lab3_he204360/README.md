# Lab 3 - Mini Product Manager

Giao diện bảng Bootstrap dựa trên lab2, sử dụng dữ liệu gốc `src/data/products.js`.
Ô tìm kiếm nằm bên trái, cùng hàng bộ lọc. Bảng gồm ID, Tên sản phẩm, Danh mục,
Giá, Thao tác. Thống kê chỉ hiển thị tổng kết quả và trang hiện tại/tổng số trang.
Giữ cấu trúc `components/`, `pages/`, `data/` có sẵn của lab3.

## Chạy project

```powershell
cd "D:\NODEJS FER202 AGAIN\lab3_he204360"
npm.cmd install
npm.cmd start
```

Mở địa chỉ được terminal thông báo (mặc định http://localhost:3000).

```powershell
npm.cmd run build
npm.cmd test -- --watchAll=false --runInBand
```

## Router testing

| URL | Kết quả |
| --- | --- |
| `/` | Home, nút xem sản phẩm |
| `/products` | 3 sản phẩm đầu tiên, tổng cộng 5 trang |
| `/products?keyword=iPhone` | iPhone 16; tìm tên không phân biệt hoa/thường |
| `/products?category=Laptop` | Chỉ laptop; 4 kết quả, 2 trang |
| `/products?page=2` | Dell XPS 13, iPad Air, Samsung Galaxy Tab S10 |
| `/products?keyword=iphone&page=2` | Báo trang vượt giới hạn; về trang 1 vẫn giữ keyword |
| `/products?keyword=a&category=Máy%20tính%20bảng&page=2` | Xiaomi Pad 7; kết hợp keyword/category/page |
| `/products/1` | Tên, mã, danh mục, giá, mô tả của iPhone 16 |
| `/products/999` | Thông báo sản phẩm không tồn tại |
| `/invaild-url` | 404 - Not Found Page |

Dữ liệu gốc chỉ có một sản phẩm iPhone, nên tìm iPhone chỉ có một trang.
Không thêm sản phẩm giả để tạo trang 2. URL có `page` không hợp lệ (0, âm, chữ, số thập phân)
được xử lý như trang 1; số trang vượt giới hạn có thông báo riêng.

## Cách hoạt động

- `index.js`: bọc ứng dụng bằng `BrowserRouter`, nạp Bootstrap.
- `App.js`: khai báo các route; giữ theme bằng `useState`.
- `components/Header.js`: navbar Home / Products dùng `NavLink`, đổi sáng/tối.
- `pages/ProductList.js`: đọc URL bằng `useSearchParams`, lọc tên + danh mục,
  sắp xếp giá rồi mới cắt trang (3 sản phẩm/trang).
- `components/SearchBar.js`, `CategoryItem.js`: nhận giá trị từ URL qua props.
- `components/ProductItem.js`: hiển thị một dòng của bảng và link chi tiết.
- `components/Pagination.js`: Previous / Next / số trang, giữ các query khác.
- `pages/ProductDetail.js`: đọc `id` bằng `useParams`; quay lại đúng bộ lọc/trang
  nếu mở từ danh sách, hoặc `/products` nếu mở URL chi tiết trực tiếp.
- `pages/NotFound.js`: xử lý mọi đường dẫn không khớp route.

Đổi tìm kiếm/danh mục/sắp xếp sẽ quay về trang 1. Back/Forward và tải lại trang
đọc đúng query trên URL. Có nút Đặt lại để xóa query.
Không dùng localStorage hoặc sessionStorage; theme trở về mặc định khi reload.

Tài liệu React Router: https://reactrouter.com/docs/en/v6/start/concepts

