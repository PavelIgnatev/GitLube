import { makeAutoObservable } from 'mobx';
import api from '../api';

class Settings {
  settings = { repoName: '', buildCommand: '', mainBranch: '', period: '' };

  constructor() {
    makeAutoObservable(this);
  }

  updateSettings(newSettings) {
    this.settings = newSettings;
  }

  async postSettings(Repository, BuildCommand, MainBranch, Period) {
    return await api.postSettings(Repository, BuildCommand, MainBranch, Period);
  }

  async getSettings() {
    this.updateSettings((await api.get('/api/settings')).data);
  }

  get getterSettings() {
    return this.settings;
  }
}
export default new Settings();
