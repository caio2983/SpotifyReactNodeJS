import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import { Link } from "react-router-dom";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function LibraryExpanded({ setIsExpanded }) {
  const [animateClass, setAnimateClass] = useState("collapsed");
  const { libraryItems } = useGlobalContext();
  const [showSearch, setShowSearch] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const [selectedType, setSelectedType] = useState("all");

  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimateClass("expanded");
      setAllItems(libraryItems);
      setItems(libraryItems);
    });
  }, []);

  const handleClick = () => {
    setAnimateClass("collapsed");

    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  useEffect(() => {
    const searchLower = searchWord.trim().toLowerCase();

    let filtered = [...allItems];

    if (selectedType !== "all") {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    if (searchLower !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchLower)
      );
    }

    setItems(filtered);
  }, [searchWord, allItems, selectedType]);

  return (
    <SimpleBar style={{ maxHeight: "100%", zIndex: 150 }}>
      <div className={`library-expanded-container ${animateClass}`}>
        <div className="library-expanded-tools">
          <button onClick={handleClick}>Expandir</button>
          <div className="glass-and-input">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="l"
              className="library-magnifying-glass"
              onClick={() => setShowSearch((prev) => !prev)}
              style={{ cursor: "pointer" }}
            />

            <div
              className={`library-input-wrapper animated-search ${
                showSearch ? "expanded" : "collapsed"
              }`}
              ref={wrapperRef}
            >
              <div className="input-and-results library-input-and-results">
                <input
                  ref={inputRef}
                  type="text"
                  className="search-input library-search-input"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={"library-buttons-wrapper expanded-buttons-wrapper"}>
            <button
              className={selectedType === "playlist" ? "active" : ""}
              onClick={() => setSelectedType("playlist")}
            >
              Playlists
            </button>
            <button
              className={selectedType === "track" ? "active" : ""}
              onClick={() => setSelectedType("track")}
            >
              Músicas
            </button>
            <button
              className={selectedType === "artist" ? "active" : ""}
              onClick={() => setSelectedType("artist")}
            >
              Artistas
            </button>
            <button
              className={selectedType === "album" ? "active" : ""}
              onClick={() => setSelectedType("album")}
            >
              Álbuns
            </button>
            <button
              className={selectedType === "all" ? "active" : ""}
              onClick={() => setSelectedType("all")}
            >
              Tudo
            </button>
          </div>
        </div>
        <div className="library-expanded-items">
          {items.map((item) => (
            <div
              className="library-expanded-item-rectangle"
              key={item.id}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div className="library-expanded-item-content">
                <Link to={`/${item.type}/${item.id}`}>
                  <img
                    alt={item.name}
                    className={
                      item.type === "artist"
                        ? "library-expanded-item-image-artist"
                        : "library-expanded-item-image"
                    }
                    src={
                      item.type === "artist"
                        ? item?.images?.[1]?.url
                        : item?.album?.images?.[1]?.url ||
                          item?.images?.[1]?.url ||
                          item?.album?.images[0].url ||
                          item?.images?.[0].url
                    }
                  />
                  <div className="library-expanded-item-info">
                    <span className="slide-name library-expanded-item-title ">
                      {item.name}
                    </span>
                    <span className="library-expanded-item-info slide-artist">
                      {item.type === "artist"
                        ? item?.artists?.[0]?.name ??
                          item?.owner?.display_name ??
                          "Artista"
                        : item.type === "album"
                        ? item?.artists?.[0]?.name ?? "Álbum"
                        : item?.album?.artists?.[0]?.name ??
                          item?.owner?.display_name ??
                          "Desconhecido"}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SimpleBar>
  );
}
