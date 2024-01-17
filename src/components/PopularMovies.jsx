import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import '../App.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('API_URL/popular-movies');
      setMovies(response.data.results);
      
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-container">
      <h2>Popular Movies</h2>
      <div className="scroll-container">
      <button className="scroll-button left" onClick={() => scroll(-200)}>
  <FontAwesomeIcon icon={faChevronLeft} />
</button>
<div className="movie-row" ref={scrollRef}>
  {movies.map(movie => (
    <div key={movie.id} className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  ))}
</div>
<button className="scroll-button right" onClick={() => scroll(200)}>
  <FontAwesomeIcon icon={faChevronRight} />
</button>
</div>
    </div>
  );
};

export default PopularMovies;