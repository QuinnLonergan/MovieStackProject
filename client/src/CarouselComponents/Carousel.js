import React, { useState, useEffect } from "react";
import "./Carousel.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MovieCard from "../MovieCard";

function Carousel() {
    const [currImg, setCurrImg] = useState(0);
    const [movies, setMovies] = useState([]);
    const [images, setImages] = useState([])
    const apiKey = "dc10dfe0";

    useEffect(() => {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=iron`)
                .then(res => res.json())
                .then((movies) => {
                    setMovies(movies.Search)
                })
    }, []);

    useEffect(() => {
        setImages(movies.map(movie => (
            <MovieCard 
                title={movie.Title}
            />
        )))
    }, [movies]);


  return (
    <div className="carousel">
      <div
        className="carouselInner"
      >
        <div
          className="left"
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
          <ArrowBackIosIcon style={{ fontSize: 30 }} />
        </div>
        <div className="center">
          <h1>{images[currImg]}</h1>
        </div>
        <div
          className="right"
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
          }}
        >
          <ArrowForwardIosIcon style={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  );
}

export default Carousel;