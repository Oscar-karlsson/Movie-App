import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

const MovieProvider = (props) => {
    const [movies, setMovies] = useState([]);
    const apiKey = 'b11b459ad0fc33643944e08ebb5f80ba'; // Replace with your actual API key

    useEffect(() => {
        // Fetch movies from TMDB API
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data.results || data.results.length === 0) {
                    throw new Error('No movies found!');
                }
                setMovies(data.results);
            })
            .catch(err => console.error('Error fetching movies:', err));
    }, [apiKey]);

    return (
        <MovieContext.Provider value={{ movies }}>
            {props.children}
        </MovieContext.Provider>
    );
};

export default MovieProvider;