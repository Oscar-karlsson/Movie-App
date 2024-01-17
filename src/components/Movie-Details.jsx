import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import RelatedMovies from './RelatedMovies ';
import { useParams } from 'react-router-dom';




const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const movie = location.state?.movie;
  const [movieDetails, setMovieDetails] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!movie) {
      return <div>No movie data available.</div>;
  }

  const handlePlayButtonClick = () => {
    setShowTrailer(true);
    if (trailerUrl) {
      const autoplayUrl = trailerUrl.includes("?") 
        ? `${trailerUrl}&autoplay=1&mute=1` 
        : `${trailerUrl}?autoplay=1&mute=1`;
      setTrailerUrl(autoplayUrl);
    }
  };

  
  const [showTrailer, setShowTrailer] = useState(false);

  const [placeholderImage, setPlaceholderImage] = useState(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovieDetails(data);
      document.documentElement.style.setProperty('--background-image', `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`);
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    };
    // Add the class when the component is mounted
    document.body.classList.add('detail-page');
    setShowTrailer(false);
    fetchMovieDetails(); // Call the function inside useEffect
  
    return () => {
      document.body.classList.remove('detail-page');
      document.documentElement.style.setProperty('--background-image', '');
      document.body.style.backgroundImage = null; // Reset the background image when the component unmounts
    };
  }, [movie.id]);
  

  const apiKey = "b11b459ad0fc33643944e08ebb5f80ba"; 

  const [trailerUrl, setTrailerUrl] = useState(null);

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const youtubeTrailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
      if (youtubeTrailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${youtubeTrailer.key}`);
      }
    };
  
    fetchTrailer();
  }, [movie.id]);

  return (
    <>
<div className="trailer-container">
  {trailerUrl && !showTrailer && (
    <div className="play-button-container" onClick={() => {setShowTrailer(true); setPlaceholderImage(null);}}>
      <button>
        <FontAwesomeIcon icon={faPlay} />
      </button>
    </div>
  )}

      {showTrailer && (
 <div className="iframe-container" style={{backgroundImage: `url(${placeholderImage})`}}>
<ReactPlayer 
  className='react-player'
  url={trailerUrl}
  playing={true}
  controls={true}
  width='100%'
  height='100%'
  style={{ 
    position: 'absolute', 
    top: '50%', 
    left: '67.2%', 
    transform: 'translate(-50%, -50%)' 
  }}
/>
</div>
      )}
    </div>

    {/* Details Container for Movie Poster and Text Details */}
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <

div className="text-details">
<h2>{movie.title}</h2>
<p>{movie.overview}</p>
<p>Release date: {movie.release_date}</p>
<p>Vote average: {movie.vote_average}</p>
<p>Original language: {movie.original_language}</p>
<p>Popularity: {movie.popularity}</p>
<p>Vote count: {movie.vote_count}</p>
<p>Adult: {movie.adult ? 'Yes' : 'No'}</p>
<p>Genres: {movie.genre_ids.map(id => genreMap[id]).join(', ')}</p>
{/* Add more details as needed */}
</div>
</div>
<RelatedMovies movieId={movie.id} />
</>
);}
export default MovieDetails;