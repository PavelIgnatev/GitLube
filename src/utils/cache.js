const mcache = require('memory-cache');

const cache = (duration) => (req, res, next) => {
  const key = `__express__${req.params.buildId}`,
    cachedBody = mcache.get(key);
  if (cachedBody) return res.send(cachedBody);
  res.sendResponse = res.send;
  res.send = (body) => {
    mcache.put(key, body, duration * 1000 );
    res.sendResponse(body);
  };
  next();
};

module.exports = cache