import { makeAutoObservable } from 'mobx';
import api from '../api';
import { BuildListModel } from '../@types/BuildModel/BuildListModel';
import { ObjectBuildModel } from '../@types/BuildModel/ObjectBuildModel';
import { BuildLogModel } from '../@types/BuildModel/BuildLogModel';
import { BuildModel } from '../@types/BuildModel/BuildModel';

class Builds {
  buildList: BuildListModel = [];
  BuildInfo: ObjectBuildModel = {};
  buildLog: BuildLogModel = {};

  buildListError: boolean = false;
  BuildInfoError: boolean = false;
  buildLogError: boolean = false;

  status: string = 'data';

  constructor() {
    makeAutoObservable(this);
  }

  //Функции для обновления состояния
  updateStatusPending() {
    this.status = 'pending';
    this.getBuildList();
  }

  updateBuildList(newBuildList: BuildListModel) {
    this.buildList = newBuildList;
  }

  updateBuildInfo(newBuildInfo: BuildModel, buildId: string) {
    this.BuildInfo[buildId] = newBuildInfo;
  }

  updateBuildLog(newBuildLog: string, buildId: string) {
    this.buildLog[buildId] = newBuildLog;
  }

  sleep(time: number) {
    return new Promise<void>((res) => setTimeout(() => res(), time));
  }

  updateBuildListStatus() {
    if (this.buildList.length < 1) {
      this.status = 'no data';
    } else {
      this.status = 'data';
    }
  }

  //Функции для асинхронных запросов
  async getBuildList(): Promise<void> {
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

  async getBuildInfo(BuildId: string): Promise<void> {
    try {
      this.BuildInfoError = false;
      const result = (await api.get(`/api/builds/${BuildId}`)).data;
      this.updateBuildInfo(result, BuildId);
    } catch (err) {
      console.log(err);
      this.BuildInfoError = true;
    }
  }

  async getBuildLog(BuildId: string): Promise<void> {
    try {
      this.buildLogError = false;
      const result = (await api.get(`/api/builds/${BuildId}/logs`)).data;
      this.updateBuildLog(result, BuildId);
    } catch (err) {
      console.log(err);
      this.buildLogError = true;
    }
  }
  async addQueueBuild(commitHash: string) {
    return await api.addQueueBuild(commitHash);
  }

  //Геттеры под каждое значение для удобства
  get getterBuildList(): BuildListModel {
    return this.buildList;
  }

  get getterBuildInfo(): ObjectBuildModel {
    return this.BuildInfo;
  }

  get getterBuildLog(): BuildLogModel {
    return this.buildLog;
  }
}
export default new Builds();
