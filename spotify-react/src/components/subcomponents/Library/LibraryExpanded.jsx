import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../GlobalContext";
import { Link } from "react-router-dom";
export default function LibraryExpanded({ setIsExpanded }) {
  const [animateClass, setAnimateClass] = useState("collapsed");
  const { libraryItems } = useGlobalContext();

  useEffect(() => {
    requestAnimationFrame(() => {
      setAnimateClass("expanded");
    });
  }, []);

  const handleClick = () => {
    setAnimateClass("collapsed");

    setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  return (
    <div className={`library-expanded-container ${animateClass}`}>
      <div className="library-expanded-tools">
        <button onClick={handleClick}>Expandir</button>
      </div>
      <div className="library-expanded-items">
        {libraryItems.map((item) => (
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
                    <Link to={`/${item.type}/${item.id}`}>{item.name}</Link>
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
  );
}
