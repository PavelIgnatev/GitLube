const { axios } = require('../../config/index.js');

//получение списка сборок
module.exports = async (req, res) => {
  let data = null;

  try {
    data = (await axios.get('https://shri.yandex/hw/api/build/list?limit=2000'))
      .data.data;
  } catch (error) {
    console.error(error.message);
    return res.status(error.response.status).end(error.message);
  }

  return res.json(data);
};
