module.exports = ({ env }) => ({
  url: env("MY_HEROKU_URL"),
  proxy: true,
  // app: {
  //   keys: env.array("APP_KEYS", ["testKey1", "testKey2"]),
  // },
});

//for localhost
// module.exports = ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 3009),
// });
