import React, { useEffect, useState } from "react";

export default function LibraryExpanded({ setIsExpanded }) {
  const [animateClass, setAnimateClass] = useState("collapsed");

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimateClass("expanded");
    });
  }, []);

  const handleClick = () => {
    setAnimateClass("collapsing");

    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  return (
    <div className={`library-expanded-container ${animateClass}`}>
      Conteúdo expandido!
      <button onClick={handleClick}>Expandir</button>
    </div>
  );
}
