const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('Проверка ручки /build/request', () => {
  const body = {
    commitMessage: 'page folders',
    commitHash: '22f2db02a16037b4fe4653a34b8bba598d5ede86',
    branchName: 'main',
    authorName: 'PavelIgnatev',
  };

  test('Проверка возможности добавить новый билд в очередь', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    };

    //Действие
    await api.post('/build/request', body);

    //Проверка
    expect(api.items).toEqual('3fa85f64-5717-4562-b3fc-2c963f66afa6');
  });

  test('Проверка работоспособности ручки для добавления нового билда в очередь', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    };

    //Действие
    await api.post('/build/request', body);

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/build/request');
  });
});
