import mongoose from 'mongoose';
import isProduction from './isProduction';
import logger from './logger';

if (!isProduction) {
  mongoose.set('debug', { shell: true });
}

// transform _id to id
mongoose.plugin((schema) => {
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  });
});

export const connect = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    logger.info(`Connecting to the db on ${dbUrl}`);

    if (!dbUrl) {
      throw new Error('DB_URL is missing from the env');
    }

    await mongoose.connect(dbUrl);
    logger.info('connected to the db successfully!');
  } catch (error) {
    logger.error(error, 'Unable to connect to the database');

    throw error;
  }
};

export default {
  connect,
};
