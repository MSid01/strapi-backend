module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'd72021478d30824a2daae99361a4826a'),
  },
});
