import type { IncomingMessage, ServerResponse } from 'node:http';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Método não permitido' }));
  }

  res.writeHead(302, {
    'Location': '/login',
    'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
  });
  return res.end();
}
