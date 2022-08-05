import express from 'express';
import { ServerHandler } from './ServerHandler';

export const init = (port: number) => {
  const router = express.Router();
  const expressApp = express();

  const spy = new ServerHandler();

  expressApp.use(express.json());

  router.post('/values', spy.onPostHandler.bind(spy));

  expressApp.use('/', router);

  expressApp.listen(port, () => {
    console.log(`Started on PORT ${port}`);
  });

  return spy;
};
