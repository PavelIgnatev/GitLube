const getBuilds = require('./getBuilds.js');
const getSettings = require('./getSettings.js');
const postSettings = require('./postSettings.js');
const getBuildsBuildId = require('./getBuildsBuildId.js');
const getBuildsBuildIdLogs = require('./getBuildsBuildIdLogs.js');
const postBuildsCommitHash = require('./postBuildsCommitHash.js');

module.exports = {
  getBuilds,
  getSettings,
  getBuildsBuildId,
  getBuildsBuildIdLogs,
  postSettings,
  postBuildsCommitHash,
};
