import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import App from "./App";

function RouterProbe() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div data-testid="url">{location.pathname}{location.search}</div>
      <button onClick={() => navigate(-1)}>History back</button>
      <button onClick={() => navigate(1)}>History forward</button>
    </>
  );
}

function renderPage(url) {
  render(
    <MemoryRouter initialEntries={[url]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
      <RouterProbe />
    </MemoryRouter>
  );
}

function visibleProductNames() {
  return screen.queryAllByRole("rowheader").map((cell) => cell.textContent);
}

test("/ shows Home and the Home / Products navigation", () => {
  renderPage("/");
  expect(screen.queryByRole("heading", { name: "Danh sách sản phẩm" })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  fireEvent.click(screen.getByRole("link", { name: "Products" }));
  expect(screen.getByTestId("url")).toHaveTextContent("/products");
  expect(screen.getByRole("heading", { name: "Danh sách sản phẩm" })).toBeInTheDocument();
});

test("/products shows the first three products and five pages", () => {
  renderPage("/products");
  expect(visibleProductNames()).toEqual(["iPhone 16", "Samsung Galaxy S25", "MacBook Air M4"]);
  expect(screen.getByRole("status")).toHaveTextContent("Tổng: 15 sản phẩm · Trang 1/5");
  expect(screen.getAllByRole("columnheader").map((cell) => cell.textContent))
    .toEqual(["ID", "Tên sản phẩm", "Danh mục", "Giá", "Thao tác"]);
  expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
});

test.each(["iPhone", "IPHONE", "iphone"])("keyword=%s searches by name without case sensitivity", (keyword) => {
  renderPage(`/products?keyword=${keyword}`);
  expect(visibleProductNames()).toEqual(["iPhone 16"]);
  expect(screen.getByRole("searchbox")).toHaveValue(keyword);
});

test("category=Laptop filters products before pagination", () => {
  renderPage("/products?category=Laptop");
  expect(visibleProductNames()).toEqual(["MacBook Air M4", "Dell XPS 13", "ASUS Vivobook 15"]);
  expect(screen.getByRole("combobox", { name: "Danh mục sản phẩm" })).toHaveValue("Laptop");
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(screen.getByTestId("url")).toHaveTextContent("/products?category=Laptop&page=2");
  expect(visibleProductNames()).toEqual(["Lenovo ThinkPad E14"]);
  expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
});

test("page=2 shows the second page", () => {
  renderPage("/products?page=2");
  expect(visibleProductNames()).toEqual(["Dell XPS 13", "iPad Air", "Samsung Galaxy Tab S10"]);
  expect(screen.getByRole("button", { name: "Trang 2" })).toHaveAttribute("aria-current", "page");
});

test("keyword=iphone&page=2 handles a page outside the filtered results", () => {
  renderPage("/products?keyword=iphone&page=2");
  expect(visibleProductNames()).toEqual([]);
  expect(screen.getByRole("alert")).toHaveTextContent("Không có sản phẩm ở trang 2");
  fireEvent.click(screen.getByRole("button", { name: "Về trang 1" }));
  expect(screen.getByTestId("url")).toHaveTextContent("/products?keyword=iphone");
  expect(visibleProductNames()).toEqual(["iPhone 16"]);
});

test("keyword, category and page work together and survive browser history", () => {
  renderPage("/products?keyword=a&category=Máy tính bảng");
  fireEvent.click(screen.getByRole("button", { name: "Next" }));
  expect(visibleProductNames()).toEqual(["Xiaomi Pad 7"]);
  expect(screen.getByTestId("url")).toHaveTextContent(`keyword=a&category=${encodeURIComponent("Máy tính bảng").replace(/%20/g, "+")}&page=2`);
  fireEvent.click(screen.getByRole("button", { name: "History back" }));
  expect(visibleProductNames()).toEqual(["iPad Air", "Samsung Galaxy Tab S10", "iPad Pro M4"]);
  fireEvent.click(screen.getByRole("button", { name: "History forward" }));
  expect(visibleProductNames()).toEqual(["Xiaomi Pad 7"]);
});

test("changing keyword resets page while preserving category", () => {
  renderPage("/products?category=Laptop&page=2");
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Dell" } });
  expect(screen.getByTestId("url")).toHaveTextContent("/products?category=Laptop&keyword=Dell");
  expect(visibleProductNames()).toEqual(["Dell XPS 13"]);
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "" } });
  expect(screen.getByTestId("url")).toHaveTextContent("/products?category=Laptop");
});

