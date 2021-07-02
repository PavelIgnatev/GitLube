const { describe, expect, test } = require('@jest/globals');
const { Api } = require('../../Api.js');

describe('controllers/api/getBuild', () => {
  const state = `npm WARN read-shrinkwrap This version of npm is compatible with lockfileVersion@1, but package-lock.json was generated for lockfileVersion@2. I'll try to do my best with it!
  sh: vue-cli-service: command not found
  npm ERR! code ELIFECYCLE
  npm ERR! syscall spawn
  npm ERR! file sh
  npm ERR! errno ENOENT
  npm ERR! cryptonomicon@0.1.0 build: 'vue-cli-service build'
  npm ERR! spawn ENOENT
  npm ERR! 
  npm ERR! Failed at the cryptonomicon@0.1.0 build script.
  npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
  
  npm ERR! A complete log of this run can be found in:
  npm ERR!     /Users/user/.npm/_logs/2021-07-01T17_39_12_485Z-debug.log`;

  test('Получение всех билдов через api', async () => {
    //Подготовка
    let api = new Api();

    api.fetch = () => {
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/api/build/log', {
      buildid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    });

    //Проверка
    expect(api.items).toEqual(state);
  });

  test('Проверка ручки для получения всех билдов через api', async () => {
    //Подготовка
    let api = new Api();
    let result;

    api.fetch = (pen) => {
      result = pen;
      return Promise.resolve(state);
    };

    //Действие
    await api.get('/build/log', {
      buildid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    });

    //Проверка
    expect(result).toEqual(
      'shri.yandex/hw/api/build/log?buildid=3fa85f64-5717-4562-b3fc-2c963f66afa6'
    );
  });
});
