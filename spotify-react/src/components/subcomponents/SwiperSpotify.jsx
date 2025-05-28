import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "@mui/material/Skeleton";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../GlobalContext";

export default function SwiperSpotify({ format, data, album, type }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const { setGlobalSearchResult, isSearching } = useGlobalContext();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const swiperRef = useRef(null);

  const totalSlides = data?.length ?? 0;

  const maxSlidesPerView = 4.35;
  const slidesPerViewValue =
    totalSlides < maxSlidesPerView ? totalSlides : maxSlidesPerView;

  function renderSlides() {
    if (!Array.isArray(data) || totalSlides === 0) {
      console.log("RENDER SLIDES ERROR", data);
      return (
        <SwiperSlide>
          <div className="slide-rectangle" style={{ textAlign: "center" }}>
            <p>Carregando artistas...</p>
          </div>
        </SwiperSlide>
      );
    }

    return data.map((item, i) => (
      <SwiperSlide
        key={i}
        style={{
          height: "100%",
          width: "fit-content",
        }}
      >
        <Link to={`/${type}/${item?.id}`} state={{ item }}>
          <div
            className="slide-rectangle"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.14)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <div className="slide-content">
              <div
                className={`${
                  format === "circle" ? "slide-circle" : "slide-square"
                }`}
              >
                {isSearching && (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      bgcolor: "#888888",
                    }}
                  ></Skeleton>
                )}

                {isSearching ? (
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "100%",
                      bgcolor: "#888888",
                      borderRadius: format === "circle" ? "50%" : "8px",
                    }}
                  />
                ) : (
                  <img
                    src={
                      format === "circle"
                        ? item.images?.[1]?.url ?? item.album?.images?.[1]?.url
                        : item?.album?.images?.[1]?.url ??
                          item?.images?.[1]?.url ??
                          item?.images?.[0]?.url
                    }
                    alt="image"
                  />
                )}

                <div className="slider-image-circle-box-shadow"></div>
              </div>

              <div className="slide-text-wrapper">
                <span className="slide-name">
                  {isSearching ? (
                    <Skeleton
                      variant="text"
                      sx={{
                        width: "100px",
                        height: "100%",
                        bgcolor: "#888888",
                      }}
                    />
                  ) : (
                    item?.name
                  )}
                </span>

                <span className="slide-artist">
                  {isSearching ? (
                    <Skeleton
                      variant="text"
                      sx={{
                        width: "50px",
                        height: "100%",
                        bgcolor: "#888888",
                      }}
                    />
                  ) : format === "circle" ? (
                    "Artista"
                  ) : (
                    item?.artists?.[0]?.name || "Desconhecido"
                  )}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    ));
  }

  return (
    <div className="swiper-component-container">
      {!album && (
        <p className="swiper-title">
          {format === "circle"
            ? "Seus artistas favoritos"
            : "Suas músicas estão com saudade"}
        </p>
      )}
      <div
        className="main-swiper"
        style={{ position: "relative" }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={slidesPerViewValue}
          slidesPerGroup={2}
          modules={[Navigation]}
          loop={false}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          style={{ height: "100%" }}
          onInit={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
            swiper.navigation.update();
          }}
        >
          {renderSlides()}
        </Swiper>

        <button
          ref={prevRef}
          className={`custom-swiper-button prev ${isHover ? "visible" : ""} ${
            totalSlides < 5 ? "disabled" : ""
          }`}
          aria-label="Previous slide"
          format="button"
          disabled={totalSlides < 5}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          ref={nextRef}
          className={`custom-swiper-button next ${isHover ? "visible" : ""} ${
            totalSlides < 5 ? "disabled" : ""
          }`}
          aria-label="Next slide"
          format="button"
          disabled={totalSlides < 5}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
