// src/services/taskService.js

// Configure the base URL for the backend API [cite: 14]
const BASE_URL = 'http://localhost:3001/api/tasks';

/**
 * Fetches all tasks from the backend.
 * Makes a GET request to /api/tasks. [cite: 15]
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 */
export const getAllTasks = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

/**
 * Creates a new task.
 * Makes a POST request to /api/tasks. [cite: 16]
 * @param {object} taskData - The data for the new task (e.g., { title: 'New Task' }).
 * @returns {Promise<object>} A promise that resolves to the newly created task.
 */
export const createTask = async (taskData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

/**
 * Updates an existing task by its ID.
 * Makes a PUT request to /api/tasks/:id. [cite: 17]
 * @param {number|string} id - The ID of the task to update.
 * @param {object} updateData - The data to update (e.g., { completed: true }).
 * @returns {Promise<object>} A promise that resolves to the updated task.
 */
export const updateTask = async (id, updateData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

/**
 * Deletes a task by its ID.
 * Makes a DELETE request to /api/tasks/:id. [cite: 18]
 * @param {number|string} id - The ID of the task to delete.
 * @returns {Promise<void>} A promise that resolves when the task is deleted.
 */
export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};