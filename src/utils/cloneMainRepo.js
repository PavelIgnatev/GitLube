const { execFile, rmdir } = require('./promisify.js');
const path = require('path');
const repoPath = path.resolve(__dirname, '../../repo');

module.exports.cloneMainRepo = async (url, branchName) => {
  try {
    //Cначала проверяем, есть ли такой реп, чтобы не удалять папку с предыдущим сохраненным репом зря
    //Это может вызвать ошибки в будущем, когда мы будем менять настройки на клиенте,
    //не сохранятся настройки из-за ошибки, но реп на нашем api удалится
    if (
      JSON.parse(
        (
          await execFile('curl', [
            '-H',
            `Authorization: token ${process.env.GITHUB_KEY}`,
            `https://api.github.com/repos/${url}`,
          ])
        ).stdout
      ).message !== 'Not Found'
    ) {
      //Проверка на то, существует ли такой branch
      if (
        JSON.parse(
          (
            await execFile('curl', [
              '-H',
              `Authorization: token ${process.env.GITHUB_KEY}`,
              `https://api.github.com/repos/${url}/branches`,
            ])
          ).stdout
        ).find((item) => item.name === branchName)
      ) {
        //Удаляем папочку рекурсивно если такой репозиторий существет
        //На всякий случай, чтобы точно удалился
        await rmdir(repoPath, true);
        //Клонируем репозиторий
        return await execFile('git', [
          'clone',
          '-b',
          branchName,
          `https://${process.env.GITHUB_KEY}@github.com/${url}.git`,
          repoPath,
        ]);
      } else {
        throw {
          message: 'Your master branch was not found, default branch: main',
        };
      }
    } else {
      //Кидаем ошибку, что репозиторий не существует, не удаляя предыдущую папку с репом
      throw { message: 'This repository was not found, it may be private' };
    }
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};
