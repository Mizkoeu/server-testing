const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('HEY THIS IS MY NEW SERVER!!')
});
app.listen(3000, () => console.log('Server running on port 3000'));
