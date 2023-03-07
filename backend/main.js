const express = require('express');
const alkoController = require('./controllers/alko');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.get('/alko', alkoController.getHinnasto);
app.put('/alko/:id', alkoController.incrementOrderAmount);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
