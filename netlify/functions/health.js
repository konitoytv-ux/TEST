exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*" },
    body: JSON.stringify({ ok: true, ts: Date.now() })
  };
};