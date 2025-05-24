import React from "react";
import spotifyLogo from "../../../assets/spotifyLogo.png";
import { Link } from "react-router-dom";
import HeaderSearchResults from "./HeaderSearchResults";

export default function Header() {
  return (
    <div className="header">
      <Link to="/" className="logo-wrapper">
        <img src={spotifyLogo} alt="Spotify Logo" />
      </Link>

      <div className="input-wrapper">
        <div className="semi-circle semi-circle-1"></div>

        <div className="input-and-results">
          <input type="text" className="search-input"></input>

          <HeaderSearchResults></HeaderSearchResults>
        </div>
        <div className="semi-circle semi-circle-2"></div>
      </div>
    </div>
  );
}
