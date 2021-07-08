import { makeAutoObservable } from 'mobx';
import api from '../api';

class Builds {
  buildList = [];
  BuildInfo = {};
  buildLog = {};

  buildListError = false;
  BuildInfoError = false;
  buildLogError = false;

  status = 'data';

  constructor() {
    makeAutoObservable(this);
  }

  //Функции для обновления состояния
  updateStatusPending() {
    this.status = 'pending';
    this.getBuildList();
  }

  updateBuildList(newBuildList) {
    this.buildList = newBuildList;
  }

  updateBuildInfo(newBuildInfo, buildId) {
    this.BuildInfo[buildId] = newBuildInfo;
  }

  updateBuildLog(newBuildLog, buildId) {
    this.buildLog[buildId] = newBuildLog;
  }

  sleep(time) {
    return new Promise((res) => setTimeout(() => res(), time));
  }

  updateBuildListStatus() {
    if (this.buildList.length < 1) {
      this.status = 'no data';
    } else {
      this.status = 'data';
    }
  }

  //Функции для асинхронных запросов
  async getBuildList() {
    try {
      this.buildListError = false;
      const result = (await api.get('/api/builds')).data;

      //Решил замедлить, чтобы лоадер хоть видно было)
      await this.sleep(1000);

      this.updateBuildList(result);

      //Обновляем значение build list status
      this.updateBuildListStatus();
    } catch (err) {
      console.log(err);
      this.buildListError = true;
    }
  }

  async getBuildInfo(BuildId) {
    try {
      this.BuildInfoError = false;
      const result = (await api.get(`/api/builds/${BuildId}`)).data;
      this.updateBuildInfo(result, BuildId);
    } catch (err) {
      console.log(err);
      this.BuildInfoError = true;
    }
  }

  async getBuildLog(BuildId) {
    try {
      this.buildLogError = false;
      const result = (await api.get(`/api/builds/${BuildId}/logs`)).data;
      this.updateBuildLog(result, BuildId);
    } catch (err) {
      console.log(err);
      this.buildLogError = true;
    }
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
