describe('Модальное окно', () => {
  it('должно появляться на главной странице после нажатия на кнопку Run build, а после того, как commitHash введен в поле, по нажатию на кнопку Send он будет отправлен сервер, и если все прошло успешно, то это означает, что сборка была успешно добавлена в очередь, а также произошёл переход на страницу с информацией о добавленной сборке (интеграционный тест)', async function () {
    const browser = this.browser;

    await browser.url('/?test=true');

    const modal = await browser.$('.button-action__action');
    await modal.waitForExist();

    if ((await modal.getText()) !== 'Settings') {
      //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
      await browser.pause(1000);
      await modal.click();
    } else {
      throw new Error(
        'Для того, чтобы данный тест завершился успешно, вам обязательно требуется заполнить страницу с настройками репозитория'
      );
    }

    await browser.pause(1000);
    await browser.keys(['e9be0f983f2a0950fc4281bde1841c086d25dfe3', 'Enter']);
    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(1000);

    const page = await browser.$('.page-detail');
    await page.waitForExist();
  });
});
