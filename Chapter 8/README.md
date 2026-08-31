# Chapter 08 – Let's Get Classy

## Theory Assignment

## 1. How do you create Nested Routes in `react-router-dom` configuration?

**Nested routes** are routes defined inside another route.

They are useful when a page has multiple child pages that share a common parent layout.

For example, suppose we have:

```text
/about
/about/company
/about/team
```

Here, `/company` and `/team` are child routes of `/about`.

### Example

```jsx
import {
    createBrowserRouter
} from "react-router-dom";

import App from "./App";
import About from "./components/About";
import Company from "./components/Company";
import Team from "./components/Team";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "about",
                element: <About />,
                children: [
                    {
                        path: "company",
                        element: <Company />
                    },
                    {
                        path: "team",
                        element: <Team />
                    }
                ]
            }
        ]
    }
]);
```

The route hierarchy is:

```text
/
└── about
    ├── company
    └── team
```

The parent component must use `<Outlet />` to tell React Router where the child route should be rendered.

### About.jsx

```jsx
import { Outlet } from "react-router-dom";

const About = () => {
    return (
        <div>
            <h1>About Page</h1>

            <Outlet />
        </div>
    );
};

export default About;
```

When the URL is:

```text
/about/company
```

React Router renders:

```text
About
   +
Company
```

because `<Company />` is rendered inside `<Outlet />`.

### Important point

> `children` creates the nested route relationship, while `<Outlet />` defines where the matched child route will appear.

---

# 2. What are `createHashRouter` and `createMemoryRouter`?

React Router provides different router types for different use cases.

## `createHashRouter`

`createHashRouter` uses the URL **hash (`#`)** to represent the application's routes.

Example:

```jsx
import {
    createHashRouter
} from "react-router-dom";

const appRouter = createHashRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/about",
        element: <About />
    }
]);
```

The URLs will look like:

```text
https://example.com/#/
https://example.com/#/about
```

The part after `#` is handled by the client-side router.

### Why is it useful?

Hash routing can be useful when the server cannot be configured to serve the SPA's entry point for arbitrary routes.

For example:

```text
example.com/#/about
```

The server receives the URL without the hash portion, while the browser/router uses the portion after `#` for client-side navigation.

---

## `createMemoryRouter`

`createMemoryRouter` stores the routing history **in memory instead of using the browser's URL**.

Example:

```jsx
import {
    createMemoryRouter
} from "react-router-dom";

const router = createMemoryRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/about",
        element: <About />
    }
]);
```

This is particularly useful for environments where there is no normal browser URL, such as:

* Testing
* Certain non-browser environments
* Applications where routing should be controlled entirely in memory

The current route is maintained internally by the router rather than reflected in the browser's address bar in the normal way.

### Difference

| `createBrowserRouter`      | `createHashRouter`                          | `createMemoryRouter`                        |
| -------------------------- | ------------------------------------------- | ------------------------------------------- |
| Uses normal browser URLs   | Uses `#` in the URL                         | Stores history in memory                    |
| `/about`                   | `/#/about`                                  | No normal URL requirement                   |
| Common choice for web apps | Useful when server configuration is limited | Useful for testing/non-browser environments |

---

# 3. What is the order of lifecycle method calls in Class Based Components?

Class-based components have lifecycle methods that execute at different stages of a component's life.

The three major phases are:

```text
Mounting
Updating
Unmounting
```

## Mounting Phase

When a component is created and inserted into the DOM:

```text
constructor()
      ↓
render()
      ↓
componentDidMount()
```

### Order:

1. `constructor()`
2. `render()`
3. `componentDidMount()`

---

## Updating Phase

When props or state change:

```text
render()
      ↓
componentDidUpdate()
```

Depending on the situation, methods such as `shouldComponentUpdate` and `getSnapshotBeforeUpdate` can also participate in the update lifecycle.

For the commonly used lifecycle methods:

```text
render()
      ↓
componentDidUpdate()
```

---

## Unmounting Phase

When the component is removed from the DOM:

```text
componentWillUnmount()
```

### Overall simplified lifecycle

```text
                 MOUNTING
                    ↓
              constructor()
                    ↓
                 render()
                    ↓
          componentDidMount()
                    ↓
                 UPDATING
                    ↓
                 render()
                    ↓
        componentDidUpdate()
                    ↓
                UNMOUNTING
                    ↓
        componentWillUnmount()
```

---

# 4. Why do we use `componentDidMount()`?

`componentDidMount()` is called **after the component has been mounted into the DOM**.

It is commonly used for operations that should happen after the component has been rendered for the first time.

Common uses include:

* API calls
* Setting up subscriptions
* Starting timers
* Adding event listeners
* Performing DOM-related operations

### Example

```jsx
class User extends React.Component {

    componentDidMount() {
        console.log("Component mounted");

        this.fetchUsers();
    }

    fetchUsers = async () => {
        const response = await fetch("https://example.com/users");
        const data = await response.json();

        console.log(data);
    };

    render() {
        return <h1>User Component</h1>;
    }
}
```

The sequence is:

```text
constructor()
     ↓
render()
     ↓
componentDidMount()
     ↓
API call
```

