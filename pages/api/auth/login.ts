import type { IncomingMessage, ServerResponse } from 'node:http';

export default function handler(req: IncomingMessage & { body?: unknown }, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Método não permitido' }));
  }

  const VALID_USERNAME = 'admin';
  const VALID_PASSWORD = 'admin123';

  const body = req.body as { username?: string; password?: string } | undefined;

  if (body?.username !== VALID_USERNAME || body?.password !== VALID_PASSWORD) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Credenciais inválidas' }));
  }

  res.writeHead(302, {
    'Location': '/dashboard',
    'Set-Cookie': 'session=authenticated; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400',
  });
  return res.end();
}
