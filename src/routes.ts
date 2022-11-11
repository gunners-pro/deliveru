import { Router } from 'express';

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllWithoutEndDateController } from './modules/deliveries/useCases/findAllWithoutEndDate/FindAllWithoutEndDateController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const updateDeliverymanController = new UpdateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllWithoutEndDateUseCase = new FindAllWithoutEndDateController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

routes.post('/client', createClientController.handle);
routes.post('/client/authenticate', authenticateClientController.handle);
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle,
);
routes.post('/deliveryman', createDeliverymanController.handle);
routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle,
);
routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAllWithoutEndDateUseCase.handle,
);
routes.put(
  '/delivery/update-deliveryman/:id',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle,
);
