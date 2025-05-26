const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Fetch an artist's most poular tracks
async function getArtistPopularTracks(id) {
  const endpoint = `v1/artists/${id}/top-tracks`;
  const result = await fetchWebApi(endpoint, "GET");
  return result;
}

module.exports = { getArtistPopularTracks };
