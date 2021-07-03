const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('controllers/api/getBuildsBuildId', () => {
  const state = {
    data: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      configurationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      buildNumber: 0,
      commitMessage: 'string',
      commitHash: 'string',
      branchName: 'string',
      authorName: 'string',
      status: 'Waiting',
      start: '2021-07-02T17:53:46.942Z',
      duration: 0,
    },
  };

  test('Получение определенного билда по buildId через api', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/build/details');

    //Проверка
    expect(api.items).toEqual(state);
  });

  test('Проверка работоспособности ручки для получения определенного билда по buildId через api', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/build/details', {
      buildid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    });

    //Проверка
    expect(result).toEqual(
      'shri.yandex/hw/api/build/details?buildid=3fa85f64-5717-4562-b3fc-2c963f66afa6'
    );
  });
});
