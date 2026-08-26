# Chapter 07 – Finding the Path

## 1. What are various ways to add images into our App? Explain with code examples.

There are several ways to add images to a React application.

### Method 1: Using an Image URL

We can directly provide an image URL to the `src` attribute.

```jsx
<img
    src="https://example.com/image.jpg"
    alt="Restaurant"
/>
```

Here, the image is loaded from the external URL.

### Method 2: Using Images from the `public` Folder

We can place images inside the `public` folder.

For example:

```text
public/
    images/
        restaurant.jpg
```

Then we can access the image using:

```jsx
<img
    src="/images/restaurant.jpg"
    alt="Restaurant"
/>
```

The `public` folder is useful for files that we want to access directly using a URL path.

### Method 3: Importing Images from `src`

We can keep images inside the `src` folder and import them into our component.

For example:

```text
src/
    assets/
        restaurant.jpg
```

Then:

```jsx
import restaurantImage from "./assets/restaurant.jpg";

const Restaurant = () => {
    return (
        <img
            src={restaurantImage}
            alt="Restaurant"
        />
    );
};
```

The bundler processes the imported image and provides the appropriate URL.

### Method 4: Using an Imported Image as a CSS Background

We can also use an image as a background image.

```jsx
import backgroundImage from "./assets/background.jpg";

const App = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
        >
            Welcome
        </div>
    );
};
```

### Summary

Common ways of adding images are:

1. External image URL
2. Image from the `public` folder
3. Imported image from `src`
4. Image used as a CSS background

---

# 2. What would happen if we do `console.log(useState())`?

`useState()` is a React Hook used to create and manage state in a functional component.

If we write:

```jsx
console.log(useState());
```

React returns an array containing:

```text
[currentState, stateUpdaterFunction]
```

Since we did not provide an initial value:

```js
useState()
```

the initial state is `undefined`.

So conceptually, the result is:

```js
[
    undefined,
    function
]
```

For example:

```jsx
const Example = () => {

    console.log(useState());

    return <h1>Hello</h1>;
};
```

The console will show an array similar to:

```text
[undefined, ƒ]
```

The second value is the state setter function.

Normally, we use destructuring:

```jsx
const [count, setCount] = useState(0);
```

Here:

```text
count    → current state
setCount → function used to update the state
```

---

# 3. How will `useEffect` behave if we don't add a dependency array?

If we don't provide a dependency array to `useEffect`, the effect runs **after every render** of the component.

Example:

```jsx
useEffect(() => {
    console.log("useEffect called");
});
```

Notice that there is no `[]` after the callback.

The behavior is:

```text
Initial render
      ↓
useEffect runs
      ↓
State changes
      ↓
Component re-renders
      ↓
useEffect runs again
      ↓
Another render
      ↓
useEffect runs again
```

For example:

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
    console.log("Effect executed");
});

return (
    <button onClick={() => setCount(count + 1)}>
        {count}
    </button>
);
```

Every time `count` changes, the component re-renders, so the `useEffect` runs again.

### Different dependency-array behaviors

#### No dependency array

```jsx
useEffect(() => {
    console.log("Runs after every render");
});
```

Runs after every render.

#### Empty dependency array

```jsx
useEffect(() => {
    console.log("Runs after initial render");
}, []);
```

Runs after the initial render (with the usual React development-mode caveat that Strict Mode may invoke effects more than once during development).

#### Dependency array with values

```jsx
useEffect(() => {
    console.log("Runs when count changes");
}, [count]);
```

Runs after the initial render and whenever `count` changes.

---

# 4. What is SPA?

**SPA** stands for **Single Page Application**.

A Single Page Application is a web application where the browser initially loads the application and then updates the content dynamically without requesting a completely new HTML page for every route.

For example:

```text
User opens application
        ↓
Browser loads the application
        ↓
User clicks About
        ↓
React changes the displayed component
        ↓
