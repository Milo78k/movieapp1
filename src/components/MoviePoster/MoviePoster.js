import React, { useState } from 'react';
import { Avatar } from 'antd';
import './MoviePoster.css';

function MoviePoster({ movie }) {
  const [error, setError] = useState(false);
  const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="poster-container">
      {error ? (
        <Avatar
          shape="square"
          size="100%"
          style={{ width: '100%', height: '100%', backgroundColor: '#ddd' }}
          className="poster-avatar"
        >
          No Image
        </Avatar>
      ) : (
        <img
          src={imgSrc}
          alt={movie.title}
          onError={() => setError(true)}
          className="poster-img"
        />
      )}
    </div>
  );
}

export default MoviePoster;
