import { Form, InputGroup } from "react-bootstrap";

function SearchBar({ search, onSearchChange }) {
  return (
    <InputGroup className="mx-auto" style={{ maxWidth: "500px" }}>
      <Form.Control
        type="search"
        aria-label="Tìm tên phim"
        placeholder="Tìm tên phim"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </InputGroup>
  );
}

export default SearchBar;