No complete page reload
```

React applications are commonly built as SPAs.

For example:

```text
/             → Home
/about        → About
/contact      → Contact
/restaurant/1 → Restaurant
```

The URL can change, but the browser does not necessarily perform a full page reload for each navigation.

### Advantages of SPA

* Faster navigation after the initial load.
* Better user experience.
* Only required UI content needs to change.
* Client-side routing can be used.

---

# 5. What is the difference between Client-Side Routing and Server-Side Routing?

## Client-Side Routing

In **Client-Side Routing**, routing is handled by JavaScript in the browser.

For example, with React Router:

```jsx
<Link to="/about">About</Link>
```

When the user clicks the link, React Router changes the URL and renders the appropriate component without performing a complete page reload.

```text
Click /about
    ↓
React Router
    ↓
About Component
    ↓
UI updates
```

## Server-Side Routing

In **Server-Side Routing**, the browser sends a request to the server whenever the URL changes.

For example:

```text
Request: /about
      ↓
Server
      ↓
Server processes request
      ↓
Server sends response
      ↓
Browser loads the new page
```

### Difference

| Client-Side Routing                                         | Server-Side Routing                                    |
| ----------------------------------------------------------- | ------------------------------------------------------ |
| Routing is handled in the browser.                          | Routing is handled by the server.                      |
| Usually does not require a full page reload for navigation. | Navigation generally involves a request to the server. |
| Common in SPAs.                                             | Common in traditional multi-page applications.         |
| React Router can be used.                                   | Server/framework routing handles the request.          |
| Provides smooth navigation between views.                   | Each navigation can load a new document.               |

### Simple way to remember:

> **Client-side routing → JavaScript/browser handles the route.**

> **Server-side routing → Server handles the route.**

---

# Coding Assignment

# 6. Add Shimmer Effect Without Installing a Library

A Shimmer UI can be created using simple React and CSS.

### Shimmer Component

```jsx
const Shimmer = () => {
    return (
        <div className="shimmer-container">
            {Array(10)
                .fill("")
                .map((_, index) => (
                    <div className="shimmer-card" key={index}>
                        <div className="shimmer-image"></div>

                        <div className="shimmer-line"></div>

                        <div className="shimmer-line short"></div>
                    </div>
                ))}
        </div>
    );
};

export default Shimmer;
```

### CSS

```css
.shimmer-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.shimmer-card {
    width: 250px;
    padding: 15px;
}

.shimmer-image {
    height: 180px;
    background: #ddd;
    border-radius: 10px;
}

.shimmer-line {
    height: 15px;
    width: 90%;
    background: #ddd;
    margin-top: 15px;
    border-radius: 5px;
}

.shimmer-line.short {
    width: 60%;
}
```

To make it look like a moving shimmer, we can add a CSS animation:

```css
.shimmer-card > div {
    background: linear-gradient(
        90deg,
        #eeeeee 25%,
        #dddddd 50%,
        #eeeeee 75%
    );

    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
```

This creates a loading effect without installing any external library.

---

# 7. Install `react-router-dom`

React Router is a library used for handling routing in React applications.

Install it using:

```bash
npm install react-router-dom
```

Or using Yarn:

```bash
yarn add react-router-dom
```

After installation, we can use components such as:

```jsx
BrowserRouter
Routes
Route
Link
Outlet
```

---

# 8. Create an `appRouter` and Provide it to the App

We can create our router using `createBrowserRouter`.

For example:

```jsx
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
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
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <RouterProvider router={appRouter} />
);
```

`RouterProvider` provides the router configuration to the React application.

---

# 9. Create Home, About and Contact Pages with Link using Child Routes

We can create the following structure:

```text
App
 ├── Header
 └── Outlet
      ├── Home
      ├── About
      └── Contact
```

### App.jsx

```jsx
import { Link, Outlet } from "react-router-dom";

const App = () => {
    return (
        <div>
            <header>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </header>

            <Outlet />
        </div>
    );
};

export default App;
```

### Home.jsx

```jsx
const Home = () => {
    return <h1>Home Page</h1>;
};

export default Home;
```

### About.jsx

```jsx
const About = () => {
    return <h1>About Page</h1>;
};

export default About;
```

### Contact.jsx

```jsx
const Contact = () => {
    return <h1>Contact Page</h1>;
};

