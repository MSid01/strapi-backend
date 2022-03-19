module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 3009),
  url: env('BACKEND_URL_LOCAL'),
  app: {
    keys: env.array("APP_KEYS", ["testKey1", "testKey2"]),
  },
});