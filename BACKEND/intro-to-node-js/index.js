const express = require('express');

const app = express();
console.log(__dirname);

//Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/about', (req, res) => {
  res.send('Hey! You just got to the about page');
});

// root route
app.get('*', (req, res) => {
  res.send('<h1>  404! Page not found </h1>');
});

app.listen(8080, () => {
  console.log('app started on port 8080');
});
