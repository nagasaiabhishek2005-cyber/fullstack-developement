import React from 'react';

// Part (a): Pure React element without JSX
const plainElement = React.createElement(
  "p",
  { style: { fontStyle: "italic" } },
  "Rendered without JSX using React.createElement()"
);

// Part (c) 1: Function Component
function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
}

// Part (c) 2: Class Component
class WelcomeMessage extends React.Component {
  render() {
    return (
      <h2 style={{ color: "green" }}>
        React is awesome!
      </h2>
    );
  }
}

// Main Parent Component
export default function App() {
  // Part (b) Variables
  const userName = "React Developer";
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Hello from React!</h1>

      {/* Part (a) Render */}
      {plainElement}

      {/* Part (b) JSX Expressions, Attributes & Inline Styling */}
      <div style={{ margin: "20px 0", padding: "10px", backgroundColor: "#f4f4f4" }}>
        <p>User: {userName}</p>
        <p>Today is {today}</p>
        <p>Math Evaluation: 2 + 2 = {2 + 2}</p>
      </div>

      {/* Part (c) Nesting and Props */}
      <div className="components-container">
        <h3>Greeting from a function component:</h3>
        <Greeting name="Alice" />
        <Greeting name="Bob" />

        <h3>Welcome from a class component:</h3>
        <WelcomeMessage />
      </div>
    </div>
  );
}