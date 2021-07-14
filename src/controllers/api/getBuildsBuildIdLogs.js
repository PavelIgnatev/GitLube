const { axios } = require('../../config/index.js');

//получение логов билда (сплошной текст)
module.exports = async (req, res) => {
  let data = null;

  try {
    data = (
      await axios.get(`https://shri.yandex/hw/api/build/log`, {
        params: { buildid: req.params.buildId },
      })
    ).data;
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data);
};
