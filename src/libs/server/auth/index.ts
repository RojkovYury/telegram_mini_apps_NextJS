import getEnv from '@/libs/server/env';
import { AuthOptions } from 'next-auth';

const env = getEnv();

const auth: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    {
      id: 'superfly',
      name: 'SSO',
      type: 'oauth',
      clientId: env.SSO_CLIENT_ID || '',
      clientSecret: env.SSO_CLIENT_SECRET || '',
      authorization: {
        url: `${env.SSO_BASE_URL}/oauth/authorize`,
        params: {
          scope: 'admin',
          redirect_uri: `${env.NEXTAUTH_URL}/callback/superfly`,
        },
      },
      token: `${env.SSO_BASE_URL}/oauth/token`,
      userinfo: `${env.SSO_BASE_URL}/api/v4/user`,
      profile: (profile) => profile,
      httpOptions: {
        timeout: 60_000,
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      return account ? { ...token, accessToken: account.access_token, profile } : token;
    },
    async session({ session, token }) {
      return Promise.resolve({ ...session, profile: token.profile });
    },
  },
  session: {
    maxAge: 15 * 60,
  },
};

export default auth;
