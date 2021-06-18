const { axios } = require('../../config/index.js');

//получение информации о конкретной сборке
module.exports = async (req, res) => {
  return res.json(
    (
      await axios.get(`https://shri.yandex/hw/api/build/details`, {
        params: { buildid: req.params.buildId },
      })
    ).data.data
  );
};
