const { axios } = require('../../config/index.js');

//получение информации о конкретной сборке
module.exports = async (req, res) => {
  let data = null;

  try {
    data = (
      await axios.get(`https://shri.yandex/hw/api/build/details`, {
        params: { buildid: req.params.buildId },
      })
    ).data.data;
  } catch (error) {
    console.error(error.message);
    return res.status(error.response.status).end(error.message);
  }

  return res.json(data);
};
