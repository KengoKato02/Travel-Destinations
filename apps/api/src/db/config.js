/* eslint-disable n/no-process-env */
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  mongodbAtlasUri: process.env.MONGODB_ATLAS_URI,
  mongodbLocalUri: process.env.MONGODB_LOCAL_URI,
};
/* eslint-enable n/no-process-env */
