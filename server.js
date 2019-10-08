const express = require('express');
const server = express();
const port = 4000;

server.get("/json", (req, res) => {
  res.json({ message: "Hello world" });
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
