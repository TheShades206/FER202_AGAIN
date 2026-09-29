import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Ex12 from "./components/Ex12.js";
import Ex13 from "./components/Ex13.js";
import Ex14 from "./components/Ex14.js";
import Ex15 from "./components/Ex15.js";

function App() {
  return (
    <Container as="main" className="App py-4">
      <h1 className="mb-4">React Hooks Exercises</h1>
      <nav className="d-flex justify-content-center flex-wrap gap-2 mb-4" aria-label="Exercises">
        <a className="btn btn-outline-primary" href="#ex12">Ex12 - useState</a>
        <a className="btn btn-outline-primary" href="#ex13">Ex13 - useEffect</a>
        <a className="btn btn-outline-primary" href="#ex14">Ex14 - useContext</a>
        <a className="btn btn-outline-primary" href="#ex15">Ex15 - useReducer</a>
      </nav>

      <section id="ex12" aria-labelledby="ex12-heading" className="border rounded-3 shadow-sm p-3 p-md-4 mb-4">
        <h2 id="ex12-heading" className="mb-4">Ex12 - useState</h2>
        <Ex12 />
      </section>
      <section id="ex13" aria-labelledby="ex13-heading" className="border rounded-3 shadow-sm p-3 p-md-4 mb-4">
        <h2 id="ex13-heading" className="mb-4">Ex13 - useEffect</h2>
        <Ex13 />
      </section>
      <section id="ex14" aria-labelledby="ex14-heading" className="border rounded-3 shadow-sm p-3 p-md-4 mb-4">
        <h2 id="ex14-heading" className="mb-4">Ex14 - useContext</h2>
        <Ex14 />
      </section>
      <section id="ex15" aria-labelledby="ex15-heading" className="border rounded-3 shadow-sm p-3 p-md-4 mb-4">
        <h2 id="ex15-heading" className="mb-4">Ex15 - useReducer</h2>
        <Ex15 />
      </section>
    </Container>
  );
}

export default App;
