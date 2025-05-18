import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PlaylistPage() {
  const location = useLocation();
  const { playlist } = location.state || {};
  const { gradientRef } = location.state || {};

  useEffect(() => {
    console.log(playlist);
    console.log("gradient", gradientRef);
  }, [playlist]);

  return (
    <div className="main-container">
      <div className="playlist-page-header">
        <div className="playlist-page-image-container">
          <img src={playlist.image[0].url} className="playlist-image" />
        </div>
      </div>
    </div>
  );
}
