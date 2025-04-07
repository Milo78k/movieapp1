import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoviePoster from '../MoviePoster';
import MovieInfoHeader from '../MovieInfoHeader';
import MovieInfoDescription from '../MovieInfoDescription';
import Rating from '../Rating';
import './MovieCard.css';

const API_KEY = '716129ae124d90d45aa6c2493a69e577';
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTYxMjlhZTEyNGQ5MGQ0NWFhNmMyNDkzYTY5ZTU3NyIsIm5iZiI2N2Q5NTk3ODFiYjRiNWM1OGJjNmE5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7QkQv0DjprVfZOyYNk9ZOi6Uo1filUu2mmY';

function MovieCard({ movie, guestSessionId, rating: initialRating }) {
  const [rating, setRating] = useState(initialRating || movie.rating || 0);

  useEffect(() => {
    setRating(movie.rating);
  }, [movie.rating]);

  const rateMovie = (value) => {
    if (!guestSessionId) {
      console.error('Нет guestSessionId, невозможно оценить фильм');
      return;
    }

    axios
      .post(
        `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
        { value },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        },
      )
      .then(() => {
        setRating(value); // Обновляем состояние рейтинга
      })
      .catch((err) => console.error('Ошибка при оценке фильма:', err));
  };

  return (
    <div className="movie-card">
      <div className="poster-container">
        <MoviePoster movie={movie} />
      </div>
      <div className="info-header">
        <MovieInfoHeader movie={movie} rating={rating} />
      </div>
      <div className="movie-description">
        <MovieInfoDescription
          movie={movie}
          rating={rating}
          rateMovie={rateMovie}
        />
      </div>
      <div className="movie-rating">
        <Rating value={rating} onChange={rateMovie} />
      </div>
    </div>
  );
}

export default MovieCard;
