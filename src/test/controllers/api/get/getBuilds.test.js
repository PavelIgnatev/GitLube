const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('controllers/api/getBuilds', () => {
  const state = {
    data: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        configurationId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        buildNumber: 0,
        commitMessage: 'string',
        commitHash: 'string',
        branchName: 'string',
        authorName: 'string',
        status: 'Waiting',
        start: '2021-07-02T17:52:42.882Z',
        duration: 0,
      },
    ],
  };

  test('Получение всех билдов через api', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/build/list', { limit: 2000 });

    //Проверка
    expect(api.items).toEqual(state);
  });

  test('Проверка работоспособности ручки для получения всех билдов через api', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/build/list', { limit: 2000 });

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/build/list?limit=2000');
  });
});
