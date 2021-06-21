const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем текст коммита по commitHash
module.exports.getCommitMessage = async (commitHash) => {
  try {
    return (
      await execFile('git', ['show', '-s', '--format=%B', commitHash], {
        cwd: path.resolve(__dirname, '../../repo'),
      })
    ).stdout.trim();
  } catch (error) {
    console.error(error.message);
    throw { message: 'Commit message not found' };
  }
};
