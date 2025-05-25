const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { fetchWebApi } = require("./fetchWebApi/fetchWebApi");
const { getTrack, getInitialTrack } = require("./resultTypes/tracks/tracks");
const { getInitialPlaylists } = require("./resultTypes/playlists/playlists");
const { getAlbum } = require("./resultTypes/albums/albums");
const { searchItems } = require("./search/search");
const { getInitialArtists } = require("./resultTypes/artists/initialArtists");

const app = express();
const PORT = 3000;
app.use(cors());

// const token = process.env.SPOTIFY_TOKEN;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

app.get("/new-releases", async (req, res) => {
  try {
    const data = await getNewReleases();
    res.json(data.albums.items);
  } catch (err) {
    console.error("Erro ao buscar dados do Spotify:", err);
    res.status(500).json({ error: "Erro ao acessar API do Spotify" });
  }
});

async function getNewReleases() {
  return await fetchWebApi("v1/browse/new-releases", "GET");
}

app.get("/initial-playlists", async (req, res) => {
  try {
    const data = await getInitialPlaylists();

    res.json(data);
  } catch (err) {
    console.error("error playlists", err);
    res.status(500).json({ error: "Erro ao acessar API do Spotify" });
  }
});

app.get("/initial-artists", async (req, res) => {
  try {
    const data = await getInitialArtists();
    res.json(data);
  } catch (err) {
    console.error("error initial artists", err);
    res.status(500).json({ error: "erro ao acessar os artistas inicaisi" });
  }
});

// Minecraft default track
app.get("/initial-track", async (req, res) => {
  try {
    const data_initialTrack = await getInitialTrack();

    album_id = data_initialTrack.album.id;

    const data_initialAlbum = await getAlbum(album_id);

    res.json([data_initialTrack, data_initialAlbum]);
  } catch (err) {
    console.error("error initial music", err);
    res.status(500).json({ error: "erro ao conseguir a primeira musica" });
  }
});

app.get("/get-track/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID da música é obrigatório" });
    }

    const data_track = await getTrack(id);

    res.json(data_track);
  } catch (err) {
    console.error("Erro ao buscar a música:", err);
    res.status(500).json({ error: "Erro ao conseguir a música" });
  }
});

app.get("/search/:search", async (req, res) => {
  try {
    const { search } = req.params;
    if (!search) {
      return res.status(400).json({ error: "Conteúdo da busca é obrigatório" });
    }

    const search_results = await searchItems(search);

    res.json(search_results);
  } catch (err) {
    console.error("Erro ao buscar", err);
    res.status(500).json({ error: "Erro ao buscar" });
  }
});

app.get("/get-album/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID da música é obrigatório" });
    }

    const album = await getAlbum(id);

    res.json(album);
  } catch (err) {
    console.error("Erro ao buscar a música:", err);
    res.status(500).json({ error: "Erro ao conseguir a música" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
