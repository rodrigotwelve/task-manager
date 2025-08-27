// File: backend/server.js

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Initialize the Express application
const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Setup ---
// Connect to the SQLite database file; it will be created if it doesn't exist.
const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tasks.db SQLite database.');
});

// Create the tasks table if it doesn't already exist[cite: 23].
// The schema is based on the requirements from Task 2.1[cite: 16].
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  is_completed INTEGER NOT NULL DEFAULT 0
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Tasks table is ready.');
});


// --- API Endpoints (Refactored for Database Integration) ---

// GET /api/tasks: Retrieve all tasks from the database[cite: 26].
app.get('/api/tasks', (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    res.json(rows);
  });
});

// POST /api/tasks: Insert a new task into the database[cite: 27].
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ "error": "Missing title" });
  }

  const sql = 'INSERT INTO tasks (title) VALUES (?)';
  // Using function() to access `this.lastID`
  db.run(sql, [title], function(err) {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    // Return the newly created task
    res.status(201).json({
      id: this.lastID,
      title: title,
      is_completed: 0
    });
  });
});

// PUT /api/tasks/:id: Update a task's completion status[cite: 28].
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body;

  // Validate that is_completed is either 0 or 1
  if (is_completed === undefined || (is_completed !== 0 && is_completed !== 1)) {
    return res.status(400).json({ "error": "is_completed must be 0 or 1" });
  }

  const sql = 'UPDATE tasks SET is_completed = ? WHERE id = ?';
  db.run(sql, [is_completed, id], function(err) {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ "error": `Task with id ${id} not found` });
    }
    res.json({ message: `Task ${id} updated successfully.` });
  });
});

// DELETE /api/tasks/:id: Delete a task from the database[cite: 29].
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.run(sql, id, function(err) {
    if (err) {
      res.status(500).json({ "error": err.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ "error": `Task with id ${id} not found` });
    }
    res.json({ message: `Task ${id} deleted successfully.` });
  });
});


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});