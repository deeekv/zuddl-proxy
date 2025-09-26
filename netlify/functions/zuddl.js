exports.handler = async (event) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true, echo: event.queryStringParameters || {} })
  };
};
