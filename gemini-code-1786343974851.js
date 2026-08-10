const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('myDirectCookieSecret'));

// Configure express-session
app.use(
    session({
        secret: 'superSecretKey123', // Strong secret key used to sign session ID cookie
        resave: false,              // Don't save session if unmodified
        saveUninitialized: false,   // Don't create session until something is stored
        cookie: {
            httpOnly: true,         // Prevents client-side JS from reading cookie
            maxAge: 600000          // Cookie expiry time: 10 minutes (in ms)
        }
    })
);

// Demo User Database (Hardcoded)
const DEMO_USER = {
    username: 'admin',
    password: 'password123'
};

// Custom Middleware: Check Authentication
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// ==========================================
// PART (a) ROUTE HANDLERS: SESSION & COOKIES
// ==========================================

// Home Route
app.get('/', (req, res) => {
    res.render('home');
});

// Set Session Data Manually
app.get('/set-session', (req, res) => {
    req.session.user = 'guest_user';
    req.session.visitCount = 1;
    res.send('Session variables set successfully! <a href="/dashboard">Go to Dashboard</a>');
});

// Directly Set a Cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('customCookie', 'ExpressCookieValue', {
        maxAge: 300000, // 5 minutes
        httpOnly: true
    });
    res.send('Direct cookie has been set. <a href="/read-cookie">Read Cookie</a>');
});

// Directly Read a Cookie
app.get('/read-cookie', (req, res) => {
    const customCookie = req.cookies.customCookie || 'No cookie set';
    res.send(`Value of direct cookie: <b>${customCookie}</b> | <a href="/">Home</a>`);
});

// Destroy Session Route
app.get('/destroy-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error clearing session');
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.send('Session destroyed successfully! <a href="/">Back to Home</a>');
    });
});

// ==========================================
// PART (b) ROUTE HANDLERS: USER AUTHENTICATION
// ==========================================

// GET Login Page
app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});

// POST Login Handler
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Authenticate credentials
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
        req.session.user = username;
        req.session.visitCount = 0;
        return res.redirect('/dashboard');
    }

    res.render('login', { error: 'Invalid username or password.' });
});

// Protected Route: Dashboard
app.get('/dashboard', isAuthenticated, (req, res) => {
    // Increment visit counter on each dashboard render
    req.session.visitCount = (req.session.visitCount || 0) + 1;

    res.render('dashboard', {
        user: req.session.user,
        sessionId: req.sessionID,
        visitCount: req.session.visitCount
    });
});

// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});