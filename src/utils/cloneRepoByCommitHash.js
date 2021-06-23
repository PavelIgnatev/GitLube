const { execFile, rmdir } = require('../utils/promisify.js');
const path = require('path');

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

module.exports.cloneRepoByCommitHash = async (
  branchName,
  url,
  commitHash,
  command,
  id
) => {
  const repoPath = path.resolve(__dirname, '../../CHB/' + id);
  try {
    await execFile('git', [
      'clone',
      '-b',
      branchName,
      `https://${process.env.GITHUB_KEY}@github.com/${url}.git`,
      repoPath,
    ]);
    await execFile('git', ['checkout', commitHash], { cwd: repoPath });

    const result = await execAsync(command, {
      cwd: path.resolve(__dirname, '../../CHB/' + id),
    });

    rmdir(repoPath, true);
    return result.stdout;
  } catch (error) {
    rmdir(repoPath, true);
    throw error.stderr;
  }
};
