//получение списка сборок
module.exports = (req, res) => {
  global.axios
    .get('https://shri.yandex/hw/api/build/list')
    .then((response) => res.json(response.data.data))
    .catch((error) => res.send(error));
};
