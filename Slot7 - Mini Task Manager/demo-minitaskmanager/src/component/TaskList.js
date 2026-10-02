import TaskItem from "./TaskItem";

function TaskList({ task, onToggleTask, onDeleteTask }) {
  return (
    <div>
      {task.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
