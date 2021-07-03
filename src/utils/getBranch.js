const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем branch по commitHash
module.exports.getBranch = async (commitHash, repoLink = '../../repo') => {
  try {
    return (
      await execFile('git', ['branch', '-a', '--contains', commitHash], {
        cwd: path.resolve(__dirname, repoLink),
      })
    ).stdout
      .replace('* ', '')
      .trim()
      .split('/')
      .pop();
  } catch (error) {
    console.error(error.message);
    throw { message: 'Commit hash is invalid' };
  }
};
