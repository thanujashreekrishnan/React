# Chapter 09 – Optimizing our App

## Theory Assignment

## 1. When and why do we need `lazy()`?

`lazy()` is a React API used to **dynamically load a component only when it is needed**.

It is mainly used for **code splitting**.

Normally, when we import components like this:

```jsx
import About from "./components/About";
import Contact from "./components/Contact";
import Restaurant from "./components/Restaurant";
```

the bundler can include the code for these components in the initial JavaScript bundle.

This can make the initial bundle larger as the application grows.

Instead, we can use `lazy()`:

```jsx
import { lazy } from "react";

const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Restaurant = lazy(() => import("./components/Restaurant"));
```

Now these components can be loaded **on demand**.

### Example

Suppose our application has:

```text
Home
About
Contact
Restaurant
Login
```

The user initially visits only:

```text
/
```

There is no need to immediately download all the code required by every other page.

With lazy loading:

```text
Initial Load
     ↓
Home component
     ↓
User clicks About
     ↓
About component is downloaded
     ↓
About is rendered
```

### Why do we use `lazy()`?

The main reason is **performance optimization**.

It helps us:

* Reduce the initial JavaScript bundle size.
* Improve initial loading performance.
* Load components only when they are needed.
* Split a large application into smaller JavaScript chunks.

---

## 2. What is Suspense?

`Suspense` is a React component that allows us to display a **fallback UI while something is not ready**, including a component being loaded with `lazy()`.

Example:

```jsx
import { Suspense, lazy } from "react";

const About = lazy(() => import("./components/About"));

const App = () => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <About />
        </Suspense>
    );
};
```

When React needs to load `About`, it may not be available immediately.

During that time, React displays:

```jsx
<h1>Loading...</h1>
```

Once the component has loaded, React replaces the fallback with:

```jsx
<About />
```

### Simple flow

```text
About component requested
          ↓
Component not ready
          ↓
Suspense
          ↓
"Loading..." displayed
          ↓
Component loaded
          ↓
About component displayed
```

### What is `fallback`?

The `fallback` prop specifies what React should render while the suspended content is waiting.

```jsx
<Suspense fallback={<Shimmer />}>
    <About />
</Suspense>
```

Here, `Shimmer` is displayed while `About` is loading.

---

# 3. Why do we get this error?

```text
A component suspended while responding to synchronous input.
This will cause the UI to be replaced with a loading indicator.

To fix, updates that suspend should be wrapped with startTransition?
```

This error can occur when a component that **suspends** is rendered as a direct result of a synchronous user interaction, such as clicking a button or link.

### Example

Suppose we have a lazy-loaded component:

```jsx
const Restaurant = lazy(() => import("./Restaurant"));
```

And the user clicks:

```jsx
<Link to="/restaurant/123">
    Restaurant
</Link>
```

The navigation happens synchronously.

React starts rendering the `Restaurant` component, but the component's JavaScript chunk has not loaded yet.

Therefore, the component **suspends**.

React now needs to show a fallback:

```jsx
<Suspense fallback={<Shimmer />}>
    <Restaurant />
</Suspense>
```

The problem is that the UI was already responding to a synchronous user action, but React suddenly needs to replace part of that UI with a loading fallback.

This can make the transition feel abrupt.

---

# 4. How does Suspense fix this error?

`Suspense` provides React with a defined **fallback UI** to display when the lazy-loaded component is not ready.

For example:

```jsx
<Suspense fallback={<Shimmer />}>
    <Restaurant />
</Suspense>
```

Instead of React having no defined loading state for the suspended component, it knows:

> "If `Restaurant` isn't ready, show `Shimmer`."

So the UI transition becomes controlled.

### However, an important distinction

`Suspense` and `startTransition` solve related but different parts of the problem.

`Suspense` handles **what UI to show while something is suspended**.

`startTransition` tells React that an update is **non-urgent** and that React should prioritize keeping the current UI responsive while preparing the new UI.

For example:

```jsx
import {
    startTransition
} from "react";

startTransition(() => {
    setTab("restaurant");
});
```

React can then treat that update as a transition rather than an urgent update.

### With routing

Modern versions of React Router can integrate navigation with React's transition mechanisms, but the exact behavior depends on the router version and configuration.

For a lazy-loaded route, the important pattern is:

```jsx
<Suspense fallback={<Shimmer />}>
    <Outlet />
</Suspense>
```

or wrapping the lazy component:

```jsx
<Suspense fallback={<Shimmer />}>
    <Restaurant />
</Suspense>
```

### Simple understanding

```text
lazy()
  ↓
Component loads later
  ↓
Component may suspend
  ↓
Suspense
  ↓
Shows fallback UI
  ↓
Component finishes loading
  ↓
Actual component appears
```

And:

```text
startTransition()
  ↓
Marks an update as non-urgent
  ↓
React can keep the current UI responsive
  ↓
New UI is prepared
```

So **Suspense doesn't simply "fix" every synchronous-suspension error by itself**. The error is about an update causing suspension during an urgent interaction; `Suspense` provides the fallback boundary, while transitions can tell React to handle the update as non-urgent.

---

# 5. Advantages and Disadvantages of Code Splitting

Code splitting means dividing a large JavaScript bundle into smaller chunks that can be loaded when required.

A common React pattern is:

```jsx
const About = lazy(() => import("./About"));
```

This creates a separate chunk for the `About` component.

## Advantages

### 1. Smaller initial bundle

