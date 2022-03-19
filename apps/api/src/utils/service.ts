import logger from './logger';

const service = <T extends unknown[], K>(serviceFn: (...args: T) => K) => {
  return async (...args: T) => {
    logger.debug('service function called', serviceFn.name);
    const result = await serviceFn(...args);
    logger.debug('service function ended', serviceFn.name, result);

    return result;
  };
};

const b = service((ad: string, pa: number) => {
  return Number(ad) * pa;
});

// const c = await b('hello', 2);
