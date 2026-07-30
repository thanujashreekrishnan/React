# Chapter 01 - Inception

## 1. What is Emmet?

**Emmet** is a plugin/tool built into modern code editors like VS Code that helps developers write HTML and CSS much faster using abbreviations.

Instead of writing repetitive HTML manually, Emmet expands short abbreviations into complete HTML structures.

### Example

**Emmet Abbreviation**

```html
div>ul>li*3
```

**Output**

```html
<div>
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>
```

### Benefits

- Faster HTML and CSS coding
- Reduces typing effort
- Improves developer productivity
- Comes pre-installed in VS Code

---

# 2. Difference Between a Library and a Framework

Although both libraries and frameworks help developers build applications, they differ in how they control the application's flow.

| Library | Framework |
|---------|-----------|
| A collection of reusable code | A complete structure for building applications |
| Developer controls the flow | Framework controls the flow |
| Can be used whenever needed | Must follow the framework's architecture |
| More flexible | More opinionated |
| Easier to integrate | Provides a predefined way of developing applications |
| Example: React | Example: Angular |

### React is a Library because

- It mainly focuses on building the User Interface (UI).
- It doesn't dictate how routing, state management, or API calls should be handled.
- Developers are free to choose additional libraries according to their project needs.

---

# 3. What is CDN? Why do we use it?

**CDN (Content Delivery Network)** is a globally distributed network of servers that delivers static resources (JavaScript, CSS, images, videos, etc.) from the server closest to the user.

Instead of downloading a file from one central server, the browser downloads it from a nearby server, reducing latency and improving performance.

### React CDN Example

```html
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
```

### Advantages

- Faster loading speed
- Lower latency
- Better availability
- Reduced load on the origin server
- Improved scalability

---

# 4. Why is React called React?

React is called **React** because it efficiently **reacts to changes in application data**.

Whenever the application state changes:

1. React creates a new Virtual DOM.
2. Compares it with the previous Virtual DOM (Diffing).
3. Updates only the changed parts in the Real DOM.

This selective updating makes React applications fast and efficient.

---

# 5. What is `crossorigin` in the `<script>` tag?

The `crossorigin` attribute tells the browser how to request resources that are hosted on a different domain.

React is usually loaded from a CDN like **unpkg.com**, which is different from our website's domain.

Using `crossorigin` enables:

- Cross-Origin Resource Sharing (CORS)
- Better debugging and error reporting
- Secure loading of external resources

### Example

```html
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.development.js">
</script>
```

---

# 6. Difference Between React and ReactDOM

## React

React is the **core JavaScript library** responsible for creating components and managing the Virtual DOM.

Responsibilities:

- Creating UI Components
- Managing State
- Handling Props
- Using Hooks
- Creating React Elements

Import Example

```javascript
import React from "react";
```

---

## ReactDOM

ReactDOM is responsible for rendering React components into the browser's Real DOM.

Responsibilities:

- Connecting React with the Browser DOM
- Rendering Components
- Updating the UI

Import Example

```javascript
import ReactDOM from "react-dom/client";
```

Example

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

### Summary

| React | ReactDOM |
|--------|-----------|
| Creates components | Renders components |
| Manages Virtual DOM | Updates Real DOM |
| Core library | Browser-specific package |

---

# 7. Difference Between `react.development.js` and `react.production.js`

React provides two builds.

## Development Build

File:

```
react.development.js
```

Characteristics:

- Large file size
- Includes warnings
- Includes detailed error messages
- Helpful debugging information
- Slower than production build
- Used during development

---

## Production Build

File:

```
react.production.min.js
```

Characteristics:

- Minified
- Optimized
- Smaller file size
- Faster execution
- No debugging messages
- Used in production

### Comparison

| Development | Production |
|-------------|------------|
| Large | Small |
| Debugging enabled | Debugging removed |
| Human readable | Minified |
| Slower | Faster |

---

# 8. What are `async` and `defer`?

Normally, when the browser encounters a `<script>` tag, it pauses HTML parsing, downloads the script, executes it, and then continues parsing.

The `async` and `defer` attributes improve page loading performance.

---

## Async

```html
<script async src="app.js"></script>
```

### How it works

1. HTML parsing starts.
2. Script downloads in parallel.
3. As soon as download completes, HTML parsing pauses.
4. Script executes immediately.
5. HTML parsing resumes.

### Characteristics

- Downloads in parallel
- Executes immediately after download
- Does not preserve execution order
- Best for independent scripts like analytics

---

## Defer

```html
<script defer src="app.js"></script>
```

### How it works

1. HTML parsing starts.
2. Script downloads in parallel.
3. HTML parsing continues.
4. Script executes only after HTML parsing is complete.

### Characteristics

- Downloads in parallel
- Executes after HTML is fully parsed
- Preserves execution order
- Recommended for application scripts

---

## Async vs Defer

| Async | Defer |
|--------|--------|
| Downloads in parallel | Downloads in parallel |
| Executes immediately after download | Executes after HTML parsing |
| Order not guaranteed | Order maintained |
| HTML parsing pauses during execution | HTML parsing never pauses for execution |
| Best for analytics and ads | Best for application JavaScript |

---

# Conclusion

In this chapter, we learned:

- What Emmet is and how it speeds up development.
- The difference between a Library and a Framework.
- What a CDN is and why React is loaded through one.
- Why React is called React.
- The purpose of the `crossorigin` attribute.
- The roles of React and ReactDOM.
- The differences between development and production React builds.
- How `async` and `defer` affect script loading and execution.