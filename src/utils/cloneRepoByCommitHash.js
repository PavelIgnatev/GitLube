const { execFile, rmdir } = require('../utils/promisify.js');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

module.exports.cloneRepoByCommitHash = async (
  branchName,
  url,
  commitHash,
  command,
  id,
  test = false
) => {
  if (!test) {
    const repoPath = path.resolve(os.tmpdir(), id);
    try {
      await execFile('git', [
        'clone',
        '-b',
        branchName,
        `https://${process.env.GITHUB_ACCESS_KEY}@github.com/${url}.git`,
        repoPath,
      ]);

      await execFile('git', ['checkout', commitHash], { cwd: repoPath });

      const execAsyncEnv = {
        ...process.env,
        FORCE_COLOR: 3,
        TERM: 'xterm-256color',
      };
      execAsyncEnv.npm_config_production = 'false';

      const result = await execAsync(command, {
        cwd: repoPath,
        env: execAsyncEnv,
        shell: true,
      });

      await rmdir(repoPath, true);

      return result.stdout + `\n[1;33m${result.stderr}`;
    } catch (error) {
      await rmdir(repoPath, true);
      throw error.stderr;
    }
  } else {
    return '6.14.13';
  }
};
