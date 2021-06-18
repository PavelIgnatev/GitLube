const { axios } = require('../../config/index.js');

//получение логов билда (сплошной текст)
module.exports = async (req, res) => {
  return res.json(
    (
      await axios.get(`https://shri.yandex/hw/api/build/log`, {
        params: { buildid: req.params.buildId },
      })
    ).data
  );
};
