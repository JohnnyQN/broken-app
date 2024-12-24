const fs = require('fs');
const axios = require('axios');
const path = require('path');

/**
 * Main function to process URLs from a file.
 * @param {string} filename - The input file containing URLs.
 */
async function processUrls(filename) {
  try {
    // Read file contents
    const fileContents = fs.readFileSync(filename, 'utf8');
    const urls = fileContents.split('\n').filter(url => url.trim() !== '');

    // Download and save all URLs concurrently
    const downloadPromises = urls.map(downloadAndSaveUrl);
    await Promise.all(downloadPromises);

    console.log('Finished processing all URLs.');
  } catch (err) {
    console.error(`Error reading file "${filename}":`, err.message);
    process.exit(1); // Exit the script with an error code
  }
}

/**
 * Download a URL and save its contents to a file.
 * @param {string} url - The URL to download.
 */
async function downloadAndSaveUrl(url) {
  try {
    const response = await axios.get(url); // Make a GET request to the URL
    const hostname = new URL(url).hostname; // Extract the hostname
    const outputFilename = path.join(__dirname, hostname);

    // Write the response data to a file
    fs.writeFileSync(outputFilename, response.data);
    console.log(`Wrote to ${hostname}`);
  } catch (err) {
    console.error(`Couldn't download ${url}:`, err.message);
  }
}

/**
 * Entry point: Read command-line arguments and start processing.
 */
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = args[0];
processUrls(filename);
