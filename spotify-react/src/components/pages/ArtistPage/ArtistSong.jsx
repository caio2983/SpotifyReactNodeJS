import React, { useEffect } from "react";
import { useGlobalContext } from "../../../GlobalContext";

export default function ArtistSong({ track, index, tracks, artist_id }) {
  const { songSelected, setSong } = useGlobalContext();
  const { nextSongs, setNextSongs } = useGlobalContext();

  // function formatDate(inputDate) {
  //   const date = new Date(inputDate);
  //   const now = new Date();

  //   if (differenceInMonths(now, date) <= 1) {
  //     return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  //   } else {
  //     return format(date, "d 'de' MMM. 'de' yyyy", { locale: ptBR });
  //   }
  // }

  function clickSong() {
    setSong(track);

    setNextSongs({
      nextsongs: tracks,
      id: artist_id,
      type: "artist",
    });
  }

  return (
    <div className="song-card">
      <div className="song-index-album">
        <div className="song-index-number" onClick={clickSong}>
          <div
            className="song-artist-index-wrapper"
            style={{ display: "flex", alignContent: "center" }}
          >
            <span
              className="song-index"
              style={{
                marginBottom: "0",
                alignItems: "center",
              }}
            >
              {index}
            </span>
          </div>

          <div
            className="song-play-triangle"
            style={{
              display: "flex",
              alignContent: "center",
            }}
          >
            <span
              style={{
                marginBottom: "0",
                alignItems: "center",
              }}
            >
              ▶
            </span>
          </div>
        </div>

        <div className="song-image-wrapper">
          <img src={track?.album?.images[2].url}></img>
        </div>
        <div className="name-artist-wrapper">
          <span className="song-name"></span>
          <span className="song-artist"></span>
        </div>
      </div>
      <span className="song-album"></span>
      <span className="song-date"></span>
      <span className="song-duration">
        {/* {Math.floor(song.duration_ms / 60000)}:
        {Math.floor((song.duration_ms % 60000) / 1000)
          .toString()
          .padStart(2, "0")} */}
      </span>
    </div>
  );
}
