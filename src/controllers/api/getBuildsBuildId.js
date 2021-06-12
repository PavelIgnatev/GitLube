//получение информации о конкретной сборке
module.exports = (req, res) => {
  global.axios
    .get(`https://shri.yandex/hw/api/build/details`, {
      params: { buildid: req.params.buildId },
    })
    .then((response) => res.json(response.data.data))
    .catch((error) => res.send(error));
};
