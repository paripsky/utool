import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userRepo from './user.repo';
import {
  AuthenticationFailedError,
  NotFoundError,
  UserNotActivatedError,
} from '../../utils/errors';
import { UserDocument } from '../../models/User';
import { decrypt } from '../../utils/crypto';
import { formatUser } from './user.formatter';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('Error: JWT secret missing from env');
}

export const getUserByEmail = async (email: string) => {
  const user = await userRepo.getUserByEmail(email);

  if (user && !user.activated) throw new UserNotActivatedError();
  if (!user) throw new NotFoundError();

  return formatUser(user);
};

type CreateUserProps = {
  email: string;
  password: string;
};

// TODO: Add email confirmation for creation
export const createUser = async ({ email, password }: CreateUserProps) => {
  const user = await userRepo.createUser({ email, password });

  // TODO: send the user an email with his activationCode
  return user;
};

type ValidateUserProps = {
  email: string;
  password: string;
};

export const validateUser = async ({ email, password }: ValidateUserProps) => {
  const user = await userRepo.getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.hash))) {
    throw new AuthenticationFailedError();
  }

  return formatUser(user);
};

type ActivateUserProps = {
  email: string;
  activationCode: string;
};

export const activateUser = async ({
  email,
  activationCode,
}: ActivateUserProps) => {
  const user = await userRepo.getUserByEmail(email);

  if (!user) throw new AuthenticationFailedError('Invalid email');

  if (user.activationCode !== activationCode)
    throw new AuthenticationFailedError('Invalid activation code');

  await userRepo.activateUser(email);
  return true;
};

type LoginProps = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginProps) => {
  const user = await validateUser({ email, password });

  const token = jwt.sign({ email: user.email }, jwtSecret, {
    // TODO: make configurable
    expiresIn: '7d',
  });

  return { token };
};

export const decryptPassword = (toDecrypt: string, user: UserDocument) =>
  decrypt(toDecrypt, user.hash);

export default {
  getUserByEmail,
  createUser,
  login,
  activateUser,
};
