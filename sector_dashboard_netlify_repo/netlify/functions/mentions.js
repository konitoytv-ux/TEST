export default async (req) => {
  const u = new URL(req.url);
  const q = u.searchParams.get('q');
  const span = u.searchParams.get('span') || '30d';
  if (!q) return new Response('q required', { status: 400 });
  const src = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(q)}&mode=TimelineVol&timespan=${span}&format=json`;
  try {
    const r = await fetch(src);
    if (!r.ok) return new Response('upstream ' + r.status, { status: 502 });
    const txt = await r.text();
    return new Response(txt, { status: 200, headers: { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=300' } });
  } catch (e) { return new Response('fetch fail', { status: 500 }); }
}