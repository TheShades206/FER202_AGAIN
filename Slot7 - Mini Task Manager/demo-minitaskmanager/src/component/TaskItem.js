import { Button, Form } from "react-bootstrap";


function TaskItem({task, onToggleTask, onDeleteTask}) {
    return (
        <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            <Form.Check
                type="checkbox"
                id={`task-${task.id}`}
                label={task.title}
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
            >
            </Form.Check>
            <Button
                variant="outline-danger"
                size="sm"
                type="button"
                aria-label={`Xoa ${task.title}`}
                onClick={() => onDeleteTask(task.id)}
            >
                Xoa
            </Button>
        </div>
    )
}

export default TaskItem;
