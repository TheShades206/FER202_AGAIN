import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// useState
function Ex12() {
  const [count, setCount] = useState(0);

  const [name, setName] = useState("");
  //ToggleVisibility
  const [isShow, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!isShow);
  };

  //TodoList
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleAdd = () => {
    if (todo.trim() === "") {
      return;
    }

    setTodoList([...todoList, todo]);
    setTodo("");
  };

  const handleDelete = (index) => {
    const newTodoList = todoList.filter((item, i) => i !== index);
    setTodoList(newTodoList);
  };

  //Color Switcher
  const [color, setColor] = useState("red");

  const handleChange = (event) => {
    setColor(event.target.value);
  };
  return (
    <>
      <div>
        {/* Hiển thị giá trị của state ra màn hình */}

        {/* Gắn sự kiện onClick vào 2 nút */}
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <h3>Count: {count}</h3>
        <hr></hr>
        {/* Input field */}
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
        <h3>Input text: {name}</h3>
        <hr></hr>
        {/* Toggle Visibility */}
        <button onClick={handleToggle}>{isShow ? "Hide" : "Show"}</button>

        {isShow && <h3>Toggle Me!</h3>}

        <hr></hr>
        {/* TodoList */}
        <Container>
          <Row>
            <Col xs={6}>
              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Please input a task"
              ></input>
              <Button variant="primary" onClick={handleAdd}>
                Add
              </Button>
            </Col>
            <Col xs={6}>
              <div className="border rounded-3 shadow-sm p-3 bg-white text-start">
                <h3 className="mb-3">Todo List</h3>
                <Table bordered hover responsive className="mb-0 align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Task</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center text-muted">
                          No tasks yet
                        </td>
                      </tr>
                    ) : (
                      todoList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item}</td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
        <br></br>
        <hr></hr>
        {/* 5.	Color Switcher */}
        <select value={color} onChange={handleChange}>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
        </select>
        <div
          style={{
            width: "200px",
            height: "200px",
            backgroundColor: color,
            marginTop: "20px",
          }}
        ></div>
      </div>
    </>
  );
}

export default Ex12;
