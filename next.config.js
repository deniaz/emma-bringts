require('dotenv').config();

module.exports = {
  env: {
    MONGO_DB_HOST: process.env.MONGO_DB_HOST,
    OPENCAGEDATA_API_KEY: process.env.OPENCAGEDATA_API_KEY,
  },
};
