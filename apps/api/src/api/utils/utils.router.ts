import { Router } from 'express';
import jwt from '../../middleware/jwt';
import utilsService from './utils.service';
import controller from '../../utils/controller';
import { UnauthorizedError } from '../../utils/errors';
import contextMiddleware from '../../utils/context';

const router = Router();

router.use(contextMiddleware);

router.get(
  '/',
  jwt,
  controller(async (req) => {
    return await utilsService.getUtils(req?.user?.email);
  })
);

export default router;
