import { Skeleton } from "@mui/material";

export default function PlaylistSongSkeleton() {
  return (
    <div className="song-row">
      <div className="song-index-album">
        <div className="song-index-number"></div>

        <Skeleton
          variant="rectangular"
          height={64}
          width={64}
          sx={{ bgcolor: "#888888" }}
        />

        <Skeleton variant="text" width={150} sx={{ bgcolor: "#888888" }} />
      </div>

      <span className="song-album">
        <Skeleton variant="text" width={150} sx={{ bgcolor: "#888888" }} />
      </span>
      <span className="song-date">
        <Skeleton variant="text" width={150} sx={{ bgcolor: "#888888" }} />
      </span>

      <span className="song-duration">
        <Skeleton variant="text" width={125} sx={{ bgcolor: "#888888" }} />
      </span>
    </div>
  );
}
