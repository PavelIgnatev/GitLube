const express = require('express');
const cache = require('./utils/cache.js');
const api = require('./controllers/api');

const apiRouter = new express.Router();

apiRouter.get('/settings', api.getSettings);
apiRouter.post('/settings', api.postSettings);
apiRouter.get('/builds', api.getBuilds);
apiRouter.post('/builds/:commitHash', api.postBuildsCommitHash);
apiRouter.get('/builds/:buildId', api.getBuildsBuildId);
apiRouter.get('/builds/:buildId/logs', cache(1000), api.getBuildsBuildIdLogs);

module.exports.apiRouter = apiRouter;
