import pino from 'pino';
import Error from '@/components/error/interface';

const instance = pino();

/**
 * @param {Error} error error with rfc standard
 */
export default async function logger(error: Error) {
  return instance.error(error);
}
export async function info(message: string) {
  return instance.info(message);
}
