//добавление сборки в очередь
const getAuthor = require('../../utils/getAuthor.js').getAuthor;
const getCommitMessage =
  require('../../utils/getCommitMessage.js').getCommitMessage;
const getBranch = require('../../utils/getBranch.js').getBranch;
const { axios } = require('../../config/index.js');
const { cloneRepo } = require('../../utils/cloneRepo.js');

module.exports = async (req, res) => {
  let buildId = null;
  try {
    // Получаем repoName и mainBranch
    const { repoName, mainBranch } = (
      await axios.get('https://shri.yandex/hw/api/conf')
    ).data.data;
    //Обновляем репозиторий
    await cloneRepo(repoName, mainBranch);

    const message = await getCommitMessage(req.params.commitHash);
    const author = await getAuthor(req.params.commitHash);
    const branch = await getBranch(req.params.commitHash);

    //Получаем buildId
    buildId = (
      await axios.post('https://shri.yandex/hw/api/build/request', {
        commitMessage: message,
        commitHash: `${req.params.commitHash}`,
        branchName: branch,
        authorName: author,
      })
    ).data.data.id;
    //Оповещаем о запуске билда
    await axios.post('https://shri.yandex/hw/api/build/start', {
      buildid: buildId,
      dateTime: new Date(),
    });
    //Успешно завершаем
    await axios.post('https://shri.yandex/hw/api/build/finish', {
      buildId: buildId,
      duration: 0,
      success: true,
      buildLog: 'Тут должна была быть ваша реклама',
    });

    return res.json({ buildId: buildId });
  } catch (error) {
    //Если произошла ошибка, то завершаем с ошибкой соответственно
    await axios.post('https://shri.yandex/hw/api/build/cancel', {
      buildId: buildId,
    });

    console.error(error.message);
    return res.status(500).json(error);
  }
};
