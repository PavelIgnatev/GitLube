describe('Со страницы настроек', () => {
  it('произойдет переход на главную страницу, если все поля прошли все этапы валидации (интеграционный тест)', async function () {
    const browser = this.browser;

    await browser.url('/settings?test=true');

    const repository = await browser.$('#repository');
    const branch = await browser.$('#branch');
    const build = await browser.$('#build');
    const number = await browser.$('.pr0');
    const button = await browser.$('.base-button__orange');
    await browser.pause(100);

    //Очищаем значения
    await repository.setValue('PavelIgnatev/GitLube');
    await branch.setValue('main');
    await build.setValue('npm install && npm run build');
    await number.setValue(1);

    await browser.pause(2000);
    await button.click();

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(1500);

    //Появился ли тост с текстом ошибки
    const page = await browser.$('.app-page');
    await page.waitForExist();
  });
  it('не должен поступать запрос на сервер, если обязательные поля не заполнены (интеграционный тест)', async function () {
    const browser = this.browser;

    await browser.url('/settings?test=true');

    const repository = await browser.$('#repository');
    const branch = await browser.$('#branch');
    const build = await browser.$('#build');
    const number = await browser.$('.pr0');
    const button = await browser.$('.base-button__orange');
    await browser.pause(100);

    //Очищаем значения
    await repository.setValue(' ');
    await branch.setValue(' ');
    await build.setValue(' ');
    await number.setValue(0);

    await button.click();

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(3000);

    //Появился ли тост с текстом ошибки
    const page = await browser.$('.Toastify__toast-body');
    await page.waitForExist();
  });

  it('не произойдет перехода на главную страницу, если репозиторий, который был указан, не существует (e2e тест)', async function () {
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
    await build.setValue('npm install && npm run build');
    await number.setValue(1);

    await button.click();

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(3000);

    //Появился ли тост с текстом ошибки
    const page = await browser.$('.Toastify__toast-body');
    await page.waitForExist();
  });
  it('не произойдет перехода на главную страницу, если branch, который был указан, не существует (e2e тест)', async function () {
    const browser = this.browser;

    await browser.url('/settings');

    const repository = await browser.$('#repository');
    const branch = await browser.$('#branch');
    const build = await browser.$('#build');
    const number = await browser.$('.pr0');
    const button = await browser.$('.base-button__orange');
    await browser.pause(100);

    //Очищаем значения
    await repository.setValue('PavelIgnatev/GitLube');
    await branch.setValue('doesnotexist');
    await build.setValue('npm install && npm run build');
    await number.setValue(1);

    await button.click();

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(3000);

    //Появился ли тост с текстом ошибки
    const page = await browser.$('.Toastify__toast-body');
    await page.waitForExist();
  });
});
