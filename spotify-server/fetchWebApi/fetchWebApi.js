const { getAccessToken } = require("../auth/auth");

async function fetchWebApi(endpoint, method, body) {
  const token = await getAccessToken();

  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Erro na chamada para Spotify: ${res.status} - ${errorText}`
    );
  }

  return await res.json();
}

exports.fetchWebApi = fetchWebApi;
