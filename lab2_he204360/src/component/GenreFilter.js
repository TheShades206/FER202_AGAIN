import { Form } from "react-bootstrap";

function GenreFilter({ genre, sortBy, onGenreChange, onSortChange }) {
  return (
    <div className="d-flex flex-wrap gap-2 my-3">
      <Form.Select
        aria-label="Thể loại"
        style={{ width: "180px" }}
        value={genre}
        onChange={(event) => onGenreChange(event.target.value)}
      >
        <option value="all">Tất cả thể loại</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Animation">Animation</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
        <option value="Comedy">Comedy</option>
      </Form.Select>

      <Form.Select
        aria-label="Sắp xếp theo điểm"
        style={{ width: "220px" }}
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="default">Sắp xếp: Mặc định</option>
        <option value="high">Điểm: Cao → Thấp</option>
        <option value="low">Điểm: Thấp → Cao</option>
      </Form.Select>
    </div>
  );
}

export default GenreFilter;
