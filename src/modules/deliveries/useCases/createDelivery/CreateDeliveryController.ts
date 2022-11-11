import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateDeliveryUseCase } from './CreateDeliveryUseCase';

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_client } = request;
    const createDeliverySchema = z.object({
      item_name: z.string(),
    });

    const { item_name } = createDeliverySchema.parse(request.body);
    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const delivery = await createDeliveryUseCase.execute({
      id_client,
      item_name,
    });

    return response.json(delivery);
  }
}
