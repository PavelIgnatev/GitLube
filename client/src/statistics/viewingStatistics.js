function quantile(arr, q) {
  const sorted = arr.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
  } else {
    return Math.floor(sorted[base]);
  }
}

function renderingPercentile(sampleData, string) {
  return (
    string +
    `p25=${quantile(sampleData, 0.25)} p50=${quantile(sampleData, 0.5)} ` +
    `p75=${quantile(sampleData, 0.75)} p95=${quantile(sampleData, 0.95)} ` +
    `hits=${sampleData.length}`
  );
}

function calcMetricByDate(data, page, name, date) {
  let sampleData = data
    .filter(
      (item) => item.page === page && item.name === name && item.date === date
    )
    .map((item) => item.value);

  console.log(renderingPercentile(sampleData, `${date} ${name}: `));
}

// сравнить метрику в разных срезах
function compareMetric(data) {
  const slice = {};

  const additional = Object.keys(data[0].additional);

  additional.forEach((item) => (slice[item] = {}));

  data.forEach((element) => {
    additional.forEach((item) => {
      let obj = {};
      obj[element.name] = [element.value];

      return slice[item][element.additional[item]]
        ? slice[item][element.additional[item]][element.name]
          ? slice[item][element.additional[item]][element.name].push(
              element.value
            )
          : (slice[item][element.additional[item]][element.name] = [
              element.value,
            ])
        : (slice[item][element.additional[item]] = obj);
    });
  });

  additional.forEach((addit) => {
    Object.keys(slice[addit]).forEach((element) => {
      Object.keys(slice[addit][element]).forEach((name) => {
        const sampleData = slice[addit][element][name];
        console.log(
          renderingPercentile(
            sampleData,
            `{${addit}: "${element}"}, метрика "${name}": `
          )
        );
      });
      console.log('__________________________________________________');
    });
  });
}

function prepareData(result) {
  return result.data.map((item) => {
    item.date = item.timestamp.split('T')[0];
    return item;
  });
}

// показать значение метрики за несколько дней
function showMetricByPeriod(data, days, metrics) {
  console.log(
    data.filter((item) => {
      return (
        item.name === metrics &&
        days.indexOf(item.timestamp.split('T')[0]) !== -1
      );
    })
  );
}

// показать сессию пользователя
function showSession(data, requestId) {
  console.log(data.filter((item) => item.requestId === String(requestId)));
}

fetch(
  'https://shri.yandex/hw/stat/data?counterId=aa3a34b8-f79d-4bc5-9191-3624a46f5645'
)
  .then((res) => res.json())
  .then((result) => {
    let data = prepareData(result);

    console.log('__________________________________________________');
    console.log(
      'Получаем за 2021-07-09 метрику "connect", "TTFB", "FCP", "LCP", "FID", "TTI", "TBT" и "CLS" соответственно'
    );

    calcMetricByDate(data, 'send test', 'connect', '2021-07-09');
    calcMetricByDate(data, 'send test', 'TTFB', '2021-07-09');
    calcMetricByDate(data, 'send test', 'FCP', '2021-07-09');
    calcMetricByDate(data, 'send test', 'LCP', '2021-07-09');
    calcMetricByDate(data, 'send test', 'FID', '2021-07-09');
    calcMetricByDate(data, 'send test', 'TTI', '2021-07-09');
    calcMetricByDate(data, 'send test', 'TBT', '2021-07-09');
    calcMetricByDate(data, 'send test', 'CLS', '2021-07-09');

    console.log('__________________________________________________');
    console.log('Получаем сессию пользователя с requestId === "130718071753"');

    showSession(data, 130718071753);

    console.log('__________________________________________________');
    console.log(
      'Получаем все значения метрики "connect" за несколько дней ["2021-07-08", "2021-07-09"]'
    );

    showMetricByPeriod(data, ['2021-07-08', '2021-07-09'], 'connect');

    console.log('__________________________________________________');

    console.log(
      'Сравнение всех метрик во всех срезах (срезы определяются автоматически, все, что лежит в additional является срезом, очень легко масштабировать): '
    );
    console.log('__________________________________________________');
    compareMetric(data);
  });
