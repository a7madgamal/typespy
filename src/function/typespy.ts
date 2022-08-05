import { DEFAULT_HOST, DEFAULT_PORT_NUM } from '../constants';
import { EventMessage } from '../cli/ServerHandler';

export function typespyFactory(
  host: string = DEFAULT_HOST,
  port: number = DEFAULT_PORT_NUM,
) {
  return async function typespy(message: EventMessage) {
    try {
      await fetch(`http://${host}:${port}/values`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.log('❌ dt call failed', message);
      throw error;
    }
  };
}
