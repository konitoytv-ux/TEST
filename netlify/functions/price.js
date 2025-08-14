const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)).catch(() => globalThis.fetch(...args));

exports.handler = async (event) => {
  try {
    const params = new URLSearchParams(event.rawQuery || '');
    const ticker = params.get('ticker');
    if (!ticker) return { statusCode: 400, body: "ticker required" };
    const src = `https://stooq.com/q/d/l/?s=${encodeURIComponent(ticker)}&i=d`;
    const r = await fetch(src);
    if (!r.ok) return { statusCode: 502, body: "upstream " + r.status };
    const text = await r.text();
    return {
      statusCode: 200,
      headers: { "content-type": "text/csv; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "public, max-age=600" },
      body: text
    };
  } catch (e) {
    return { statusCode: 500, body: "fetch fail" };
  }
};