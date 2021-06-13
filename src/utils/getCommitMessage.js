const { execFile } = require('child_process');

const path = require('path');
//Получаем текст коммита по commitHash
module.exports.getCommitMessage = (commitHash) => {
  return new Promise((resolve, reject) => {
    execFile(
      'git',
      ['show', '-s', '--format=%B', commitHash],
      { cwd: path.resolve(__dirname, '../../repo') },
      (err, out) => {
        if (err) reject(err);
        resolve(out.trim());
      }
    );
  });
};
