import './utils/env';
import express, { NextFunction, Request, Response } from 'express';
import db from './utils/db';
import userRouter from './api/user/user.router';
import utilsRouter from './api/utils/utils.router';
import logger from './utils/logger';
import loggerMiddleware from './middleware/loggerMiddleware';
import { HttpError } from './utils/errors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import isProduction from './utils/isProduction';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(loggerMiddleware);
app.use(compression());
app.use(cookieParser());

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const clientBuildPath = path.resolve(__dirname, '../../app/dist');
if (isProduction) {
  app.use(express.static(clientBuildPath));
} else {
  app.get('/', (req, res) => {
    res.send('Server is up!');
  });
}

app.use('/api', rateLimiter);

app.use('/api/user', userRouter);
app.use('/api/utils', utilsRouter);

if (isProduction) {
  app.get('*', function (_, response) {
    response.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
}

app.listen(port, async () => {
  logger.info(`app listening at http://localhost:${port}`);
  await db.connect();
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  const defaultMessage = 'Something went wrong';
  let message = defaultMessage;
  // logger.error(err.stack);

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  logger.error({ statusCode }, err.message);

  res.status(statusCode).send(isProduction ? defaultMessage : message);
});

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit(1);
});
