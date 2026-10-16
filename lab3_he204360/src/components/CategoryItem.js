import { Form } from "react-bootstrap";

function CategoryItem({ categories, category, onCategoryChange }) {
  return (
    <Form.Select
      className="category-select"
      aria-label="Danh mục sản phẩm"
      value={category}
      onChange={(event) => onCategoryChange(event.target.value)}
    >
      <option value="">Tất cả danh mục</option>
      {category && !categories.includes(category) && (
        <option value={category}>{category} (không tồn tại)</option>
      )}
      {categories.map((name) => <option key={name} value={name}>{name}</option>)}
    </Form.Select>
  );
}

export default CategoryItem;
