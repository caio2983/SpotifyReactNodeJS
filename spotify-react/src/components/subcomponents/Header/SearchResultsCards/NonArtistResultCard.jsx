import React, { useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../GlobalContext";

export default function NonArtistResultCard({ data }) {
  const { setRecentSearches } = useGlobalContext();

  useEffect(() => {
    axios
      .get("http://localhost:3000/recentsearches")
      .then((response) => {
        setRecentSearches(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar buscas recentes na montagem:", error);
      });
  }, []);

  return (
    <div className="result-card">
      <div className="result-nonArtist-picture">
        <img
          src={data?.album?.images?.[1]?.url || data?.images?.[1]?.url}
          alt={data?.name}
        />
      </div>
      <div className="result-details">
        <span className="result-name">{data?.name}</span>
        <span className="result-artist">
          {data?.type === "track"
            ? "Música"
            : data?.type === "album"
            ? "Álbum"
            : data?.type}
        </span>
      </div>
    </div>
  );
}
