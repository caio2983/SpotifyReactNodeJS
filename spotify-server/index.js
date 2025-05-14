const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(cors());

const token = process.env.SPOTIFY_TOKEN;

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
  return await res.json();
}

async function getNewReleases() {
  return await fetchWebApi("v1/browse/new-releases", "GET");
}

async function getInitialPlaylists() {
  const playlist_ids = [
    "3yuRcKvcuH3UWE65rUG09N",
    "59t8ddTpSrPmoeHKVYqofq",
    "4QgNA28tONdhtb7zJMNz6I",
    "06tCWiOWTnuTfoKwHB8Byl",
    "5SxdXfHoBlJzVvqmTwRXPw",
    "2HfFccisPxQfprhgIHM7XH",
    "3DZymF4xwHZHo0cbgLDiv1",
    "4OtetuN08DiPosPhfxsyCw",
  ];
  const results = [];

  for (const playlist_id of playlist_ids) {
    const result = await fetchWebApi(`v1/playlists/${playlist_id}`, "GET");

    results.push({
      image: result.images,
      href: result.href,
      id: result.id,
      name: result.name,
      owner: result.owner,
      tracks: result.tracks,
      artists: result.artists,
    });
  }
  return results;
}

app.get("/new-releases", async (req, res) => {
  try {
    const data = await getNewReleases();
    res.json(data.albums.items);
  } catch (err) {
    console.error("Erro ao buscar dados do Spotify:", err);
    res.status(500).json({ error: "Erro ao acessar API do Spotify" });
  }
});

app.get("/initial-playlists", async (req, res) => {
  try {
    const data = await getInitialPlaylists();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error("error playlists", err);
    res.status(500).json({ error: "Erro ao acessar API do Spotify" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
