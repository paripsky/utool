import { FormattedUser, UserDocument } from '../../models/User';
import { omit } from 'lodash';

export const formatUser = (user: UserDocument): FormattedUser => {
  return omit(user.toJSON() as UserDocument, [
    'hash',
    'salt',
    'tokens',
    'activationCode',
  ]);
};
