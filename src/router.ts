import express from 'express'
import { cache } from './utils/cache'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { Router } from 'express'
import { api } from './controllers/api'
import path from 'path'

const apiRouter: Router = Router()

apiRouter.get('/settings', api.getSettings);
apiRouter.post('/settings', api.postSettings);
apiRouter.get('/builds', api.getBuilds);
apiRouter.post('/builds/:commitHash', api.postBuildsCommitHash);
apiRouter.get('/builds/:buildId', api.getBuildsBuildId);
apiRouter.get('/builds/:buildId/logs', cache(1000), api.getBuildsBuildIdLogs);

const mainRouter: Router = Router()

if (process.env.NODE_ENV === 'production') {
  mainRouter.use(express.static(path.join(__dirname, '../client', 'build')));
  mainRouter.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
} else {
  mainRouter.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
}

export { mainRouter, apiRouter };
