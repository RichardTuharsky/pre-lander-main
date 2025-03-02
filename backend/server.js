const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/user/register', (req, res) => {
  // Handle form submission logic here
  res.send('Registration successful!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});