const { axios } = require('../../config/index.js');

//cохранение настроек
const cloneMainRepo = require('../../utils/cloneMainRepo.js').cloneMainRepo;

module.exports = async (req, res) => {
  try {
    await cloneMainRepo(req.body.repoName, req.body.mainBranch);

    //Очищаем настройки
    await axios.delete('https://shri.yandex/hw/api/conf');

    let result = await axios.post('https://shri.yandex/hw/api/conf', req.body);

    try {
      await axios.post('http://localhost:8080/update-settings', req.body);
    } catch (error) {
      console.log('не смог отправить настройки на сервер');
    }

    return res.json(result.data);
  } catch (error) {
    console.error(error.message);
    return res.send({ message: error.message });
  }
};
