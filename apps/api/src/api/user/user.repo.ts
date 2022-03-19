import bcrypt from 'bcrypt';
import User from '../../models/User';
import { generateRandomString } from '../../utils/strings';

/**
 *
 * @param {string} email
 * @returns {User|null}
 */
export const getUserByEmail = (email: string) =>
  User.findOne({
    email,
    isDeleted: false,
  });

type CreateUserProps = {
  email: string;
  password: string;
};

export const createUser = async ({ email, password }: CreateUserProps) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const activationCode = generateRandomString();

  return User.create({
    email,
    hash,
    salt,
    tokens: [],
    activated: true,
    activationCode,
    isDeleted: false,
    utils: [],
  });
};

export const activateUser = async (email: string) =>
  User.updateOne({ email }, { activated: true });

export default {
  getUserByEmail,
  createUser,
  activateUser,
};
