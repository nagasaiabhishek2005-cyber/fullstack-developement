import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
  useParams,
  useNavigate
} from 'react-router-dom';

// ==========================================
// 1. GLOBAL THEME CONTEXT & PROVIDER
// ==========================================
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={theme === 'light' ? lightStyles.app : darkStyles.app}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

const useTheme = () => useContext(ThemeContext);

// ==========================================
// 2. NAVBAR COMPONENT (Part a: Routing)
// ==========================================
function Navbar() {
  const { theme, toggleTheme } = useTheme();

  // In React Router v6, NavLink uses a function in className or style to apply active styles
  const getLinkStyle = ({ isActive }) => ({
    marginRight: '15px',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#007bff' : theme === 'light' ? '#333' : '#fff',
    borderBottom: isActive ? '2px solid #007bff' : 'none',
    paddingBottom: '4px'
  });

  return (
    <nav style={{ padding: '15px 20px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <NavLink to="/" style={getLinkStyle}>Home</NavLink>
        <NavLink to="/about" style={getLinkStyle}>About</NavLink>
        <NavLink to="/dashboard" style={getLinkStyle}>Dashboard</NavLink>
        <NavLink to="/user/1" style={getLinkStyle}>User Profile (ID: 1)</NavLink>
      </div>
      <button onClick={toggleTheme} style={buttonStyle}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </nav>
  );
}

// ==========================================
// 3. PAGE COMPONENTS (Part b: Screen Updating)
// ==========================================

// HOME PAGE
function Home() {
  return (
    <div style={pagePadding}>
      <h2>Home Page</h2>
      <p>Welcome to the React Router & Screen Updating Demo App!</p>
    </div>
  );
}

// ABOUT PAGE: Screen update using useEffect + setInterval (Real-time Clock)
function About() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={pagePadding}>
      <h2>About Page</h2>
      <p>Demonstration of state update triggering a live screen update via <code>useEffect</code>.</p>
      <div style={cardStyle}>
        <h3>Current Time (Ticking Clock):</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>{time}</p>
      </div>
    </div>
  );
}

// DASHBOARD PAGE: Screen update using useState (Interactive Counter) & Nested Routing
function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <div style={pagePadding}>
      <h2>Dashboard Page</h2>
      <p>Demonstration of instant UI updates using <code>useState</code>.</p>

      <div style={cardStyle}>
        <h3>Counter: {count}</h3>
        <button onClick={() => setCount(count + 1)} style={buttonStyle}>Increment</button>
        <button onClick={() => setCount(count - 1)} style={{ ...buttonStyle, marginLeft: '10px' }}>Decrement</button>
        <button onClick={() => setCount(0)} style={{ ...buttonStyle, marginLeft: '10px', background: '#dc3545', color: '#fff' }}>Reset</button>
      </div>

      <hr style={{ margin: '20px 0' }} />

      <h3>Nested Routes Example</h3>
      <div style={{ marginBottom: '15px' }}>
        <NavLink to="stats" style={{ marginRight: '10px' }}>View Stats</NavLink>
        <NavLink to="settings">View Settings</NavLink>
      </div>

      {/* Renders nested route components */}
      <Outlet />
    </div>
  );
}

function DashboardStats() {
  return <div style={{ ...cardStyle, background: '#e9ecef', color: '#333' }}>📊 <strong>Stats:</strong> System performance is 99.9% optimal.</div>;
}

function DashboardSettings() {
  return <div style={{ ...cardStyle, background: '#e9ecef', color: '#333' }}>⚙️ <strong>Settings:</strong> User preferences configured.</div>;
}

// USER PROFILE PAGE: Dynamic parameters (useParams) & Async Loading State
function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Database
  const mockUsers = {
    '1': { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    '2': { name: 'Jane Smith', email: 'jane@example.com', role: 'Developer' },
    '3': { name: 'Adinarayana', email: 'adi@example.com', role: 'AI Engineer' }
  };

  useEffect(() => {
    setLoading(true);

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const fetchedUser = mockUsers[userId] || {
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        role: 'Standard User'
      };
      setUser(fetchedUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <div style={pagePadding}>
      <h2>User Profile</h2>

      {/* Dynamic Profile Selection */}
      <div style={{ marginBottom: '15px' }}>
        <span>Select Quick Profile: </span>
        <button onClick={() => navigate('/user/1')} style={buttonStyle}>User 1</button>
        <button onClick={() => navigate('/user/2')} style={{ ...buttonStyle, marginLeft: '5px' }}>User 2</button>
        <button onClick={() => navigate('/user/3')} style={{ ...buttonStyle, marginLeft: '5px' }}>User 3</button>
      </div>

      {loading ? (
        <div style={cardStyle}>
          <p style={{ fontStyle: 'italic', color: '#ff9900' }}>⏳ Loading user details for ID: {userId}...</p>
        </div>
      ) : (
        <div style={cardStyle}>
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
}

// 404 NOT FOUND PAGE
function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ ...pagePadding, textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: '#dc3545' }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')} style={buttonStyle}>Go to Home</button>
    </div>
  );
}

// ==========================================
// 4. MAIN APP ROUTER CONFIGURATION
// ==========================================
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Dashboard with Nested Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="stats" element={<DashboardStats />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          {/* Dynamic URL Route */}
          <Route path="/user/:userId" element={<UserProfile />} />

          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// ==========================================
// 5. STYLES & THEME CONFIGURATION
// ==========================================
const lightStyles = {
  app: {
    backgroundColor: '#ffffff',
    color: '#212529',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  }
};

const darkStyles = {
  app: {
    backgroundColor: '#121212',
    color: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  }
};

const pagePadding = {
  padding: '20px'
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginTop: '15px',
  maxWidth: '400px'
};

const buttonStyle = {
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ccc'
};