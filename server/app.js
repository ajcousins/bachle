const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(
  '/bachle/static',
  express.static(path.join(__dirname, '../client/build', 'static'))
);
app.use('/bachle', express.static(path.join(__dirname, '../client', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
