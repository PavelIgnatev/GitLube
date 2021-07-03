const { describe, expect, test } = require('@jest/globals');
const getBranch = require('../../utils/getBranch.js').getBranch;

describe('utils/getBranch', () => {
  const commitHash = '481d428402d57b388ba4ad91f72b9d17aa62564c';

  test('Возможно ли получить branch коммита в репозитории с помощью утилиты getBranch', async () => {
    //Подготовка
    let result;

    //Действие
    result = await getBranch(commitHash, '../../');

    //Проверка
    expect(result).toEqual('stable-version');
  });
});
