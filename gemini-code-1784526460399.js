const express = require('express');
const app = express();
const port = 3000;

// ==========================================
// PART (C): MIDDLEWARE IMPLEMENTATION
// ==========================================

// 1. Logger Middleware (Logs Request Method, URL, and Timestamp)
function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
}

// 2. Timing Middleware (Calculates Response Time)
function timer(req, res, next) {
    const start = Date.now();
    res.on('finish', () => {
        console.log(`Request completed in ${Date.now() - start} ms\n`);
    });
    next();
}

// 3. Route-specific Middleware Example (API Key Checker)
function checkApiKey(req, res, next) {
    if (req.headers['x-api-key'] === '12345') {
        next();
    } else {
        res.status(401).send('Unauthorized: Invalid API Key');
    }
}

// Apply Global Middleware (Order matters!)
app.use(logger);
app.use(timer);
app.use(express.json()); // Built-in middleware to parse JSON bodies


// ==========================================
// PART (A): ROUTES, PARAMETERS, URL BUILDING
// ==========================================

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the ExpressJS Experiment API!');
});

// Route parameters
app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

// Query parameters
app.get('/search', (req, res) => {
    const q = req.query.q || 'nothing';
    const limit = req.query.limit || 'no limit';
    res.send(`Searching for '${q}', limit ${limit}`);
});

// URL building / Redirect demonstration
app.get('/old-route', (req, res) => {
    res.redirect('/');
});

app.get('/current-url', (req, res) => {
    res.send(`You accessed: ${req.originalUrl}`);
});

// Demonstrating route-specific middleware
app.get('/protected', checkApiKey, (req, res) => {
    res.send('Welcome, Admin! Your API key is valid.');
});


// ==========================================
// PART (B): IN-MEMORY RESOURCE (CRUD ON BOOKS)
// ==========================================

// In-memory data store
let books = [
    { id: 1, title: "The Hobbit", author: "Tolkien" },
    { id: 2, title: "Dune", author: "Herbert" }
];
let nextId = 3;

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id - Retrieve a specific book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    // Validation
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }

    const newBook = { id: nextId++, title, author };
    books.push(newBook);
    
    // Return 201 Created
    res.status(201).json(newBook);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    // Remove the book from the array
    books.splice(bookIndex, 1);
    
    // Return 204 No Content
    res.status(204).send();
});

// PATCH /books/:id - Partially update a book
app.patch('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const { title, author } = req.body;
    if (!title && !author) {
        return res.status(400).json({ error: 'At least one of title or author is required' });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

// ==========================================
// CONSTRAINTS: 404 HANDLER
// ==========================================
// Must be placed at the very end to catch unhandled routes
app.use((req, res) => {
    res.status(404).send('Route Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


// ==========================================
// START SERVER
// ==========================================
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop.\n`);
});