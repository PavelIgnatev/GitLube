const { execFile } = require('./promisify.js');

const path = require('path');
//Получаем автора по commitHash
module.exports.getAuthor = async (commitHash) => {
  try {
    return (
      await execFile('git', ['show', '-s', '--format=%an', commitHash], {
        cwd: path.resolve(__dirname, '../../repo'),
      })
    ).stdout.trim();
  } catch (error) {
    console.error(error.message);
    throw { message: 'Author not found' };
  }
};
