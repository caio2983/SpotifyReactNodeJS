import React, { useEffect } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import SwiperSpotify from "../../subcomponents/SwiperSpotify";

export default function SearchingPage() {
  const { globalSearchResult, searchTerm } = useGlobalContext();

  return (
    <div className="main-container searching-container">
      <p className="showing-results">
        Mostrando resultados para:
        <span className="search-term"> {searchTerm} </span>
      </p>

      <div className="swipers-wrapper searching-swiper">
        <p>Músicas</p>
        {globalSearchResult && (
          <SwiperSpotify
            format="square"
            type="track"
            data={globalSearchResult?.tracks.items || []}
            album={true}
          />
        )}
      </div>

      <div className="swipers-wrapper searching-swiper">
        <p>Artistas</p>
        {globalSearchResult && (
          <SwiperSpotify
            format="circle"
            type="artist"
            data={globalSearchResult?.artists.items || []}
            album={true}
          />
        )}
      </div>

      <div className="swipers-wrapper searching-swiper">
        <p>Playlists</p>
        {globalSearchResult && (
          <SwiperSpotify
            format="square"
            type="playlist"
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
            format="square"
            type="album"
            data={globalSearchResult?.albums.items || []}
            album={true}
          />
        )}
      </div>
    </div>
  );
}
