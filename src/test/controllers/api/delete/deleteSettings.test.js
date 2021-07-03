const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../../Api.js');

describe('Проверка ручки /api/conf на удаление', () => {
  test('Проверка возможности удалить старые настройки', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve('');
    };

    //Действие
    await api.delete('/api/conf');

    //Проверка
    expect(api.items).toEqual('');
  });

  test('Проверка работоспособности ручки для удаления старых настроек', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve('');
    };

    //Действие
    await api.delete('/api/conf');

    //Проверка
    expect(result).toEqual('shri.yandex/hw/api/api/conf');
  });
});
