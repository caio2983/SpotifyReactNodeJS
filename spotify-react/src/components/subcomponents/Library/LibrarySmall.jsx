import {
  faArrowsLeftRightToLine,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function LibrarySmall({ setIsExpanded, data }) {
  function handleClick() {
    setIsExpanded(true);
  }

  return (
    <div className="library-small-container">
      <div
        style={{ width: "75px", height: "75px" }}
        onClick={handleClick}
        className="library-icon"
      >
        <FontAwesomeIcon
          icon={faBookOpen}
          size="2xl"
          className="icon-default"
        />
        <FontAwesomeIcon
          icon={faArrowsLeftRightToLine}
          size="2xl"
          className="icon-hover"
        />
      </div>
      <div className="library-small-list">
        {data.map((item, index) => (
          <Link to={`/${item.type}/${item.id}`} key={index}>
            <div
              className={
                item.type === "artist"
                  ? "library-small-item-artist"
                  : "library-small-item"
              }
            >
              <img
                src={
                  item.type === "artist"
                    ? item?.images?.[1]?.url
                    : item?.album?.images?.[1]?.url ||
                      item?.images?.[1]?.url ||
                      item?.album?.images?.[0]?.url ||
                      item?.images?.[0]?.url
                }
                alt={item.name}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
