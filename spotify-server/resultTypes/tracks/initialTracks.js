const { fetchWebApi } = require("../../fetchWebApi/fetchWebApi");

// Initial tracks used to populate the square swiper in home page
async function getInitialTracks() {
  const ids = [
    "0ngSk8aGEjWS6fsHIV9KKj",
    "6Sn6IBL21PoKa3aHm4qWCj",
    "0uMZbmAAgOhdMrv25iPEH6",
    "1mnrzNnlWjEDikNaA0ULJa",
    "7i8O6KQAS5GKA9OVXa2MNT",
    "3kIdjWDaZ9gs4v2iirkJie",
  ];

  const idsParam = ids.join(",");
  const endpoint = `v1/tracks?ids=${idsParam}`;

  const result = await fetchWebApi(endpoint, "GET");

  return result;
}

module.exports = {
  getInitialTracks,
};
