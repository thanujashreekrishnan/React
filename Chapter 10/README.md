# Chapter 10 – Jo Dikhta Hai Vo Bikta Hai

## Theory Assignment

---

# 1. Explore all the ways of writing CSS

There are multiple ways to write CSS in a React application.

The commonly used approaches are:

1. Normal CSS
2. Inline CSS
3. CSS Modules
4. SCSS/Sass
5. Styled Components
6. Emotion
7. Utility-first CSS frameworks such as Tailwind CSS

Let's understand each one.

---

## 1.1 Normal CSS

We can create a separate `.css` file and import it into our component.

### App.css

```css
.heading {
    color: blue;
    font-size: 30px;
}
```

### App.jsx

```jsx
import "./App.css";

const App = () => {
    return (
        <h1 className="heading">
            Hello React
        </h1>
    );
};

export default App;
```

### Advantages

* Simple and easy to understand.
* Good for small applications.
* CSS and JavaScript remain separate.

### Disadvantage

Class names are generally global, so the same class name can accidentally affect other components.

---

# 1.2 Inline CSS

CSS can be written directly inside a JSX element using the `style` prop.

```jsx
const App = () => {
    return (
        <h1
            style={{
                color: "blue",
                fontSize: "30px"
            }}
        >
            Hello React
        </h1>
    );
};
```

Notice that CSS properties use JavaScript-style naming:

```js
fontSize
```

instead of:

```css
font-size
```

### Advantages

* Easy for small, component-specific styles.
* Styles can be dynamically generated using JavaScript.

### Disadvantages

* Can make JSX difficult to read.
* Not convenient for large amounts of CSS.
* Some CSS features such as pseudo-classes (`:hover`) are not directly available through normal inline styles.

---

# 1.3 CSS Modules

CSS Modules allow us to create CSS whose class names are scoped to a particular component/module.

For example:

```text
Button.module.css
```

### Button.module.css

```css
.button {
    background: blue;
    color: white;
    padding: 10px;
}
```

### Button.jsx

```jsx
import styles from "./Button.module.css";

const Button = () => {
    return (
        <button className={styles.button}>
            Click Me
        </button>
    );
};

export default Button;
```

The class is imported as a JavaScript object:

```js
styles.button
```

The bundler generates a scoped class name so that styles are less likely to collide with other components.

### Advantages

* Avoids many global class-name conflicts.
* Styles are associated with a component/module.
* Easy to use with React.

---

# 1.4 SCSS / Sass

**Sass** is a CSS preprocessor that provides additional features on top of CSS.

SCSS syntax looks very similar to normal CSS.

Example:

```scss
$primary-color: blue;

.card {
    color: $primary-color;

    .title {
        font-size: 20px;
    }
}
```

The nested structure is then compiled into regular CSS.

### Advantages

* Variables.
* Nesting.
* Mixins.
* Functions.
* Better organization for large stylesheets.

Example:

```scss
.card {
    padding: 20px;

    &:hover {
        transform: scale(1.05);
    }
}
```

---

# 1.5 Styled Components

Styled Components is a CSS-in-JS library that allows us to create styled React components.

Example:

```jsx
import styled from "styled-components";

const Button = styled.button`
    background: blue;
    color: white;
    padding: 10px;
`;

const App = () => {
    return <Button>Click Me</Button>;
};
```

Here, CSS is written inside JavaScript using tagged template literals.

### Advantages

* Styles can be colocated with components.
* Supports dynamic styling.
* Automatically generates scoped class names.

### Disadvantages

* Requires an additional library.
* Adds another abstraction to the application.
* Runtime/build considerations depend on the CSS-in-JS solution.

---

# 1.6 Emotion

Emotion is another CSS-in-JS library.

Example:

```jsx
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const buttonStyle = css`
    background: blue;
    color: white;
    padding: 10px;
`;

const App = () => {
    return (
        <button css={buttonStyle}>
            Click Me
        </button>
    );
};
```

Emotion provides APIs for writing CSS directly in JavaScript/React.

---

# 1.7 Tailwind CSS

Tailwind CSS is a **utility-first CSS framework**.

Instead of creating our own CSS class for every component, we compose predefined utility classes.

Example:

```jsx
const App = () => {
    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Click Me
        </button>
    );
};
```

Here:

```text
bg-blue-500 → background color
text-white  → text color
px-4        → horizontal padding
py-2        → vertical padding
rounded     → border radius
```

### Advantages

* Fast development.
* Consistent design system.
* Less custom CSS.
* Utility classes can be composed directly in JSX.
* Responsive styling is convenient.

