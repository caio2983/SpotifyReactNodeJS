const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Fetch an artist's most poular tracks
async function getArtist(id) {
  const endpoint = `v1/artists/${id}`;
  const result = await fetchWebApi(endpoint, "GET");
  return result;
}

module.exports = { getArtist };
