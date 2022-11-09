import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server is running...'));
