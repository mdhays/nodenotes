'use strict';

const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('server route');
});


app.listen(3000, () => {
  console.log(`nodenotes server running on port: ${port}`)
});