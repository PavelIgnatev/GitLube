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
  '4b0505a8-4211-423a-974a-4627af7af069',
  String(Math.random()).substr(2, 12),
  window.location.pathname
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
  page:
    window.location.pathname.split('/')[1] === 'build'
      ? '/build/:buildId'
      : window.location.pathname,
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
const LargestContentfulPaint = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const entry = entries[entries.length - 1];
  const largestPaintTime = entry.startTime;
  counter.send('LCP', largestPaintTime);
});
LargestContentfulPaint.observe({
  type: 'largest-contentful-paint',
  buffered: true,
});

//FirstInputDelay
const FirstInputDelay = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    counter.send('FID', entry.processingStart - entry.startTime);
  }
});
FirstInputDelay.observe({
  type: 'first-input',
  buffered: true,
});

//TimeToInteractive
window.getReferentialTTI().then((data) => {
  counter.send('TTI', data);
});

//TotalBlockingTime
let totalBlockingTimeTime = 0;
let TotalBlockingTime = new PerformanceObserver(function (list) {
  let perfEntries = list.getEntries();
  for (const perfEntry of perfEntries) {
    totalBlockingTimeTime += perfEntry.duration - 50;
  }
});
counter.send('TBT', totalBlockingTimeTime);
TotalBlockingTime.observe({ type: 'longtask', buffered: true });

//CumulativeLayoutShift
var CLS = 0;
let CumulativeLayoutShift = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.hadRecentInput) return;
    CLS += entry.value;
  });
});
counter.send('CLS', CLS);
CumulativeLayoutShift.observe({ type: 'layout-shift', buffered: true });
