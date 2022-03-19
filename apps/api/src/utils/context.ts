import { AsyncLocalStorage } from 'async_hooks';
import type { Request, Response, NextFunction } from 'express';
import uuid from './uuid';

type Context = {
  req: Request;
  reqId: string;
};

type Storage = {
  context: Context;
};

const asyncLocalStorage = new AsyncLocalStorage<Storage>();

const contextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const reqIdHeader = req.get('X-Request-Id');
  const context = {
    req,
    reqId: reqIdHeader || uuid(),
  };

  return asyncLocalStorage.run({ context }, () => next());
};

const getStore = () => {
  const store = asyncLocalStorage.getStore();

  if (!store) {
    throw new Error('Context not found');
  }

  return store;
};

export const getContext = () => getStore().context;

export const hasContext = () => !!asyncLocalStorage.getStore()?.context;

export const setContext = (context: Partial<Context>) => {
  const store = getStore();

  store.context = { ...store.context, ...context };
};

export default contextMiddleware;
