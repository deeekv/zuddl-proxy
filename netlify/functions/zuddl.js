// Zuddl proxy: forwards to Zuddl API with your secret key (kept on Netlify)
exports.handler = async (event) => {
  const eventId = event.queryStringParameters.eventId;
  const type = event.queryStringParameters.type || "sessions"; // sessions | speakers | sponsors

  if (!eventId) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing eventId" }) };
  }

  const url = `https://api.zuddl.com/v1/events/${encodeURIComponent(eventId)}/${encodeURIComponent(type)}`;

  try {
    const r = await fetch(url, {
      headers: {
        "Accept": "application/json",
        // If your secret already includes the word "Bearer ", use the next line instead:
        // "Authorization": process.env.ZUDDL_BACKEND_KEY
        "Authorization": `Bearer ${process.env.ZUDDL_BACKEND_KEY}`
      }
    });

    const text = await r.text(); // pass raw text so we can see upstream errors too
    return {
      statusCode: r.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: text
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
