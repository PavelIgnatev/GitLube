import axios from 'axios';

class Api {
  async get(url, params) {
    let fullUrl = url;
    if (params) {
      fullUrl += '?' + new URLSearchParams(params).toString();
    }
    const response = await axios(fullUrl);
    return response;
  }
  //Добавляем в очередь
  addQueueBuild(commitHash) {
    return axios.post(`/api/builds/${commitHash}`);
  }
  //Отправляем настройки
  postSettings(Repository, BuildCommand, MainBranch, Period) {
    return axios.post('/api/settings', {
      id: '8c3c6fa1-47de-4b48-808c-562eb458665sd',
      repoName: Repository,
      buildCommand: BuildCommand,
      mainBranch: MainBranch.length > 0 ? MainBranch : 'main',
      period: Period.length > 0 ? Period : '1',
    });
  }
}
export default new Api();
