import React, { Fragment, useEffect } from "react";
import { format, formatDistanceToNow, differenceInMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useGlobalContext } from "../../../GlobalContext";
import { Link } from "react-router-dom";

export default function PlaylistSong({
  index,
  image,
  song,
  playlist,
  currentWidth,
}) {
  useEffect(() => {
    console.log(song);
  }, []);

  const { songSelected, setSong } = useGlobalContext();
  const { nextSongs, setNextSongs } = useGlobalContext();

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const now = new Date();

    if (differenceInMonths(now, date) <= 1) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } else {
      return format(date, "d 'de' MMM. 'de' yyyy", { locale: ptBR });
    }
  }

  function clickSong() {
    setSong(song);

    setNextSongs({
      nextsongs: playlist.tracks.items,
      id: playlist.id,
      type: "playlist",
    });
  }

  return (
    <div className="song-row" onClick={clickSong}>
      <div className="song-index-album-playlist">
        <div className="song-index-number" onClick={clickSong}>
          <span className="song-index"> {index + 1}</span>

          <span className="song-play-triangle">▶</span>
        </div>

        <div className="song-image-wrapper">
          <img src={image}></img>
        </div>

        <div className="name-artist-wrapper  ">
          <Link to={`/track/${song.id}`}>
            <span className="song-name ">{song.name}</span>
          </Link>
          <Link to={`/artist/${song.artists[0].id}`}>
            <span className="song-artist">{song.artists[0].name}</span>
          </Link>
        </div>
      </div>

      <div className="gap-fill"></div>
      <Link to={`/album/${song.album.id}`} className="song-album-playlist">
        <span className="song-album ">{song.album.name}</span>
      </Link>
      <div className="gap-fill"></div>
      {currentWidth > 57 && (
        <>
          <span className="song-date song-album-playlist">
            {formatDate(song.album.release_date)}
          </span>
          <div className="gap-fill"></div>
        </>
      )}

      <span className="song-duration song-album-playlist">
        {Math.floor(song.duration_ms / 60000)}:
        {Math.floor((song.duration_ms % 60000) / 1000)
          .toString()
          .padStart(2, "0")}
      </span>
    </div>
  );
}
