import { Alert, Button, Card } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { products } from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const product = products.find((item) => String(item.id) === id);
  // Mở từ danh sách thì giữ bộ lọc/trang; mở URL trực tiếp thì về /products.
  const from = location.state?.from;
  const backLink = typeof from === "string" && (from === "/products" || from.startsWith("/products?"))
    ? from
    : "/products";

  if (!product) {
    return (
      <Alert variant="warning">
        <h1 className="h4">Không tìm thấy sản phẩm</h1>
        <p>Sản phẩm có mã “{id}” không tồn tại.</p>
        <Button as={Link} to="/products" variant="outline-primary">Về danh sách sản phẩm</Button>
      </Alert>
    );
  }

  return (
    <Card className="detail-card mx-auto">
      <Card.Header>Chi tiết sản phẩm</Card.Header>
      <Card.Body className="p-4">
        <h1 className="h3 mb-4">{product.name}</h1>
        <dl className="row mb-3">
          <dt className="col-sm-4">Mã sản phẩm</dt>
          <dd className="col-sm-8">{product.id}</dd>
          <dt className="col-sm-4">Danh mục</dt>
          <dd className="col-sm-8">{product.category}</dd>
          <dt className="col-sm-4">Giá</dt>
          <dd className="col-sm-8 fw-semibold text-primary">{product.price.toLocaleString("vi-VN")} ₫</dd>
        </dl>
        <p className="mb-4">{product.description}</p>
        <Button as={Link} to={backLink} variant="secondary">Quay lại danh sách</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductDetail;
