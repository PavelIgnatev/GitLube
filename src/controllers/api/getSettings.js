const { axios } = require('../../config/index.js');

//Получение настроек
module.exports = async (req, res) => {
  return res.json(
    (await axios.get('https://shri.yandex/hw/api/conf')).data.data
  );
};
