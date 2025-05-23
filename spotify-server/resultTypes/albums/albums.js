const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

async function getAlbum(id) {
  return await fetchWebApi(`v1/albums/${id}`, "GET");
}

module.exports = {
  getAlbum,
};
