import React, { useState } from "react";
import Library from "./subcomponents/Library";
import Main from "./subcomponents/Main";
import "../App.css";
import Playing from "./subcomponents/Playing";
import LibraryExpanded from "./subcomponents/LibraryExpanded";
import Song from "./subcomponents/Song";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="home-container">
      {isExpanded && <LibraryExpanded setIsExpanded={setIsExpanded} />}
      <Library setIsExpanded={setIsExpanded}></Library>
      <Main></Main>
      <Song></Song>
      <Playing></Playing>
    </div>
  );
}
