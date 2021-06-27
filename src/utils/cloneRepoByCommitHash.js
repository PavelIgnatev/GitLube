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
      env: { ...process.env, FORCE_COLOR: 3, TERM: 'xterm-256color' },
    });
    rmdir(repoPath, true);
    rmdir(repoPath, true);

    return result.stdout + `\n[1;33m${result.stderr}`;
  } catch (error) {
    rmdir(repoPath, true);
    throw error.stderr;
  }
};
