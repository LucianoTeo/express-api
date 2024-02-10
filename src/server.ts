import 'express-async-errors';

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express';

import 'dotenv/config';
import appRoutes from '@shared/routes';
import { AppError } from '@shared/errors/app-error';
import { ZodError } from 'zod';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);


app.use('/api/v1', appRoutes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Ops... Error de validação', issues: err.format() })
  }

  // console.log(err.message, err)
  return response.status(500).json({
    status: 'Opss.. Error interno no servidor',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`App is running on port ${process.env.PORT}`)
);
