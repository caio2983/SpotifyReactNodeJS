import React, { useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../GlobalContext";
import { Link } from "react-router-dom";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ArtistResultCard({ data, onRemove }) {
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
      <div className="result-artist-picture">
        <img src={data?.images?.[1]?.url} alt={data?.name} />
      </div>
      <div className="result-details">
        <span className="result-name">Artista</span>
        <Link to={`/artist/${data?.id}`}>
          <span className="result-artist">{data?.name}</span>
        </Link>
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
