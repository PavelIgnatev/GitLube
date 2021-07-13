//добавление сборки в очередь
const getAuthor = require('../../utils/getAuthor.js').getAuthor;
const getCommitMessage =
  require('../../utils/getCommitMessage.js').getCommitMessage;
const getBranch = require('../../utils/getBranch.js').getBranch;
const { axios } = require('../../config/index.js');
const { cloneMainRepo } = require('../../utils/cloneMainRepo.js');

module.exports = async (req, res) => {
  let buildId = null;

  try {
    // Получаем repoName и mainBranch
    const { repoName, mainBranch } = (
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

    res.json({ buildId: buildId });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
