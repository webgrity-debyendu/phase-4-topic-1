Phase 4 — Advanced Hooks & Optimization
Topic 1 — useRef: DOM Access and Mutable Values Without Re-renders
The Core Problem

useState is for values that should cause a re-render when they change. But sometimes you need to store a value that changes over time without causing a re-render. Or you need to directly access a real DOM element — focus an input, measure its width, control a video player.

useRef solves both of these problems.
The Analogy — The Sticky Note On Your Monitor

Your whiteboard (state) is visible to the whole team. Every time it changes, everyone stops and looks at the update — a meeting is called (re-render).

A sticky note on your personal monitor is different. You write on it, update it, reference it — but nobody else calls a meeting about it. It is private, persistent, and silent.

useRef is the sticky note. It persists across renders. It never triggers a re-render when it changes.
The Syntax

React

import { useRef } from 'react';

const MyComponent = () => {
const myRef = useRef(initialValue);

// myRef is always an object with one property:
// { current: initialValue }

// You read and write via .current
console.log(myRef.current);
myRef.current = 'new value'; // does NOT cause re-render
};

useRef returns a plain object { current: ... }. That object persists for the entire lifetime of the component. Changing .current does not trigger a re-render. Reading .current always gives you the latest value.
Use Case 1 — Accessing DOM Elements Directly

React

const AutoFocusInput = () => {
const inputRef = useRef(null);

useEffect(() => {
// After component mounts, focus the input
inputRef.current.focus();
}, []);

return <input ref={inputRef} placeholder="I am focused automatically" />;
};

When you attach ref={inputRef} to a JSX element, React sets inputRef.current to the actual DOM node after the component mounts. You then have direct access to native DOM methods — .focus(), .blur(), .scrollIntoView(), .getBoundingClientRect().

This is one of the few cases where you legitimately touch the DOM directly in React.
Use Case 2 — Storing Mutable Values Without Re-renders

React

const StopWatch = () => {
const [time, setTime] = useState(0);
const intervalRef = useRef(null); // stores interval ID — not displayed, should not re-render

const handleStart = () => {
// Store the interval ID in ref — we need it to stop later
intervalRef.current = setInterval(() => {
setTime((prev) => prev + 1);
}, 1000);
};

const handleStop = () => {
clearInterval(intervalRef.current); // read from ref to cancel
intervalRef.current = null;
};

return (
<>
<p>Time: {time}s</p>
<button onClick={handleStart}>Start</button>
<button onClick={handleStop}>Stop</button>
</>
);
};

time is state — it displays on screen, must trigger re-renders.
intervalRef is a ref — it is just a tool for cleanup, never displayed, must not trigger re-renders.

If you stored the interval ID in state, calling setIntervalId(id) would cause a re-render every time start is clicked — completely unnecessary.
Use Case 3 — Tracking Previous State Value

React

const Counter = () => {
const [count, setCount] = useState(0);
const prevCountRef = useRef(0);

useEffect(() => {
// After render, store current count as previous
prevCountRef.current = count;
});
// No dependency array — runs after every render
// By the time it runs, prevCountRef.current is the OLD value
// because the ref update happens after the render

return (
<>
<p>Current: {count}</p>
<p>Previous: {prevCountRef.current}</p>
<button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
</>
);
};

useState vs useRef — When To Use Which
Situation Use
Value displayed in UI useState
Value change should update screen useState
Value change should NOT update screen useRef
Storing a timer ID, socket, interval useRef
Accessing a real DOM node useRef
Tracking previous render's value useRef

The key question: "Does the UI need to update when this value changes?"

    Yes → useState
    No → useRef

Your Task — Phase 4, Challenge 1

Build a SmartForm component in App.jsx.

Requirements:

Ref 1 — Auto Focus:
When the component mounts, the first input (name) should be automatically focused. Use useRef and useEffect.

Ref 2 — Render Count:
Track how many times the component has re-rendered using a useRef. Display "Render count: X" on screen. This number should increase every time state changes but the ref update itself must not cause an extra re-render.

Ref 3 — Previous Value:
Track the previous value of the name input field. Display "Previous name: X" below the input. On first render show "Previous name: —".

State:

React

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [submitted, setSubmitted] = useState(false);

Form behavior:

    Controlled inputs for name and email
    On submit — e.preventDefault(), set submitted to true
    If submitted is true — show "Form submitted! Name: X, Email: Y" instead of the form — use early return

Rules:

    useRef for render count — must not use useState for this
    useRef for previous name value
    useRef for input DOM access
    Auto focus fires once on mount only
    e.preventDefault() on form submit

Paste App.jsx when ready.
