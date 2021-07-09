import Counter from './send.js';
import getFCP from 'first-contentful-paint';
require('time-to-interactive');

let counter = new Counter();
const performance = window.performance.timing;

function browser() {
  let ua = navigator.userAgent;
  if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
  if (ua.search(/Firefox/) > 0) return 'Firefox';
  if (ua.search(/Opera/) > 0) return 'Opera';
  if (ua.search(/Chrome/) > 0) return 'Google Chrome';
  if (ua.search(/Safari/) > 0) return 'Safari';
  if (ua.search(/Konqueror/) > 0) return 'Konqueror';
  if (ua.search(/Iceweasel/) > 0) return 'Debian Iceweasel';
  if (ua.search(/SeaMonkey/) > 0) return 'SeaMonkey';
  if (ua.search(/Gecko/) > 0) return 'Gecko';
  return 'Search Bot';
}

counter.init(
  'aa3a34b8-f79d-4bc5-9191-3624a46f5645',
  String(Math.random()).substr(2, 12),
  'send test'
);

counter.setAdditionalParams({
  env: 'production',
  platform:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? 'touch'
      : 'desktop',
  browser: browser(),
});

//connect
counter.send('connect', performance.connectEnd - performance.connectStart);

//TimeToFirstByte
counter.send('TTFB', performance.responseEnd - performance.requestStart);

//FirstContentfulPaint
getFCP((fcpValue) => {
  counter.send('FCP', fcpValue);
});

//LargestContentfulPaint
try {
  let result;
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const entry = entries[entries.length - 1];
    const largestPaintTime = entry.startTime;
    result = largestPaintTime;
  });
  counter.send('LCP', result);
  observer.observe({ type: 'largest-contentful-paint', buffered: true });
} catch {}

//FirstInputDelay
try {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      counter.send('FID', entry.processingStart - entry.startTime);
    }
  });
  observer.observe({
    type: 'first-input',
    buffered: true,
  });
} catch (e) {}

//TimeToInteractive
window.getPageTTI.then((data) => {
  counter.send('TTI', data);
});

//TotalBlockingTime
try {
  let totalBlockingTime = 0;
  let observer = new PerformanceObserver(function (list) {
    let perfEntries = list.getEntries();
    for (const perfEntry of perfEntries) {
      totalBlockingTime += perfEntry.duration - 50;
    }
  });
  counter.send('TBT', totalBlockingTime);
  observer.observe({ type: 'longtask', buffered: true });
} catch (e) {}

//CumulativeLayoutShift
try {
  let cumulativeLayoutShiftScore = 0;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      cumulativeLayoutShiftScore += entry.value;
    }
  });
  counter.send('CLS', cumulativeLayoutShiftScore);
  observer.observe({ entryTypes: ['layoutShift'] });
} catch {}