The browser does not have to download all application code immediately.

```text
Without code splitting:

Large Bundle
████████████████████████████

With code splitting:

Initial Bundle
████████

About Chunk
████

Restaurant Chunk
█████
```

### 2. Faster initial loading

Since less JavaScript needs to be downloaded initially, the application can become interactive sooner, especially on slower networks.

### 3. Load components only when needed

If a user never visits the About page, the About chunk may never need to be downloaded.

### 4. Better scalability

Large applications can be divided into logical chunks.

For example:

```text
Home chunk
Restaurant chunk
Profile chunk
Admin chunk
Payment chunk
```

### 5. Better resource usage

Users download code relevant to the features they actually access.

---

## Disadvantages

### 1. Additional network requests

Instead of downloading one large bundle, the browser may need to request additional chunks.

```text
Initial Bundle
     ↓
User opens Restaurant
     ↓
Download Restaurant chunk
```

### 2. Loading state is required

The user may see a loading state while a chunk is being downloaded.

Therefore, we generally use:

```jsx
<Suspense fallback={<Shimmer />}>
    <Restaurant />
</Suspense>
```

### 3. More complexity

Developers need to think about:

* Where to split the application.
* Which components should be lazy loaded.
* Appropriate fallback UI.
* Loading and error states.

### 4. Too much code splitting can be counterproductive

Creating many tiny chunks can increase request overhead and make the loading strategy unnecessarily complicated.

Therefore, code splitting should be used **strategically**, not blindly on every component.

---

# 6. When do we need `Suspense` and why?

We need `Suspense` when a part of the React tree may **suspend while rendering** and we want to provide a fallback UI for that state.

A common example is lazy loading.

### Without Suspense

```jsx
const About = lazy(() => import("./About"));

const App = () => {
    return <About />;
};
```

React will complain because there is no Suspense boundary to handle the suspended component.

### With Suspense

```jsx
import {
    Suspense,
    lazy
} from "react";

const About = lazy(() => import("./About"));

const App = () => {
    return (
        <Suspense fallback={<Shimmer />}>
            <About />
        </Suspense>
    );
};
```

Now React knows what to display while `About` is loading.

### When should we use it?

We commonly use `Suspense` when:

* Using `React.lazy()`.
* Loading route components lazily.
* Using React features or libraries that integrate with Suspense.
* We want to provide a fallback UI while suspended content becomes ready.

### Example with React Router

Suppose we have:

```jsx
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Restaurant = lazy(() => import("./components/Restaurant"));
```

We can place a Suspense boundary around the routed content:

```jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Header />

            <Suspense fallback={<Shimmer />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default App;
```

Now, whenever a lazy-loaded child route is loading, the user sees:

```text
Header
  ↓
Shimmer
  ↓
Actual Page
```

Once the page finishes loading:

```text
Header
  ↓
About / Contact / Restaurant
```

---

# Complete Example – Lazy Loading with React Router

### App.jsx

```jsx
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const App = () => {

    return (
        <div>

            <h1>My App</h1>

            <Suspense fallback={<h2>Loading...</h2>}>
                <Outlet />
            </Suspense>

        </div>
    );
};

export default App;
```

### Lazy-loaded components

```jsx
import { lazy } from "react";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Restaurant = lazy(
    () => import("./components/Restaurant")
);
```

### Router

```jsx
import {
    createBrowserRouter
} from "react-router-dom";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/restaurant/:resId",
                element: <Restaurant />
            }
        ]
    }
]);
```

### What happens?

When the application starts:

```text
App loads
   ↓
Home chunk loads
   ↓
Home displayed
```

When the user navigates to:

```text
/about
```

React requests the About chunk:

```text
About requested
      ↓
About not loaded
      ↓
Suspense
      ↓
Loading... / Shimmer
      ↓
About chunk downloaded
      ↓
About displayed
```

This is **code splitting + lazy loading + Suspense** working together.

---

# Quick Revision

| Topic                | One-line explanation                                                             |
| -------------------- | -------------------------------------------------------------------------------- |
| `lazy()`             | Dynamically loads a component when it is needed.                                 |
| Code Splitting       | Divides a large JavaScript bundle into smaller chunks.                           |
| `Suspense`           | Displays fallback UI while something in its subtree is suspended.                |
| `fallback`           | UI shown while suspended content is waiting.                                     |
| `startTransition`    | Marks an update as non-urgent so React can prioritize keeping the UI responsive. |
| Lazy Loading         | Loading code only when the corresponding feature is needed.                      |
| Main advantage       | Smaller initial bundle and potentially faster initial loading.                   |
| Main disadvantage    | Additional chunk requests and the need to handle loading states.                 |
| When to use Suspense | Whenever the component tree can suspend and you need a fallback UI.              |
| Lazy + Suspense      | `lazy()` loads the component; `Suspense` handles the waiting state.              |

# Easy Way to Remember

Think of it like a restaurant:

```text
lazy()
   ↓
"Don't prepare every dish now.
Prepare it only when someone orders."

Suspense
   ↓
"The dish isn't ready yet.
Show the customer a loading message."

startTransition
   ↓
"This order is not an emergency.
Keep the customer experience responsive
while preparing the new dish."
```

So the key relationship is:

```text
Code Splitting
      ↓
lazy()
      ↓
Component loads on demand
      ↓
Component may suspend
      ↓
Suspense
      ↓
Shows fallback
      ↓
Component finishes loading
      ↓
Actual UI appears
```
