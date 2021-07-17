import mcache from 'memory-cache'
import { Request, Response, NextFunction } from "express"

const cache = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
  const key: string = `__express__${req.params.buildId}`,
    cachedBody: string = mcache.get(key);

  if (cachedBody) return res.send(cachedBody);

  let newRes: Record<string, any> = res
  newRes.sendResponse = newRes.send;

  newRes.send = (body: string): void => {
    if (body.length > 2) {
      mcache.put(key, body, duration * 1000);
    }
    newRes.sendResponse(body);
  };
  next();
};

export { cache };