export default Contact;
```

`Outlet` is important here.

It tells React Router:

> Render the matched child route at this location.

For example:

```jsx
<Outlet />
```

will be replaced by either:

```jsx
<Home />
```

or:

```jsx
<About />
```

or:

```jsx
<Contact />
```

depending on the current URL.

---

# 10. Make an Error Page for Routing Errors

React Router allows us to specify an `errorElement`.

### Error.jsx

```jsx
import { useRouteError } from "react-router-dom";

const Error = () => {

    const error = useRouteError();

    return (
        <div>
            <h1>Oops!</h1>

            <h2>
                Something went wrong.
            </h2>

            <p>
                {error.status} : {error.statusText}
            </p>
        </div>
    );
};

export default Error;
```

Then we add it to the router:

```jsx
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
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
            }
        ]
    }
]);
```

Now if a route results in an error, React Router can render the `Error` component.

---

# 11. Create a Restaurant Page with Dynamic Restaurant ID

Sometimes we need to create routes where part of the URL changes dynamically.

For example:

```text
/restaurant/123
/restaurant/456
/restaurant/789
```

Here, the restaurant ID is dynamic.

We can define the route as:

```jsx
{
    path: "/restaurant/:resId",
    element: <Restaurant />
}
```

The `:resId` represents a dynamic route parameter.

### Restaurant.jsx

```jsx
import { useParams } from "react-router-dom";

const Restaurant = () => {

    const { resId } = useParams();

    return (
        <div>
            <h1>Restaurant Page</h1>

            <h2>
                Restaurant ID: {resId}
            </h2>
        </div>
    );
};

export default Restaurant;
```

Now if we visit:

```text
/restaurant/123
```

we get:

```text
Restaurant Page
Restaurant ID: 123
```

If we visit:

```text
/restaurant/456
```

we get:

```text
Restaurant Page
Restaurant ID: 456
```

This is called a **dynamic route**.

---

# 12. Extra: Create a Login Page using Formik

Formik is a library that helps manage forms in React.

First, install it:

```bash
npm install formik
```

### Login.jsx

```jsx
import { useFormik } from "formik";

const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
            />

            <button type="submit">
                Login
            </button>

        </form>
    );
};

export default Login;
```

We can then add it to our router:

```jsx
{
    path: "/login",
    element: <Login />
}
```

When the form is submitted, Formik provides the form values through:

```js
formik.values
```

---

# Complete Routing Structure

A simple application can have the following structure:

```text
src
│
├── App.jsx
│
├── components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Restaurant.jsx
│   ├── Login.jsx
│   ├── Error.jsx
│   └── Shimmer.jsx
│
└── main.jsx
```

The routing structure can look like:

```text
/
├── Home
├── about
├── contact
├── login
└── restaurant
      └── :resId
```

For example:

```text
/                    → Home
/about               → About
/contact             → Contact
/login               → Login
/restaurant/123      → Restaurant 123
/restaurant/456      → Restaurant 456
```

---

# Quick Revision

| Topic                              | One-line explanation                                                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Adding Images                      | Images can come from URLs, `public`, imported assets, or CSS backgrounds.                                           |
| `useState()`                       | Returns an array containing the current state and state setter; without an initial value, the state is `undefined`. |
| `useEffect()` without dependencies | Runs after every render.                                                                                            |
| SPA                                | A web application that dynamically updates the UI without full page reloads for normal client-side navigation.      |
| Client-Side Routing                | Routing is handled in the browser, usually without a full page reload.                                              |
| Server-Side Routing                | The browser requests a URL from the server and the server handles the route.                                        |
| Shimmer UI                         | Loading placeholder displayed while data is being fetched.                                                          |
| `react-router-dom`                 | Library used to implement routing in React applications.                                                            |
| `RouterProvider`                   | Provides the router configuration to the React application.                                                         |
| `Outlet`                           | Renders the matched child route.                                                                                    |
| `Link`                             | Navigates between routes without a normal full-page reload.                                                         |
| `useParams()`                      | Retrieves dynamic parameters from the URL.                                                                          |
| Dynamic Route                      | A route containing a variable parameter such as `/restaurant/:resId`.                                               |
| Formik                             | Library used to manage forms and form state in React.                                                               |
