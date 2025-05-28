const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Fetch an artist's most poular tracks
async function getPlaylist(id) {
  const endpoint = `v1/playlists/${id}`;
  const result = await fetchWebApi(endpoint, "GET");
  const owner_id = result.owner.id;
  const resultOwner = await fetchWebApi(`v1/users/${owner_id}`, "GET");

  result.owner = resultOwner;
  return result;
}

module.exports = { getPlaylist };
