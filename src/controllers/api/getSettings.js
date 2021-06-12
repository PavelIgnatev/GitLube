//Получение настроек
module.exports = (req, res) => {
  global.axios
    .get('https://shri.yandex/hw/api/conf')
    .then((response) => res.json(response.data.data))
    .catch((error) => res.json(error));
};
