const { describe, expect, test } = require('@jest/globals');
const { getAuthor } = require('../../utils/getAuthor.js');

describe('utils/getAuthor', () => {
  const commitHash = '481d428402d57b388ba4ad91f72b9d17aa62564c';

  test('Возможно ли корректно получить author коммита в репозитории с помощью утилиты getAuthor', async () => {
    //Подготовка
    let result;

    //Действие
    result = await getAuthor(commitHash, '../../');

    //Проверка
    expect(result).toEqual('user');
  });
});
