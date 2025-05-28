import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function ArtistSongSkeleton() {
  return (
    <div className="song-card" style={{ gridTemplateColumns: "8fr 2fr" }}>
      <div className="song-index-album">
        <div className="song-index-number">
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
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: "#888888",
                }}
                height={64}
                width={64}
              ></Skeleton>
            </span>
          </div>
        </div>

        <div className="song-image-wrapper"></div>
        <div className="name-artist-wrapper" style={{ width: "100%" }}>
          <span className="song-name">
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
      </div>

      <span className="song-duration">
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
