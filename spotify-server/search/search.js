const { fetchWebApi } = require("../fetchWebApi/fetchWebApi");

async function searchItems(search) {
  const query = encodeURIComponent(search);
  console.log(`v1/search/${search}`);
  const resultSearch = await fetchWebApi(
    `v1/search?q=${query}&type=track,artist,album,playlist`,
    "GET"
  );
  return resultSearch;
}

module.exports = {
  searchItems,
};
