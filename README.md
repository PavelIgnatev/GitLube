# GitLube

## Версия Node.Js

```sh
v14.17.1
```

## Действия для запуска приложения (production версия)

1. Клонировать репозиторий

   ```sh
   git clone https://github.com/PavelIgnatev/GitLube.git
   cd GitLube
   ```

2. ### Важно!

   Записать в .env файл свой SWAGGER_KEY (для удобства можно отредактировать файл .envexample). <br>
   В моем приложении в .env файле требуется ввести также и GITHUB_ACCESS_KEY. <br>
   Получить его можно благодаря данному [туториалу.](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

3. Открыть первый таб консоли и прописать:

   ```sh
   cd client
   npm ci --only=production
   npm run build --prod
   cd ..
   ```

4. В этом же табе консоли прописать

   ```sh
   npm ci
   npm run serve --prod
   ```

## Действия для запуска приложения (developer версия)

1. Клонировать репозиторий

   ```sh
   git clone https://github.com/PavelIgnatev/GitLube.git
   cd GitLube
   ```

2. ### Важно!

   Записать в .env файл свой SWAGGER_KEY (для удобства можно отредактировать файл .envexample). <br>
   В моем приложении в .env файле требуется ввести также и GITHUB_ACCESS_KEY. <br>
   Получить его можно благодаря данному [туториалу.](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)

3. Открыть первый таб консоли и прописать:

   ```sh
   npm ci
   ```

4. Запустить dev-сервер

   ```sh
   npm run serve
   ```

5. Открыть второй таб консоли и прописать:

   ```sh
   cd client
   ```

6. Запустить установку зависимостей

   ```sh
    npm ci
   ```

7. Запустить клиентскую часть приложения

   ```sh
   npm start
   ```

8. Открываем ссылку в браузере

   [http://localhost:3000](http://localhost:3000/)

## Запуск тестов

1. Выполнить все действия для запуска приложения

2. ### Важно!

   Запускаем selenium в отдельном (на данный момент 3 табе)

   ```sh
   selenium-standalone install && selenium-standalone start
   ```

3. Создаем 4 таб консоли и запускаем тесты:

   ```sh
   npm run test
   ```

## Что проверяют тесты

- Unit тесты на jest проверяют работспособность node.js приложения во всевозможных ситуациях

- Интеграционные и E2E тесты, написанные на hermione, позволяют протестировать приложение на React и Node.js в связке с реальным бекендом для всех существующих страниц в приложениии

## Сбор статистики

Сбор статистики происходит автоматически при использовании приложения по мере накопления запросов для их отправки на сервер

Виды метрик, которые собираются:

- connect
- Time to first byte (TTFB)
- First contentful paint (FCP)
- Largest contentful paint (LCP)
- First input delay (FID)
- Time to Interactive (TTI)
- Total blocking time (TBT)
- Cumulative layout shift (CLS)

Виды срезов:

- по env
- по browser
- по platform
- по page

## Просмотр статистики

Просмотреть статистику можно перейдя по [этой](https://pavelignatev.github.io/viewing-statistics/) ссылке и открыв консоль

Просмотреть код для просмотра статистики можно перейдя по [этой](https://github.com/PavelIgnatev/GitLube/blob/main/client/src/statistics/viewingStatistics.js) ссылке

## Что реализовано

- Действия выполняются изолированно друг от друга
- Обновление данных каждые n минут, deafault - 1 минута (если не указано в настройках)
- Возможность запустить сборку для любого коммита независимо от его branch в репозитории
- Проверка на то, существует ли branch в репозитории. Если пользователь не ввел ее название, то default branch - это main.
- Отчистка файлов при удачном/неудачном выполнении команд для репозитория
- Параллельное выполнение сборок. Можно поставить 2 сборки в очередь, например, один тяжелый, а второй - легкий. При правильных условиях легкий выполнится раньше, даже если он был добавлен в очередь позже
- Хорошая валидация полей настроек, чтобы мы не получали на сервере некоррекнтые данные
- Возможность делать запросы как с порта 3000, так и с порта 3001, благодаря CORS
- Защита от DDOS-атаки
- Кеширование логов билда как на клиенте, так и на сервере
- Страница 404, в случае если страница не найдена
- Присутствуют Unit, интеграционные и E2E тесты
- Сбор различной статистики
