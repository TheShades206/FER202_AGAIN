import { Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

function Pagination({ currentPage, totalPages }) {
  const [searchParams] = useSearchParams();

  function getPageLink(page) {
    const nextParams = new URLSearchParams(searchParams);
    if (page === 1) nextParams.delete("page");
    else nextParams.set("page", String(page));
    const query = nextParams.toString();
    return `/products${query ? `?${query}` : ""}`;
  }

  return (
    <nav className="d-flex flex-wrap align-items-center gap-2 mt-4" aria-label="Phân trang sản phẩm">
      {currentPage > 1
        ? <Button as={Link} to={getPageLink(currentPage - 1)}>Previous</Button>
        : <Button disabled>Previous</Button>}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Button
          as={Link}
          key={page}
          to={getPageLink(page)}
          variant={page === currentPage ? "primary" : "outline-primary"}
          aria-label={`Trang ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages
        ? <Button as={Link} to={getPageLink(currentPage + 1)}>Next</Button>
        : <Button disabled>Next</Button>}
    </nav>
  );
}

export default Pagination;
