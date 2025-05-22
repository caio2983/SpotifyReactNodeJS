const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(cors());

// const token = process.env.SPOTIFY_TOKEN;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao obter token: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

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

async function getNewReleases() {
  return await fetchWebApi("v1/browse/new-releases", "GET");
}

// This function is used to populate the ''tracks'' key in album / playlists
async function getTrack(id) {
  // https://api.spotify.com/v1/tracks/5E9qBEUja2yAjUPhQO8Gx7
  return await fetchWebApi(`v1/tracks/${id}`, "GET");
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
    const owner_id = result.owner.id;
    const resultOwner = await fetchWebApi(`v1/users/${owner_id}`, "GET");

    console.log(result);
    results.push({
      image: result.images,
      href: result.href,
      id: result.id,
      name: result.name,
      owner: result.owner,
      tracks: result.tracks,
      artists: result.artists,
      description: result.description,
      owner: resultOwner,
      followers: result.followers,
    });
  }

  for (track in results.tracks?.items) {
    const track_id = track.track.id;
    const resultTrack = await getTrack(track_id);

    track = resultTrack;
  }

  return results;
}

// Minecraft default track
async function getInitialTrack() {
  const initial_track_id = "6xwhCiWXREsAIQVZqHswVw";

  const resultTrack = await fetchWebApi(`v1/tracks/${initial_track_id}`, "GET");

  return resultTrack;
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

    res.json(data);
  } catch (err) {
    console.error("error playlists", err);
    res.status(500).json({ error: "Erro ao acessar API do Spotify" });
  }
});

// Minecraft default track
app.get("/initial-track", async (req, res) => {
  try {
    const data = await getInitialTrack();
    res.json(data);
  } catch (err) {
    console.error("error initial music", err);
    res.status(500).json({ error: "erro ao conseguir a primeira musica" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
