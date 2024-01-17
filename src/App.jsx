import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieProvider from "./components/MovieContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import MovieDetails from "./components/Movie-Details";
import Loading from "./components/Loading";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import RelatedMovies from "./components/RelatedMovies ";


const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MovieProvider>
      {isLoading && <Loading />}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/movies"
            element={<Movies setIsLoading={setIsLoading} />}
          />
          <Route
            path="/tvShows"
            element={<TvShows setIsLoading={setIsLoading} />}
          />

          <Route
            path="/movie-details/:movieId"
            element={<MovieDetails setIsLoading={setIsLoading} />}
          />


        </Routes>
        <Footer />
      </Router>
    </MovieProvider>
  );
};

export default App;
