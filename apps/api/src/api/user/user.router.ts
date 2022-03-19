import { Router } from 'express';
import jwt from '../../middleware/jwt';
import userService from './user.service';
import controller from '../../utils/controller';
import { UnauthorizedError } from '../../utils/errors';
import contextMiddleware from '../../utils/context';

const router = Router();

// router.get('/getData', jwt, (req, res, next) => {
//   try {
//     if (!req.user) return res.sendStatus(401).send('Unautorized!');
//
//     res.send(req.user);
//   } catch (err) {
//     next(err);
//   }
// });

router.use(contextMiddleware);

router.get(
  '/getData',
  jwt,
  controller(async (req) => {
    if (!req.user) throw new UnauthorizedError();
    return await userService.getUserByEmail(req.user.email);
  })
);

router.post('/create', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.createUser({ email, password });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/login',
  controller(async (req, res) => {
    const { email, password } = req.body;
    const { token } = await userService.login({ email, password });
    res.cookie('token', token, { secure: false, httpOnly: true });

    return token;
  })
);

router.post('/logout', (req, res, next) => {
  res.clearCookie('token');

  return true;
});

type ActivateQueryParams = {
  email: string;
  activationCode: string;
};

router.post('/activate', async (req, res, next) => {
  try {
    // TODO: add validations for these fields
    const { email, activationCode } = req.query as ActivateQueryParams;
    const token = await userService.activateUser({ email, activationCode });
    res.send({ token });
  } catch (err) {
    next(err);
  }
});

export default router;
