const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { prompt } = JSON.parse(event.body);
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }], role: "user" }]
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        response: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
