const { axios } = require('../../config/index.js');

//cохранение настроек
const cloneMainRepo = require('../../utils/cloneMainRepo.js').cloneMainRepo;

module.exports = async (req, res) => {
  let result;
  let changeSettings = false;
  try {
    let data = (await axios.get('https://shri.yandex/hw/api/conf')).data.data;
    let body = req.body;

    data.period = String(data.period);

    delete data.id;
    delete body.id;

    if (JSON.stringify(data) === JSON.stringify(body)) {
      return res.json('');
    }

    if (data.repoName !== body.repoName) {
      await cloneMainRepo(body.repoName, body.mainBranch);

      //Очищаем настройки
      await axios.delete('https://shri.yandex/hw/api/conf');

      changeSettings = true;
    }

    result = await axios.post('https://shri.yandex/hw/api/conf', body);

    try {
      await axios.post('http://localhost:8080/update-settings', {
        ...body,
        changeSettings,
      });
    } catch (error) {
      console.log('не смог отправить настройки на сервер');
    }

    return res.json(result.data);
  } catch (error) {
    console.error(error.message);
    return res.send({ message: error.message });
  }
};
