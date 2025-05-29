import { Skeleton } from "@mui/material";
import React from "react";

export default function PlaylistSongSkeleton() {
  return (
    <div className="song-card">
      <div className="song-index-album">
        <div className="song-index-number">
          <span className="song-index">
            <Skeleton
              variant="rectangular"
              height={64}
              width={64}
              sx={{ bgcolor: "#888888" }}
            />
          </span>
        </div>

        <Skeleton variant="text" width={200} sx={{ bgcolor: "#888888" }} />
      </div>

      <span className="song-album">
        <Skeleton variant="text" sx={{ bgcolor: "#888888" }} />
      </span>
      <span className="song-date">
        <Skeleton variant="text" sx={{ bgcolor: "#888888" }} />
      </span>
      <span className="song-duration">
        <Skeleton variant="text" sx={{ bgcolor: "#888888" }} />
      </span>
    </div>
  );
}
