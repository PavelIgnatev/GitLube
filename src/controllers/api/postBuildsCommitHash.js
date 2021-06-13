//добавление сборки в очередь
const getAuthor = require('../../utils/getAuthor.js').getAuthor,
  getCommitMessage =
    require('../../utils/getCommitMessage.js').getCommitMessage,
  getBranch = require('../../utils/getBranch.js').getBranch;

module.exports = async (req, res) => {
  try {
    const message = await getCommitMessage(req.params.commitHash),
      author = await getAuthor(req.params.commitHash),
      branch = await getBranch(req.params.commitHash);

    await global.axios
      .post('https://shri.yandex/hw/api/build/request', {
        commitMessage: message,
        commitHash: `${req.params.commitHash}`,
        branchName: branch,
        authorName: author,
      })
      .then((response) => res.json(response.data.data))
      .catch((error) => res.json(error));
    await global.axios 
      .post('https://shri.yandex/hw/api/build/request', 
    )
  } catch (error) {
    res.json(error);
  }
};
