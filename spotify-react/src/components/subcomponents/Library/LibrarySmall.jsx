import React from "react";

export default function LibrarySmall({ setIsExpanded }) {
  function handleClick() {
    setIsExpanded(true);
  }
  return (
    <div className="library-small-container">
      <div
        style={{ width: "75px", height: "75px", backgroundColor: "blue" }}
        onClick={handleClick}
      ></div>
      <div
        style={{ width: "75px", height: "75px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "75px", height: "75px", backgroundColor: "red" }}
      ></div>
      <div
        style={{ width: "75px", height: "75px", backgroundColor: "red" }}
      ></div>
    </div>
  );
}
