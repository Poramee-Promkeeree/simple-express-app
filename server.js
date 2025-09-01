const express = require("express");

const app = express();
const port = 4000;


// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handling
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

// Simple function: convert text to uppercase
function toUpperCase(text) {
  return text.toUpperCase();
}

// Route to use the toUpperCase function
app.get("/toupper", (req, res) => {
  // Get text from query string, e.g., /toupper?text=hello
  const text = req.query.text;
  if (!text) {
    return res.status(400).send("Missing 'text' query parameter");
  }
  const result = toUpperCase(text);
  res.send(`Result: ${result}`);
});

