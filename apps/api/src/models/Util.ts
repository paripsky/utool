import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

export interface UtilDocument extends Document {
  id: string;
  name: string;
  code: string; // url of esm js file or inline code
  visibility: 'public' | 'private';
  isDeleted: boolean;
}

export type FormattedUtil = Omit<UtilDocument, 'isDeleted'>;

const UtilSchema = new Schema<UtilDocument>(
  {
    name: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Util = mongoose.model<UtilDocument>('Util', UtilSchema, 'utils');

export default Util;
