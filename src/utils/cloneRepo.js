const { execFile, rmdir } = require('./promisify.js');
const path = require('path');
const repoPath = path.resolve(__dirname, '../../repo');

module.exports.cloneRepo = async (url, branchName) => {
  //Удаляем папочку рекурсивно
  await rmdir(repoPath, true);
  //Клонируем репозиторий
  return execFile('git', ['clone', '-b', branchName, url, repoPath]);
};
