const path = require('path');

const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, '../ui-dist')));

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
