const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

//api routes
app.use('/api/logs', require('./api/logs'));
app.use(require('./api/userRoutes'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
