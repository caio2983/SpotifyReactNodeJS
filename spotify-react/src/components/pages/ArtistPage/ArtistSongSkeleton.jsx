import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function ArtistSongSkeleton() {
  return (
    <div
      className="song-card"
      style={{ gridTemplateColumns: "auto 1fr auto", display: "grid" }}
    >
      <div className="song-index-album">
        <div className="song-index-number">
          <Skeleton
            variant="rectangular"
            sx={{
              bgcolor: "#888888",
            }}
            height={72}
            width={72}
          ></Skeleton>
        </div>

        <div className="gap-fill"></div>
        <div
          className="name-artist-wrapper"
          style={{ width: "100%", display: "flex", alignContent: "center" }}
        ></div>
      </div>

      <span
        className="song-duration"
        style={{ display: "flex", alignItems: "center" }}
      >
        {" "}
        <Skeleton
          variant="text"
          sx={{
            bgcolor: "#888888",
            width: "100%",
            height: "15px",
          }}
        ></Skeleton>
      </span>
    </div>
  );
}
