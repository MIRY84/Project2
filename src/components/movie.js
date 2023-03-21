import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = () => {
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: '8ee992b90b940495186ee6aeb86fb4a8',
          language: 'en-US',
          sort_by: 'popularity.desc',
          include_adult: false,
          include_video: false,
          page: Math.floor(Math.random() * 50) + 1, // Get a random page
        },
      });
      const { results } = response.data;
      if (results && results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${results[randomIndex].id}`, {
          params: {
            api_key: '8ee992b90b940495186ee6aeb86fb4a8',
            language: 'en-US',
          },
        });
        setMovieData(movieResponse.data);
      } else {
        setError('No movies found');
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  if (!movieData) {
    return <div>Loading...</div>;
  }

  const handleRefreshClick = () => {
    fetchData();
  };

  return (
    <div>
      <div>
        <h2 style={{ color: 'red', alignItems: 'top', paddingBottom: '2%' }}>
          What about a movie night?
        </h2>
      </div>
      <img class="image1"
        style={{
          float: 'left',
          width: '350px',
          height: '400px',
          paddingRight: '2%',
          transition: 'transform 1s',
          cursor: 'pointer',
          marginLeft: '10%',
        }}
        src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
        alt={movieData.title}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'; /* add transform on hover */
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'; /* reset transform on mouse out */
        }}
      />
      <h2 style={{ color: 'orange', textAlign: 'center' }}>
        <strong>{movieData.title}</strong>
      </h2>
      <p style={{ textAlign: 'left' }}>
        <em>{movieData.overview}</em>
      </p>
      <p>
        <em>Rating : {movieData.vote_average}</em>
      </p>
      <p>
        <em>Released : {movieData.release_date}</em>
      </p>
      <button onClick={handleRefreshClick}>Next</button>
    </div>
  );
};

export default Movie