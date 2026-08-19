# Chapter 06 – Exploring the World

## 1. What is a Microservice?

A **Microservice architecture** is an architectural style where a large application is divided into multiple small, independent services.

Each microservice is responsible for a specific business functionality and can be developed, deployed, and scaled independently.

For example, in a food delivery application, we can have separate services for:

* User management
* Restaurant management
* Order management
* Payment
* Delivery

Each service can communicate with other services through APIs.

**Example:**

```text
Food Delivery Application
        |
        |-- User Service
        |-- Restaurant Service
        |-- Order Service
        |-- Payment Service
        |-- Delivery Service
```

### Advantages:

* Services can be developed independently.
* Individual services can be scaled independently.
* Failure in one service does not necessarily bring down the entire application.
* Different technologies can be used for different services.

---

## 2. What is Monolith Architecture?

A **Monolithic architecture** is an application architecture where all the major functionalities of an application are developed and deployed as a **single application/unit**.

For example, a food delivery application might contain:

```text
Food Delivery Application
        |
        |-- User
        |-- Restaurant
        |-- Order
        |-- Payment
        |-- Delivery
```

All these functionalities are part of the same application and are usually deployed together.

### Advantages:

* Simple to develop initially.
* Easy to test and deploy for smaller applications.
* Communication between components is straightforward because they are inside the same application.

### Disadvantages:

* As the application grows, it becomes difficult to maintain.
* A small change may require redeploying the entire application.
* Scaling one functionality independently is difficult.
* A failure in one part can potentially affect the entire application.

---

## 3. What is the difference between Monolith and Microservice?

| Monolithic Architecture                                              | Microservice Architecture                                  |
| -------------------------------------------------------------------- | ---------------------------------------------------------- |
| Application is built as a single unit.                               | Application is divided into multiple independent services. |
| Components are tightly coupled.                                      | Services are relatively loosely coupled.                   |
| Usually deployed as one unit.                                        | Services can be deployed independently.                    |
| Scaling individual functionality is difficult.                       | Individual services can be scaled independently.           |
| Easier to start with for small applications.                         | More suitable for large and complex applications.          |
| A problem in one part can potentially affect the entire application. | Failure can often be isolated to a particular service.     |

**In simple words:**

> Monolith = One big application
> Microservices = Many small independent services

---

## 4. Why do we need a useEffect Hook?

`useEffect` is a React Hook used to perform **side effects in a functional component**.

A side effect is an operation that happens outside the normal process of rendering the UI.

Common examples include:

* Fetching data from an API
* Setting up subscriptions
* Setting timers
* Updating something outside React

For example, in our application, we use `useEffect` to fetch restaurant data when the component loads:

```js
useEffect(() => {
    fetchRestaurants();
}, []);
```

The empty dependency array `[]` means the effect runs after the component's initial render.

### Why do we need it?

React's rendering should mainly be used to calculate what the UI should look like. Operations such as API calls should be handled separately as side effects.

So, `useEffect` allows us to perform those side effects at the appropriate time in the component's lifecycle.

---

## 5. What is Optional Chaining?

**Optional chaining (`?.`)** is a JavaScript feature that allows us to safely access properties or methods of an object without causing an error when an intermediate value is `null` or `undefined`.

### Without Optional Chaining:

```js
user.address.city
```

If `address` is `undefined`, JavaScript throws an error.

### With Optional Chaining:

```js
user?.address?.city
```

If `user` or `address` is `null` or `undefined`, the expression returns `undefined` instead of throwing an error.

### Example:

```js
const restaurant = data?.cards?.[0]?.card?.card?.info;
```

This is particularly useful when working with API responses because the structure of the response may not always contain every property.

---

## 6. What is Shimmer UI?

**Shimmer UI** is a loading placeholder displayed while the actual data is being fetched.

Instead of showing a blank screen or just a loading message, we display a structure that resembles the final UI.

For example:

```text
Before API response:

[ █████████████ ]
[ █████████     ]
[ █████████     ]

After API response:

[ Restaurant 1 ]
[ Pizza        ]
[ ₹300         ]
```

The placeholder shown before the actual data loads is called a **Shimmer UI**.

### Why do we use it?

* Gives users visual feedback that content is loading.
* Makes the application feel faster.
* Provides a better user experience.
* Prevents the page from looking empty while waiting for API data.

Shimmer UI is mainly a **UI/UX technique**, usually implemented using CSS animations.

---

## 7. What is the difference between a JavaScript Expression and a JavaScript Statement?

### Expression

An **expression** is a piece of JavaScript code that produces or evaluates to a value.

Examples:

```js
10 + 20
```

Result:

```text
30
```

Another example:

```js
name
```

It evaluates to the value stored in `name`.

In React JSX, expressions can be written inside `{}`:

```jsx
<h1>{name}</h1>
```

Here, `{name}` is an expression.

### Statement

A **statement** is an instruction that performs an action.

Examples:

```js
const name = "Thanuja";
```

