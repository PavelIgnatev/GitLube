//cохранение настроек
const cloneRepo = require('../../utils/cloneRepo.js').cloneRepo
module.exports = (req, res) => {
  
  global.linkRepo = req.body.repoName
  global.period = req.body.period

  cloneRepo(global.linkRepo)

  global.axios
    .post('https://shri.yandex/hw/api/conf', req.body)
    .then((response) => res.json(response.data.data))
    .catch((error) => res.send(error));
};
