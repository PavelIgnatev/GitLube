const { axios } = require('../../config/index.js');

//cохранение настроек
const cloneMainRepo = require('../../utils/cloneMainRepo.js').cloneMainRepo;

module.exports = async (req, res) => {
  try {
    await cloneMainRepo(req.body.repoName, req.body.mainBranch);

    let result = await axios.post('https://shri.yandex/hw/api/conf', req.body);

    return res.json(result.data);
  } catch (error) {
    console.error(error.message);
    return res.send({ message: error.message });
  }
};
