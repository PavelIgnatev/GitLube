describe('Модальное окно', () => {
  it('должно появляться на странице после нажатия на кнопку, а после отправки commitHash на сервер перенаправлять нас на страницу с информацией о добавленной сборке в очередь', async function () {
    const browser = this.browser;

    await browser.url('/?test=true');

    const modal = await browser.$('.button-action__action');
    await modal.click();

    await browser.keys(['e9be0f983f2a0950fc4281bde1841c086d25dfe3', 'Enter']);

    const page = await browser.$('.page-detail');
    await page.waitForExist();
  });
});
