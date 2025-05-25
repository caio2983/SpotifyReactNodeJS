const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Minecraft default selected track
async function getInitialTrack() {
  const initial_track_id = "6xwhCiWXREsAIQVZqHswVw";

  const resultTrack = await fetchWebApi(`v1/tracks/${initial_track_id}`, "GET");

  return resultTrack;
}

async function getTrack(id) {
  const resultTrack = await fetchWebApi(`v1/tracks/${id}`, "GET");

  return resultTrack;
}

module.exports = {
  getTrack,
  getInitialTrack,
};
