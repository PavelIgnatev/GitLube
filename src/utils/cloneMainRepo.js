const { execFile, rmdir } = require('./promisify.js');
const path = require('path');
const repoPath = path.resolve(__dirname, '../../repo');

module.exports.cloneMainRepo = async (url, branchName) => {
  try {
    const postGithub = async (url) =>
      JSON.parse(
        (
          await execFile('curl', [
            '-H',
            `Authorization: token ${process.env.GITHUB_ACCESS_KEY}`,
            url,
          ])
        ).stdout
      );

    const isReposotory = await postGithub(
      `https://api.github.com/repos/${url}`
    );

    const isBranch = await postGithub(
      `https://api.github.com/repos/${url}/branches`
    );

    //Cначала проверяем, есть ли такой реп, чтобы не удалять папку с предыдущим сохраненным репом зря
    //Это может вызвать ошибки в будущем, когда мы будем менять настройки на клиенте,
    //не сохранятся настройки из-за ошибки, но реп на нашем api удалится

    if (isReposotory.message !== 'Not Found') {
      //Проверка на то, существует ли такой branch
      if (isBranch.find((item) => item.name === branchName)) {
        //Удаляем папочку рекурсивно если такой репозиторий существет
        await rmdir(repoPath, true);
        //Клонируем репозиторий

        return await execFile('git', [
          'clone',
          `https://${process.env.GITHUB_ACCESS_KEY}@github.com/${url}.git`,
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
