const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");
const { getTrack } = require("../tracks/tracks");

// Fetches the initial set of playlists used to populate the homepage cards
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

module.exports = {
  getInitialPlaylists,
};
