const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('Проверка ручки /build/finish', () => {
  const body = {
    buildId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    duration: 0,
    success: true,
    buildLog: 'Тут могла бы быть ваша реклама',
  };

  test('Проверка возможности завершить билд', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve('');
    };

    //Действие
    await api.post('/build/finish', body);

    //Проверка
    expect(api.items).toEqual('');
  });

  test('Проверка работоспособности ручки для возможности завершить билд', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve('');
    };

    //Действие
    await api.post('/build/finish', body);

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/build/finish');
  });
});
