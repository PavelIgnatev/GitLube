const { axios } = require('../../config/index.js');

//получение списка сборок
module.exports = async (req, res) => {
  return res.json(
    (await axios.get('https://shri.yandex/hw/api/build/list')).data.data
  );
};
