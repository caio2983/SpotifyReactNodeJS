const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Fetches the initial set of artists used to populate the homepage swiper
async function getInitialArtists() {
  const ids = [
    "3NbPGB8aCTBF7wyvi538tn",
    "3o2dn2O0FCVsWDFSh8qxgG",
    "2dXj6aC3DsxoTDyhk3u4gl",
    "6Ghvu1VvMGScGpOUJBAHNH",
    "6olE6TJLqED3rqDCT0FyPh",
    "7jy3rLJdDQY21OgRLCZ9sD",
    "5AyEXCtu3xnnsTGCo4RVZh",
  ];

  const idsParam = ids.join(",");
  const endpoint = `v1/artists?ids=${idsParam}`;

  const result = await fetchWebApi(endpoint, "GET");

  return result;
}

module.exports = { getInitialArtists };
