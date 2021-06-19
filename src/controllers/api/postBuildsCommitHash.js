//добавление сборки в очередь
const getAuthor = require('../../utils/getAuthor.js').getAuthor;
const getCommitMessage =
  require('../../utils/getCommitMessage.js').getCommitMessage;
const getBranch = require('../../utils/getBranch.js').getBranch;
const { axios } = require('../../config/index.js');
const { cloneRepo } = require('../../utils/cloneRepo.js');

module.exports = async (req, res) => {
  try {
    const { repoName, mainBranch } = (
      await axios.get('https://shri.yandex/hw/api/conf')
    ).data.data;
    //Обновляем репозиторий
    await cloneRepo(repoName, mainBranch);

    const message = await getCommitMessage(req.params.commitHash);
    const author = await getAuthor(req.params.commitHash);
    const branch = await getBranch(req.params.commitHash);

    //Получаем buildId
    const buildId = (
      await axios.post('https://shri.yandex/hw/api/build/request', {
        commitMessage: message,
        commitHash: `${req.params.commitHash}`,
        branchName: branch,
        authorName: author,
      })
    ).data.data.id;

    await axios.post('https://shri.yandex/hw/api/build/start', {
      buildid: buildId,
      dateTime: new Date(),
    });

    await axios.post('https://shri.yandex/hw/api/build/finish', {
      buildId: buildId,
      duration: 0,
      success: true,
      buildLog: 'Тут должна была быть ваша реклама',
    });

    return res.json({ buildId: buildId });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(error);
  }
};
