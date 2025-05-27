import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SwiperSpotify({ type, data, album }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const swiperRef = useRef(null);

  const totalSlides = data?.length ?? 0;

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
        <Link
          to={`/${type === "circle" ? "artist" : "track"}/${item.id}`}
          state={{ item }}
        >
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
                  type === "circle" ? "slide-circle" : "slide-square"
                }`}
              >
                <img
                  src={
                    type === "circle"
                      ? item.images?.[1]?.url ?? item.album?.images?.[1]?.url
                      : item.album?.images?.[1]?.url ?? item.images?.[1]?.url
                  }
                  alt="image"
                />

                <div className="slider-image-circle-box-shadow"></div>
              </div>

              <div className="slide-text-wrapper">
                <span className="slide-name">{item.name}</span>
                <span className="slide-artist">
                  {type === "circle"
                    ? "Artista"
                    : item?.artists?.[0]?.name || "Desconhecido"}
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
          {type === "circle"
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
          slidesPerView={4}
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
          type="button"
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
          type="button"
          disabled={totalSlides < 5}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
