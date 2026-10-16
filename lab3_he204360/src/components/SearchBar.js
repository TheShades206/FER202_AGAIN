import { Form, InputGroup } from "react-bootstrap";

function SearchBar({ keyword, onKeywordChange }) {
  return (
    <InputGroup className="search-bar">
      <Form.Control
        type="search"
        aria-label="Tìm tên sản phẩm"
        placeholder="Tìm tên sản phẩm"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
      />
    </InputGroup>
  );
}

export default SearchBar;

