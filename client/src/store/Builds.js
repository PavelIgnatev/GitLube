import { makeAutoObservable } from 'mobx';
import api from '../api';

class Builds {
  buildList = [];
  BuildInfo = {};
  buildLog = {};

  constructor() {
    makeAutoObservable(this);
  }
  //Функции для обновления состояния
  updateBuildList(newBuildList) {
    this.buildList = newBuildList;
  }

  updateBuildInfo(newBuildInfo, buildId) {
    this.BuildInfo[buildId] = newBuildInfo;
  }

  updateBuildLog(newBuildLog, buildId) {
    this.buildLog[buildId] = newBuildLog;
  }

  //Функции для асинхронных запросов
  async getBuildList() {
    this.updateBuildList((await api.get('/api/builds')).data);
  }

  async getBuildInfo(BuildId) {
    this.updateBuildInfo(
      (await api.get(`/api/builds/${BuildId}`)).data,
      BuildId
    );
  }

  async getBuildLog(BuildId) {
    this.updateBuildLog(
      (await api.get(`/api/builds/${BuildId}/logs`)).data,
      BuildId
    );
  }
  async addQueueBuild(commitHash) {
    return await api.addQueueBuild(commitHash);
  }

  //Геттеры под каждое значение для удобства
  get getterBuildList() {
    return this.buildList;
  }

  get getterBuildInfo() {
    return this.BuildInfo;
  }

  get getterBuildLog() {
    return this.buildLog;
  }
}
export default new Builds();
