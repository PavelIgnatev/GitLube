const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('controllers/api/postSettings', () => {
  const body = {
    repoName: 'Test/test',
    buildCommand: 'npm run ci && npm run build',
    mainBranch: 'main',
    period: 0,
  };

  test('Проверка возможности отправить новые настройки на сервер', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve(body);
    };

    //Действие
    await api.post('/api/conf', body);

    //Проверка
    expect(api.items).toEqual(body);
  });

  test('Проверка работоспособности ручки для отправления всех настроек на сервер', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve(body);
    };

    //Действие
    await api.post('/api/conf', body);

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/api/conf');
  });
});
