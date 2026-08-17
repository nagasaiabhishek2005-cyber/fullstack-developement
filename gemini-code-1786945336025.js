import React, { useState } from 'react';

// ==========================================
// PART (a): CONDITIONAL RENDERING
// ==========================================

// 1. Ternary Operator Approach
function UserGreeting({ isLoggedIn }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      {isLoggedIn ? (
        <h3 style={{ color: 'green' }}>Welcome back, User!</h3>
      ) : (
        <h3 style={{ color: 'red' }}>Please log in to continue.</h3>
      )}
    </div>
  );
}

// 2. Short-circuit (&&) & If-Else Approaches
function LoadingIndicator({ isLoading }) {
  // If-else approach for early exit
  if (isLoading) {
    return <p style={{ fontStyle: 'italic', color: 'orange' }}>⏳ Loading content, please wait...</p>;
  }

  return (
    <div>
      {/* Short-circuit && approach */}
      {!isLoading && <p style={{ color: 'blue' }}>✓ Content loaded successfully!</p>}
    </div>
  );
}

function ConditionalRenderingDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={cardStyle}>
      <h2>Part (a): Conditional Rendering</h2>
      <UserGreeting isLoggedIn={isLoggedIn} />
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        Toggle {isLoggedIn ? 'Logout' : 'Login'}
      </button>

      <hr style={{ margin: '15px 0' }} />

      <LoadingIndicator isLoading={isLoading} />
      <button onClick={() => setIsLoading(!isLoading)}>
        Toggle Loading State
      </button>
    </div>
  );
}

// ==========================================
// PART (b): RENDERING LISTS
// ==========================================

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Hooks', completed: true },
    { id: 2, text: 'Master Conditional Rendering', completed: false },
    { id: 3, text: 'Build a Controlled Form', completed: false }
  ]);
  const [taskInput, setTaskInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTodo = {
      id: Date.now(), // Unique key generation
      text: taskInput,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setTaskInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={cardStyle}>
      <h2>Part (b): Rendering Lists</h2>
      
      <form onSubmit={addTodo} style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={{ padding: '6px', marginRight: '8px', width: '60%' }}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo) => (
          // Unique and stable key prop assigned to top element in list
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px',
              borderBottom: '1px solid #ddd'
            }}
          >
            <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              {todo.text}
            </label>
            <button
              onClick={() => removeTodo(todo.id)}
              style={{ background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p>No tasks left!</p>}
    </div>
  );
}

// ==========================================
// PART (c): REACT FORMS (CONTROLLED COMPONENTS)
// ==========================================

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    interests: [],
    country: '',
    bio: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  // Universal handler for all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let updatedInterests = [...formData.interests];
      if (checked) {
        updatedInterests.push(value);
      } else {
        updatedInterests = updatedInterests.filter((interest) => interest !== value);
      }
      setFormData({ ...formData, interests: updatedInterests });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation: Check if all fields are filled
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.gender ||
      formData.interests.length === 0 ||
      !formData.country ||
      !formData.bio.trim()
    ) {
      setError('All fields are required! Please fill out every field.');
      setSubmittedData(null);
      return;
    }

    setError('');
    setSubmittedData(formData);
  };

  return (
    <div style={cardStyle}>
      <h2>Part (c): Controlled Registration Form</h2>

      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Name */}
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
        </div>

        {/* Email */}
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
        </div>

        {/* Password */}
        <div>
          <label>Password: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle} />
        </div>

        {/* Gender (Radio Buttons) */}
        <div>
          <label>Gender: </label>
          <label>
            <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
          </label>
        </div>

        {/* Interests (Checkboxes) */}
        <div>
          <label>Interests: </label>
          <label>
            <input type="checkbox" name="interests" value="Reading" checked={formData.interests.includes('Reading')} onChange={handleChange} /> Reading
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input type="checkbox" name="interests" value="Music" checked={formData.interests.includes('Music')} onChange={handleChange} /> Music
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input type="checkbox" name="interests" value="Gaming" checked={formData.interests.includes('Gaming')} onChange={handleChange} /> Gaming
          </label>
        </div>

        {/* Country (Select Dropdown) */}
        <div>
          <label>Country: </label>
          <select name="country" value={formData.country} onChange={handleChange} style={inputStyle}>
            <option value="">-- Select Country --</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>

        {/* Bio (Textarea) */}
        <div>
          <label>Bio: </label>
          <br />
          <textarea name="bio" value={formData.bio} onChange={handleChange} style={{ width: '100%', height: '60px' }} />
        </div>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Register</button>
      </form>

      {/* Display Form Submission Output */}
      {submittedData && (
        <div style={{ marginTop: '20px', padding: '12px', background: '#e6ffe6', border: '1px solid #00b300', borderRadius: '4px' }}>
          <h3>Registration Successful!</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Gender:</strong> {submittedData.gender}</p>
          <p><strong>Interests:</strong> {submittedData.interests.join(', ')}</p>
          <p><strong>Country:</strong> {submittedData.country}</p>
          <p><strong>Bio:</strong> {submittedData.bio}</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>React Lab Experiment</h1>
      <ConditionalRenderingDemo />
      <TodoList />
      <RegistrationForm />
    </div>
  );
}

// Reusable Styles
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const inputStyle = {
  padding: '6px',
  marginLeft: '8px'
};