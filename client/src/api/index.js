import axios from 'axios';

const path = 'http://localhost:3000';

class Api {
  constructor() {
    if (window.location.search.substr(1).split('=')[0] === 'test') {
      this.test = true;
    }
  }
  async get(url, params) {
    let fullUrl = path + url;
    if (params) {
      fullUrl += '?' + new URLSearchParams(params).toString();
    }
    const response = await axios(fullUrl);
    return response;
  }
  //Добавляем в очередь
  async addQueueBuild(commitHash) {
    if (!this.test) {
      return await axios.post(`${path}/api/builds/${commitHash}`);
    } else {
      return { data: { buildId: 'ddbdba7c-29db-4606-9047-7d71670db78d' } };
    }
  }
  //Отправляем настройки
  async postSettings(Repository, BuildCommand, MainBranch, Period) {
    if (!this.test) {
      return await axios.post(`${path}/api/settings`, {
        id: '8c3c6fa1-47de-4b48-808c-562eb458665sd',
        repoName: Repository,
        buildCommand: BuildCommand,
        mainBranch: MainBranch.length > 0 ? MainBranch : 'main',
        period: Period.length > 0 ? Period : '1',
      });
    } else {
      return { data: { message: undefined } };
    }
  }
}
export default new Api();
