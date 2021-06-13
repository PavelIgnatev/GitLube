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

    global.axios
      .post('https://shri.yandex/hw/api/build/request', {
        commitMessage: message,
        commitHash: `${req.params.commitHash}`,
        branchName: branch,
        authorName: author,
      })
      .then(async (response) => {
        await global.axios
          .post('https://shri.yandex/hw/api/build/start', {
            buildid: response.data.data.id,
            dateTime: new Date(),
          })
          .catch((error) => error);
        return response.data.data.id;
      })
      .then(async (id) => {
        await global.axios
          .post('https://shri.yandex/hw/api/build/finish', {
            buildId: id,
            duration: 0,
            success: true,
            buildLog: 'Тут должна была быть ваша реклама',
          })
          .catch((error) => error);
        return { buildId: id };
      })
      .then((response) => res.json(response))
      .catch((error) => res.json(error));
  } catch (error) {
    res.json(error);
  }
};
