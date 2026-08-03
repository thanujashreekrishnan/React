# Chapter 03 - Assignment - Laying the Foundation

## 1. Is JSX mandatory for React?

**Answer:**
No, JSX is **not mandatory** for React.

JSX (JavaScript XML) is a syntax extension that makes it easier to write React components by allowing HTML-like syntax inside JavaScript. However, React can also be written using `React.createElement()` without JSX.

### Example using JSX

```jsx
function App() {
  return <h1>Hello World</h1>;
}
```

### Example without JSX

```javascript
function App() {
  return React.createElement("h1", null, "Hello World");
}
```

JSX is preferred because it is more readable, easier to write, and improves developer productivity.

---

# 2. Is ES6 mandatory for React?

**Answer:**
No, ES6 (ECMAScript 2015) is **not mandatory** for React, but it is highly recommended.

React works with older versions of JavaScript, but modern React development uses ES6 features because they make the code cleaner and easier to maintain.

Some commonly used ES6 features in React are:

* Arrow Functions
* let and const
* Classes
* Template Literals
* Destructuring
* Spread Operator (...)
* Rest Parameters
* Modules (import/export)

Example:

```javascript
const name = "John";

const Welcome = () => {
  return <h1>Hello {name}</h1>;
};
```

---

# 3. Difference between `{TitleComponent}`, `{<TitleComponent />}`, and `{<TitleComponent></TitleComponent>}`

These three expressions are different.

### 1. `{TitleComponent}`

This refers to the component **function itself**, not the rendered component.

Example:

```jsx
const TitleComponent = () => <h1>Hello</h1>;

<div>{TitleComponent}</div>
```

Output:

```
The function reference is returned instead of rendering the component.
```

Generally, this is not used unless you intentionally want to pass the component as a value.

---

### 2. `{<TitleComponent />}`

This creates and renders the React component.

Example:

```jsx
const TitleComponent = () => <h1>Hello</h1>;

<div>{<TitleComponent />}</div>
```

Output:

```
Hello
```

This is the most commonly used syntax.

---

### 3. `{<TitleComponent></TitleComponent>}`

This is exactly the same as the self-closing syntax.

```jsx
<TitleComponent />
```

and

```jsx
<TitleComponent></TitleComponent>
```

Both produce identical output.

Use the self-closing syntax when the component has no children.

---

# 4. How can I write comments in JSX?

Comments in JSX must be written inside curly braces using JavaScript comments.

### Single-line comment

```jsx
return (
  <div>
    {/* This is a comment */}
    <h1>Hello</h1>
  </div>
);
```

### Multi-line comment

```jsx
return (
  <div>
    {/*
      This is
      a multi-line
      comment
    */}
    <h1>Hello</h1>
  </div>
);
```

Writing comments like HTML comments (`<!-- -->`) is not valid inside JSX.

---

# 5. What is `<React.Fragment></React.Fragment>` and `<></>`?

A Fragment is a special React component that lets you group multiple elements without adding an extra DOM node.

Without Fragment:

```jsx
return (
  <div>
    <h1>Hello</h1>
    <p>Welcome</p>
  </div>
);
```

This creates an unnecessary `<div>`.

Using Fragment:

```jsx
return (
  <React.Fragment>
    <h1>Hello</h1>
    <p>Welcome</p>
  </React.Fragment>
);
```

or the shorter syntax

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>Welcome</p>
  </>
);
```

### Difference

```jsx
<React.Fragment key={id}>
```

can accept a `key` prop.

```jsx
<>
```

cannot accept any props.

---

# 6. What is Virtual DOM?

The Virtual DOM is a lightweight JavaScript representation of the Real DOM.

Instead of updating the browser DOM directly, React:

1. Creates a Virtual DOM.
2. Compares it with the previous Virtual DOM.
3. Finds the differences.
4. Updates only the changed parts of the Real DOM.

Benefits:

* Faster rendering
* Better performance
* Fewer DOM manipulations
* Efficient UI updates

---

# 7. What is Reconciliation in React?

Reconciliation is the process React uses to compare the old Virtual DOM with the new Virtual DOM and determine what has changed.

React performs a **diffing algorithm** to identify only the changed elements and updates only those parts of the Real DOM.

Steps:

1. State or props change.
2. New Virtual DOM is created.
3. React compares it with the previous Virtual DOM.
4. Only changed nodes are updated.

This makes React applications fast and efficient.

---

# 8. What is React Fiber?

React Fiber is the new reconciliation engine introduced in React 16.

It improves rendering performance by allowing React to:

* Pause rendering
* Resume rendering
* Prioritize important updates
* Split rendering into smaller units of work

Benefits:

* Better responsiveness
* Smooth animations
* Improved performance
* Concurrent rendering support

Fiber makes React applications more efficient, especially for large applications.

---

# 9. Why do we need keys in React? When do we need keys?

Keys help React uniquely identify elements in a list.

Without keys, React cannot efficiently determine which items have changed.

Example:

```jsx
const fruits = ["Apple", "Banana", "Orange"];

return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit}>{fruit}</li>
    ))}
  </ul>
);
```

Benefits:

* Faster rendering
* Better reconciliation
* Preserves component state
* Prevents unnecessary re-rendering

Keys are required whenever rendering lists using `.map()`.

---

# 10. Can we use index as keys in React?

Yes, but only in specific situations.

Example:

```jsx
items.map((item, index) => (
  <li key={index}>{item}</li>
));
```

Using the index as a key is acceptable only when:

* The list never changes.
* Items are never reordered.
* Items are never inserted or deleted.

Avoid using index as a key for dynamic lists because it can cause:

* Incorrect component updates
* State mismatches
* Performance issues

Instead, use a unique ID whenever possible.

Example:

```jsx
<li key={user.id}>{user.name}</li>
```

---

# 11. What are Props in React? Ways to use Props

Props (Properties) are read-only values passed from a parent component to a child component.

They allow components to be reusable and dynamic.

Example:

```jsx
function User(props) {
  return <h1>{props.name}</h1>;
}

<User name="John" />
```

### Using Destructuring

```jsx
function User({ name }) {
  return <h1>{name}</h1>;
}
```

### Passing Multiple Props

```jsx
<User
  name="John"
  age={25}
  city="Hyderabad"
/>
```

Props are:

* Read-only
* Passed from parent to child
* Used for communication between components
* Immutable inside the child component

---

# 12. What is a Config Driven UI?

A Config Driven UI is a user interface whose structure, content, and behavior are controlled by configuration data instead of hardcoded UI.

The configuration usually comes from a backend API or CMS.

Example configuration:

```javascript
const config = [
  {
    type: "button",
    text: "Login"
  },
  {
    type: "text",
    value: "Welcome"
  }
];
```

React renders the UI based on this configuration.

Benefits:

* Easy to update without changing code
* Backend can control the UI
* Supports different layouts for different users
* Reusable and scalable
* Frequently used in e-commerce, CMS-driven websites, and large enterprise applications

Example:
Food delivery apps like Swiggy and Zomato display restaurant cards, offers, banners, and menus based on API responses rather than hardcoded components. React reads the configuration and dynamically renders the appropriate UI.
