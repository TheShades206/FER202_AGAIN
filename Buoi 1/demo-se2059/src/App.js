
import img1 from "./images/student1.jpg";
import img2 from "./images/student2.jpg";
import img3 from "./images/student3.jpg";
import img4 from "./images/car.jpg";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PizzaNavbar from './Slot4/PizzaNavbar';
import PizzaCarosel from './Slot4/PizzaCarosel';
import PizzaCard from './Slot4/PizzaCard';

function App() {
  const pizza = [
    {
      id: 1,
      name: "Pizza 1",
      price: 15000,
      oldPrice: 7500,
      image: img1,
      desciption: "Sperm pizza",
    },
    {
      id: 2,
      name: "Pizza 2",
      price: 18000,
      oldPrice: 9000,
      image: img2,
      desciption: "Miku pizza",
    },
    {
      id: 3,
      name: "Pizza 3",
      price: 20000,
      oldPrice: 10000,
      image: img3,
      desciption: "SUPER pizza",
    },
    {
      id: 4,
      name: "Pizza 4",
      price: 22000,
      oldPrice: 11000,
      image: img4,
      desciption: "duma pizza",
    },
  ];

  return (
    <>
      <PizzaNavbar></PizzaNavbar>
      <br></br>
      <PizzaCarosel pizza={pizza} />
      <br></br>
      <h3 className="text-center">Our Menu</h3>
      {/* pizza card */}
      <Container className="my-4">
        <Row>
          {pizza.map((item) => (
            <Col key={item.id}  md={3} className="my-4">
              <PizzaCard pizza={item} />
            </Col>
          ))}
        </Row>
      </Container>
      <br></br>
    </>
  );
}

export default App;
