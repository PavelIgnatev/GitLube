import axios from 'axios';
import { SettingsModel } from '../@types/SettingsModel';
import { AxiosResponse } from 'axios'

const path: string = 'http://localhost:3000';

class Api {
  async get(url: string, params?: string): Promise<AxiosResponse<any>> {
    let fullUrl: string = path + url;
    if (params) {
      fullUrl += '?' + new URLSearchParams(params).toString();
    }
    return await axios(fullUrl);
  }

  //Добавляем в очередь
  async addQueueBuild(commitHash: string): Promise<AxiosResponse<any>> {
    return await axios.post(`${path}/api/builds/${commitHash}`);
  }

  //Отправляем настройки
  async postSettings(Repository: string, BuildCommand: string, MainBranch: string, Period: number): Promise<AxiosResponse<any>> {
    return await axios.post(`${path}/api/settings`, {
      id: '8c3c6fa1-47de-4b48-808c-562eb458665sd',
      repoName: Repository,
      buildCommand: BuildCommand,
      mainBranch: MainBranch.length > 0 ? MainBranch : 'main',
      period: Period > 0 ? Period : 1,
    } as SettingsModel);
  }
}
export default new Api();
