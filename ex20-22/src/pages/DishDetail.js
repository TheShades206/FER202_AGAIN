import { Link, useParams } from 'react-router-dom';
import { Badge, Col, Row } from 'reactstrap';
import { dishes } from '../data/dishes';

export default function DishDetail() {
  const { dishId } = useParams();
  const dish = dishes.find((item) => String(item.id) === dishId);

  if (!dish) {
    return (
      <section>
        <h1>Dish not found</h1>
        <p>No dish has ID {dishId}.</p>
        <Link to="/dishes">Back to dishes</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/dishes" className="d-inline-block mb-4">Back to dishes</Link>
      <Row className="g-4 align-items-start">
        <Col md="6">
          <img src={dish.image} alt={dish.name} className="dish-detail-image rounded" />
        </Col>
        <Col md="6">
          <h1>{dish.name}</h1>
          <div className="d-flex gap-2 mb-3">
            {dish.label && <Badge color="danger">{dish.label}</Badge>}
            {dish.featured && <Badge color="success">Featured</Badge>}
          </div>
          <p>{dish.description}</p>
          <dl className="resource-details">
            <dt>ID</dt><dd>{dish.id}</dd>
            <dt>Category</dt><dd>{dish.category}</dd>
            <dt>Price</dt><dd>${dish.price}</dd>
          </dl>
        </Col>
      </Row>
    </section>
  );
}