### Important point

`componentDidMount()` runs after the initial render has been committed to the DOM.

---

# 5. Why do we use `componentWillUnmount()`?

`componentWillUnmount()` is called **just before a component is removed from the DOM**.

It is mainly used for **cleanup**.

Common cleanup operations include:

* Clearing timers
* Clearing intervals
* Removing event listeners
* Unsubscribing from subscriptions
* Cancelling/cleaning up ongoing resources where appropriate

### Example

```jsx
class Timer extends React.Component {

    componentDidMount() {
        this.timer = setInterval(() => {
            console.log("Timer running");
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);

        console.log("Timer cleared");
    }

    render() {
        return <h1>Timer Component</h1>;
    }
}
```

When the component is mounted:

```text
componentDidMount()
       ↓
setInterval()
       ↓
Timer keeps running
```

When the component is removed:

```text
componentWillUnmount()
       ↓
clearInterval()
       ↓
Timer stops
```

### Why is cleanup important?

If we don't clean up resources such as intervals or event listeners, they may continue running even after the component is no longer displayed.

This can lead to unnecessary work and memory/resource leaks.

---

# 6. Why do we use `super(props)` in a constructor?

In a JavaScript class, when a class extends another class, the child class must call `super()` before using `this`.

React class components extend `React.Component`.

Example:

```jsx
class User extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return <h1>Hello</h1>;
    }
}
```

### What does `super()` do?

`super()` calls the constructor of the parent class.

Here:

```jsx
class User extends React.Component
```

`React.Component` is the parent class.

So:

```jsx
super();
```

initializes the parent class portion of the component.

### Why `super(props)` instead of just `super()`?

Passing `props` to `super()` allows the parent `React.Component` constructor to initialize `this.props`.

Therefore, inside the constructor, we can safely access:

```jsx
this.props
```

Example:

```jsx
constructor(props) {
    super(props);

    console.log(this.props);
}
```

Without passing `props`:

```jsx
constructor(props) {
    super();

    console.log(this.props);
}
```

`this.props` is not initialized from the constructor argument by `super()`.

### Simple explanation

> `super()` is required before using `this` in a derived class constructor.

> `super(props)` additionally passes the component's props to `React.Component`, making `this.props` available in the constructor.

---

# 7. Why can't we have the callback function of `useEffect` be async?

We should not directly make the function passed to `useEffect` an `async` function.

For example, we should avoid:

```jsx
useEffect(async () => {
    const data = await fetch(API_URL);
}, []);
```

### Why?

An `async` function always returns a **Promise**.

But React expects the function passed to `useEffect` to either:

* Return nothing/`undefined`, or
* Return a cleanup function.

It does not expect the effect callback itself to return a Promise.

### Correct approach

Define an async function inside the effect:

```jsx
useEffect(() => {

    const fetchData = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log(data);
    };

    fetchData();

}, []);
```

Here:

```text
useEffect callback
       ↓
normal synchronous function
       ↓
fetchData()
       ↓
async function
       ↓
await API response
```

This allows the effect callback itself to follow React's expected cleanup contract.

---

# Coding Assignment

# 8. Create a Class Based Component

A class-based component is a React component created using a JavaScript class that extends `React.Component`.

### Parent Component

```jsx
import React from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

class Parent extends React.Component {

    render() {
        return (
            <div>
                <h1>Parent Component</h1>

                <Child1 name="Thanuja" />

                <Child2 age={25} />
            </div>
        );
    }
}

export default Parent;
```

Here, the parent passes props to its child components.

---

# 9. Create Two Class Based Child Components

## Child1.jsx

```jsx
import React from "react";

class Child1 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };

        console.log("Child1 constructor");
    }

    render() {
        console.log("Child1 render");

        return (
            <div>
                <h2>Child 1</h2>

                <p>Name: {this.props.name}</p>

                <p>Count: {this.state.count}</p>

                <button
                    onClick={() =>
                        this.setState({
                            count: this.state.count + 1
                        })
                    }
                >
                    Increment
                </button>
            </div>
        );
    }
}

export default Child1;
```

Here:

```jsx
<Child1 name="Thanuja" />
```

passes a prop to the child.

The child accesses it using:

```jsx
this.props.name
```

---

# 10. Create a State Variable Inside the Child

In a class component, state is created using:

```jsx
this.state
```

Example:

```jsx
constructor(props) {
    super(props);

    this.state = {
        count: 0
    };
}
```

The initial state is:

```text
count = 0
```

---

# 11. Use `this.setState()` to Update State

We should use `this.setState()` to update state in class components.

```jsx
this.setState({
    count: this.state.count + 1
});
```

For state updates that depend on the previous state, the functional form is safer:

```jsx
this.setState((prevState) => ({
    count: prevState.count + 1
}));
```

Example:

```jsx
<button
    onClick={() =>
        this.setState((prevState) => ({
            count: prevState.count + 1
        }))
    }
>
    Increment
</button>
```

React then re-renders the component with the updated state.

---

# 12. What if there are Multiple State Variables?

In class components, state is generally stored as a **single state object**.

For example:

