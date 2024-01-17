import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Movies = ({ genreId, genreName }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const movieRowRef = useRef(null);

  const apiKey = "b11b459ad0fc33643944e08ebb5f80ba"; // replace with your actual API key

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [genreId, apiKey]);

  const scroll = (direction) => {
    const container = movieRowRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8; // Adjust this value as needed
      const newScrollPosition = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = movieRowRef.current;
    if (container) {
      const isAtStart = container.scrollLeft <= 0;
      // Introduce a threshold (e.g., 5 pixels) to account for fractional values
      const isAtEnd = container.scrollLeft + container.offsetWidth + 5 >= container.scrollWidth;
  
 
  
      setShowLeftScroll(!isAtStart);
      setShowRightScroll(!isAtEnd);
    }
  };

  useEffect(() => {
    const movieCard = document.getElementById(`movie-card-${scrollIndex}`);
    movieCard?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [scrollIndex]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-container">
      <h2 className="genre-title">{genreName.charAt(0).toUpperCase() + genreName.slice(1)} Movies</h2>
      <div className="scroll-container">
      {showLeftScroll && <button className="scroll-button left" onClick={() => scroll('left')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>}
        <div className="movie-row" ref={movieRowRef} onScroll={handleScroll}>
        {movies.map((movie) => (
  <Link key={movie.id} to={`/movie-details/${movie.id}`} state={{ movie: movie }}>
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  </Link>
))}
        </div>
        {showRightScroll && <button className="scroll-button right" onClick={() => scroll('right')}>
<FontAwesomeIcon icon={faChevronRight} />
</button>}
      </div>
    </div>
  );
};

export default Movies;
