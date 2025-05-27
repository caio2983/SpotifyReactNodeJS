const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Fetch an artist's most poular tracks
async function getArtistAlbums(id) {
  const endpoint = `v1/artists/${id}/albums`;
  const result = await fetchWebApi(endpoint, "GET");
  return result;
}

module.exports = { getArtistAlbums };
