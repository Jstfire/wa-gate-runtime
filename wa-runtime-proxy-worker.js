export default {
  async fetch(request) {
    const upstream = 'https://charms-treasures-modes-issued.trycloudflare.com';
    const url = new URL(request.url);
    const target = new URL(upstream);
    target.pathname = url.pathname;
    target.search = url.search;

    const headers = new Headers(request.headers);
    headers.set('Host', target.host);
    headers.set('X-Forwarded-Host', url.host);
    headers.set('X-Forwarded-Proto', 'https');

    return fetch(target.toString(), {
      method: request.method,
      headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      redirect: 'manual',
    });
  },
};
