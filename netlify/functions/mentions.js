const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)).catch(() => globalThis.fetch(...args));

exports.handler = async (event) => {
  try {
    const params = new URLSearchParams(event.rawQuery || '');
    const q = params.get('q');
    const span = params.get('span') || '30d';
    if (!q) return { statusCode: 400, body: "q required" };
    const src = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(q)}&mode=TimelineVol&timespan=${span}&format=json`;
    const r = await fetch(src);
    if (!r.ok) return { statusCode: 502, body: "upstream " + r.status };
    const text = await r.text();
    return {
      statusCode: 200,
      headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*", "cache-control": "public, max-age=300" },
      body: text
    };
  } catch (e) {
    return { statusCode: 500, body: "fetch fail" };
  }
};