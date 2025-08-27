// src/App.jsx
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import * as taskService from './services/taskService'; // Import the live API service functions [cite: 20]

function App() {
  // Initialize state with an empty array, not mock data
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks and update state
  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // useEffect to fetch tasks when the component mounts 
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handler to add a new task [cite: 22]
  const handleAddTask = async (title) => {
    try {
      await taskService.createTask({ title, completed: false });
      fetchTasks(); // Re-fetch tasks to update the UI [cite: 23]
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handler to toggle a task's completion status [cite: 22]
  const handleCompleteTask = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      if (taskToUpdate) {
        await taskService.updateTask(id, { completed: !taskToUpdate.completed });
        fetchTasks(); // Re-fetch tasks to update the UI [cite: 23]
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handler to delete a task [cite: 22]
  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks(); // Re-fetch tasks to update the UI [cite: 23]
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <AddTaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;