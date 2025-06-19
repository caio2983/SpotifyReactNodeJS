import React, { useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../GlobalContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function NonArtistResultCard({ data, onRemove }) {
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
          src={
            data?.album?.images?.[1]?.url ||
            data?.images?.[1]?.url ||
            data?.album?.images[0].url ||
            data?.images?.[0].url
          }
          alt={data?.name}
        />
      </div>
      <div className="result-details">
        <Link to={`${data?.type}/${data?.id}`}>
          <span className="result-name">{data?.name}</span>
        </Link>
        <span className="result-artist">
          {data?.type === "track"
            ? "Música"
            : data?.type === "album"
            ? "Álbum"
            : data?.type}
        </span>
      </div>

      <FontAwesomeIcon
        icon={faX}
        className="remove-icon"
        size="lg"
        onClick={() => onRemove()}
      ></FontAwesomeIcon>
    </div>
  );
}
