# To-Do List Web App

Task 2 — Elevate Labs Web Development Internship

A dynamic front-end To-Do list built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools.

## Features
- Add tasks (button click or Enter key)
- Mark tasks complete/incomplete (checkbox toggle)
- Delete tasks
- Filter view: All / Active / Completed
- "Items left" counter
- Clear all completed tasks in one click
- Tasks persist in the browser via localStorage
- UI updates instantly with no page reload

## Tech / Concepts Used
- DOM manipulation (`createElement`, `innerHTML`, `dataset`)
- Event listeners and **event delegation** (single listener on the list handles all checkbox/delete clicks)
- `preventDefault()` to stop Enter key from submitting a form
- ES6 features: arrow functions, `const`/`let`, template literals, array methods (`filter`, `find`, `forEach`)
- `localStorage` for state persistence across page reloads

## Files
- `index.html` — structure
- `style.css` — styling
- `script.js` — app logic

## How to Run
Open `index.html` directly in a browser, or serve it with VS Code's Live Server extension for auto-reload during development.
