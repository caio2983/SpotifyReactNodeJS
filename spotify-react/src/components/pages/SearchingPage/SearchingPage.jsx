import React, { useEffect } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import SwiperSpotify from "../../subcomponents/SwiperSpotify";

export default function SearchingPage() {
  const { globalSearchResult } = useGlobalContext();

  useEffect(() => {
    console.log("GLOBAL RESULTTTT", globalSearchResult);
  }, [globalSearchResult]);

  return (
    <div className="main-container searching-container">
      <div className="swipers-wrapper searching-swiper">
        <p>Músicas</p>
        {globalSearchResult && (
          <SwiperSpotify
            type="square"
            data={globalSearchResult?.tracks.items || []}
            album={true}
          />
        )}
      </div>

      <div className="swipers-wrapper searching-swiper">
        <p>Artistas</p>
        {globalSearchResult && (
          <SwiperSpotify
            type="circle"
            data={globalSearchResult?.artists.items || []}
            album={true}
          />
        )}
      </div>

      <div className="swipers-wrapper searching-swiper">
        <p>Playlists</p>
        {globalSearchResult && (
          <SwiperSpotify
            type="square"
            data={globalSearchResult?.playlists.items || []}
            album={true}
            playlist={true}
          />
        )}
      </div>

      <div className="swipers-wrapper searching-swiper">
        <p>Álbuns</p>
        {globalSearchResult && (
          <SwiperSpotify
            type="square"
            data={globalSearchResult?.albums.items || []}
            album={true}
          />
        )}
      </div>
    </div>
  );
}
