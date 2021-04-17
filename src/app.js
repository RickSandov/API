// Modules
const express = require('express');
const methOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');

// Inits
const app = express();
const productionErrorHandler = require('./lib/ErrorHandlers/ProductionGlobal');
const devErrorHandler = require('./lib/ErrorHandlers/DevGlobal');
require('./config/db').default;

/* Routes */
const publicApiRoutes = require('./routes/public-api.routes');

/* Helpers */

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: false }));
app.use(methOverride('_method'));
app.use(morgan('dev'));

// Globals
/* app.use((req, res, next) => {
  return next();
}); */

// Routes
app.use('/api', publicApiRoutes);

// Static
// app.use(express.static(path))

// Error Handling
(process.env.NODE_ENV === 'production' && app.use(productionErrorHandler)) ||
  (process.env.NODE_ENV === 'development' && app.use(devErrorHandler));

module.exports = app;
