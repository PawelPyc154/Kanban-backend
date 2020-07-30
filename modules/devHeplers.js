require('colors');
const morgan = require('morgan');

const devHeplers = (app) => {
  app.use(morgan('dev')); // Dev loggin middleware
};

module.exports = devHeplers;
