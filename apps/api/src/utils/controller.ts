import { NextFunction, Request, Response } from 'express';
import logger from './logger';

type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

const controller =
  (handler: ControllerFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      logger.debug({ result }, 'controller result');
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  };

export default controller;
