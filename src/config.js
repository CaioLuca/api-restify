module.exports = {
  ENV: process.env.ENV || 'development',
  PORT: process.env.PORT || 3333,
  URL: process.env.URL || 'http://localhost:3333',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/api_rest',
  JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}