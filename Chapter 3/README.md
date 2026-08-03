# Chapter 03 – Laying the Foundation

## 1. What is JSX?

* JSX (JavaScript XML) is a syntax extension for JavaScript that makes it easier to write HTML-like code inside JavaScript. It helps developers create React elements in a simple and readable way. JSX is not understood directly by the browser; it is converted into `React.createElement()` calls by Babel.

---

## 2. Superpowers of JSX

Some of the superpowers of JSX are:

* It makes the code more readable and easier to understand.
* It allows us to write HTML-like syntax inside JavaScript.
* We can embed JavaScript expressions using `{}`.
* It makes creating React elements much simpler than using `React.createElement()`.
* It helps organize UI code in a clean and maintainable way.

---

## 3. What is the role of the `type` attribute in the `<script>` tag? What options can we use?

The `type` attribute tells the browser what kind of script is being loaded.

Some commonly used values are:

### `type="text/javascript"`

This is the traditional JavaScript script type. It tells the browser that the script contains JavaScript. In modern HTML, this is the default value, so it can usually be omitted.

### `type="module"`

This tells the browser that the script is an ES Module. It allows us to use `import` and `export` statements and loads scripts in module scope.

Example:

```html
<script type="module" src="App.js"></script>
```

### Other values

The `type` attribute can also be used for non-JavaScript content, such as:

* `application/json`
* `importmap`

These are used for specific browser features and are less common in everyday React development.

---

## 4. Difference between `{TitleComponent}`, `{<TitleComponent />}`, and `{<TitleComponent></TitleComponent>}`

### `{TitleComponent}`

* This refers to the component function itself.
* It does **not** render the component.
* It simply represents the function reference.

Example:

```jsx
const TitleComponent = () => <h1>Hello</h1>;

console.log(TitleComponent);
```

---

### `<TitleComponent />`

* This renders the React component.
* This is the most common and recommended way to use a component.

Example:

```jsx
<TitleComponent />
```

---

### `<TitleComponent></TitleComponent>`

* This also renders the React component.
* It is exactly the same as `<TitleComponent />`.
* It is mainly used when we want to pass child elements between the opening and closing tags.

Example:

```jsx
<TitleComponent></TitleComponent>
```

or

```jsx
<TitleComponent>
  <p>Child Element</p>
</TitleComponent>
```

---

### Summary

| Syntax                              | Meaning                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------- |
| `{TitleComponent}`                  | Refers to the component function. It does **not** render the component. |
| `<TitleComponent />`                | Renders the component (self-closing syntax).                            |
| `<TitleComponent></TitleComponent>` | Also renders the component. Used when passing children if needed.       |
