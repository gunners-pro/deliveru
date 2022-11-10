import { Request, Response } from 'express';
import { z } from 'zod';

import { AuthenticateDeliverymanUseCase } from './AuthenticateDeliverymanUseCase';

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const authenticateDeliverymanSchema = z.object({
      username: z.string(),
      password: z.string(),
    });
    const { username, password } = authenticateDeliverymanSchema.parse(
      request.body,
    );

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();
    const result = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
