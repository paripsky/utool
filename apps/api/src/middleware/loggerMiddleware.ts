import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { formatDate } from '../utils/dates';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on('finish', () => {
    const now = new Date();
    const date = formatDate(now);
    logger.info(
      {
        date,
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
      },
      `${date} - ${req.method} ${req.url} - ${res.statusCode}`
    );
  });

  next();
};

export default loggerMiddleware;
