const { generateId } = require('./generateId.js');
const { execFile } = require('../utils/promisify.js');
const path = require('path');
const id = generateId();
const repoPath = path.resolve(__dirname, '../../CHB/' + id);

module.exports.cloneRepoByCommitHash = async (
  branchName = 'main',
  url = 'PavelIgnatev/react-app',
  commitHash = 'f4b93e67c4f4c598a8928249572dfc8c5c39f539'
) => {
  await execFile('git', [
    'clone',
    '-b',
    branchName,
    `https://${process.env.GITHUB_KEY}@github.com/${url}.git`,
    repoPath,
  ]);
  await execFile('git', ['checkout', commitHash, repoPath]);
};
