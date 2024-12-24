const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * POST /
 * Fetch GitHub user data for given developer usernames.
 */
app.post('/', async (req, res, next) => {
  try {
    // Validate the request body
    const { developers } = req.body;
    if (!Array.isArray(developers)) {
      return res.status(400).json({ error: "Invalid input. 'developers' should be an array." });
    }

    // Fetch GitHub user data concurrently
    const results = await Promise.all(
      developers.map(async (username) => {
        try {
          const response = await axios.get(`https://api.github.com/users/${username}`);
          return { name: response.data.name || 'N/A', bio: response.data.bio || 'N/A' };
        } catch (err) {
          console.error(`Error fetching data for ${username}:`, err.message);
          return { name: `Error: ${username}`, bio: 'Data not available' };
        }
      })
    );

      return res.json(results);
  } catch (err) {
    console.error('Error processing request:', err.message);
    next(err); // Pass to the error handler
  }
});

// Add a simple GET / route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Broken App! Use POST / to fetch GitHub developer data.');
});


// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
