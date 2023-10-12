const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hi there!!');
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});