test("changing category resets page and sorting preserves the category", () => {
  renderPage("/products?page=2");
  fireEvent.change(screen.getByRole("combobox", { name: "Danh mục sản phẩm" }), { target: { value: "Laptop" } });
  fireEvent.change(screen.getByRole("combobox", { name: "Sắp xếp theo giá" }), { target: { value: "price-asc" } });
  expect(visibleProductNames()).toEqual(["ASUS Vivobook 15", "Lenovo ThinkPad E14", "MacBook Air M4"]);
  expect(screen.getByTestId("url")).toHaveTextContent("/products?category=Laptop&sort=price-asc");
  fireEvent.click(screen.getByRole("button", { name: "Đặt lại" }));
  expect(visibleProductNames()[0]).toBe("iPhone 16");
});

test("/products/1 shows complete details with a working return link", () => {
  renderPage("/products/1");
  expect(screen.getByRole("heading", { name: "iPhone 16" })).toBeInTheDocument();
  expect(screen.getByText("22.000.000 ₫")).toBeInTheDocument();
  expect(screen.getByText("Điện thoại thông minh Apple với hiệu năng mạnh mẽ.")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Quay lại danh sách" }));
  expect(screen.getByTestId("url")).toHaveTextContent("/products");
});

test("returning from details restores category and page", () => {
  renderPage("/products?category=Laptop&page=2");
  fireEvent.click(screen.getByRole("button", { name: "Chi tiết Lenovo ThinkPad E14" }));
  expect(screen.getByRole("heading", { name: "Lenovo ThinkPad E14" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Quay lại danh sách" }));
  expect(screen.getByTestId("url")).toHaveTextContent("/products?category=Laptop&page=2");
  expect(visibleProductNames()).toEqual(["Lenovo ThinkPad E14"]);
});

test("/products/999 handles a nonexistent product", () => {
  renderPage("/products/999");
  expect(screen.getByRole("heading", { name: "Không tìm thấy sản phẩm" })).toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent("999");
});

test("/invaild-url shows Not Found Page", () => {
  renderPage("/invaild-url");
  expect(screen.getByRole("heading", { name: "Not Found Page" })).toBeInTheDocument();
});

test.each(["keyword=does-not-exist", "category=Unknown"])("empty results for %s do not show pagination", (query) => {
  renderPage(`/products?${query}`);
  expect(screen.getByRole("alert")).toHaveTextContent("Không tìm thấy sản phẩm phù hợp");
  expect(screen.queryByRole("navigation", { name: "Phân trang sản phẩm" })).not.toBeInTheDocument();
});

test.each(["0", "-1", "abc", "1.5", "Infinity"])("invalid page=%s safely displays page 1", (page) => {
  renderPage(`/products?page=${page}`);
  expect(visibleProductNames()[0]).toBe("iPhone 16");
  expect(screen.getByRole("status")).toHaveTextContent("Trang 1/5");
});

test("table has no favorite controls and theme persists across route changes", () => {
  renderPage("/products");
  expect(screen.queryByRole("button", { name: /Yêu thích|Bỏ thích/ })).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("Tổng: 15 sản phẩm · Trang 1/5");
  fireEvent.click(screen.getByRole("button", { name: "Đổi giao diện sáng tối" }));
  expect(document.documentElement).toHaveAttribute("data-bs-theme", "dark");
  fireEvent.click(screen.getByRole("link", { name: "Home" }));
  fireEvent.click(screen.getByRole("link", { name: "Products" }));
  expect(document.documentElement).toHaveAttribute("data-bs-theme", "dark");
});

