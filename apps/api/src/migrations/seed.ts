import Util from '../models/Util';
import User from '../models/User';

// TODO: Create a base seed for gitpod and dev envs
const seed = async () => {
  const utils = await Util.create([
    {
      name: 'test',
      description: 'test',
      isDeleted: false,
    },
  ]);

  const user = await User.create({
    email: 'test',
    password: 'test',
    utils,
  });
};

seed();
