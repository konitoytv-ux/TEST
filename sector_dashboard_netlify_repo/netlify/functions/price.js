export default async (req) => {
  const u = new URL(req.url);
  const t = u.searchParams.get('ticker');
  if (!t) return new Response('ticker required', { status: 400 });
  const src = `https://stooq.com/q/d/l/?s=${encodeURIComponent(t)}&i=d`;
  try {
    const r = await fetch(src);
    if (!r.ok) return new Response('upstream ' + r.status, { status: 502 });
    const txt = await r.text();
    return new Response(txt, { status: 200, headers: { 'content-type': 'text/csv; charset=utf-8', 'access-control-allow-origin': '*', 'cache-control': 'public, max-age=600' } });
  } catch (e) { return new Response('fetch fail', { status: 500 }); }
}