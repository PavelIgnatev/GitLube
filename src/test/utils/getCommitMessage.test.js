const { describe, expect, test } = require('@jest/globals');
const { getCommitMessage } = require('../../utils/getCommitMessage.js');

describe('utils/getCommitMessage', () => {
  const commitHash = '481d428402d57b388ba4ad91f72b9d17aa62564c';

  test('Возможно ли корректно получить commit message коммита в репозитории с помощью утилиты getCommitMessage', async () => {
    //Подготовка
    let result;

    //Действие
    result = await getCommitMessage(commitHash, '../../');

    //Проверка
    expect(result).toEqual('first version');
  });
});
