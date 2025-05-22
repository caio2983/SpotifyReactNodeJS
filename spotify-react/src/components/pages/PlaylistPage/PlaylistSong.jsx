import React, { useEffect } from "react";
import { format, formatDistanceToNow, differenceInMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useGlobalContext } from "../../../GlobalContext";

export default function PlaylistSong({ index, image, song, playlist }) {
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
    console.log("CLICKED SONG !!!", playlist);

    setNextSongs({
      nextsongs: playlist.tracks.items,
      id: playlist.id,
      type: "playlist",
    });
  }

  return (
    <div className="song-card">
      <div className="song-index-album">
        <span className="song-index-number" onClick={clickSong}>
          <span className="song-index"> {index + 1}</span>

          <span className="song-play-triangle">▶</span>
        </span>
        <div className="song-image-wrapper">
          <img src={image}></img>
        </div>
        <div className="name-artist-wrapper">
          <span className="song-name">{song.name}</span>
          <span className="song-artist">{song.artists[0].name}</span>
        </div>
      </div>
      <span className="song-album">{song.album.name}</span>
      <span className="song-date">{formatDate(song.album.release_date)}</span>
      <span className="song-duration">
        {Math.floor(song.duration_ms / 60000)}:
        {Math.floor((song.duration_ms % 60000) / 1000)
          .toString()
          .padStart(2, "0")}
      </span>
    </div>
  );
}
