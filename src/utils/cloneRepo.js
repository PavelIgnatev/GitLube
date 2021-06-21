const { execFile, rmdir } = require('./promisify.js');
const path = require('path');
const repoPath = path.resolve(__dirname, '../../repo');

module.exports.cloneRepo = async (url, branchName) => {
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
    try {
      //Удаляем папочку рекурсивно если такой репозиторий существет
      await rmdir(repoPath, true);
      //Клонируем репозиторий
      return await execFile('git', [
        'clone',
        '-b',
        branchName,
        `https://${process.env.GITHUB_KEY}@github.com/${url}.git`,
        repoPath,
      ]);
    } catch (error) {
      console.error(error.message);
      throw { message: 'Branch Not Found' };
    }
  } else {
    //Кидаем ошибку, что репозиторий не существует, не удаляя предыдущую папку с репом
    throw { message: 'Repository Not Found or Repository in Privat' };
  }
};
