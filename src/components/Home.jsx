import React, { useContext } from 'react';
import { MovieContext } from './MovieContext';
import Movies from './Movies';
import TvShows from './TvShows';


const movieGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 27, name: 'Horror' },
    // add other movie genres here
  ];
  
  const tvShowGenres = [
    { id: 35, name: 'Comedy' },
    {id: 10765,name: 'Sci-Fi & Fantasy'},
    { id: 10749, name: 'Romance' },
    // add other TV show genres here
  ];

const Home = () => {
    return (
        <div className="content-container">
          {movieGenres.map(genre => (
            <Movies key={genre.id} genreId={genre.id} genreName={genre.name} />
          ))}
          {tvShowGenres.map(genre => (
            <TvShows key={genre.id} genreId={genre.id} genreName={genre.name} />
          ))}
        </div>
      );
    };
    
  
  export default Home;