---

# CSS Approaches – Quick Comparison

| Approach          | Main idea                                  |
| ----------------- | ------------------------------------------ |
| Normal CSS        | Separate global CSS files                  |
| Inline CSS        | Styles written directly in JSX             |
| CSS Modules       | Component/module-scoped CSS                |
| SCSS/Sass         | CSS with additional preprocessing features |
| Styled Components | CSS-in-JS using styled components          |
| Emotion           | CSS-in-JS library                          |
| Tailwind CSS      | Utility classes composed in markup         |

### Simple way to remember

```text
Normal CSS       → Separate CSS file
Inline CSS       → style={{ ... }}
CSS Modules      → Component-scoped CSS
SCSS             → CSS + extra features
Styled Components→ CSS inside JS
Emotion          → CSS-in-JS
Tailwind         → Utility classes
```

---

# 2. How do we configure Tailwind?

Tailwind configuration depends on the version of Tailwind being used.

For the traditional Tailwind v3 setup, we commonly install Tailwind and PostCSS:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Then generate the configuration files:

```bash
npx tailwindcss init -p
```

This creates files such as:

```text
tailwind.config.js
postcss.config.js
```

Depending on the project setup and Tailwind version, the exact configuration can differ.

### Traditional Tailwind configuration

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],

    theme: {
        extend: {}
    },

    plugins: []
};
```

Then we add Tailwind's directives to our CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

For example:

### index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then import it into our application entry point:

```jsx
import "./index.css";
```

Now we can use Tailwind utility classes:

```jsx
<h1 className="text-3xl font-bold text-blue-500">
    Hello Tailwind
</h1>
```

---

# 3. In `tailwind.config.js`, what do all the keys mean?

A common Tailwind v3 configuration looks like:

```js
module.exports = {

    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],

    theme: {
        extend: {}
    },

    plugins: []
};
```

The important keys are:

```text
content
theme
extend
plugins
```

Let's understand each one.

---

# 3.1 `content`

The `content` property tells Tailwind **which files it should scan for Tailwind class names**.

Example:

```js
content: [
    "./src/**/*.{js,jsx,ts,tsx}"
]
```

This means:

> Scan files inside the `src` directory with extensions such as `.js`, `.jsx`, `.ts`, and `.tsx`.

Suppose we write:

```jsx
<div className="text-red-500">
    Hello
</div>
```

Tailwind scans our source files, detects that `text-red-500` is being used, and includes the corresponding CSS in the generated output.

### Why is `content` important?

It helps Tailwind generate only the CSS that is needed by the application.

So:

```text
Source files
     ↓
Tailwind scans them
     ↓
Finds used utility classes
     ↓
Generates required CSS
```

---

# 3.2 `theme`

The `theme` section controls Tailwind's design system and default theme values.

For example:

```js
theme: {
    colors: {
        primary: "#FF0000"
    },

    spacing: {
        "100": "25rem"
    }
}
```

The theme can control things such as:

* Colors
* Spacing
* Font sizes
* Fonts
* Breakpoints
* Border radius
* Shadows
* Width
* Height

### Example

```js
theme: {
    extend: {
        colors: {
            primary: "#FF0000"
        }
    }
}
```

Then we can use:

```jsx
<div className="text-primary">
    Hello
</div>
```

---

# 3.3 `extend`

`extend` is used when we want to **add our own values to Tailwind's existing theme instead of replacing the defaults**.

Example:

```js
theme: {
    extend: {
        colors: {
            primary: "#FF0000"
        }
    }
}
```

Tailwind's default theme remains available, and we add our custom `primary` color.

### Why use `extend`?

Suppose Tailwind already provides:

```text
text-red-500
text-blue-500
text-green-500
```

and we want to add:

```text
text-primary
```

We can use:

```js
extend: {
    colors: {
        primary: "#FF0000"
    }
}
```

### Important distinction

```js
theme: {
    colors: {
        primary: "#FF0000"
    }
}
```

defines/replaces the relevant theme configuration.

Whereas:

```js
theme: {
    extend: {
        colors: {
            primary: "#FF0000"
        }
    }
}
```

extends the existing theme.

---

# 3.4 `plugins`

The `plugins` section allows us to add Tailwind plugins that provide additional functionality or utilities.

Example:

```js
plugins: []
```

If we install a Tailwind plugin, we can add it here.

For example, conceptually:

```js
plugins: [
    require("some-tailwind-plugin")
]
```

Plugins can add:

* New utilities
* New components
* Additional variants
* Other Tailwind functionality

---

# `tailwind.config.js` – Easy Explanation

```js
module.exports = {

    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],

    theme: {
        extend: {
            colors: {
                primary: "#FF0000"
            }
        }
    },

    plugins: []
};
```

Think of it like this:

```text
content
   ↓
