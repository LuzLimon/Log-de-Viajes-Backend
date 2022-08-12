const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./Log-de-Viajes-Backend/server/src/middlewares');

const app = express();


app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(bodyParser.json());
app.use(express.json());

//api routes
app.use('/api/logs', require('./Log-de-Viajes-Backend/server/src/api/logs'));
app.use(require('./Log-de-Viajes-Backend/server/src/api/userRoutes'));
app.use('/api/categorie', require('./Log-de-Viajes-Backend/server/src/api/categorie'));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const mongoUri = process.env.DATABASE_URL;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log({ error });
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
