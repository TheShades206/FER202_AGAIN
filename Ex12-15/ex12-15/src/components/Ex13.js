import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

// 1. Data Fetching
export function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError("");
      setPosts([]);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("Unable to load posts. Please try another user.");
        }
        const data = await response.json();
        if (!controller.signal.aborted) {
          setPosts(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setError("Unable to load posts. Please check your connection.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [userId]);

  return (
    <div
      className="border rounded-3 p-3 text-start"
      style={{ maxHeight: "360px", overflowY: "auto" }}
    >
      {loading ? (
        <p role="status" className="mb-0">Loading posts...</p>
      ) : error ? (
        <p role="alert" className="text-danger mb-0">{error}</p>
      ) : posts.length === 0 ? (
        <p className="text-muted mb-0">No posts found for this user.</p>
      ) : (
        posts.map((post) => (
          <article key={post.id} className="border-bottom mb-3 pb-2">
            <h4 className="h5">{post.title}</h4>
            <p>{post.body}</p>
          </article>
        ))
      )}
    </div>
  );
}

// 2. Countdown Timer
export function CountdownTimer({ initialValue }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timerId = setInterval(() => {
      setTimeRemaining((previousTime) => Math.max(0, previousTime - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining]);

  return <h4>Time Remaining: {timeRemaining}</h4>;
}

// 3. Window Resize Listener
export function WindowSize() {
  const [windowSize, setWindowSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Window size: {windowSize.width} x {windowSize.height}</p>;
}

// 4. Form Input Validation
export function ValidatedInput({ validationFunction, errorMessage }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  return (
    <Form.Group controlId="ex13-username" className="text-start">
      <Form.Label>Username (at least 3 characters)</Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        isInvalid={!isValid}
        aria-describedby={!isValid ? "ex13-input-error" : undefined}
      />
      {!isValid && (
        <Form.Control.Feedback type="invalid" id="ex13-input-error" role="alert">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

const validateUsername = (value) => value.trim().length >= 3;

function Ex13() {
  const [userId, setUserId] = useState("1");
  const [timerVersion, setTimerVersion] = useState(0);

  return (
    <div>
      <h3>1. Data Fetching</h3>
      <Container>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group controlId="ex13-user-id">
              <Form.Label>User ID</Form.Label>
              <Form.Select value={userId} onChange={(event) => setUserId(event.target.value)}>
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>User {index + 1}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={8}>
            <UserPosts userId={userId} />
          </Col>
        </Row>
      </Container>

      <hr />
      <h3>2. Countdown Timer</h3>
      <CountdownTimer key={timerVersion} initialValue={10} />
      <Button onClick={() => setTimerVersion((version) => version + 1)}>Restart Timer</Button>

      <hr />
      <h3>3. Window Resize Listener</h3>
      <WindowSize />

      <hr />
      <h3>4. Form Input Validation</h3>
      <ValidatedInput
        validationFunction={validateUsername}
        errorMessage="Please enter at least 3 characters."
      />
    </div>
  );
}

export default Ex13;
