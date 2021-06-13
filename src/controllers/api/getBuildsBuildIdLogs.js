//получение логов билда (сплошной текст)
module.exports = (req, res) => {
  global.axios
    .get(`https://shri.yandex/hw/api/build/log`, {
      params: { buildid: req.params.buildId },
    })
    .then((response) =>  res.json(response.data))
    .catch((error) => res.send(error));
};