```jsx
this.state = {
    count: 0,
    name: "Thanuja",
    isLoggedIn: false
};
```

We can update one property using:

```jsx
this.setState({
    count: 10
});
```

React merges the partial state update with the existing state.

So the other properties remain unchanged.

For example:

```jsx
this.setState({
    name: "React"
});
```

The state becomes:

```js
{
    count: 0,
    name: "React",
    isLoggedIn: false
}
```

### Important difference from Hooks

In a function component, we might have:

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState("Thanuja");
```

These are separate state variables.

In a class component, state is usually represented as one object:

```jsx
this.state = {
    count: 0,
    name: "Thanuja"
};
```

---

# 13. Write `console.log()` for Each Lifecycle Method

We can use console logs to understand the lifecycle order.

```jsx
import React from "react";

class Child extends React.Component {

    constructor(props) {
        super(props);

        console.log("1. constructor");

        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        console.log("3. componentDidMount");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    render() {
        console.log("2. render");

        return (
            <div>
                <h1>{this.state.count}</h1>

                <button
                    onClick={() =>
                        this.setState((prevState) => ({
                            count: prevState.count + 1
                        }))
                    }
                >
                    Increment
                </button>
            </div>
        );
    }
}

export default Child;
```

### Initial render console:

```text
1. constructor
2. render
3. componentDidMount
```

### After clicking Increment:

```text
render
componentDidUpdate
```

### When component is removed:

```text
componentWillUnmount
```

---

# 14. Create an Interval Inside `componentDidMount()`

We can create an interval when the component is mounted.

```jsx
componentDidMount() {

    this.timer = setInterval(() => {
        console.log("Interval running");
    }, 1000);

}
```

This runs the callback every second.

However, if we don't clear the interval when the component is removed, the interval can continue running.

Therefore, we need cleanup.

---

# 15. Use `clearInterval()` to Fix the Issue

We can clear the interval inside `componentWillUnmount()`.

```jsx
componentDidMount() {

    this.timer = setInterval(() => {
        console.log("Interval running");
    }, 1000);

}

componentWillUnmount() {

    clearInterval(this.timer);

}
```

### Complete example

```jsx
import React from "react";

class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };

        console.log("constructor");
    }

    componentDidMount() {

        console.log("componentDidMount");

        this.timer = setInterval(() => {

            this.setState((prevState) => ({
                count: prevState.count + 1
            }));

        }, 1000);
    }

    componentDidUpdate() {

        console.log("componentDidUpdate");

    }

    componentWillUnmount() {

        console.log("componentWillUnmount");

        clearInterval(this.timer);
    }

    render() {

        console.log("render");

        return (
            <div>
                <h1>
                    Timer: {this.state.count}
                </h1>
            </div>
        );
    }
}

export default Timer;
```

The lifecycle will behave like:

```text
Component created
      ↓
constructor()
      ↓
render()
      ↓
componentDidMount()
      ↓
setInterval()
      ↓
state changes every second
      ↓
render()
      ↓
componentDidUpdate()
      ↓
render()
      ↓
componentDidUpdate()
      ↓
...
      ↓
Component removed
      ↓
componentWillUnmount()
      ↓
clearInterval()
```

### Why `clearInterval()` is important

Without:

```jsx
clearInterval(this.timer);
```

the timer may continue running after the component has been removed, causing unnecessary work and potentially attempting state updates on a component that is no longer mounted.

---

# Quick Revision

| Topic                    | One-line explanation                                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Nested Routes            | Routes can be placed inside `children` of another route.                                                                    |
| `<Outlet />`             | Defines where a matched child route is rendered.                                                                            |
| `createHashRouter`       | Uses the URL hash (`#`) for client-side routing.                                                                            |
| `createMemoryRouter`     | Keeps routing history in memory rather than relying on the browser URL.                                                     |
| `constructor()`          | Initializes the class component before the first render.                                                                    |
| `render()`               | Returns the UI that React should render.                                                                                    |
| `componentDidMount()`    | Runs after the component is mounted; useful for API calls, timers, subscriptions, etc.                                      |
| `componentDidUpdate()`   | Runs after an update has been committed.                                                                                    |
| `componentWillUnmount()` | Runs before the component is removed; used for cleanup.                                                                     |
| `super(props)`           | Calls the parent constructor and passes props so `this.props` is initialized.                                               |
| `this.state`             | Stores state in a class component.                                                                                          |
| `this.setState()`        | Updates state and schedules a re-render.                                                                                    |
| `setInterval()`          | Repeatedly executes a function at a specified interval.                                                                     |
| `clearInterval()`        | Stops an interval and is used for cleanup.                                                                                  |
| Async `useEffect`        | The effect callback itself shouldn't be `async` because React expects a cleanup function or no return value, not a Promise. |

# Important Lifecycle Order to Remember

### Initial Mount

```text
constructor
     ↓
render
     ↓
componentDidMount
```

### State/Props Update

```text
render
     ↓
componentDidUpdate
```

### Component Removal

```text
componentWillUnmount
```

### The easiest way to remember:

> **Mount → constructor → render → componentDidMount**

> **Update → render → componentDidUpdate**

> **Unmount → componentWillUnmount**
