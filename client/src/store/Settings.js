import { makeAutoObservable } from 'mobx';
import api from '../api';

class Settings {
  settings = { repoName: '', buildCommand: '', mainBranch: '', period: '' };
  status = 'pending';

  settingsErorr = false;

  constructor() {
    makeAutoObservable(this);
    //Сразу получаем настройки и они автоматически запишутся в state.settings
    this.getSettings();
  }

  updateSettings(newSettings) {
    this.settings = newSettings;
  }

  async postSettings(Repository, BuildCommand, MainBranch, Period) {
    this.status = 'waiting';
    const result = await api.postSettings(
      Repository,
      BuildCommand,
      MainBranch,
      Period
    );
    this.status = 'done';
    return result;
  }

  async getSettings() {
    try {
      this.settingsErorr = false;
      this.updateSettings((await api.get('/api/settings')).data);
      this.status = 'done';
    } catch (err) {
      console.log(err);
      this.settingsErorr = true;
    }
  }

  get getterSettings() {
    return this.settings;
  }
}
export default new Settings();
