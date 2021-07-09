const { axios } = require('../src/config/index.js');

describe('Со страницы настроек', () => {
  it('не должен поступать запрос на сервер, если обязательные поля не заполнены (интеграционный тест)', async function () {
    const browser = this.browser;

    //Удаляем предыдущие настройки
    await axios.delete('https://shri.yandex/hw/api/conf');

    await browser.url('/settings');

    const button = await browser.$('.base-button__orange');
    await button.waitForExist();

    await button.click();

    //Появился ли тост с текстом ошибки
    const page = await browser.$('.Toastify__toast-body');
    await page.waitForExist();
  });

  it('не произойдет перехода на главную страницу, если репозиторий, который был указан, не существует (интеграционный тест)', async function () {
    const browser = this.browser;

    await browser.url('/settings');

    const repository = await browser.$('#repository');
    const branch = await browser.$('#branch');
    const build = await browser.$('#build');
    const number = await browser.$('.pr0');
    const button = await browser.$('.base-button__orange');
    await browser.pause(100);

    //Изменяем значения
    await repository.setValue('repository/doesnotexist');
    await branch.setValue('main');
    await build.setValue('npm -v');
    await number.setValue(1);

    await button.click();

    //Появился ли тост с текстом ошибки
    const page = await browser.$('.Toastify__toast-body');
    await page.waitForExist({ timeout: 10000 });
  });
  it('не произойдет перехода на главную страницу, если branch, который был указан, не существует (интеграционный тест)', async function () {
    const browser = this.browser;

    await browser.url('/settings');

    const repository = await browser.$('#repository');
    const branch = await browser.$('#branch');
    const build = await browser.$('#build');
    const number = await browser.$('.pr0');
    const button = await browser.$('.base-button__orange');
    await browser.pause(100);

    //Очищаем значения
    await repository.setValue('PavelIgnatev/repository-for-test');
    await branch.setValue('doesnotexist');
    await build.setValue('npm -v');
    await number.setValue(1);

    await button.click();

    //Появился ли тост с текстом ошибки
    const page = await browser.$('.Toastify__toast-body');
    await page.waitForExist({ timeout: 10000 });
  });
});
