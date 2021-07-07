const { describe, expect, test } = require('@jest/globals');
const {
  cloneRepoByCommitHash,
} = require('../../../src/utils/cloneRepoByCommitHash.js');

describe('utils/cloneRepoByCommitHash', () => {
  const commitHash = 'be575cfe4520c9466e01c192699ecae31daa4f04';

  test('Возможно ли клонировать любой репозиторий, откатить до нужного коммита и запустить для него выполенение npm команды с помощью метода cloneRepoByCommitHash', async () => {
    //Подготовка
    let result;

    //Действие
    result = await cloneRepoByCommitHash(
      'master',
      'PavelIgnatev/uber',
      commitHash,
      'npm -v',
      'CloneRepoByCommitHash',
      true
    );

    //Проверка
    expect(result).toContain('6.14.13');
  });
});
