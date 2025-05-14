import React from "react";
import Library from "./subcomponents/Library";
import Main from "./subcomponents/Main";
import "../App.css";
import Playing from "./subcomponents/Playing";

export default function Home() {
  return (
    <div className="home-container">
      <Library></Library>
      <Main></Main>
      <Playing></Playing>
    </div>
  );
}
