const { axios } = require('../../config/index.js');

//cохранение настроек
const cloneRepo = require('../../utils/cloneRepo.js').cloneRepo;
module.exports = async (req, res) => {
  try {
    //Клонируем реп, если он не найден, то будет ошибка, которую обрабатываем далее
    await cloneRepo(req.body.repoName, req.body.mainBranch);
    return res.json(
      (await axios.post('https://shri.yandex/hw/api/conf', req.body)).data.data
    );
  } catch (error) {
    return res.json(error);
  }
};
