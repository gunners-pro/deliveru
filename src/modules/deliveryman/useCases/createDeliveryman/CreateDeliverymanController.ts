import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const createDeliverymanSchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createDeliverymanSchema.parse(request.body);

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();
    const result = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
