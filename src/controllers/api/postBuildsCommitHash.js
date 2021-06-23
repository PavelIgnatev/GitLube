//добавление сборки в очередь
const getAuthor = require('../../utils/getAuthor.js').getAuthor;
const getCommitMessage =
  require('../../utils/getCommitMessage.js').getCommitMessage;
const getBranch = require('../../utils/getBranch.js').getBranch;
const { axios } = require('../../config/index.js');
const { cloneMainRepo } = require('../../utils/cloneMainRepo.js');
const {
  cloneRepoByCommitHash,
} = require('../../utils/cloneRepoByCommitHash.js');

const { generateId } = require('../../utils/generateId.js');
module.exports = async (req, res) => {
  const id = generateId();
  let buildId = null;
  const start = Date.now();

  try {
    // Получаем repoName и mainBranch
    const { repoName, mainBranch, buildCommand } = (
      await axios.get('https://shri.yandex/hw/api/conf')
    ).data.data;
    //Обновляем репозиторий, чтобы далее делать поиск message, author, branch по свежим данным
    await cloneMainRepo(repoName, mainBranch);

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
    res.json({ buildId: buildId });

    const buildLog = await cloneRepoByCommitHash(
      branch,
      repoName,
      req.params.commitHash,
      buildCommand,
      id
    );

    //Успешно завершаем
    await axios.post('https://shri.yandex/hw/api/build/finish', {
      buildId: buildId,
      duration: Date.now() - start,
      success: true,
      buildLog: buildLog,
    });
    return res;
  } catch (error) {
    //Если произошла ошибка, то завершаем с ошибкой соответственно
    if (buildId) {
      await axios.post('https://shri.yandex/hw/api/build/finish', {
        buildId: buildId,
        duration: Date.now() - start,
        success: false,
        buildLog: error,
      });
    }

    console.error(error);
    return res.status(500).json(error);
  }
};
