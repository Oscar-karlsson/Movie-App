import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('API_URL/new-movies');
      setMovies(response.data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-container">
      <h2>New Movies</h2>
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default NewMovies;