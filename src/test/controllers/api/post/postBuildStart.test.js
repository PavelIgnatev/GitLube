const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('Ручка /build/start', () => {
  const body = {
    buildId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    dateTime: '2021-07-02T19:27:09.323Z',
  };

  test('Проверка возможности начать выполнение билда из очереди', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve('');
    };

    //Действие
    await api.post('/build/start', body);

    //Проверка
    expect(api.items).toEqual('');
  });

  test('Проверка работоспособности ручки для начала выполнения билда из очереди', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve('');
    };

    //Действие
    await api.post('/build/start', body);

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/build/start');
  });
});
