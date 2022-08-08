import { DEFAULT_HOST, DEFAULT_PORT_NUM } from '../constants';
import { EventMessage } from '../cli/ServerHandler';

export function typespyFactory(
  host: string = DEFAULT_HOST,
  port: number = DEFAULT_PORT_NUM,
) {
  console.log(`🕵🏻‍♂️ typespy: configured function to listen on [${host}:${port}]`);

  return function typespy(message: EventMessage) {
    fetch(`http://${host}:${port}/values`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((response) => {
        console.log(`🕵🏻‍♂️ typespy: Successfully sent message: `, message);
      })
      .catch((e) => {
        console.log(
          '🕵🏻‍♂️ typespy: ❌ call failed, make sure to run the typespy server before running your code',
          e,
        );
      });
  };
}
