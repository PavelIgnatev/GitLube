//cохранение настроек
const cloneRepo = require('../../utils/cloneRepo.js').cloneRepo;
module.exports = async (req, res) => {
  try {
    global.linkRepo = req.body.repoName;
    global.period = req.body.period;

    await cloneRepo(global.linkRepo);

    global.axios
      .post('https://shri.yandex/hw/api/conf', req.body)
      .then((response) => res.json(response.data.data))
      .catch((error) => res.json(error));
  } catch (error) {
    res.json(error);
  }
};
