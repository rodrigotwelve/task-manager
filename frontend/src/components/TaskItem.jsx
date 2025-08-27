// src/components/TaskItem.jsx
import React from 'react';

function TaskItem({ task, onComplete, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span>{task.title}</span>
      <div className="task-actions">
        <button onClick={() => onComplete(task.id)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;