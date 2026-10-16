import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="text-center py-5">
      
      <h1 className="h3">404 - Not Found Page</h1>
      <p className="text-body-secondary">Trang bạn đang tìm không tồn tại.</p>
      <Button as={Link} to="/">Về trang chủ</Button>
    </section>
  );
}

export default NotFound;
