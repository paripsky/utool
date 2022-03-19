import pino from 'pino';
import { getContext, hasContext } from './context';

// Create a logging instance
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  mixin() {
    const reqId = hasContext() ? getContext().reqId : undefined;

    return {
      reqId,
    };
  },
});

export default logger;
