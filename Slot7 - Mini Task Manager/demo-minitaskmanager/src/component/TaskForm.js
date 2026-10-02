import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function TaskForm({ onAddTask }) {
    const [taskName, setTaskName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedTaskName = taskName.trim();
        if (trimmedTaskName === "") {return;}
        onAddTask(trimmedTaskName);
        setTaskName("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mx-auto" style={{maxWidth: "500px"}}> 
            {/* mx auto dùng để căn giữa nếu set sẵn độ rộng (vd như width) */}
                <Form.Control
                    type="text"
                    placeholder="Nhap ten"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                >
                </Form.Control>
                <Button 
                    type="submit"
                    variant="primary"
                >Thêm</Button>
            </InputGroup>
        </Form>
    )
}

export default TaskForm;
