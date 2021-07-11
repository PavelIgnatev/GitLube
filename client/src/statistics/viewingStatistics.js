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

  const additional = Object.keys(data.pop().additional);

  additional.forEach((item) => (slice[item] = {}));

  data.forEach((element) => {
    additional.forEach((item) => {
      let obj = {};
      const name = element.additional[item]
        ? element.additional[item]
        : 'Не известно';

      obj[element.name] = [element.value];

      return slice[item][name]
        ? slice[item][name][element.name]
          ? slice[item][name][element.name].push(element.value)
          : (slice[item][name][element.name] = [element.value])
        : (slice[item][name] = obj);
    });
  });
  console.log(slice);

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
  'https://shri.yandex/hw/stat/data?counterId=4b0505a8-4211-423a-974a-4627af7af069'
)
  .then((res) => res.json())
  .then((result) => {
    let data = prepareData(result);

    console.log('__________________________________________________');
    console.log(
      'Получаем метрику "connect", "TTFB", "FCP", "LCP", "FID", "TTI", "TBT" и "CLS" за 2021-07-10 для страницы настроек по путю "/settings"'
    );

    calcMetricByDate(data, '/settings', 'connect', '2021-07-11');
    calcMetricByDate(data, '/settings', 'TTFB', '2021-07-11');
    calcMetricByDate(data, '/settings', 'FCP', '2021-07-11');
    calcMetricByDate(data, '/settings', 'LCP', '2021-07-11');
    calcMetricByDate(data, '/settings', 'FID', '2021-07-11');
    calcMetricByDate(data, '/settings', 'TTI', '2021-07-11');
    calcMetricByDate(data, '/settings', 'TBT', '2021-07-11');
    calcMetricByDate(data, '/settings', 'CLS', '2021-07-11');

    console.log('__________________________________________________');
    console.log('Получаем сессию пользователя с requestId === "564963172056"');

    showSession(data, 564963172056);

    console.log('__________________________________________________');
    console.log(
      'Получаем все значения метрики "FID" за несколько дней ["2021-07-10", "2021-07-11"]'
    );

    showMetricByPeriod(data, ['2021-07-10', '2021-07-11'], 'FID');

    console.log('__________________________________________________');

    console.log(
      'Сравнение всех метрик во всех срезах (срезы определяются автоматически, все, что лежит в additional является срезом, очень легко масштабировать): '
    );
    console.log('__________________________________________________');
    compareMetric(data);
  });
