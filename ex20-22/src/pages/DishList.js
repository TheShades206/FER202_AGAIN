import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap';
import { dishes } from '../data/dishes';

export default function DishList({ title = 'Dishes' }) {
  return (
    <section>
      <h1 className="text-center">{title}</h1>
      <Row className="g-4 dish-grid">
        {dishes.map((dish) => (
          <Col sm="6" key={dish.id}>
            <Card className="h-100">
              <Link to={`/dishes/${dish.id}`} aria-label={`View ${dish.name}`}>
                <CardImg top src={dish.image} alt={dish.name} className="dish-image" />
              </Link>
              <CardBody>
                <CardTitle tag="h2" className="h5 mb-0">
                  <Link to={`/dishes/${dish.id}`}>{dish.name}</Link>
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
