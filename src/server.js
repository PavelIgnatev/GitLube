const express = require('express');

const { PORT } = require('./config');
const { apiRouter } = require('./router');
const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


