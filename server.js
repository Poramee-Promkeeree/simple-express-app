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

app.get("/about", (req, res) => 
  res.send("About page");
// missing closing parenthesis and curly brace to cause syntax error

// Simple function: add two numbers
function add(a, b) {
  return a + b;
}

// Route to use the add function
app.get("/add", (req, res) => {
  // Get numbers from query string, e.g., /add?a=2&b=3
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Invalid numbers");
  }
  const result = add(a, b);
  res.send(`Result: ${result}`);
});

