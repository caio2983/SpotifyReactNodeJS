import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../../GlobalContext";
import SwiperSpotify from "../../subcomponents/SwiperSpotify";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function SearchingPage() {
  const { globalSearchResult, setGlobalSearchResult, setSearchTerm } =
    useGlobalContext();

  const { query } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchTerm(query);

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/search/${query}`
        );

        const cleanedData = {
          ...response.data,
          playlists: {
            ...response.data.playlists,
            items:
              response.data.playlists?.items?.filter((item) => item !== null) ||
              [],
          },
        };

        console.log("Playlists data", response.data.playlists);

        setGlobalSearchResult(cleanedData);
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return isLoading ? (
    <SyncLoader
      color="#b3b3b3"
      className="searching-loading"
      size={30}
      speedMultiplier={0.7}
    />
  ) : (
    <SimpleBar style={{ maxHeight: "100%" }}>
      <div className="main-container searching-container">
        <p className="showing-results">
          Mostrando resultados para:
          <span className="search-term"> {query} </span>
        </p>

        <div className="swipers-wrapper searching-swiper">
          <p>Músicas</p>
          {globalSearchResult && (
            <SwiperSpotify
              format="square"
              type="track"
              data={globalSearchResult?.tracks.items || []}
              album={true}
              search={true}
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
              search={true}
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
              search={true}
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
              search={true}
            />
          )}
        </div>
      </div>
    </SimpleBar>
  );
}
