const express = require('express');

const api = require('./controllers/api');

const apiRouter = new express.Router();

apiRouter.get('/settings', api.getSettings);
apiRouter.post('/settings', api.postSettings);
apiRouter.get('/builds', api.getBuilds);
apiRouter.post('/builds/:commitHash', api.postBuildsCommitHash);
apiRouter.get('/builds/:buildId', api.getBuildsBuildId);
apiRouter.get('/builds/:buildId/logs', api.getBuildsBuildIdLogs);

exports.apiRouter = apiRouter;
