const express = require('express');
const setupMiddlewares = require('./middlewares');
const { PORT } = require('./config');
const { apiRouter, mainRouter } = require('./router');

const app = express();

// setup other
setupMiddlewares(app);

// api routes
app.use('/api', apiRouter);

// main routes
app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Приложение успешно запущен на порту ${PORT}`);
});
