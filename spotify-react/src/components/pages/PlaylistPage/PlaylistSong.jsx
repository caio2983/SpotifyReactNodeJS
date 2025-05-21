import React, { useEffect } from "react";
import { format, formatDistanceToNow, differenceInMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function PlaylistSong({ index, image, song }) {
  useEffect(() => {
    console.log(song);
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const now = new Date();

    if (differenceInMonths(now, date) <= 1) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } else {
      return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
  }

  return (
    <div className="song-card">
      <div className="song-index-album">
        <span className="song-index-number">
          <span className="song-index"> {index + 1}</span>

          <span className="song-play-triangle">▶</span>
        </span>

        <div className="song-image-wrapper">
          <img src={image}></img>
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
