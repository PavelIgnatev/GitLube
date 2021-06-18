//добавление сборки в очередь
const getAuthor = require('../../utils/getAuthor.js').getAuthor,
  getCommitMessage =
    require('../../utils/getCommitMessage.js').getCommitMessage,
  getBranch = require('../../utils/getBranch.js').getBranch;
const { axios } = require('../../config/index.js');

module.exports = async (req, res) => {
  try {
    const message = await getCommitMessage(req.params.commitHash),
      author = await getAuthor(req.params.commitHash),
      branch = await getBranch(req.params.commitHash);

    const buildId = await axios.post(
      'https://shri.yandex/hw/api/build/request',
      {
        commitMessage: message,
        commitHash: `${req.params.commitHash}`,
        branchName: branch,
        authorName: author,
      }
    );

    await axios.post('https://shri.yandex/hw/api/build/start', {
      buildid: buildId.data.data.id,
      dateTime: new Date(),
    });

    await axios.post('https://shri.yandex/hw/api/build/finish', {
      buildId: buildId.data.data.id,
      duration: 0,
      success: true,
      buildLog: 'Тут должна была быть ваша реклама',
    });

    return res.json({ buildId: buildId.data.data.id });
  } catch (error) {
    return res.json(error);
  }
};
