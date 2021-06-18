const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем текст коммита по commitHash
module.exports.getCommitMessage = async (commitHash) => {
  return (
    await execFile('git', ['show', '-s', '--format=%B', commitHash], {
      cwd: path.resolve(__dirname, '../../repo'),
    })
  ).stdout.trim();
};
