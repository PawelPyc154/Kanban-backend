const auth = require('../routes/auth');

const routes = (app) => {
  app.use('/api/auth', auth);
};

module.exports = routes;
