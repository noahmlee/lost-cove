---
title: React
draft: 
tags:
  - notes
  - react
  - webdev
---
# React

React is a JavaScript library for building user interfaces. It's component-based, declarative, and focused on keeping your UI and logic in sync.

## Getting Started

React apps are typically bootstrapped using tools like `create-react-app`, `Vite`, or `Next.js`. For smaller projects or quick prototyping, Vite is a popular choice:

```
npm create vite@latest my-app --template react
```

## Components

React components can be functional or class-based. Modern React favors functional components with hooks.

### Basic Functional Component
```
function Welcome({ name }) {
	return <h1>Hello, {name}!</h1>;
}
```

### Component with State

```
import { useState } from 'react';
	
function Counter() {
	const [count, setCount] = useState(0);
	   
	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
```

## Hooks

Hooks allow you to use state and other React features in functional components.

### useState

`const [value, setValue] = useState(initialValue);`

Manages local component state.

### useEffect

```
useEffect(() => {
	// Side effect logic here
	
	return () => {
		// Cleanup logic here
	};
}, []);
```

Handles side effects like data fetching or subscriptions.

### useRef

```
const inputRef = useRef();

<input ref={inputRef} />;
```

Accesses DOM elements or stores mutable values that persist across renders.

### useContext

```
const ThemeContext = createContext();

function App() {
	return (
		<ThemeContext.Provider value="dark">
			<Header />
		</ThemeContext.Provider>
	);
}

function Header() {
	const theme = useContext(ThemeContext);
	return <h1 className={theme}>My App</h1>;
}
```

Passes data through the component tree without prop drilling.

## Custom Hooks

Create reusable logic with custom hooks. They should start with `use`.

```
// useToggle.js
import { useState } from 'react';

export function useToggle(initial = false) {
	const [value, setValue] = useState(initial);
	const toggle = () => setValue((v) => !v);
	return [value, toggle];
}
```

## Component Patterns

- **Presentational vs. Container**: Separate UI from logic.
    
- **Compound Components**: Components that work together and share internal state.
    
- **Hooks-based Abstractions**: Move logic out of components into reusable hooks.
    

## Notes to Self

- Always use keys when rendering lists.
    
- Avoid directly modifying state; use setter functions.
    
- Keep components pure: same input props should yield the same output.
    
- Co-locate related logic and styles unless they're reused elsewhere.
    

React's virtual DOM ensures efficient updates. By keeping components focused and leveraging hooks, you can build maintainable and scalable applications.