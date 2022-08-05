import express from 'express';
import { ServerHandler } from './ServerHandler';

export const init = () => {
  const router = express.Router();
  const expressApp = express();

  const spy = new ServerHandler();

  expressApp.use(express.json());

  router.post('/values', spy.onPostHandler.bind(spy));

  expressApp.use('/', router);
  expressApp.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.write('you posted:\n');
    res.end(JSON.stringify(req.body, null, 2));
  });

  expressApp.listen(4444, () => {
    console.log('Started on PORT 4444');
  });

  return spy;
};
