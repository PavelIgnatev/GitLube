const { execFile } = require('child_process');

const path = require('path');
//Получаем branch по commitHash
module.exports.getBranch = (commitHash) => {
  return new Promise((resolve, reject) => {
    execFile(
      'git',
      ['branch', '--contains', commitHash],
      { cwd: path.resolve(__dirname, '../../repo') },
      (err, out) => {
        if (err) reject(err);
        console.log(out)
        resolve(out.replace('* ', '').trim());
      }
    );
  });
};
