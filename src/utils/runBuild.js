const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);
const path = require('path');

//Получаем автора по commitHash
module.exports.runBuild = async (command) => {
  try {
    return (
      await execAsync(command, {
        cwd: path.resolve(__dirname, '../../repo'),
      })
    ).stdout;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
