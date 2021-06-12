const { execFile } = require('child_process');
const path = require('path');
let fs = require('fs');
const repoPath = path.resolve(__dirname, '../../repo');

module.exports.cloneRepo = (url) => {
  fs.rmdir(repoPath, { recursive: true }, (error) => {
    if (!error) {
      return execFile('git', ['clone', url, repoPath]);
    }
    throw error;
  });
};
