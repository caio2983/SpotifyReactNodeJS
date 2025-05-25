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

import axios from "axios";

export default function SwiperSpotify() {
  const [initialArtists, setInitialArtists] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const swiperRef = useRef(null);

  useEffect(() => {
    console.log("Requisição para artistas disparada");
    axios
      .get("http://localhost:3000/initial-artists")
      .then((response) => {
        setInitialArtists(response.data.artists);

        console.log(response.data.artists);
      })
      .catch((error) => {
        console.error("Erro ao buscar artistas:", error);
      });
  }, []);

  const totalSlides = initialArtists.length;

  const fadedSlideIndex = (activeIndex + 4) % totalSlides;
  const leftFadedSlideIndex = (activeIndex - 1 + totalSlides) % totalSlides;

  function renderSlides() {
    if (!Array.isArray(initialArtists) || totalSlides === 0) {
      return (
        <SwiperSlide>
          <div className="slide-rectangle" style={{ textAlign: "center" }}>
            <p>Carregando artistas...</p>
          </div>
        </SwiperSlide>
      );
    }

    return initialArtists.map((artist, i) => (
      <SwiperSlide key={i} style={{ height: "100%", width: "fit-content" }}>
        <div
          style={{
            opacity:
              i === fadedSlideIndex || i === leftFadedSlideIndex ? 0.4 : 1,
            transition: "opacity 0.3s ease",
          }}
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
            <div className="slide-circle">
              <img src={artist.images[1].url} />

              <div className="slider-image-box-shadow"></div>
            </div>
            <span className="slide-name">{artist.name}</span>
            <span className="slide-artist">Artista</span>
          </div>
        </div>
      </SwiperSlide>
    ));
  }

  return (
    <div className="swiper-component-container">
      <p className="swiper-title">Seus artistas favoritos</p>
      <div
        className="main-swiper"
        style={{ position: "relative" }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={4.25}
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
          className={`custom-swiper-button prev ${isHover ? "visible" : ""}`}
          aria-label="Previous slide"
          type="button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          ref={nextRef}
          className={`custom-swiper-button next ${isHover ? "visible" : ""}`}
          aria-label="Next slide"
          type="button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
