const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { fetchWebApi } = require("./fetchWebApi/fetchWebApi");
const { getTrack, getInitialTrack } = require("./resultTypes/tracks/tracks");
const { getInitialPlaylists } = require("./resultTypes/playlists/playlists");
const { getAlbum } = require("./resultTypes/albums/albums");
const { searchItems } = require("./search/search");
const { getInitialArtists } = require("./resultTypes/artists/initialArtists");
const { getInitialTracks } = require("./resultTypes/tracks/initialTracks");
const {
  getArtistPopularTracks,
} = require("./resultTypes/artists/artistPopularTracks");
const { getArtistAlbums } = require("./resultTypes/artists/artistAlbums");
const { getArtist } = require("./resultTypes/artists/getArtist");
const { getPlaylist } = require("./resultTypes/playlists/getPlaylist");
const { searches } = require("./recentSearches/recentSearches");
let { user_library } = require("./library/library");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

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

app.get("/initial-tracks", async (req, res) => {
  try {
    const data = await getInitialTracks();
    res.json(data);
  } catch (err) {
    console.error("error initial artists", err);
    res.status(500).json({ error: "erro ao acessar as tracks iniciais" });
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
      return res.status(400).json({ error: "ID do álbum é obrigatório" });
    }

    const album = await getAlbum(id);

    res.json(album);
  } catch (err) {
    console.error("Erro ao buscar a música:", err);
    res.status(500).json({ error: "Erro ao conseguir a música" });
  }
});

app.get("/artist-popular-tracks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID do artista é obrigatório" });
    }

    const tracks = await getArtistPopularTracks(id);
    res.json(tracks);
  } catch (err) {
    console.error("Erro ao buscar as músicas mais populares do artista:", err);
    res.status(500).json({ error: "erro ao conseguir as músicas " });
  }
});

app.get("/artist-albums/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID do artista é obrigatório" });
    }

    const albums = await getArtistAlbums(id);
    res.json(albums);
  } catch (err) {
    console.error("Erro ao buscar os albuns do artista:", err);
    res.status(500).json({ error: "erro ao conseguir os albuns " });
  }
});

app.get("/artist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID do artista é obrigatório" });
    }

    const artist = await getArtist(id);
    res.json(artist);
  } catch (err) {
    console.error("Erro ao buscar o artista:", err);
    res.status(500).json({ error: "erro ao conseguir o artista " });
  }
});

app.get("/playlist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID da playlist é obrigatório" });
    }

    const playlist = await getPlaylist(id);
    res.json(playlist);
  } catch (err) {
    console.error("Erro ao buscar a playlist:", err);
    res.status(500).json({ error: "erro ao conseguir a playlist " });
  }
});

app.get("/recentsearches", async (req, res) => {
  res.json(searches);
});

app.post("/recentsearches", (req, res) => {
  const newSearch = req.body;

  if (!newSearch || !newSearch.id || !newSearch.type) {
    return res.status(400).json({ erro: "invalid search" });
  }

  const exists = searches.some((item) => item.id === newSearch.id);

  if (!exists) {
    searches.push(newSearch);
  }

  res.status(201).json({ mensagem: "new search added", newSearch });
});

app.post("/library", async (req, res) => {
  const library_item = req.body;

  if (!library_item || !library_item.id || !library_item.type) {
    return res.status(400).json({ erro: "invalid library item" });
  }

  const exists = user_library.some((item) => item.id === library_item.id);

  if (!exists) {
    user_library.push(library_item);
  }

  res.status(201).json({ mensagem: "new item added to library", library_item });
});

app.post("/remove-library", async (req, res) => {
  let library_item = req.body;

  if (!library_item || !library_item.id || !library_item.type) {
    return res.status(400).json({ erro: "invalid library item" });
  }

  user_library = user_library.filter(
    (item) => item.id !== library_item.id || item.type !== library_item.type
  );

  let indexToRemove = user_library.findIndex(
    (item) => item.id === library_item.id && item.type === library_item.type
  );

  if (indexToRemove === -1) {
    return res.status(404).json({ mensagem: "item not found in library" });
  }

  user_library.splice(indexToRemove, 1);

  res.status(200).json({ mensagem: "item removed from library", library_item });
});

app.get("/library", async (req, res) => {
  res.json(user_library);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
