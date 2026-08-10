const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Mock user dataset
const users = [
  { name: 'John Doe', email: 'john@example.com', age: 25 },
  { name: 'Jane Smith', email: 'jane@example.com', age: 30 }
];

// Route: Render Users List
app.get('/users', (req, res) => {
  res.render('users', {
    users: users,
    title: 'User List'
  });
});

// Route: Render Registration Form
app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Route: Handle Registration Form Submission
app.post('/register', (req, res) => {
  const { name, email, age } = req.body;

  // Simple validation check for empty fields
  if (!name || !email || !age) {
    return res.render('register', {
      error: 'All fields are required. Please fill in all inputs.'
    });
  }

  // Render success page with the submitted user data
  res.render('success', {
    user: { name, email, age }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});