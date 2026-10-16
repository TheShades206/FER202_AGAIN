import { Alert, Button, Form, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import CategoryItem from "../components/CategoryItem";
import Pagination from "../components/Pagination";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import { products } from "../data/products";

const PRODUCTS_PER_PAGE = 3;
const categories = [...new Set(products.map((product) => product.category))];

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();


  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const pageValue = searchParams.get("page") || "1";
  const currentPage = /^\d+$/.test(pageValue) && Number.isSafeInteger(Number(pageValue)) && Number(pageValue) > 0
    ? Number(pageValue)
    : 1;

  function updateFilter(name, value) {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set(name, value);
    else nextParams.delete(name);
    nextParams.delete("page");
    setSearchParams(nextParams);
  }

  function handleKeywordChange(value) {
    updateFilter("keyword", value);
  }

  function handleCategoryChange(value) {
    updateFilter("category", value);
  }

  function handleSortChange(value) {
    updateFilter("sort", value);
  }

  const normalizedKeyword = keyword.trim().toLocaleLowerCase("vi-VN");
  const filteredProducts = products.filter((product) => {
    const matchesKeyword = product.name.toLocaleLowerCase("vi-VN").includes(normalizedKeyword);
    const matchesCategory = !category || product.category === category;
    return matchesKeyword && matchesCategory;
  });

  if (sort === "price-asc") filteredProducts.sort((first, second) => first.price - second.price);
  if (sort === "price-desc") filteredProducts.sort((first, second) => second.price - first.price);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const firstPageParams = new URLSearchParams(searchParams);
  firstPageParams.delete("page");
  const firstPageQuery = firstPageParams.toString();
  const firstPageLink = `/products${firstPageQuery ? `?${firstPageQuery}` : ""}`;

  return (
    <section aria-labelledby="products-title">
      <h1 id="products-title" className="h4 mb-3">Danh sách sản phẩm</h1>
      <div className="product-filters d-flex flex-wrap gap-2 my-3">
        <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
        <CategoryItem categories={categories} category={category} onCategoryChange={handleCategoryChange} />
        <Form.Select
          className="sort-select"
          aria-label="Sắp xếp theo giá"
          value={["price-asc", "price-desc"].includes(sort) ? sort : ""}
          onChange={(event) => handleSortChange(event.target.value)}
        >
          <option value="">Sắp xếp: Mặc định</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
        </Form.Select>
        {searchParams.toString() && (
          <Button as={Link} to="/products" variant="outline-secondary">Đặt lại</Button>
        )}
      </div>
      <p className="text-body-secondary" role="status">
        Tổng: {filteredProducts.length} sản phẩm · Trang {currentPage}/{totalPages}
      </p>
      <Table responsive bordered hover className="align-middle" aria-label="Danh sách sản phẩm">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Danh mục</th>
            <th scope="col" className="text-end">Giá</th>
            <th scope="col" className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => <ProductItem key={product.id} product={product} />)}
        </tbody>
      </Table>
      {filteredProducts.length === 0 ? (
        <Alert variant="info">Không tìm thấy sản phẩm phù hợp. Hãy thử tên hoặc danh mục khác.</Alert>
      ) : currentPage > totalPages ? (
        <Alert variant="warning">
          <p>Không có sản phẩm ở trang {currentPage}. Kết quả hiện tại chỉ có {totalPages} trang.</p>
          <Button as={Link} to={firstPageLink} variant="outline-primary">Về trang 1</Button>
        </Alert>
      ) : null}
      {filteredProducts.length > 0 && currentPage <= totalPages && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </section>
  );
}

export default ProductList;
