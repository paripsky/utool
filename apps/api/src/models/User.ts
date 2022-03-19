import mongoose, { Document } from 'mongoose';
import type { UtilDocument } from './Util';

const { Schema } = mongoose;

export interface UserDocument extends Document {
  id: string;
  email: string;
  hash: string;
  salt: string;
  tokens: {
    token: string;
    validUntil: Date;
  }[];
  activationCode: string;
  activated: boolean;
  isDeleted: boolean;
  utils: UtilDocument[];
}

export type FormattedUser = Omit<
  UserDocument,
  'hash' | 'salt' | 'tokens' | 'activationCode'
>;

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    tokens: [
      {
        token: String,
        validUntil: Date,
      },
    ],
    activated: {
      type: Boolean,
      default: false,
    },
    activationCode: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    utils: [{ type: String, ref: 'Util' }],
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>('User', userSchema, 'users');

export default User;
