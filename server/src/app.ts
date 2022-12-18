import express, { ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
const app = express();

import wordsRoutes from './routes/words';
import rankRoutes from './routes/rank';

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  // these headers to prevent CORS errors

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/words', wordsRoutes);
app.use('/rank', rankRoutes);

// error middleware

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
};

app.use(errorHandler);

app.listen(5000);
