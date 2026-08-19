1. What is the difference between Named Export, Default Export, and * as Export?

JavaScript modules allow us to share code between files using exports and imports. There are three common ways to export and import modules.

A. Named Export

A named export allows you to export one or more variables, functions, or components by name.

Example:

// utils.js
export const PI = 3.14;

export const add = (a, b) => {
  return a + b;
};

Import:

import { PI, add } from "./utils";

Characteristics:

Multiple named exports are allowed in one file.
Import names must match the exported names.
Imported values must be enclosed in {}.
B. Default Export

A default export is used when a file exports only one main value.

Example:

// Header.js
const Header = () => {
  return <h1>Header Component</h1>;
};

export default Header;

Import:

import Header from "./Header";

You can rename the imported component:

import MyHeader from "./Header";

Characteristics:

Only one default export is allowed per file.
Curly braces {} are not used while importing.
The imported name can be anything.
C. * as Import

The * as syntax imports all named exports from a module as a single object.

Example:

// constants.js
export const API_URL = "...";
export const IMG_URL = "...";
export const APP_NAME = "Tanu's Kitchen";

Import:

import * as Constants from "./constants";

console.log(Constants.API_URL);
console.log(Constants.IMG_URL);

This creates an object:

Constants = {
  API_URL: "...",
  IMG_URL: "...",
  APP_NAME: "Tanu's Kitchen"
};
Comparison
Named Export	Default Export	* as Import
Multiple exports allowed	Only one default export	Imports all named exports as an object
Imported using {}	Imported without {}	Imported using * as alias
Name must match	Can be renamed	Access values using alias.property


2. What is the importance of config.js (or constants.js) file?

A config.js or constants.js file is used to store values that are reused throughout the application.

Instead of hardcoding values in multiple files, they are stored in one place.

Example
// config.js
export const API_URL =
  "https://api.example.com/restaurants";

export const IMG_CDN_URL =
  "https://cdn.example.com/images/";

Use them anywhere:

import { API_URL, IMG_CDN_URL } from "./config";
Advantages
Centralized configuration.
Easy to update values.
Avoids duplicate code.
Makes the code cleaner and easier to maintain.
Reduces the chances of typing mistakes.

In your React project, instead of writing image URLs multiple times, you can simply write:

export const IMG_URLs = {
  HEADER_LOGO: "...",
  CDN_URL: "..."
};
3. What are React Hooks?

React Hooks are special built-in functions introduced in React 16.8 that allow functional components to use React features such as state, lifecycle methods, and side effects without writing class components.

Hooks always start with the word use.

Examples:

useState()
useEffect()
useContext()
useMemo()
useRef()
useCallback()
Example
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
Benefits of Hooks
Use state inside functional components.
Replace class components in most cases.
Make code simpler and easier to read.
Promote reusable logic through custom hooks.
Improve code organization.
4. Why do we need the useState Hook?

By default, React components do not remember changes to variables after rendering.

The useState hook allows React components to store and update data. Whenever the state changes, React automatically re-renders the component and updates the UI.

Without useState
let count = 0;

<button onClick={() => count++}>
  Increment
</button>

Here, the value of count changes, but React does not re-render the component, so the updated value is not displayed.

With useState
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}

When setCount() is called:

The state value is updated.
React detects the change.
The component re-renders.
The UI displays the updated value.
Syntax
const [state, setState] = useState(initialValue);
state – Current value.
setState – Function used to update the value.
initialValue – The initial state.

Example:

const [name, setName] = useState("Tanu");

Initially:

name = "Tanu"

Updating the state:

setName("Thanujashree");

React automatically re-renders the component and displays the new value.