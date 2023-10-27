import createError from '@/components/error/create-error';
import logger from '@/libs/logger';

interface Env {
  NODE_ENV?: string;
  PORT?: string | number;

  NEXT_PUBLIC_BASE_PATH?: string;
  API_BASE_URL?: string;

  NEXTAUTH_SECRET?: string;
  NEXTAUTH_URL?: string;

  SSO_BASE_URL?: string;
  SSO_CLIENT_ID?: string;
  SSO_CLIENT_SECRET?: string;
}

export default function getEnv(): Env {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    API_BASE_URL: process.env.API_BASE_URL,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    SSO_BASE_URL: process.env.SSO_BASE_URL,
    SSO_CLIENT_ID: process.env.SSO_CLIENT_ID,
    SSO_CLIENT_SECRET: process.env.SSO_CLIENT_SECRET,
  } as Env;

  Object.keys(env).map((envName) => {
    const envValue = env[envName as keyof Env] as string | undefined;
    if (envValue == undefined) {
      logger(createError({
        type: 'env',
        title: 'Empty env variable',
        detail: `env ${envName} is empty`,
      }));
    }
  });

  return env;
}
