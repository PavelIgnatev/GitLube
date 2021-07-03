const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('controllers/api/getSettings', () => {
  const state = {
    data: {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      repoName: 'string',
      buildCommand: 'string',
      mainBranch: 'string',
      period: 0,
    },
  };

  test('Получение настроек через api', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/api/conf');

    //Проверка
    expect(api.items).toEqual(state);
  });

  test('Проверка работоспособности ручки для получения настроек через api', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/api/conf');

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/api/conf');
  });
});
