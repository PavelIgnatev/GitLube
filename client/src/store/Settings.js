import { makeAutoObservable } from 'mobx';
import api from '../api';

class Settings {
  settings = { repoName: '', buildCommand: '', mainBranch: '', period: '' };
  status = 'pending';

  constructor() {
    makeAutoObservable(this);
    //Сразу получаем настройки и они автоматически запишутся в state.settings
    this.getSettings();
  }

  updateSettings(newSettings) {
    this.settings = newSettings;
  }

  async postSettings(Repository, BuildCommand, MainBranch, Period) {
    return await api.postSettings(Repository, BuildCommand, MainBranch, Period);
  }

  async getSettings() {
    this.status = 'pending';
    this.updateSettings((await api.get('/api/settings')).data);
    this.status = 'done';
  }

  get getterSettings() {
    return this.settings;
  }
}
export default new Settings();
