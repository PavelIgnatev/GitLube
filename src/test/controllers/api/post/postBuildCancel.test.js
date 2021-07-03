const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('Ручка /build/cancel', () => {
  const body = {
    buildId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  };

  test('Проверка возможности отменить выполнение билда из очереди', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve('');
    };

    //Действие
    await api.post('/build/cancel', body);

    //Проверка
    expect(api.items).toEqual('');
  });

  test('Проверка работоспособности ручки для отмены выполнения билда из очереди', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve('');
    };

    //Действие
    await api.post('/build/cancel', body);

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/build/cancel');
  });
});
