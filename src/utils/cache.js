const mcache = require('memory-cache');

const cache = (duration) => (req, res, next) => {
  const key = `__express__${req.params.buildId}`,
    cachedBody = mcache.get(key);
  if (
    cachedBody ||
    mcache.keys().indexOf(`__express__${req.params.buildId}`) !== -1
  ) {
    res.send(cachedBody);
    return;
  }
  res.sendResponse = res.send;
  res.send = (body) => {
    mcache.put(key, body, duration * 1000 * 3600);
    res.sendResponse(body);
  };
  next();
};

module.exports = cache;
