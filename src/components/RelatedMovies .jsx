import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const RelatedMovies = ({ movieId }) => {
  const [relatedMovies, setRelatedMovies] = useState([]);
  

  const apiKey = "b11b459ad0fc33643944e08ebb5f80ba";

  useEffect(() => {
   
    const fetchRelatedMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRelatedMovies(data.results);
      
    };

    fetchRelatedMovies();
    window.scrollTo(0, 0);
  }, [movieId]);



  return (
    <div className="related-movies">
    <div className="related-movies-title">
      <h2>Related Movies</h2>
    </div>
    {relatedMovies.map((movie) => (
      <Link key={movie.id} to={`/movie-details/${movie.id}`} state={{ movie: movie }}>
        <div className="related-movie">
          <h3>{movie.title}</h3>
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
        </div>
      </Link>
    ))}
  </div>
);}

export default RelatedMovies;