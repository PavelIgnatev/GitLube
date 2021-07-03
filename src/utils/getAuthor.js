const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем автора по commitHash
module.exports.getAuthor = async (commitHash, repoLink = '../../repo') => {
  try {
    return (
      await execFile('git', ['show', '-s', '--format=%an', commitHash], {
        cwd: path.resolve(__dirname, repoLink),
      })
    ).stdout.trim();
  } catch (error) {
    console.error(error.message);
    throw { message: 'Commit hash is invalid' };
  }
};
