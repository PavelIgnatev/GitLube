const mcache = require('memory-cache');

const cache = (duration) => (req, res, next) => {
  const key = req.params.buildId,
    cachedBody = mcache.get(key);
  if (mcache.keys().indexOf(req.params.buildId) !== -1) return res.json(cachedBody);
  res.sendResponse = res.send;
  res.send = (body) => {
    mcache.put(key, body, duration * 1000);
    res.sendResponse(body);
  };
  next();

};

module.exports = cache;
