import { Skeleton } from "@mui/material";

export default function PlaylistSongSkeleton({ isSmall }) {
  return (
    <div className="song-row" style={{}}>
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

      <div className="gap-fill"></div>

      <span className="song-album">
        <Skeleton variant="text" width={150} sx={{ bgcolor: "#888888" }} />
      </span>

      <div className="gap-fill"></div>

      {!isSmall && (
        <>
          <span className="song-date">
            <Skeleton variant="text" width={150} sx={{ bgcolor: "#888888" }} />
          </span>

          <div className="gap-fill"></div>
        </>
      )}

      <span className="song-duration">
        <Skeleton variant="text" width={125} sx={{ bgcolor: "#888888" }} />
      </span>
    </div>
  );
}
