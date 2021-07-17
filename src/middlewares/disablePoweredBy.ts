import { Request, Response, NextFunction } from 'express';

const disablePoweredBy = (req: Request, res: Response, next: NextFunction) => {
  res.removeHeader('X-Powered-By');
  next();
}
export { disablePoweredBy }