const { axios } = require('../../config/index.js');

//Получение настроек
module.exports = async (req, res) => {
  let data = null;

  try {
    data = (await axios.get('https://shri.yandex/hw/api/conf')).data.data;
  } catch (error) {
    console.error(error.message);
    return res.status(500).end(error.message);
  }

  return res.json(data);
};
