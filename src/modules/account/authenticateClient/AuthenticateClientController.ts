import { Request, Response } from 'express';
import { z } from 'zod';

import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const authenticateClientSchema = z.object({
      username: z.string(),
      password: z.string(),
    });
    const { username, password } = authenticateClientSchema.parse(request.body);

    const authenticateClientUseCase = new AuthenticateClientUseCase();
    const result = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
