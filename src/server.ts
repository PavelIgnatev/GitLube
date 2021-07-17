import express from 'express'
import { setupMiddlewares } from './middlewares'
import { PORT } from './config'
import { apiRouter, mainRouter } from './router'

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
