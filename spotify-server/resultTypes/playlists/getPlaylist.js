const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Fetch an artist's most poular tracks
async function getPlaylist(id) {
  const endpoint = `v1/playlists/${id}`;
  const result = await fetchWebApi(endpoint, "GET");

  const owner_id = result.owner.id;
  const resultOwner = await fetchWebApi(`v1/users/${owner_id}`, "GET");

  if (!result.tracks.items) {
    const result_items = await fetchWebApi(`v1/playlists/${result.id}/tracks`);
    result.tracks.items = result_items;
  }

  result.owner = resultOwner;
  return result;
}

module.exports = { getPlaylist };
