import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function ProductItem({ product }) {
  const location = useLocation();

  return (
    <tr>
      <td>{product.id}</td>
      <th scope="row" className="fw-normal">{product.name}</th>
      <td>{product.category}</td>
      <td className="text-end text-nowrap">{product.price.toLocaleString("vi-VN")} ₫</td>
      <td className="text-center">
        <Button
          as={Link}
          to={`/products/${product.id}`}
          state={{ from: `${location.pathname}${location.search}` }}
          variant="outline-primary"
          size="sm"
          aria-label={`Chi tiết ${product.name}`}
        >
          Chi tiết
        </Button>
      </td>
    </tr>
  );
}

export default ProductItem;
