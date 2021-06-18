const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем branch по commitHash
module.exports.getBranch = async (commitHash) => {
  return (
    await execFile('git', ['branch', '--contains', commitHash], {
      cwd: path.resolve(__dirname, '../../repo'),
    })
  ).stdout
    .replace('* ', '')
    .trim();
};
