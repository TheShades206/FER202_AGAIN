import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {

  return (
    <section className="home-panel rounded border bg-body-tertiary p-4 p-md-5">
      <h1 className="h2 mb-3">Welcome to ProductStore</h1>
      <p className="text-body-secondary mb-4">
        Manage and explore products for your needs
      </p>
      <Button as={Link} to="/products">View Products</Button>
    </section>
  );
}

export default Home;
