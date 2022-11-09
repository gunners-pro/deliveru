import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateClientUseCase } from './CreateClientUseCase';

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const createClientSchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createClientSchema.parse(request.body);

    const createClientUseCase = new CreateClientUseCase();
    const result = await createClientUseCase.execute({ username, password });

    return response.json(result);
  }
}
