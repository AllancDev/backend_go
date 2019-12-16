/** Express para o servidor */
import { Router } from 'express';

/** Multer para envio de arquivos */
import multer from 'multer';
import multerConfig from './config/multer';

/** Controllers */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

/** Middleware de autenticação */
import authMiddleware from './app/middlewares/auth';

/** instance Routes and multer  */
const routes = new Router();
const upload = multer(multerConfig);

/** constrol users and sessions */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/** config middleware and user update */
routes.use(authMiddleware);
routes.put('/users', UserController.update);

/** control provider */
routes.get('/providers', ProviderController.index);

/** created appointments as read appointments */
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

/** schedule select  */
routes.get('/schedule', ScheduleController.index);

/** route select notifications and update notifications  */
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

/** created route files update */
routes.post('/files', upload.single('file'), FileController.store);

/** export module routes */
export default routes;
