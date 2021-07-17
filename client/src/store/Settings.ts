import { makeAutoObservable } from 'mobx';
import api from '../api';
import { SettingsModel } from '../@types/SettingsModel';
import { AxiosResponse } from 'axios'

class Settings {
  settings: SettingsModel = { repoName: '', buildCommand: '', mainBranch: '', period: 1 };
  status: string = 'pending';

  settingsErorr: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  updateSettings(newSettings: SettingsModel) {
    this.settings = newSettings;
  }

  async postSettings(Repository: string, BuildCommand: string, MainBranch: string, Period: number): Promise<AxiosResponse<string>> {
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

  async getSettings(): Promise<void> {
    try {
      this.settingsErorr = false;
      this.updateSettings((await api.get('/api/settings')).data);
      this.status = 'done';
    } catch (err) {
      console.log(err);
      this.settingsErorr = true;
    }
  }

  get getterSettings(): SettingsModel {
    return this.settings;
  }
}
export default new Settings();
