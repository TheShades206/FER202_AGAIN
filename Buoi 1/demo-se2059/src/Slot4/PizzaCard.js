import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PizzaCard({ pizza }) {
  return (
    <>
      <Card >
        <Card.Img
          variant="top"
          src={pizza.image}
          style={{ height: "180px" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{pizza.name}</Card.Title>
          <Card.Text>{pizza.description}</Card.Text>
          <Card.Text>
            <span className="text-muted text-decoration-line-through me-2">
              ${pizza.oldPrice}
            </span>
            <span className="fw-bold">${pizza.price}</span>
          </Card.Text>
          <Button variant="primary">Buy</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default PizzaCard;
