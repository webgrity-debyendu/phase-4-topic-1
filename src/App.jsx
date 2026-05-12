import { useState, useRef, useEffect } from 'react';
import './App.css';
const SmartForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const renderCount = useRef(0);
  const inputNameRef = useRef(null);
  const previousNameRef = useRef('—');
  useEffect(() => {
    inputNameRef.current.focus();
  }, []);
  useEffect(() => {
    renderCount.current += 1;
  });
  useEffect(() => {
    previousNameRef.current = name;
  }, [name]);

  const handleInput = (e) => {
    e.target.name === 'name'
      ? setName(e.target.value)
      : setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <span style={{ fontWeight: 'bold' }}>
        {' '}
        Form submitted! Name: {name}, Email: {email}
      </span>
    );
  }
  return (
    <>
      <span>Render count: {renderCount.current}</span>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          textAlign: 'start',
          fontSize: '16px',
          lineHeight: '5px',
          padding: '10px',
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          onChange={(elem) => handleInput(elem)}
          placeholder="Enter your name"
          name="name"
          id="name"
          value={name}
          ref={inputNameRef}
        />
        <p>Previous name: {previousNameRef.current}</p>

        <label htmlFor="email">Email</label>
        <input
          onChange={(elem) => handleInput(elem)}
          placeholder="Enter your email"
          name="email"
          id="email"
          value={email}
        />
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
const App = () => <SmartForm />;

export default App;
