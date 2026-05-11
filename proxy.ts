import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const session = request.cookies.get('session');
  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');
  const isLogin = request.nextUrl.pathname === '/login';

  if (isProtected && !session) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/login' },
    });
  }

  if (isLogin && session) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/dashboard' },
    });
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
