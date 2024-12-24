### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callbacks: Functions passed as argumetns to be executed later.
Promises: Objects representing eventual completion or failure of an asynchronous operation, with .then() and .catch() for chaining
Async/Await: This allows asynchronous code to look and behave like synchronous code.
Event loop: Managing asynchronous operations using events and tasks (e.g., setTimeout, setInerval).
Oveservables: Provided by libraries like RxJS, used for handling streams of asynchronous data.

- What is a Promise?
A promise is an object representing a value that may be available now, in the future, or never. It has 3 states:
  Pending: initial state, not resolved or rejected.
  Fulfilled: The operation completed successfully.
  Rejected: The operation failed.

Promises allow chaining with .then() for success and .catch() for errors, making asynchronous code more readable.

- What are the differences between an async function and a regular function?
Async Functions:
  Always return a Promise.
  Can use await to pause execution until a Promise resolves or rejects.
  Handles errors using try/catch.

Regular Function:
  Returns the value directly (not wrapped in a Promise).
  Executes synchronously unless it explicitly handles Promises.

- What is the difference between Node.js and Express.js?
Node.js:
  JavaScript runtime for building server-side applications.
  Provides built-in modules for file system, HTTP, streams, and more

Express.js:
  Web framework for Node.js
  Simplifies handling routes, middleware, and HTTP requests/responses
  Provides tools for building web servers

- What is the error-first callback pattern?
The error-first callback pattern is a convention where the first argument of a callback is an error object (or null if no error occurred). Subsequent arguments contain the result of the operation.

- What is middleware?
Middleware is a function in Express.js that has access to:
  1. The request object
  2. The response object.
  3. The next function.

It performs operations like logging, parsing, authentication, and routing. Middlewear can:
  Modify the requets/response.
  End the response.
  Pass control tot he next middleware using next().

- What does the `next` function do?
The next function in middleware:
  Passes control to the next middleweare function in the stack.
  If there's no more middleware, it passes control to the route handler or ends the response. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
Performance:
  The await statements are sequential, making requests one at a time.
  This is inefficient; the request could be made in parallel.

Structure:
  The order of returned users does not match the order execution. Joel is returned after matt.

Naming:
  Variable names like elie, joel, and matt are too specific and not scalable for multiple users.
