import React, { useState, useEffect, createContext, useContext } from 'react';

// ==========================================
// PART (a): IMPORTANCE OF HOOKS
// ==========================================

// 1. Counter Component using useState
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={cardStyle}>
      <h3>1. useState Demonstration (Counter)</h3>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} style={btnStyle}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ ...btnStyle, marginLeft: '8px' }}>Decrement</button>
      <button onClick={() => setCount(0)} style={{ ...btnStyle, marginLeft: '8px', background: '#dc3545', color: 'white' }}>Reset</button>
    </div>
  );
}

// 2. Custom Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

// 3. Posts Component using Custom Hook
function Posts() {
  const { data: posts, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=3'
  );

  return (
    <div style={cardStyle}>
      <h3>2. Custom Hook Demonstration (useFetch)</h3>
      {loading && <p style={{ color: 'orange' }}>⏳ Fetching posts...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {posts && (
        <ul style={{ paddingLeft: '20px' }}>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: '8px' }}>
              <strong>{post.title}</strong>
              <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#555' }}>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ==========================================
// PART (b): SHARING DATA BETWEEN COMPONENTS
// ==========================================

// 1. Props Drilling Demonstration (App -> Parent -> Child)
function ChildComponent({ user }) {
  return (
    <div style={{ padding: '8px', background: '#e9ecef', borderRadius: '4px', color: '#333' }}>
      <h4>Child Component (Deepest Level)</h4>
      <p>Received User Name via Props: <strong>{user.name}</strong></p>
      <p>Role: <strong>{user.role}</strong></p>
    </div>
  );
}

function ParentComponent({ user }) {
  return (
    <div style={{ padding: '12px', border: '1px dashed #6c757d', marginBottom: '10px' }}>
      <h4>Parent Component (Middleman)</h4>
      <p>Passing props down to Child Component...</p>
      <ChildComponent user={user} />
    </div>
  );
}

function PropDrillingDemo() {
  const user = { name: 'John Doe', role: 'Software Engineer' };

  return (
    <div style={cardStyle}>
      <h3>1. Props Drilling</h3>
      <ParentComponent user={user} />
    </div>
  );
}

// 2. Lifting State Up Demonstration (Sibling Communication)
function CounterControl({ count, setCount }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <h4>Sibling A (Control Component)</h4>
      <button onClick={() => setCount(count + 1)} style={btnStyle}>Increment Shared Count</button>
      <button onClick={() => setCount(count - 1)} style={{ ...btnStyle, marginLeft: '8px' }}>Decrement Shared Count</button>
    </div>
  );
}

function CounterDisplay({ count }) {
  return (
    <div style={{ padding: '8px', background: '#e3f2fd', borderRadius: '4px', color: '#0d47a1' }}>
      <h4>Sibling B (Display Component)</h4>
      <p style={{ fontSize: '1.1rem', margin: 0 }}>Shared Counter Value: <strong>{count}</strong></p>
    </div>
  );
}

function LiftingStateDemo() {
  // State lifted up to the common parent component
  const [sharedCount, setSharedCount] = useState(0);

  return (
    <div style={cardStyle}>
      <h3>2. Lifting State Up</h3>
      <CounterControl count={sharedCount} setCount={setSharedCount} />
      <CounterDisplay count={sharedCount} />
    </div>
  );
}

// 3. Context API Demonstration (Global Theme Management)
const ThemeContext = createContext();

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={cardStyle}>
      <h3>3. Context API (Global Theme State)</h3>
      <p>Current Theme: <strong>{theme.toUpperCase()}</strong></p>
      <button onClick={toggleTheme} style={btnStyle}>
        {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
      </button>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT & APP PROVIDER
// ==========================================
export default function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const isLight = theme === 'light';

  const containerStyle = {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    backgroundColor: isLight ? '#f8f9fa' : '#1e1e1e',
    color: isLight ? '#212529' : '#f8f9fa',
    transition: 'all 0.3s ease'
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center' }}>React Hooks & Data Sharing Demo</h1>

        <h2>Section A: Importance of Hooks</h2>
        <Counter />
        <Posts />

        <h2>Section B: Sharing Data Between Components</h2>
        <PropDrillingDemo />
        <LiftingStateDemo />
        <ThemeToggle />
      </div>
    </ThemeContext.Provider>
  );
}

// Reusable Button and Card Styling
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const btnStyle = {
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  border: '1px solid #ccc',
  background: '#007bff',
  color: 'white',
  fontWeight: 'bold'
};