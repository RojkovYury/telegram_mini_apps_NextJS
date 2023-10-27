import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { NextRequestWithAuth } from 'next-auth/next/middleware';

export default function middleware(request: NextRequestWithAuth) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto');

  if (forwardedHost && forwardedProto) {
    request.nextUrl.host = forwardedHost;
    request.nextUrl.protocol = forwardedProto;
    request.nextUrl.port = forwardedProto === 'https' ? '443' : '80';
  }

  if (request.nextUrl.pathname === '/api/health') {
    return NextResponse.next();
  }

  return withAuth(request);
}
