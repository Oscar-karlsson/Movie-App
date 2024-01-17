import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight,} from "@fortawesome/free-solid-svg-icons";

const TvShows = ({ genreId, genreName }) => {
    const [tvShows, setTvShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scrollIndex, setScrollIndex] = useState(0);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(true);
    const rowRef = useRef(null);
  
    const apiKey = "b11b459ad0fc33643944e08ebb5f80ba"; // Replace with your actual API key
  
    useEffect(() => {
      axios
        .get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`)
        .then(response => {
          setTvShows(response.data.results);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
    }, [genreId, apiKey]);
  
    const scroll = (direction) => {
        const container = rowRef.current;  // Correct reference
        if (container) {
            const scrollAmount = container.offsetWidth * 0.8;
            const newScrollPosition = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;
            container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        const container = rowRef.current;  // Correct reference
        if (container) {
            const isAtStart = container.scrollLeft <= 0;
            const isAtEnd = container.scrollLeft + container.offsetWidth + 5 >= container.scrollWidth;
            setShowLeftScroll(!isAtStart);
            setShowRightScroll(!isAtEnd);
        }
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
        <div className="movie-container">
      <h2 className="genre-title">{genreName.charAt(0).toUpperCase() + genreName.slice(1)} Tv Shows</h2>
      <div className="scroll-container">
      {showLeftScroll && <button className="scroll-button left" onClick={() => scroll('left')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>}
        <div className="movie-row" ref={rowRef} onScroll={handleScroll}>
          {tvShows.map((tvShow, index) => (
            <div key={tvShow.id} className="movie-card">
                <Link to={`/tvshow/${tvShow.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.title}
              />
              <h2>{tvShow.title}</h2>
              <p>{tvShow.overview}</p>
              </Link>
            </div>
          ))}
        </div>
        {showRightScroll && <button className="scroll-button right" onClick={() => scroll('right')}>
<FontAwesomeIcon icon={faChevronRight} />
</button>}
      </div>
    </div>
  );
};
  export default TvShows;
