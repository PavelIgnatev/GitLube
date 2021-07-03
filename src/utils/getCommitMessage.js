const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем текст коммита по commitHash
module.exports.getCommitMessage = async (
  commitHash,
  repoLink = '../../repo'
) => {
  try {
    return (
      await execFile('git', ['show', '-s', '--format=%B', commitHash], {
        cwd: path.resolve(__dirname, repoLink),
      })
    ).stdout.trim();
  } catch (error) {
    console.error(error.message);
    throw { message: 'Commit hash is invalid' };
  }
};
