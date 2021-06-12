const { execFile } = require('child_process');
const path = require('path');
let fs = require('fs');
const repoPath = path.resolve(__dirname, '../../repo');

module.exports.cloneRepo = (url) => {
  return new Promise((resolve, reject) => {
    fs.rmdir(repoPath, { recursive: true }, () => {
      execFile('git', ['clone', url, repoPath], (err, out) => {
        if (err) reject(err);
        resolve(out);
      });
    });
  });
};
