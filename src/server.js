const express = require('express');

const { PORT } = require('./config');
const { apiRouter, mainRouter } = require('./router');
const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