```js
if (age > 18) {
    console.log("Adult");
}
```

```js
return "Hello";
```

### Simple difference:

> **Expression → produces a value.**
> **Statement → performs an action/instruction.**

For example:

```js
const result = 10 + 20;
```

Here:

* `10 + 20` → Expression
* `const result = ...` → Statement

---

## 8. What is Conditional Rendering? Explain with a code example.

**Conditional rendering** means displaying different UI elements based on a condition.

In React, we can use JavaScript conditions to decide what should be rendered.

### Example using the ternary operator:

```jsx
const Body = () => {

    const [restaurants, setRestaurants] = useState([]);

    return (
        <div>
            {restaurants.length === 0 ? (
                <Shimmer />
            ) : (
                <RestaurantCards restaurants={restaurants} />
            )}
        </div>
    );
};
```

Here:

```js
restaurants.length === 0
```

is the condition.

If the condition is `true`, React displays:

```jsx
<Shimmer />
```

Otherwise, it displays:

```jsx
<RestaurantCards />
```

This is called **conditional rendering**.

Another common example:

```jsx
{isLoggedIn ? <LogoutButton /> : <LoginButton />}
```

---

## 9. What is CORS?

**CORS** stands for **Cross-Origin Resource Sharing**.

It is a browser security mechanism that controls whether a web page from one origin is allowed to request resources from another origin.

An **origin** consists of:

* Protocol
* Domain
* Port

For example:

```text
http://localhost:3000
```

and

```text
https://api.example.com
```

are different origins.

If a frontend application tries to call an API from a different origin, the browser may block the request unless the server allows it through appropriate CORS headers.

### Example:

```text
Frontend
http://localhost:3000
        |
        | API Request
        ↓
Backend
https://api.example.com
```

The backend can allow the frontend using a response header such as:

```http
Access-Control-Allow-Origin: http://localhost:3000
```

### Important point:

CORS is primarily a **browser-enforced security mechanism**. It is not an error in JavaScript itself.

---

## 10. What is async and await?

`async` and `await` are JavaScript features used to work with **Promises** and asynchronous operations.

### `async`

When a function is declared with `async`, it always returns a Promise.

```js
async function getData() {
    return "Hello";
}
```

### `await`

`await` can be used inside an `async` function to wait for a Promise to settle before continuing with the next line.

Example:

```js
const getRestaurants = async () => {
    const response = await fetch(API_URL);
    const json = await response.json();

    console.log(json);
};
```

Here:

```js
await fetch(API_URL);
```

waits for the `fetch()` Promise to resolve.

Then:

```js
await response.json();
```

waits for the response body to be converted into JavaScript data.

### Simple explanation:

> `async` makes a function asynchronous and causes it to return a Promise.
> `await` pauses execution inside that async function until a Promise settles, making asynchronous code easier to read.

---

## 11. What is the use of `const json = await data.json();` in `getRestaurants()`?

When we use:

```js
const data = await fetch(API_URL);
```

the `fetch()` call gives us a **Response object**.

The response body is not automatically converted into a JavaScript object.

We need to parse the response body using:

```js
data.json();
```

Since `data.json()` itself returns a Promise, we use `await`:

```js
const json = await data.json();
```

Now `json` contains the parsed JavaScript object.

### Complete example:

```js
const getRestaurants = async () => {

    const data = await fetch(API_URL);

    const json = await data.json();

    console.log(json);
};
```

The process is:

```text
fetch(API_URL)
      ↓
Response object
      ↓
data.json()
      ↓
Promise
      ↓
await
      ↓
Parsed JavaScript object
      ↓
json
```

### Why is this necessary?

Suppose the server sends:

```json
{
    "restaurants": [
        {
            "name": "Pizza Hut"
        }
    ]
}
```

After:

```js
const json = await data.json();
```

we can access the data using JavaScript:

```js
json.restaurants
```

So, the main purpose of:

```js
const json = await data.json();
```

is to **read the response body and parse the JSON data into a JavaScript object that we can use in our application.**

---

# Quick Revision

| Topic                    | One-line explanation                                               |
| ------------------------ | ------------------------------------------------------------------ |
| Microservice             | Application divided into small, independently deployable services. |
| Monolith                 | Entire application developed and deployed as one unit.             |
| Monolith vs Microservice | One large application vs multiple independent services.            |
| `useEffect`              | Used to perform side effects such as API calls in React.           |
| Optional Chaining        | Safely accesses nested properties using `?.`.                      |
| Shimmer UI               | Loading placeholder shown while actual data is being fetched.      |
| Expression               | Code that evaluates to a value.                                    |
| Statement                | Instruction that performs an action.                               |
| Conditional Rendering    | Rendering UI based on a condition.                                 |
| CORS                     | Browser security mechanism controlling cross-origin requests.      |
| `async`                  | Makes a function return a Promise and enables `await`.             |
| `await`                  | Waits for a Promise to settle inside an async function.            |
| `data.json()`            | Reads and parses the response body as JSON.                        |
