const { execFile } = require('child_process');

const path = require('path');
//Получаем автора по commitHash
module.exports.getAuthor = (commitHash) => {
  return new Promise((resolve, reject) => {
    execFile(
      'git',
      ['show', commitHash],
      { cwd: path.resolve(__dirname, '../../repo') },
      (err, out) => {
        if (err) reject(err);
        resolve(out.split('Author: ')[1].split('>')[0] + '>');
      }
    );
  });
};
