import React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function PlaylistCardSkeleton() {
  return (
    <span className="playlist-card">
      <Skeleton
        variant="rectangular"
        width={60}
        height={1000}
        sx={{
          bgcolor: "#888888",
        }}
      />
      <span className="playlist-card-text-loading">
        <Skeleton
          variant="text"
          sx={{
            bgcolor: "#888888",
          }}
        ></Skeleton>
      </span>
    </span>
  );
}