Where should Tailwind look?

theme
   ↓
What does the design system look like?

extend
   ↓
What custom values do I want to add?

plugins
   ↓
What additional Tailwind functionality do I want?
```

---

# 4. Why do we have a `.postcssrc` file?

First, it is useful to understand **PostCSS**.

PostCSS is a tool that processes CSS using plugins.

It allows build tools to transform CSS during the build process.

For example:

```text
CSS
 ↓
PostCSS
 ↓
Plugins
 ↓
Processed CSS
```

Tailwind CSS can be integrated into a PostCSS pipeline.

A project may contain a PostCSS configuration file such as:

```text
.postcssrc
```

or:

```text
.postcssrc.json
```

or:

```text
postcss.config.js
```

The exact filename depends on the project's tooling.

---

## What does `.postcssrc` do?

It tells PostCSS **which plugins/configuration should be used when processing CSS**.

For example, a configuration could look conceptually like:

```json
{
    "plugins": {
        "tailwindcss": {},
        "autoprefixer": {}
    }
}
```

The build process can then use:

```text
Your CSS
   ↓
PostCSS
   ↓
Tailwind CSS plugin
   ↓
Autoprefixer
   ↓
Final CSS
```

### Why is PostCSS useful with Tailwind?

Tailwind needs to process our CSS and generate the utility classes that we use.

PostCSS provides the processing pipeline through which Tailwind can be integrated.

---

# `.postcssrc` vs `tailwind.config.js`

These two files have different responsibilities.

### `tailwind.config.js`

Controls **Tailwind itself**.

For example:

```js
content
theme
extend
plugins
```

It answers:

> "How should Tailwind generate my CSS?"

### `.postcssrc` / `postcss.config.js`

Controls **PostCSS and its plugins**.

It answers:

> "How should my CSS be processed?"

### Simple comparison

```text
tailwind.config.js
        ↓
Configures Tailwind

.postcssrc
        ↓
Configures PostCSS
```

---

# Important Note About Modern Tailwind Versions

Tailwind's setup has changed between major versions.

The configuration pattern above is the **traditional Tailwind v3-style setup**, which is commonly encountered in React learning projects.

In newer Tailwind versions, especially **Tailwind CSS v4**, the setup is different and a `tailwind.config.js` file is often not required for basic usage. Tailwind v4 uses a CSS-first configuration approach and has a different PostCSS integration.

Therefore, when working on a specific project, always check which Tailwind version the project is using before following an older tutorial.

---

# Quick Revision

| Topic                | One-line explanation                                                           |
| -------------------- | ------------------------------------------------------------------------------ |
| Normal CSS           | CSS written in separate `.css` files.                                          |
| Inline CSS           | CSS written directly using JSX's `style` prop.                                 |
| CSS Modules          | CSS scoped to a particular module/component.                                   |
| SCSS                 | CSS preprocessor with features such as nesting, variables, and mixins.         |
| Styled Components    | CSS-in-JS library for creating styled React components.                        |
| Emotion              | CSS-in-JS library.                                                             |
| Tailwind CSS         | Utility-first CSS framework.                                                   |
| `content`            | Tells Tailwind which source files to scan for class names.                     |
| `theme`              | Defines/configures Tailwind's design system.                                   |
| `extend`             | Adds custom values while preserving existing theme defaults.                   |
| `plugins`            | Adds additional Tailwind functionality through plugins.                        |
| PostCSS              | CSS processing tool that works through plugins.                                |
| `.postcssrc`         | Configuration file for PostCSS processing/plugins.                             |
| `tailwind.config.js` | Configuration file for Tailwind's theme/content/plugins in traditional setups. |

# Easy Way to Remember

```text
                 CSS
                  |
     ┌────────────┼────────────┐
     ↓            ↓            ↓
  Normal       Inline       Modules
    CSS          CSS           CSS
     |
     ├── SCSS / Sass
     |
     ├── CSS-in-JS
     │      ├── Styled Components
     │      └── Emotion
     |
     └── Tailwind CSS
              |
              ↓
       Utility Classes
```

For the Tailwind configuration:

```text
tailwind.config.js
        |
        ├── content  → Where to scan
        ├── theme    → Design system
        ├── extend   → Add custom values
        └── plugins  → Extra functionality

.postcssrc
        ↓
PostCSS configuration
        ↓
CSS processing pipeline
```
