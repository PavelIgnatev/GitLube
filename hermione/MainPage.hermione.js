describe('На главной странице', () => {
  it('при отстутствии настроек у пользователя имеется возможность перейти на страницу настроек, нажав на кнопку Settings, после чего заполнить их и отправить на сервер (e2e тест)', async function () {
    const browser = this.browser;

    await browser.url('/');

    //Дожидаемся появления кнопки settings
    const buttonSettings = await browser.$('.button-action');
    await buttonSettings.waitForExist();

    await buttonSettings.click();

    const repository = await browser.$('#repository');
    const branch = await browser.$('#branch');
    const build = await browser.$('#build');
    const number = await browser.$('.pr0');
    const button = await browser.$('.base-button__orange');
    await browser.pause(100);

    //Изменяем значения
    await repository.setValue('PavelIgnatev/repository-for-test');
    await branch.setValue('main');
    await build.setValue('npm -v');
    await number.setValue(1);

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(1500);

    await button.click();

    //Проверяем произошел ли переход на страницу с историей сборок
    const page = await browser.$('.app-page__builds');
    await page.waitForExist({ timeout: 1000 });

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(1500);
  });

  it('при наличии настроек, но отстутствии сборок в очереди, появляется сообщение, которое предлагает добавить сборку в очередь (интеграционный тест)', async function () {
    const browser = this.browser;

    await browser.url('/');

    const sorry = await browser.$('.app-page__builds_sorry');
    await sorry.waitForExist({ timeout: 1000 });

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(1500);
  });

  it('при наличии настроек присутствует кнопка Run build, по нажатию на которую открывается модальное окно с активным инпутом, после чего пользователь вводит в данное поле commitHash, нажимает на кнопку Send, ожидает, и, если все удачно, то это означает, что сборка была успешно добавлена в очередь и, соответственно, произошёл переход на страницу с информацией о добавленной сборке, после чего, спустя некоторое время, пользователь увидел результат сборки (e2e тест)', async function () {
    const browser = this.browser;

    await browser.url('/');

    //Ожидаем загрузку страницы
    const PageBuilds = await browser.$('.app-page__builds');
    await PageBuilds.waitForExist({ timeout: 1000 });

    //Дожидаемся появления кнопки
    const button = await browser.$('.button-action');
    await button.waitForExist();

    await button.click();

    //Вводим commitHash и отправляем добавлем сборку в очередь
    await browser.keys(['5ec164806924dc58b83bce35f1d0707ad0c86a90', 'Enter']);

    //Произошел ли переход на страницу с информацией о сборке
    const page = await browser.$('.history-dashboard');
    await page.waitForExist({ timeout: 10000 });

    //Делаем переход на главную, чтобы обновить данные о статусе сборки, т.к время выполнения теста 60 секунд, а
    //минимальное время для обновления состояния без обновления страницы и перехода по страницами все те же 60 секунд
    //без учета времени выполнения других асинхронных методов
    await browser.url('/');
    const dashboard = await browser.$('.history-dashboard');
    await dashboard.waitForExist({ timeout: 1000 });
    await dashboard.click();

    //Ожидаем появление логов сборки
    const detail_pre = await browser.$('.page-detail__pre');
    await detail_pre.waitForExist({ timeout: 1000 });

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(3000);
  });
  it('при наличии настроек и сборок в очереди, кликнув на одну из сборок, можно получить полную информацию о ее содержимом, после чего повторно добавить сборку в очередь с помощью кнопки rebuild (e2e тест)', async function () {
    const browser = this.browser;

    await browser.url('/');

    const dashboard = await browser.$('.history-dashboard');
    await dashboard.waitForExist({ timeout: 10000 });
    await dashboard.click();

    //Произошел ли переход на страницу с информацией о сборке
    const page = await browser.$('.history-dashboard');
    await page.waitForExist({ timeout: 10000 });

    //Дожидаемся появления кнопки rebuild
    const button = await browser.$('.button-action');
    await button.waitForExist();

    await button.click();

    await browser.pause(1500);
    //Произошел ли переход на страницу с информацией о повторной сборке
    const page_detail = await browser.$('.history-dashboard');
    await page_detail.waitForExist({ timeout: 10000 });

    //Для возможности проверяющим посмотреть что вообще произошло хотя бы в тесте
    await browser.pause(1500);
  });
});
