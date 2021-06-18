const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем автора по commitHash
module.exports.getAuthor = async (commitHash) => {
  return (
    await execFile('git', ['show', '-s', '--format=%an', commitHash], {
      cwd: path.resolve(__dirname, '../../repo'),
    })
  ).stdout.trim();
};
