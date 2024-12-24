# Broken App Issues

1. Missing express.json Middleware

    Problem:
        The app did not include app.use(express.json()), which is required to parse JSON request bodies. As a result, req.body was undefined, causing the app to fail when attempting to access req.body.developers.
    Fix:
        Added app.use(express.json()) to parse JSON request bodies.

2. Incorrect Handling of Asynchronous Operations

    Problem:
        The results variable in the original code was an array of unresolved Promises because Array.prototype.map does not wait for asynchronous operations.
        The subsequent results.map call attempted to access .data on unresolved Promises, causing the app to fail.
    Fix:
        Wrapped the map logic in a Promise.all to resolve all Promises concurrently before accessing the data.

3. Lack of Error Handling for Invalid Input

    Problem:
        The app assumed that the developers field in req.body was always present and valid. If it was missing or not an array, the app would crash or behave unexpectedly.
    Fix:
        Added validation to check if developers is an array. If not, the app responds with a 400 Bad Request error.

4. No Error Handling for API Failures

    Problem:
        The app did not handle errors from GitHub API requests, leading to crashes if an API request failed (e.g., due to an invalid username or network issue).
    Fix:
        Wrapped each API request in a try-catch block. If an API request fails, the app logs the error and returns fallback data for that username.

5. Missing Error-Handling Middleware

    Problem:
        Errors in the app were not handled properly, and there was no centralized error-handling middleware to respond with a consistent error message.
    Fix:
        Added error-handling middleware to catch unexpected errors and return a 500 Internal Server Error response.

6. Inefficient Sequential API Calls

    Problem:
        The original implementation used map with await, effectively making API calls one-by-one. This was slow and inefficient.
    Fix:
        Refactored the code to use Promise.all, allowing all API requests to be made concurrently.

7. Hardcoded Error Messages

    Problem:
        The app did not provide meaningful or consistent error messages when things went wrong.
    Fix:
        Improved error messages for invalid input and failed API calls, making debugging easier and the app more user-friendly.