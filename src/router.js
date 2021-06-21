const express = require('express');
const cache = require('./utils/cache.js');
const api = require('./controllers/api');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const apiRouter = new express.Router();

apiRouter.get('/settings', api.getSettings);
apiRouter.post('/settings', api.postSettings);
apiRouter.get('/builds', api.getBuilds);
apiRouter.post('/builds/:commitHash', api.postBuildsCommitHash);
apiRouter.get('/builds/:buildId', api.getBuildsBuildId);
apiRouter.get('/builds/:buildId/logs', cache(1000), api.getBuildsBuildIdLogs);

const mainRouter = new express.Router();

mainRouter.use(
  '/',
  process.env.NODE_ENV === 'production'
    ? express.static(path.resolve(__dirname, '..', 'client', 'build'))
    : createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
      })
);
exports.mainRouter = mainRouter;
exports.apiRouter = apiRouter;
